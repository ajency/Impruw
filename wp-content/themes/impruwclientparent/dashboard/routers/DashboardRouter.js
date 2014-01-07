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
					'site-profile' 	: 'siteProfile',
					'user-profile'	: 'userProfile',
					'add-room'		: 'addRoom'
				},

				index : function(){
					this.navigate('site-profile',{trigger : true});						
				},
				
				addRoom :function(){
					var self =this;
					self.mainView.show('addroomview');
					
				},
				
				userProfile : function(){
				 
					var self =this;
					window.impruwUser.getUserProfile({
						success : function() {
						 
							self.mainView.show('userprofileview');
							
						},
						error : function (){

							self.mainView.show('failed');
							
						}
					})
					
				},
				
				siteProfile : function(){
  
					var  self = this;
					
					window.impruwSite.getSiteProfile({
						success:function(){
								
							self.mainView.show('siteprofileview');
							
						},
						error:function(){
							console.log("Error fetching Site profile data");
							self.mainView.show('failed');
						}
					});
					
				},
				
				adjustRightColumnHeight: function(){
					
					$(".aj-imp-right").css('min-height',$('.aj-imp-left').height());
					
				}
				
			});	


			return DashboardRouter;

		});