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
	}
];