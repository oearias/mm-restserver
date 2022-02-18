


const queries = {
    getMandaditos: 'SELECT nombre, apellido_paterno, apellido_materno, '+
    'nombre_mandadito, '+
    'telefono, email '+
    'FROM mandaditos;',

    getMandadito: 'SELECT nombre, apellido_paterno, apellido_materno, '+
    'nombre_mandadito, '+
    'telefono, email '+
    'FROM mandaditos '+
    'WHERE id= ? ;',
}

module.exports = {
    queries
}

/**
 * 
 * ,
    insertMandadito: "INSERT INTO mandaditos (nombre, apellido_paterno, "+ 
    'apellido_materno, telefono, email, password, nombre_mandadito, estatus, disponibilidad, '+
    'estado, municipio, localidad, fecha_creacion) '+ 
    "VALUES (null,'Oscar Enrique', 'Arias', ''Rodriguez) "+
    "'9381522998','oscar.enrique.arias@gmail.com','123456','El Partner',null,1,1,'Campeche','Carmen','Carmen','2022-02-14',null);"
 */