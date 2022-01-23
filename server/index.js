import express from 'express';
import { resolve } from 'path';
import { __dirname } from './globals.js'
import { readData, writeData } from './fileUtils.js';
import { request } from 'http';


const app = express();

const hostname = 'localhost';
const port = 4321;

let suplists = [];

app.use(express.json());

app.use((request, response, next) => {
    console.log(
        (new Date()).toISOString(),
        request.ip,
        request.method,
        request.originalUrl
    );

    // var origins = [
    //     'http://localhost',
    //     'http://localhost:3000',
    //     'http://localhost:4321'
    // ];

    // for(var i = 0; i < origins.length; i++){
    //     var origin = origins[i];

    //     if(request.headers.origin.indexOf(origin) > -1){
    //         response.header('Access-Control-Allow-Origin', request.headers.origin);
    //     }
    // }
    
    // response.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
    // response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
});

app.use('/', express.static(
    resolve(__dirname, '..', 'public')
));

app.get('/suplists', (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.status(200);
    response.json(suplists);
});

app.post('/suplists', async (request, response) => {
    const { suplistDate } = request.body;
    suplists.push ({
        suplistDate,
        supplies: []
    })
    await writeData(suplists);

    response.setHeader('Content-Type', 'application/json');
    response.status(200);
    response.json({
        info: `Supply ${suplistDate} created`
    });
});

app.put('/suplists/:suplistId/supplies', async (request, response) => {
    
    const suplistId = Number(request.params.suplistId);
    
    if(suplistId < 0 || suplistId >= suplists.length) {
        response.setHeader('Content-Type', 'application/json');
        response.status(404);
        response.json({
            info: `There is no suplist with id ${suplistId}`
        });
        return; 
    }

    suplists[suplistId].supplies.push({ 
        supName: 'Деталь',
        supCount: 0,
        supPrice: 0
    })
    await writeData(suplists);

    response.setHeader('Content-Type', 'application/json');
    response.status(200);
    response.json({
        info: `New supply added in ${suplistId}`
    });
});

app.patch('/suplists/:suplistId/supplies/:supplyId', async (request, response) => {
    
    const { supName, supCount, supPrice } = request.body;
    const suplistId = Number(request.params.suplistId);
    const supplyId = Number(request.params.supplyId);
    
    if(suplistId < 0 || suplistId >= suplists.length || 
        supplyId < 0 || supplyId >= suplists[suplistId].supplies.length) {
        response.setHeader('Content-Type', 'application/json');
        response.status(404);
        response.json({
            info: `There is no supply ${supplyId} in suplist with id ${suplistId}`
        });
        return; 
    }

    if(supName) suplists[suplistId].supplies[supplyId].supName = supName;
    if(supCount) suplists[suplistId].supplies[supplyId].supCount = supCount;
    if(supPrice) suplists[suplistId].supplies[supplyId].supPrice = supPrice;
        
    await writeData(suplists);

    response.setHeader('Content-Type', 'application/json');
    response.status(200);
    response.json({
        info: `Supply ${supplyId} in suplist with id ${suplistId} changed`
    });
});

app.delete('/suplists/:suplistId', async (request, response) => {
    
    const suplistId = Number(request.params.suplistId);
    
    if(suplistId < 0 || suplistId >= suplists.length) {
        response.setHeader('Content-Type', 'application/json');
        response.status(404);
        response.json({
            info: `There is no suplist ${suplistId}`
        });
        return; 
    }

    suplists.splice(suplistId, 1);
        
    await writeData(suplists);

    response.setHeader('Content-Type', 'application/json');
    response.status(200);
    response.json({
        info: `Suplist ${suplistId} was deleted`
    });
});

app.delete('/suplists/:suplistId/supplies/:supplyId', async (request, response) => {
    
    const suplistId = Number(request.params.suplistId);
    const supplyId = Number(request.params.supplyId);
    
    if(suplistId < 0 || suplistId >= suplists.length || 
        supplyId < 0 || supplyId >= suplists[suplistId].supplies.length) {
        response.setHeader('Content-Type', 'application/json');
        response.status(404);
        response.json({
            info: `There is no supply ${supplyId} in suplist with id ${suplistId}`
        });
        return; 
    }

    suplists[suplistId].supplies.splice(supplyId, 1);
        
    await writeData(suplists);

    response.setHeader('Content-Type', 'application/json');
    response.status(200);
    response.json({
        info: `Supply ${supplyId} in suplist with id ${suplistId} was deleted`
    });
});



app.listen(port, hostname, async (err) => {
    if(err) {
        console.error('Error: ', err);
        return;
    }

    console.log(`Our server started at http://${hostname}:${port}`);
    const suplistsFromFile = await readData();

    suplistsFromFile.forEach(({ suplistDate, supplies }) => {
        suplists.push({
            suplistDate,
            supplies: [...supplies]
        });
    });
    console.log(suplists);
})