const express = require('express');
const cors = require('cors');
//const { SSHConnection } = require('../database/dbConnection');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        //this.port = 6000;
        this.mandaditosPath = '/api/mandaditos'

        //Middlewares
        this.middlewares();

        //Rutas de la Aplicación
        this.routes();

        
    }

    middlewares(){

        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Handlebars
        //this.app.set('view engine', 'hbs');

        //Directorio público
        this.app.use(express.static('public'));

        //Parsea los request a
        this.app.use(express.urlencoded({extended: false}));

    }

    routes(){

        this.app.use(this.mandaditosPath, require('../routes/mandaditos'));
    }

    listen(){
        this.app.listen(process.env.PORT, ()=>{
            console.log('Server running on port: ', this.port);
        });
    }
    
}

module.exports = Server;