/**
 * The Main Builder Router. 
 * This is the main router for the builder
 */
 
define(['underscore', 'jquery', 'backbone', 'global', 'builder/views/BuilderMainView'],
		function( _ , $, Backbone, global, BuilderMainView){

			var BuilderRouter = Backbone.Router.extend({

				initialize : function(){

				},

				routes : {
					'' : 'index'
				},

				index : function(){
					this.mainView = new BuilderMainView();	
					this.mainView.render();		
				}

			});	


			return BuilderRouter;

		});