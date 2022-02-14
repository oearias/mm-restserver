const mysql = require('mysql2');
const { Client } = require('ssh2');
const sshClient = new Client();

const ssh_pub = './ssh/id_rsa'

//ssh -L 3306:127.0.0.1:3306 ipServer -l user

const dbServer = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}
const tunnelConfig = {
    host: process.env.DB_SSH_HOST,
    port: 22,
    username: process.env.DB_SSH_USER,
    privateKey : require('fs').readFileSync(ssh_pub)
    //password: process.env.DB_SSH_PASSWORD
}
const forwardConfig = {
    srcHost: '127.0.0.1',
    srcPort: 3306,
    dstHost: dbServer.host,
    dstPort: dbServer.port
};

const SSHConnection = () => {

    return new Promise((resolve, reject) => {
        sshClient.on('ready', () => {
            sshClient.forwardOut(
            forwardConfig.srcHost,
            forwardConfig.srcPort,
            forwardConfig.dstHost,
            forwardConfig.dstPort,
            (err, stream) => {
                if (err) reject(err);
            
                // create a new DB server object including stream
                const updatedDbServer = {
                    ...dbServer,
                    stream
                };
                // connect to mysql
                const connection =  mysql.createConnection(updatedDbServer);
                // check for successful connection
            //  resolve or reject the Promise accordingly          
            connection.connect((error) => {
                if (error) {
                    reject(error);
                }

                //connection.execute(query, function(err, results, fields){
                  //  if(!err)
                    //console.log('results');
                //});

                resolve(connection);
                
            });
        });
        }).connect(tunnelConfig);
    });
    
}

module.exports = {
    SSHConnection
}