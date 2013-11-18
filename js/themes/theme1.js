define([], function(){

	var config = {

		//name of the theme
		name 					: 'theme 1',

		bodyClass				: ['mainContainer'],

		headerWrapperClasses  	: ['topStrip'],

		contentWrapperClasses	: ['content'],

		footerWrapperClasses	: ['footer'],

		cssFiles				: [ 'bootstrap.min.css',
									'flat-ui.css',
									'theme1.css'],

		jsFiles					: [ 'jquery.js',
									'bootstrap.min.js'],

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

									},

									BuilderRow 			: {

										classes 		: []

									}

		}					


	};

	return config;

});