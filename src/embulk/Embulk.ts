import { PluginAbstract } from './plugin/PluginAbstract'
import { execSync } from 'child_process';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';

// Main class for embulk execution
export class Embulk {
    // Embulk executable path
    embulkPath: string;
    JAVA_HOME: string;
    // Directory to place generated configuration file
    configDirectory: string;

    constructor(embulkPath: string, JAVA_HOME: string, configDirectory?: string) {
        this.embulkPath = embulkPath;
        this.JAVA_HOME = JAVA_HOME;
        this.configDirectory = configDirectory ? configDirectory : '/tmp/embulk'
    }

    execute(inPlugin: PluginAbstract, outPlugin: PluginAbstract): void {
        // Create a random configuration file name
        const configFileName = uuidv4() + '.yml';
        if (!fs.existsSync(this.configDirectory)) {
            fs.mkdirSync(this.configDirectory);
        }
        const configFilePath = path.join(this.configDirectory, configFileName);

        // Make sure in/out plugin are installed
        this.insurePluginInstalled(inPlugin);
        this.insurePluginInstalled(outPlugin);
        try {
            const config = `${inPlugin.config()}\n${outPlugin.config()}\n`;
            fs.writeFileSync(configFilePath, config, {flag: "w+"});
            const javaEnv = `JAVA_HOME="${this.JAVA_HOME}"`;
            const embulkExecutionCommand = `${javaEnv} ${this.embulkPath} run ${configFilePath}`
            // Call Embulk executable
            execSync(embulkExecutionCommand);
        } catch (error) {
            console.error(error);
        } finally {
            if (fs.existsSync(configFilePath)) {
                fs.rmSync(configFilePath);
            }
        }
    }

    private insurePluginInstalled(plugin: PluginAbstract): void {
        const javaEnv = `JAVA_HOME="${this.JAVA_HOME}"`;
        const pluginListCmmand = `${javaEnv} ${this.embulkPath} gem list`;
        const pluginList = execSync(pluginListCmmand);
        if (!(plugin.pluginName in pluginList)) {
            // Install plugin first
            const installPluginCommand = `${javaEnv} ${this.embulkPath} gem install ${plugin.pluginName}`;
            execSync(installPluginCommand);
            // TODO: Add error handling
        }
    }
}