define([], function(){

	var config = {

		//name of the theme
		name 					: 'default',

		bodyClass				: ['body-class'],

		containerClasses		: ['main-container-class','one', 'two'],

		headerWrapperClasses  	: ['site-header'],

		contentWrapperClasses	: ['site-body'],

		footerWrapperClasses	: ['site-footer'],

		//css files
		cssFiles				: [ 'bootstrap.min.css',
									'flat-ui.css',
									'default.css'],

		//JS files
		jsFiles					: [ 'jquery.js',
									'bootstrap.min.js'],

		//theme elements
		elements				: {

									TitleElement 		: {


									},

									ImageElement		: {


									},

									BuilderRowColumn 	: {

										

									}

		}					


	};

	return config;

});