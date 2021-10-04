import { PluginAbstract, PluginType } from "./PluginAbstract";
import YAML from 'yaml'

// Config for BigQuery output plugin, ref: https://github.com/embulk/embulk-output-bigquery#configuration
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
        // Output string as stringified yaml
        return YAML.stringify(pluginConfig);
    }

    checkArgs(): boolean {
        if (!('auth_method' in this.arguments) || !('json_keyfile' in this.arguments) || !('project' in this.arguments)
            || !('dataset' in this.arguments) || !('table' in this.arguments) || !('time_partitioning' in this.arguments)
            || !('clustering' in this.arguments) || !('auto_create_table' in this.arguments) || !('schema' in this.arguments)) {
            return false;
        }
        return true;
    }
}