const { response } = require('express');
const { getConnection } = require('../database/connection');
const { SSHConnection } = require('../database/dbConnection');
const { queries } = require('../helpers/queries');

const mandaditosGet = async (req, res = response) => {

    try {
        const query = queries.getMandaditos;

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
        
            const pool = await getConnection();

            const [rows, fields] = pool.execute("Select * from mandaditos;")

            console.log(rows);

            res.json({
                rows
            })

    } catch (error) {
        res.send(error)
    }
        

}

const mandaditoGet = async (req, res = response) => {

    const { id } = req.params;

    res.json({
        id
    })
    
    
}

const mandaditoPost = async (req, res = response) => {

    const { nombre, apellido } = req.body;

    console.log(req.body);

    res.json({
        msg: 'Crear Mandadito POST',
        nombre,
        apellido
    })
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