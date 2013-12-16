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
					this.adjustRightColumnHeight();
				},

				routes : {
					''	 			: 'index',
					'site-profile' 	: 'siteProfile'
				},

				index : function(){
					
						
				},
				
				siteProfile : function(){
					console.log('show site profile....')
					//this.adjustRightColumnHeight();
					
					var  self = this;
					
					window.impruwSite.getSiteProfile({
						success:function(){
							
							self.mainView.show('siteprofileview');
						},
						error:function(){
							console.log("Error fetching Site profile data")
						}
					});
					
					
					
					/*setTimeout(function(){
						self.mainView.show('siteprofileview');
						$(".aj-imp-right").removeClass('aj-imp-loader');
					},1500);*/	
				},
				
				adjustRightColumnHeight: function(){
					
					$(".aj-imp-right").css('min-height',$('.aj-imp-left').height());
					
				}
				
			});	


			return DashboardRouter;

		});