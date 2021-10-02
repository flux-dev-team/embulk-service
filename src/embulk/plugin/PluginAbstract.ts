export enum PluginType{
    IN,
    OUT
}

export abstract class PluginAbstract {
    plugin: PluginType;
    pluginName: string;
    arguments: {[key:string]: string};

    constructor(plugin: PluginType, pluginName: string, args: {[key:string]: string}) {
        this.plugin = plugin;
        this.pluginName = pluginName;
        this.arguments = args;
    }

    abstract config(): string;
}