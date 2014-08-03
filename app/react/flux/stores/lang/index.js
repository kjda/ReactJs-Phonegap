module.exports = {
	languages: [{
		name: 'English',
		code: 'en'
	},
	{
		name: 'German',
		code: 'de'
	},
	{
		name: 'العربية',
		code: 'ar'
	}],

	defaultLocale: 'en',
	
	translations: {
		en: require('./en.js'),
		de: require('./de.js'),
		ar: require('./ar.js')
	}
	
};