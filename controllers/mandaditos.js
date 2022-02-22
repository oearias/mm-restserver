const { response } = require('express');
const { getConnection } = require('../database/connection');
const bcryptjs = require('bcryptjs');
const { queries } = require('../helpers/queries');
//const { getSSHConnection } = require('../database/dbConnection');

const mandaditosGet = async (req, res = response) => {

    try {

        //Consultas Remotas
        /*
        const promisePool = await getSSHConnection().then( 
            (pool) => pool.promise()
        ).catch(err => console.log(err));*/

        //Esto corre en el Server sin SSH
        const pool = await getConnection();
        const promisePool = pool.promise();
        
        const [rows] = await promisePool.query(queries.getMandaditos);

        res.json({rows});

    } catch (error) {
        res.send(error);
    }

}

const mandaditoGet = async (req, res = response) => {

    try {

        const { id } = req.params;
        
        const pool = await getConnection();
        const promisePool = pool.promise();

        const [rows] = await promisePool
            .query(queries.getMandadito, [id]);

        res.json({
            rows
        });

    } catch (error) {
        res.send(error)
    }
    
}

const mandaditoPost = async (req, res = response) => {

    try {
        const { nombre, 
            apellido_paterno, 
            apellido_materno, 
            telefono,
            nombre_mandadito,
            email, password, 
            estado, municipio,
            localidad
        } = req.body;

        // Valido datos
        if (
            (!nombre) || (!apellido_paterno) || 
            (!email) || (!password) ||
            (!telefono) || (!nombre_mandadito) ||
            (!estado) || (!municipio) || (!localidad)
        ){
            return res.json({
                msg: 'Por favor complete todos los datos'
            });
        }

        //Encriptar password
        const salt = bcryptjs.genSaltSync();
        const pass = bcryptjs.hashSync(password, salt)
    
        //Datos por default
        const estatus = 0;
        const disponibilidad = 0;
        const fecha_creacion = new Date();

        const pool = await getConnection();
        const promisePool = pool.promise();
    
        await promisePool
            .query(queries.insertMandadito, [
                nombre,
                apellido_paterno, apellido_materno,
                telefono,
                email, pass,
                nombre_mandadito,
                estatus, disponibilidad,
                estado, municipio, localidad,
                fecha_creacion
            ]);
    
        res.json({
            msg: 'Usuario creado correctamente',
        });

    } catch (error) {

        if(error['errno'] == 1062){
            error = 'El email ingresado ya se encuentra en uso';
        }

        res.status(500).json(error);
    }
}

const mandaditoPut = async (req, res = response) => {

    try {

        const { id } = req.params;
        const {
            nombre, apellido_paterno, apellido_materno,
            email, telefono, nombre_mandadito, disponibilidad,
            estado, municipio, localidad
        } = req.body;

        //Esto corre en el Server sin SSH
        const pool = await getConnection();
        const promisePool = pool.promise();

        const result = await promisePool.query(queries.updateMandadito, [
            nombre, apellido_paterno, apellido_materno,
            telefono, email, nombre_mandadito, 
            disponibilidad, estado, municipio,
            localidad, id
        ]);

        if(result[0]['affectedRows'] > 0 ){
            res.json({
                msg: 'Usuario Actualizado correctamente'
            });
        };

        
        
    } catch (error) {
        res.json({
            error
        });
    }

    
}

const mandaditoDelete = async (req, res = response) => {

    try {

        const { id } = req.params;

        //Esto corre en el Server sin SSH
        const pool = await getConnection();
        const promisePool = pool.promise();

        const result = await promisePool.query(queries.deleteMandadito, [id]);

        let msg = '';

        if(result[0]['affectedRows'] > 0 ){
            msg = 'Usuario eliminado correctamente';
        }else{
            msg = 'No se pudo eliminar ningún registro';
        }

        res.json({msg})

    } catch (error) {
        res.json(error.message)
    }
}

module.exports = {
    mandaditosGet,
    mandaditoGet,
    mandaditoPost,
    mandaditoPut,
    mandaditoDelete
}