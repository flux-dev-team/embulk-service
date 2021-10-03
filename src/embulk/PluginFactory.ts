import { InMongoDBPlugin } from './plugin/InMongoDBPlugin';
import { PluginAbstract, PluginType } from './plugin/PluginAbstract';
import { OutBigQueryPlugin } from './plugin/OutBigQueryPlugin';
import { PluginPayload } from '../type';

export const PluginFactory = {
    createPlugin(pluginType: PluginType, pluginPayload: PluginPayload): PluginAbstract | null {
        if (pluginType == PluginType.IN) {
            if (pluginPayload.pluginName == 'mongodb') {
                return new InMongoDBPlugin(PluginType.IN, 'mongodb', pluginPayload.args);
            }
            return null;
        }
        if (pluginType == PluginType.OUT) {
            if (pluginPayload.pluginName == 'bigquery') {
                return new OutBigQueryPlugin(PluginType.OUT, 'bigquery', pluginPayload.args);
            }
            return null;
        }
        return null;
    }
}
