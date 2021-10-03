import http from 'https';
import express from 'express';
import bodyParser from 'body-parser';

const HTTP_PORT = 80;

const app = express()
.use(bodyParser.json())
.use(bodyParser.urlencoded({extended: true}))
.post('/embulk', async (req, res) => {

})