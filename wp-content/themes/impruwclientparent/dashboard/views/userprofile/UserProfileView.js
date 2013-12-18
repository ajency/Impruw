/**
 * The UserProfile View.
 * 
 */

define([ 'underscore', 'jquery', 'backbone',
		'text!templates/siteprofile/UserProfileViewTpl.tpl' ], function(_, $,
		Backbone, UserProfileViewTpl) {

	var UserProfileView = Backbone.View.extend({

		id : 'user-profile',

	 events : {
			 	'click #btn_saveusergeneral'	: 'saveUserProfileGeneral',
			 	'click #btn_updatepassword'		: 'updateUserPassword',
		}, 

		initialize : function(args) {
			
		//	_.bindAll(this , 'saveProfileSuccess', 'saveProfileFailure');
				
				
			if(_.isUndefined(args.user))
				this.showInvalidCallView();
			
			this.user = args.user;

		},

		render : function() {

			var self = this;

			 
			var template = _.template(UserProfileViewTpl);

			var html = template({
				user : this.user
			});
			
			

			this.$el.html(html);
			
			this.$el.find('select').selectpicker();
			this.$el.find('input[type="checkbox"]').checkbox();

			return this;
		},

		/**
		 * Function to save user profile
		 */
		saveUserProfileGeneral : function(evt) {
			
				
			
				$(evt.target).next().show();
			
				var self = this;
			
				var formGeneral = this.$el.find('#form_usergeneral').serializeArray();
			 
				var data = { 'general'  : formGeneral 	};
				
				$userProfileSaveStatus = window.impruwUser.saveUserProfile(data, {
																			event : evt,
																			success : self.saveProfileSuccess,
																			failure : self.saveProfileFailure
																		});
			 			
		},
		 
		saveProfileSuccess : function(response,event){
			$(event.target).next().hide(); 
			 
			 $(event.target).offsetParent().offsetParent().offsetParent().find('#userprofilesave_status').removeClass('alert-error').addClass('alert-success');
			 $(event.target).offsetParent().offsetParent().offsetParent().find('#userprofilesave_status').html(response.msg);
			 $(event.target).offsetParent().offsetParent().offsetParent().find('#userprofilesave_status').show();
			 $('html, body').animate({
			        scrollTop: $(event.target).offsetParent().offsetParent().offsetParent().find('#userprofilesave_status').offset().top
			    }, 1000);
		},
		
		saveProfileFailure : function(response,event){
			 
			$(event.target).next().hide();
			$(event.target).offsetParent().offsetParent().offsetParent().find('#userprofilesave_status').removeClass('alert-success').addClass('alert-error');
			$(event.target).offsetParent().offsetParent().offsetParent().find('#userprofilesave_status').html(response.msg);
			$(event.target).offsetParent().offsetParent().offsetParent().find('#userprofilesave_status').show();
			
			$('html, body').animate({
		        scrollTop: $(event.target).offsetParent().offsetParent().offsetParent().find('#userprofilesave_status').offset().top
		    }, 1000);
		}, 

		updateUserPassword:function(evt){
			
			
			
			$(evt.target).next().show();
		
			var self = this;
		
			var formPassData = this.$el.find('#form_userpass').serializeArray();
		 
			var data = { 'passData'  : formPassData 	};
			
			window.impruwUser.updateUserPassword(data, {
														event:evt,
														success : self.updatePassSuccess,
														failure : self.updatePassFailure
													});
			
		},
		
		
		updatePassSuccess : function(response,event){
			
			$(event.target).next().hide(); 
			 $(event.target).offsetParent().offsetParent().offsetParent().find('#userprofilesave_status').removeClass('alert-error').addClass('alert-success');
			 $(event.target).offsetParent().offsetParent().offsetParent().find('#userprofilesave_status').html(response.msg);
			 $(event.target).offsetParent().offsetParent().offsetParent().find('#userprofilesave_status').show();
			 $('html, body').animate({
			        scrollTop: $(event.target).offsetParent().offsetParent().offsetParent().find('#userprofilesave_status').offset().top
			    }, 1000);
		},
		
		updatePassFailure : function(response,event){
			
			$(event.target).next().hide();
			
			
			
			$(event.target).offsetParent().offsetParent().offsetParent().find('#userprofilesave_status').removeClass('alert-success').addClass('alert-error');
			$(event.target).offsetParent().offsetParent().offsetParent().find('#userprofilesave_status').html(response.msg);
			$(event.target).offsetParent().offsetParent().offsetParent().find('#userprofilesave_status').show();
			
			$('html, body').animate({
		        scrollTop: $(event.target).offsetParent().offsetParent().offsetParent().find('#userprofilesave_status').offset().top
		    }, 1000);
			
			
			
		} 
		
		

		 
		 

	});

	return UserProfileView;

});