/**
 * The main global file.
 * All required jquery plugins + other libraries are looaded througth 
 * this file.
 */
define(['underscore', 'jquery', 'backbone', 'moment', 'numerals', 'holder', 'cssFx', 'bootstrap', 'text', 'jqueryui', 
        'string', 'cookie', 'bootstrapselect','checkbox','radio'], 
		function(_ , $ , Backbone, moment, numerals, Holder, cssFx){

			var global = {};

			//attach underscore string
    		_.mixin(_.str.exports());

    		//attach moment object
    		global.moment = moment;

    		//attach numerals object
    		global.numerals = numerals;

            
            global.generateRandomId = function(){

                return global.randomFromInterval(1, 1e6);

            };

            global.randomFromInterval = function(e, t){

                return Math.floor(Math.random() * (t - e + 1) + e);
                
            };

            
    		return global;

		});