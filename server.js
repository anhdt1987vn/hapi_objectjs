'use strict';

const Hapi = require('hapi');
const Knex = require('knex');
const Good = require('good');

var routes = require('./routes');
var knexConfig = require('./knexfile');
var Model = require('objection').Model;


// Create a server with a host and port
const server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 8000 
});


// Initialize knex.
var knex = Knex(knexConfig.development);
Model.knex(knex);

// Add the route
server.route(routes);

server.register({
    register: Good,
    options: {
        reporters: {
            console: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{
                    response: '*',
                    log: '*'
                }]
            }, {
                module: 'good-console' 
            }, 'stdout']
        }
    }
}, (err) => {

    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start((err) => {

        if (err) {
            throw err;
        }
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});
