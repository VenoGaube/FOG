
import express from 'express';
import fs from 'fs';
import bodyParser from "body-parser";

import { cyrb53, verify_user } from "./verify_identity.js";
import { create, read, update_authority_values, update_owner_values, delete_user } from "./deploy_identity.js";

//https://buddy.works/guides/how-dockerize-node-application

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Define request response in root URL (/)
app.get('/', function (req, res) {
    try {  
        var data = fs.readFileSync('guide.txt', 'utf8');
        console.log("sending help text"); 
        return res.json(data.toString());
    } catch(e) {
        console.log('Error:', e.stack);
    }
});

app.post('/create', async function (req, res) {
    try { 
        console.log("Creating identity");    
        var data = await create(req.body.provider, req.body.wallet_pk);
        res.status(200).json(data);
    } catch(e) {
        console.log('Error:', e.stack);
        res.status(500).json(e.stack);
    }
    return 
});

app.get('/read/:provider/:id', async function (req, res) {
    try { 
        console.log("Reading identity", req.params.id, req.params.provider);    
        var data = await read(req.params.id, req.params.provider);
        res.status(200).json(data);
    } catch(e) {
        console.log('Error:', e.stack);
        res.status(500).json(e.stack);
    }
    return 
});

app.post('/auth_update/:provider/:id', async function (req, res) {
    try { 
        console.log("Updating authority params");    
        var data = await update_authority_values(req.params.id, req.body.wallet_pk, req.params.provider, req.body.new_data);
        res.status(200).json(data);
    } catch(e) {
        console.log('Error:', e.stack);
        res.status(500).json(e.stack);
    }
    return 
});

app.post('/user_update/:provider/:id', async function (req, res) {
    try { 
        console.log("Updating user params");    
        var data = await update_owner_values(req.params.id, req.body.wallet_pk, req.params.provider, req.body.new_data);
        res.status(200).json(data);
    } catch(e) {
        console.log('Error:', e.stack);
        res.status(500).json(e.stack);
    }
    return 
});

app.get('/delete/:provider/:id', async function (req, res) {
    try { 
        console.log("Removing user");    
        var data = await delete_user(req.params.id, req.body.wallet_pk, req.params.provider);
        res.status(200).json(data);
    } catch(e) {
        console.log('Error:', e.stack);
        res.status(500).json(e.stack);
    }
    return 
});

app.get('/verify/:provider/:id', async function (req, res) {
    try { 
        console.log("Verifying user");    
        var data = await verify_user(req.params.id, req.body.wallet_pk, req.params.provider, req.body.user_password);
        res.status(200).json(data);
    } catch(e) {
        console.log('Error:', e.stack);
        res.status(500).json(e.stack);
    }
    return 
});

//Launch listening server on port 8081
app.listen(8081, function () {
    console.log('app listening on port 8081!');
})

