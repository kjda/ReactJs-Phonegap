module.exports = {
	'': require('./pages/home'),
	'dashboard': require('./pages/home/dashboard'),
	'signup': require('./pages/signup'),
	'login': require('./pages/login'),
	'logout': require('./pages/logout'),
	'settings': require('./pages/settings'),
	'settings/language': require('./pages/settings/language'),
	'settings/photos': require('./pages/settings/photos'),
	'test1/:id': require('./pages/home/test1'),
	'test2/:id': require('./pages/home/test2')
};