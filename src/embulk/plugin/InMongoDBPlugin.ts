import { PluginAbstract, PluginType } from "./PluginAbstract";
import YAML from 'yaml'

type InMongoDBPluginConfig = {
    type: string;
    uri: string;
    collection: string;
    query: string;
    projection: string;
    json_column_name: string;
}


export class InMongoDBPlugin extends PluginAbstract {
    constructor(plugin: PluginType, pluginName: string, args: {[key:string]: string}) {
        super(plugin, pluginName, args);
    }

    config(): string {
        if (!this.checkArgs()) {
            return '';
        }
        const pluginConfig: InMongoDBPluginConfig = {
            type: 'mongodb',
            uri: this.arguments['uri'],
            collection: this.arguments['collection'],
            query: this.arguments['query'],
            projection: this.arguments['projection'],
            json_column_name: this.arguments['json_column_name'],
        }
        return YAML.stringify(pluginConfig);
    }

    checkArgs(): boolean {
        if (!('uri' in this.arguments)) {
            return false;
        }
        if (!('collection' in this.arguments)) {
            return false;
        }
        if (!('query' in this.arguments)) {
            return false;
        }
        if (!('projection' in this.arguments)) {
            return false;
        }
        if (!('json_column_name' in this.arguments)) {
            return false;
        }
        return true;
    }
}