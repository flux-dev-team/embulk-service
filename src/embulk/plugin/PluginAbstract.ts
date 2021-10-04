// Define Plugin Type, In as input, OUT as output
export enum PluginType{
    IN,
    OUT
}

// Abstract class for plugin
export abstract class PluginAbstract {
    plugin: PluginType;
    pluginName: string;
    // Arguments used to configure a specific Plugin
    arguments: {[key:string]: any};

    constructor(plugin: PluginType, pluginName: string, args: {[key:string]: string}) {
        this.plugin = plugin;
        this.pluginName = pluginName;
        this.arguments = args;
    }

    // Generate config content
    abstract config(): string;

    // Check if arguments are set for a plugin
    abstract checkArgs(): boolean;
}