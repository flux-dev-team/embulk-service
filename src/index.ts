import http from 'https';
import express from 'express';
import bodyParser from 'body-parser';
import { EmbulkPayload } from './type';
import { PluginAbstract, PluginType } from './embulk/plugin/PluginAbstract';
import { PluginFactory } from './embulk/PluginFactory';
import { Embulk } from './embulk/Embulk';

const HTTP_PORT = 4000;

const app = express()
.use(bodyParser.json())
.use(bodyParser.urlencoded({extended: true}))
.post('/embulk', async (req, res) => {
    const embulkPayload: EmbulkPayload = req.body;
    const inPlugin: null | PluginAbstract = PluginFactory.createPlugin(PluginType.IN, embulkPayload.in);
    const outPlugin: null | PluginAbstract = PluginFactory.createPlugin(PluginType.OUT, embulkPayload.out);
    if (inPlugin != null && outPlugin != null) {
        const embulk: Embulk = new Embulk('', '', '/tmp/embulk')
        embulk.execute(inPlugin, outPlugin);
    }
    res.status(404).end()
})

http.createServer(app).setTimeout(10000).listen(HTTP_PORT);