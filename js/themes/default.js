define([], function(){

	var config = {

		//name of the theme
		name 					: 'default',

		bodyClass				: [],

		headerWrapperClasses  	: [],

		contentWrapperClasses	: [],

		footerWrapperClasses	: [],

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

										//content markup
										contentMarkup 	: '<h3></h3>',

										classes			: []

									},

									ImageElement		: {

										contentMarkup	: '<img src="" />',

									},

									BuilderRowColumn 	: {

										classes			: []

									}

		}					


	};

	return config;

});