define([], function(){

	var config = {

		//name of the theme
		name 					: 'theme1',

		template 				: 'template1',

		containerClasses		: ['mainContainer','mainContainer1','one'],
        
        headerWrapperClasses    : [], 

		cssFiles				: [ 'bootstrap.min.css',
									'flat-ui.css',
									'theme1.css'],

		jsFiles					: [ 'jquery.js',
									'bootstrap.min.js']

	};

	return config;

});