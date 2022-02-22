


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

    insertMandadito: 'INSERT INTO mandaditos (nombre, apellido_paterno, '+
    'apellido_materno, telefono, email, '+
    'password, nombre_mandadito, estatus, disponibilidad, '+
    'estado, municipio, localidad, fecha_creacion) '+
    'VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);',

    updateMandadito: 'UPDATE mandaditos SET nombre = ?, '+
    'apellido_paterno = ?, apellido_materno = ?, '+
    'telefono = ?, email = ?, nombre_mandadito = ?, '+
    'disponibilidad = ?, estado = ?, municipio = ?, localidad = ? '+
    'WHERE id = ? ;',

    deleteMandadito: 'DELETE FROM mandaditos where id = ? ;'


}

module.exports = {
    queries
}