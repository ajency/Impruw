/**
 * The Main Dashboard Router. 
 * This is the main router for the dashboard
 */
 
define(['underscore', 'jquery', 'backbone', 'mainview', 'bootstrapselect','checkbox','string', 'tpl','jqueryui'],
		function( _ , $, Backbone, DashboardMainView){


			//attach underscore string
        	_.mixin(_.str.exports());
			
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
					'add-room'		: 'addRoom',
					'room-list'		: 'roomList',
					'edit-room'		: 'editRoom',
					'support'		: 'support'
				},

				index : function(){
					this.mainView.show('dashboardview');
				},
				
				addRoom :function(){
					this.mainView.show('addroomview');
				},
				
				roomList :function(){	
					this.mainView.show('roomlistview');	
				},
				
				userProfile : function(){
				 	this.mainView.show('userprofileview');					
				},
				
				siteProfile : function(){
  					this.mainView.show('siteprofileview');
				},

				support : function(){
					this.mainView.show('supportview');
				},
				
				/**
				 * Adjust the right section height
				 * @return {[type]} [description]
				 */
				adjustRightColumnHeight: function(){
					
					$(".aj-imp-right").css('min-height',$('.aj-imp-left').height());
					
				}
				
			});	


			return DashboardRouter;

		});