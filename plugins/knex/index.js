'use strict'

const Knex = require('knex');
const config = require('../../config');
const Model = require('objection').Model;

exports.register = (server, option, next) => {
	// Initialize knex.
    var knex = Knex(config.knexDev);
    //console.log(Model);
    Model.knex(knex);
    next();
};

exports.register.attributes = {
	name: 'knex'
}