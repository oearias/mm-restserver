const { response } = require('express');
const { getConnection } = require('../database/connection');
const bcryptjs = require('bcryptjs');
const { queries } = require('../helpers/queries');

const mandaditosGet = async (req, res = response) => {

    try {
        
        const pool = await getConnection();
        const promisePool = pool.promise();

        const [rows, fields] = await promisePool.query(queries.getMandaditos);

        res.json({
            rows
        });

    } catch (error) {
        res.send(error)
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
        if ((email == null) || (password == null) || (nombre == null)
            || (apellido_paterno == null) 
            || (telefono == null) || (nombre_mandadito == null)
            || (estado == null) || (municipio == null) || (localidad == null)
        ) {
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
        console.log("Llegamos hasta aquí");
        res.send(error)
    }
}

const mandaditoPut = async (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'Actualizar Mandadito PUT',
        id
    })
}

const mandaditoDelete = async (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'Eliminar Mandadito DELETE',
        id
    })
}



module.exports = {
    mandaditosGet,
    mandaditoGet,
    mandaditoPost,
    mandaditoPut,
    mandaditoDelete
}










//Esto va en el controller activando el firewall en SSH

/*SSHConnection()
            .then(con => {
                con.execute(query, function(err, results, fields){

                    (err)
                    ? res.status(500).send('Por favor contacte a su administrador')
                    : res.json({
                        results
                    });

                });
            })
            .catch(err => {
                res.send(err);
            })*/