/**
 * The Main Builder Router. 
 * This is the main router for the builder
 */
 
define(['underscore', 'jquery', 'backbone', 'builder/views/BuilderMainView'],
		function( _ , $, Backbone, BuilderMainView){

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