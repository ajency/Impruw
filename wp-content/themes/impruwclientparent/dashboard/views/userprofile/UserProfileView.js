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
				console.log("-+-+_+_+_+_+_")
				console.log(args)
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
			console.log('====')
			console.log(this.user)

			this.$el.html(html);

			return this;
		},

		/**
		 * Function to save user profile
		 */
		saveUserProfileGeneral : function(evt) {
			
				console.log($(evt.target).next());
			
				$(evt.target).next().show();
			
				var self = this;
			
				var formGeneral = this.$el.find('#form_usergeneral').serializeArray();
			 
				var data = { 'general'  : formGeneral 	};
				
				$userProfileSaveStatus = window.impruwUser.saveUserProfile(data, {
																			success : self.saveProfileSuccess,
																			failure : self.saveProfileFailure
																		});
			 			
		},
		 
		saveProfileSuccess : function(response){
			$(event.target).next().hide(); 
			 $(event.target).offsetParent().find('#userprofilesave_status').removeClass('has-error').addClass('has-success')
			 $(event.target).offsetParent().find('#userprofilesave_status').show()
			 $('html, body').animate({
			        scrollTop: $(event.target).offsetParent().find('#userprofilesave_status').offset().top
			    }, 1000);
		},
		
		saveProfileFailure : function(response){
			//console.log("Failed");
			$(event.target).next().hide();
			$(event.target).offsetParent().find('#userprofilesave_status').removeClass('has-success').addClass('has-error');
			$(event.target).offsetParent().find('#userprofilesave_status').show();
			$('html, body').animate({
		        scrollTop: $(event.target).offsetParent().find('#userprofilesave_status').offset().top
		    }, 1000);
		}, 

		updateUserPassword:function(evt){
			
			console.log('update password ')
			
			$(evt.target).next().show();
		
			var self = this;
		
			var formPassData = this.$el.find('#form_userpass').serializeArray();
		 
			var data = { 'passData'  : formPassData 	};
			
			window.impruwUser.updateUserPassword(data, {	success : self.updatePassSuccess,
														failure : self.updatePassFailure
													});
			
		}
		
		

		 
		 

	});

	return UserProfileView;

});