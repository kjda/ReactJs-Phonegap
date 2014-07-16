var MG = require('mongoose');
var UserModel = MG.model('User');

module.exports = {
	injectRoutes: function(app){
		
		app.get('/api/user/login', user);
		app.get('/api/user/signup', user);
		app.get('/api/user/search', search);

		app.get('/api/user/:id', user);
	}
};

function getUserObject(id){
	return {
		_id: 1,
		username: 'Username ' + id,
		email: 'email' + id + '@example.com',
		name: 'Max' + id + ' Muster',
		picutre: '//localhost:3000/' + id + '/picture' ,
		lat: 48.72,
		lon: 9.22
	};
}

function user(req, res){
	var id = 1;
	res.jsonp({
		success: 1,
		error: '',
		data: {
			sid: 1,
			user: getUserObject(id)
		}
	});
}


function search(req, res){
	var limit = 10;
	var offset = +req.param('offset') || 0;
	var users = [];
	for(var i=0; i < limit; i++ ){
		var id = '10' + (i + offset);
		users.push(getUserObject(id));
	}
	var hasMore = 1;
	res.jsonp({
		success: 1,
		error: null,
		data: {
			offset: (offset+limit),
			hasMore: hasMore,
			users: users
		}
	});	
}