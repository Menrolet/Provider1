'use strict';
import body from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import * as path from 'path';
import * as fs from 'fs';
import DB from "./db/db.js";
import { Emploee, DbRequest } from './db/types.js';

const app = express();
const __dirname = path.resolve();
app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(body.json());

const port = process.env.PORT || 8081;
const maxWeight = 300;

const database = new DB({
    host: '127.0.0.1',
    port: 5432,
    name: 'ti_hw_db',
    login: 'ti_hw',
    password: 'ti_hw',
});

app.get(/static\/css\/index\.css/, (req: any, res: any) => {
    res.sendFile(path.resolve(__dirname, 'front', 'public', 'static', 'css', 'index.css'));
})
app.get(/dist\/main\.bandle\.js/, (req: any, res: any) => {
    res.sendFile(path.resolve(__dirname, 'front', 'public', 'dist', 'main.bandle.js'));
})
app.get(/modules\/handlebars\.js/, (req: any, res: any) => {
    res.sendFile(path.resolve(__dirname, 'front', 'public', 'modules', 'handlebars.js'));
})
app.get(/icons\.svg/, (req: any, res: any) => {
    res.sendFile(path.resolve(__dirname, 'front', 'public', 'icons.svg'));
})
app.get(/queries\/emploee\/get\/all/, async (req: any, res: any) => {
    try {
        const emploees = await database.getEmploees();

        res.StatusCode = 200;
        res.StatusMessage = 'OK';
        res.json({ emploees });
    } catch (err) {
        res.status(500).send('INTERNAL');
    }
})
app.get('/queries/emploee/get/:userId([0-9]+)', async (req: any, res: any) => {
    try {
        const emploee = await database.getEmploee(req.params.userId);

        res.StatusCode = 200;
        res.StatusMessage = 'OK';
        res.json({ emploee });
    } catch (err) {
        res.status(404).send('NOT/FOUND');
    }
})
app.post(/queries\/emploee\/delete/, async (req: any, res: any) => {
    try {
        await database.deleteEmploee(req.body.code);

        res.StatusCode = 200;
        res.StatusMessage = 'OK';
        res.end();
    } catch (err) {
        res.status(404).send('NOT/FOUND');
    };
})
app.post(/queries\/emploee\/add/, async (req: any, res: any) => {
    const emploee: Emploee = {
        name: req.body.name,
        surname: req.body.surname,
        fathername: req.body.fathername
    }
    try {
        await database.addEmploee(emploee);

        res.StatusCode = 200;
        res.StatusMessage = 'OK';
        res.end();
    } catch (err) {
        res.status(400).send('BAD/REQUEST');
    };
})
app.post(/queries\/emploee\/update/, async (req: any, res: any) => {
    const emploee: Emploee = {
        code: req.body.code,
        name: req.body.name,
        surname: req.body.surname,
        fathername: req.body.fathername
    }
    try {
        await database.updateEmploee(emploee)

        res.StatusCode = 200;
        res.StatusMessage = 'OK';
        res.end();
    } catch (err) {
        res.status(400).send('BAD/REQUEST');
    };
})
app.get(/queries\/reqType\/get\/all/, async (req: any, res: any) => {
    try {
        const types = await database.getRequestTypes();

        res.StatusCode = 200;
        res.StatusMessage = 'OK';
        res.json({ types });
    } catch (err) {
        res.status(404).send('NOT/FOUND');
    }
})
app.get('/queries/request/get/list/:userId([0-9]+)', async (req: any, res: any) => {
    try {
        const requests = await database.getRequests(req.params.userId);

        res.StatusCode = 200;
        res.StatusMessage = 'OK';
        res.json({ requests });
    } catch (err) {
        res.status(400).send('BAD/REQUEST');
    };
})
app.post(/queries\/request\/add/, async (req: any, res: any) => {
    const request: DbRequest = {
        assigner: parseInt(req.body.assigner),
        address: req.body.address,
        type: {
            id: req.body.type.id,
            name: req.body.type.name,
            weight: req.body.type.weight,
        }
    }

    try {
        const dbRequestsRaw = (await database.getRequests(request.assigner))!;

        const dbRequests: DbRequest[] = [];
        for(let i = 0; i < dbRequestsRaw.length; ++i){
            dbRequests.push(toDbRequest(dbRequestsRaw[i]));
        }
        
        if (!isAvailable(dbRequests as DbRequest[], request, maxWeight)){
            res.status(403).send('CONFLICT');
            return;
        }

        await database.addRequest(request);

        res.StatusCode = 200;
        res.StatusMessage = 'OK';
        res.end();
    } catch (err) {
        console.error(err);
        res.status(400).send('BAD/REQUEST');
    };
})
app.post(/queries\/request\/delete/, async (req: any, res: any) => {
    try {
        await database.deleteRequest(req.body.id);
        res.StatusCode = 200;
        res.StatusMessage = 'OK';
        res.end();
    } catch (err) {
        res.status(404).send('NOT/FOUND');
    };
})
app.post(/queries\/request\/update/, async (req: any, res: any) => {
    const request: DbRequest = {
        id: req.body.id,
        assigner: req.body.assigner,
        address: req.body.address,
        type: {
            id: req.body.type.id,
            name: req.body.type.name,
            weight: req.body.type.weight,
        }
    }
    try {
        const dbRequestsRaw = (await database.getRequests(request.assigner))!;

        const dbRequests: DbRequest[] = [];
        for(let i = 0; i < dbRequestsRaw.length; ++i){
            dbRequests.push(toDbRequest(dbRequestsRaw[i]));
        }

        if (!isAvailable(dbRequests, request, maxWeight)){
            res.status(403).send('CONFLICT');
            return;
        }

        await database.updateRequest(request);

        res.StatusCode = 200;
        res.StatusMessage = 'OK';
        res.end();
    } catch (err) {
        res.status(404).send('NOT/FOUND');
    };
})
app.get(/.*/, (req: any, res: any) => {
    res.sendFile(path.resolve(__dirname, 'front', 'public', 'index.html'));
})



app.listen(port, async function () {
    try {
        await database.connect();
    } catch (error) {
        console.log('Terminate');
        process.exit(1);
    }

    console.log(`Server listening port ${port}`);
});

function toDbRequest(raw: any): DbRequest {
    return {
        id: raw.id,
        assigner: raw.assigner,
        type: {
            id: raw.typeid,
            name: raw.name,
            weight: raw.weight
        },
        address: raw.address
    }
}

function isAvailable(requests: DbRequest[], newRequest: DbRequest, maxWeight: number): boolean {
    let sum = newRequest.type.weight;
    for (let i = 0; i < requests.length; ++i) {
        if (requests[i].id !== newRequest.id){
            sum += requests[i].type.weight;
        }
    }
    
    return sum <= maxWeight;
}