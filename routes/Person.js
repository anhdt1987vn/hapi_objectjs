var objection = require('objection');
var Person = require('../models/Person');
var Joi = require('joi');
var Boom = require('boom');

module.exports = [
	{
	    method: 'post',
	    path: '/persons',
	    config: {
	    	tags: ['api'],
	    	validate: {
		      payload: {
		        firstName: Joi.string().trim().min(3).max(100),
		        lastName: Joi.string().trim().min(3).max(100),        
		      }
		    },	
	      	handler: (request, reply) => {
		       	Person
	                .query()
	                .insert({firstName: request.payload.firstName,lastName: request.payload.lastName})
	                .then(function (jennifer) {
	                    console.log(jennifer instanceof Person); // --> true
	                    console.log(jennifer.firstName); // --> 'Jennifer'
	                    //console.log(jennifer.fullName()); // --> 'Jennifer Lawrence'
	                })
	                .catch(function (err) {
	                    console.log('oh noes');
	                    console.log(err);
	                })
	        }
	  	}
	},
	{
	    method: 'get',
	    path: '/persons',
	    config: {
	    	tags: ['api'],
	      	handler: (request, reply) => {
		       	Person
					.query()
				  	.then(function (people) {
				    	console.log(people[0] instanceof Person); // --> true
				    	console.log('there are', people.length, 'People in total');
				    	reply(people);
				  	})
				  	.catch(function (err) {
				    	var error = Boom.create(400, 'Bad request', { timestamp: Date.now() });
				  	});
				}
	  	}
	}
];