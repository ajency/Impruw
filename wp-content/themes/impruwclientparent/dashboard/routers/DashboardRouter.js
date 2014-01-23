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
					'edit-room/:id'	: 'editRoom',
					'support'		: 'support'
				},

				index : function(){
					this.mainView.$el.find('#aj-imp-dash-menu').find('li').removeClass('active');
					this.mainView.$el.find('#aj-imp-dash-menu').find('.aj-imp-nav-dashboard').addClass('active');
					this.mainView.show('dashboardview');				
					
				},
				
				addRoom :function(){
					this.mainView.$el.find('#aj-imp-dash-menu').find('li').removeClass('active');
					this.mainView.$el.find('#aj-imp-dash-menu').find('.aj-imp-nav-booking').addClass('active');
					this.mainView.show('addroomview');
					
				},
				
				roomList :function(){
					this.mainView.$el.find('#aj-imp-dash-menu').find('li').removeClass('active');
					this.mainView.$el.find('#aj-imp-dash-menu').find('.aj-imp-nav-booking').addClass('active');
					this.mainView.show('roomlistview');	
					
				},
				
				editRoom :function(id){
					this.mainView.$el.find('#aj-imp-dash-menu').find('li').removeClass('active');
					this.mainView.$el.find('#aj-imp-dash-menu').find('.aj-imp-nav-booking').addClass('active');
					data_id  = {'roomId':id};					 
					this.mainView.show('addroomview',data_id);
					
				},
				
				userProfile : function(){
					this.mainView.$el.find('#aj-imp-dash-menu').find('li').removeClass('active');
					this.mainView.$el.find('#aj-imp-dash-menu').find('.aj-imp-nav-marketing').addClass('active');
				 	this.mainView.show('userprofileview');	
				 	
				},
				
				siteProfile : function(){
					this.mainView.$el.find('#aj-imp-dash-menu').find('li').removeClass('active');
					this.mainView.$el.find('#aj-imp-dash-menu').find('.aj-imp-nav-profile').addClass('active');
  					this.mainView.show('siteprofileview');
  					
				},

				support : function(){
					this.mainView.$el.find('#aj-imp-dash-menu').find('li').removeClass('active');
					this.mainView.$el.find('#aj-imp-dash-menu').find('.aj-imp-nav-support').addClass('active');
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