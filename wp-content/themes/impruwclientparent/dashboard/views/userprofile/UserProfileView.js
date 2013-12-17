/**
 * The UserProfile View.
 * 
 */

define([ 'underscore', 'jquery', 'backbone',
		'text!templates/siteprofile/UserProfileViewTpl.tpl' ], function(_, $,
		Backbone, UserProfileViewTpl) {

	var UserProfileView = Backbone.View.extend({

		id : 'user-profile',

	/*	events : {
			'click #btn_savesitedetails'	: 'saveProfile',
			'click #add_another_email' 		: 'addAnotherEmailElement',
			'click .del_email'				: 'delEmailElement',
			'click #add_another_phone' 		: 'addAnotherPhoneElement',
			'click .del_phone' 				: 'delPhoneElement'
		},
*/
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
		 * Function to save site profile
		 */
		/*saveProfile : function(evt) {

			$(evt.target).next().show();
			
			var self = this;
			
			var formBusiness = this.$el.find('#form-siteprofile-business').serializeArray();
			
			var formSocial = this.$el.find('#form-siteprofile-social').serializeArray();
			
			 
			var data = { 'business'  : formBusiness,
						 'social'	 :  formSocial
							
						}; 
			$siteProfileSaveStatus = window.impruwSite.saveSiteProfile(data, {
																			success : self.saveProfileSuccess,
																			failure : self.saveProfileFailure
																		});
			
			$(event.target).next().hide();
 
			
		},
		
		saveProfileSuccess : function(response){
			//uipdate with message
			//console.log("save success")			
			//console.log(response);
			 $(event.target).offsetParent().find('#siteprofilesave_status').removeClass('has-error').addClass('has-success')
			 $(event.target).offsetParent().find('#siteprofilesave_status').show()
			 $('html, body').animate({
			        scrollTop: $(event.target).offsetParent().find('#siteprofilesave_status').offset().top
			    }, 2000);
		},
		
		saveProfileFailure : function(response){
			//console.log("Failed");
			$(event.target).offsetParent().find('#siteprofilesave_status').removeClass('has-success').addClass('has-error');
			$(event.target).offsetParent().find('#siteprofilesave_status').show();
			$('html, body').animate({
		        scrollTop: $(event.target).offsetParent().find('#siteprofilesave_status').offset().top
		    }, 2000);
		},*/

		 

		 
		 

	});

	return UserProfileView;

});