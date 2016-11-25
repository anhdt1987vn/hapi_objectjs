var objection = require('objection');
var Person = require('../models/Person');


module.exports = [
	{
	    method: 'post',
	    path: '/persons',
	    config: {
	    	tags: ['api'],
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
			    	console.log('oh noes');
			  	});
			}
	  	}
	}
];