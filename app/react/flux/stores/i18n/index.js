module.exports = {
	languages: [{
		name: 'English',
		code: 'en'
	},
	{
		name: 'German',
		code: 'de'
	}],
	translations: {
		en: require('./en.js'),
		de: require('./de.js')
	}
};