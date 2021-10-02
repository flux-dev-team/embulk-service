import { PluginAbstract, PluginType } from "./PluginAbstract";
import YAML from 'yaml'

type OutBigQueryPluginConfig = {
    type: string;
    auth_method: string;
    json_keyfile: string;
    project: string;
    dataset: string;
    table: string;
    time_partitioning: {[key:string]: string};
    clustering: {[key:string]: string};
    auto_create_table: boolean;
    schema: {[key:string]: string};
}


export class OutBigQueryPlugin extends PluginAbstract {
    constructor(plugin: PluginType, pluginName: string, args: {[key:string]: string}) {
        super(plugin, pluginName, args);
    }

    config(): string {
        if (!this.checkArgs()) {
            return '';
        }
        const pluginConfig: OutBigQueryPluginConfig = {
            type: 'mongodb',
            auth_method: this.arguments['auth_method'],
            json_keyfile: this.arguments['json_keyfile'],
            project: this.arguments['project'],
            dataset: this.arguments['dataset'],
            table: this.arguments['table'],
            time_partitioning: this.arguments['time_partitioning'],
            clustering: this.arguments['clustering'],
            auto_create_table: this.arguments['auto_create_table'],
            schema: this.arguments['schema']
        }
        return YAML.stringify(pluginConfig);
    }

    checkArgs(): boolean {
        if (!('auth_method' in this.arguments)) {
            return false;
        }
        if (!('json_keyfile' in this.arguments)) {
            return false;
        }
        if (!('project' in this.arguments)) {
            return false;
        }
        if (!('dataset' in this.arguments)) {
            return false;
        }
        if (!('table' in this.arguments)) {
            return false;
        }
        if (!('time_partitioning' in this.arguments)) {
            return false;
        }
        if (!('clustering' in this.arguments)) {
            return false;
        }
        if (!('auto_create_table' in this.arguments)) {
            return false;
        }
        if (!('schema' in this.arguments)) {
            return false;
        }
        return true;
    }
}