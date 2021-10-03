type PluginPayload = {
    pluginName: string;
    args: {[key:string]: string}
}

export type EmbulkPayload = {
    in: PluginPayload;
    out: PluginPayload;
    filter?: any;
}
