/**
 * The Main Dashboard Router. 
 * This is the main router for the dashboard
 */
 
define(['underscore', 'jquery', 'backbone', 'mainview', 'bootstrapselect','checkbox'],
		function( _ , $, Backbone, DashboardMainView){
			
			/**
			 * 
			 */
			var DashboardRouter = Backbone.Router.extend({

				initialize : function(){
					
					this.mainView = new DashboardMainView();	
					this.adjustRightColumnHeight();
				},

				routes : {
					''	 			: 'index',
					'site-profile' 	: 'siteProfile'
				},

				index : function(){
					
						
				},
				
				siteProfile : function(){
					
					var  self = this;
					
					window.impruwSite.getSiteProfile({
						success:function(){
								
							self.mainView.show('siteprofileview');
							
						},
						error:function(){
							console.log("Error fetching Site profile data")

						}
					});
					
				},
				
				adjustRightColumnHeight: function(){
					
					$(".aj-imp-right").css('min-height',$('.aj-imp-left').height());
					
				}
				
			});	


			return DashboardRouter;

		});