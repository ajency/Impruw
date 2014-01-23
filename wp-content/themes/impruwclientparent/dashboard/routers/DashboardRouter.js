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
					this.mainView.show('dashboardview');
					
					console.log(this.mainView.$el.find('#aj-imp-dash-menu').html())
					this.mainView.$el.find('#aj-imp-dash-menu').find('li').removeClass('active');
					this.mainView.$el.find('#aj-imp-dash-menu').find('.aj-imp-nav-dashboard').addClass('active');
					
				},
				
				addRoom :function(){
					this.mainView.show('addroomview');
					this.mainView.$el.find('#aj-imp-dash-menu').find('li').removeClass('active');
					this.mainView.$el.find('#aj-imp-dash-menu').find('.aj-imp-nav-booking').addClass('active');
				},
				
				roomList :function(){	
					this.mainView.show('roomlistview');	
					this.mainView.$el.find('#aj-imp-dash-menu').find('li').removeClass('active');
					this.mainView.$el.find('#aj-imp-dash-menu').find('.aj-imp-nav-booking').addClass('active');
				},
				
				editRoom :function(id){
					data_id  = {'roomId':id};
					 
					this.mainView.show('addroomview',data_id);
					this.mainView.$el.find('#aj-imp-dash-menu').find('li').removeClass('active');
					this.mainView.$el.find('#aj-imp-dash-menu').find('.aj-imp-nav-booking').addClass('active');
				},
				
				userProfile : function(){
				 	this.mainView.show('userprofileview');	
				 	this.mainView.$el.find('#aj-imp-dash-menu').find('li').removeClass('active');
					this.mainView.$el.find('#aj-imp-dash-menu').find('.aj-imp-nav-marketing').addClass('active');
				},
				
				siteProfile : function(){
  					this.mainView.show('siteprofileview');
  					this.mainView.$el.find('#aj-imp-dash-menu').find('li').removeClass('active');
					this.mainView.$el.find('#aj-imp-dash-menu').find('.aj-imp-nav-profile').addClass('active');
				},

				support : function(){
					this.mainView.show('supportview');
					this.mainView.$el.find('#aj-imp-dash-menu').find('li').removeClass('active');
					this.mainView.$el.find('#aj-imp-dash-menu').find('.aj-imp-nav-support').addClass('active');
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