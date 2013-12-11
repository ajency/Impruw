/**
 * The Main Dashboard Router. 
 * This is the main router for the dashboard
 */
 
define(['underscore', 'jquery', 'backbone', 'mainview'],
		function( _ , $, Backbone, DashboardMainView){
			
			/**
			 * 
			 */
			var DashboardRouter = Backbone.Router.extend({

				initialize : function(){
					
					this.mainView = new DashboardMainView();	
				
				},

				routes : {
					''	 			: 'index',
					'site-profile' 	: 'siteProfile'
				},

				index : function(){
						
				},
				
				siteProfile : function(){
					var  self = this;
					setTimeout(function(){
						self.mainView.show('siteprofileview');
					},1500);	
				}
				
			});	


			return DashboardRouter;

		});