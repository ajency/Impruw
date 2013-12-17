/**
 * The SiteProfile View.
 * 
 */

define([ 'underscore', 'jquery', 'backbone', 
		'text!templates/siteprofile/SiteProfileViewTpl.tpl' ], 
		function(_, $, Backbone, SiteProfileViewTpl) {

	var SiteProfileView = Backbone.View.extend({

		id : 'site-profile',

		events : {
			'click #btn_savesitedetails'	: 'saveProfile',
			'click #add_another_email' 		: 'addAnotherEmailElement',
			'click .del_email'				: 'delEmailElement',
			'click #add_another_phone' 		: 'addAnotherPhoneElement',
			'click .del_phone' 				: 'delPhoneElement'
		},

		initialize : function(args) {
			
			_.bindAll(this , 'saveProfileSuccess', 'saveProfileFailure');
				
			if(_.isUndefined(args.site))
				this.showInvalidCallView();
			
			this.site = args.site;

		},

		render : function() {

			var self = this;

			//g = this.site;
			var template = _.template(SiteProfileViewTpl);

			var html = template({
				site : this.site
			});

			this.$el.html(html);

			//set custom selectbox
			this.$el.find('select').selectpicker();
			this.$el.find('input[type="checkbox"]').checkbox();

			return this;
		},

		/**
		 * Function to save site profile
		 */
		saveProfile : function(evt) {

			$(evt.target).next().show();
			
			var self = this;
			
			var formBusiness = this.$el.find('#form-siteprofile-business').serializeArray();
			
			var formSocial = this.$el.find('#form-siteprofile-social').serializeArray();
			
			var data = 	{ 
							'business'  : formBusiness,
						 	'social'	: formSocial
						};

			$siteProfileSaveStatus = window.impruwSite.saveSiteProfile(data, {
																			success : self.saveProfileSuccess,
																			failure : self.saveProfileFailure
																		});
			
			$(event.target).next().hide();
 
			
		},
		
		saveProfileSuccess : function(response){
  
			 $(event.target).offsetParent().find('#siteprofilesave_status').removeClass('has-error').addClass('has-success')
			 
			 $(event.target).offsetParent().find('#siteprofilesave_status').show()
			 
			 $('html, body').animate({
			        scrollTop: $(event.target).offsetParent().find('#siteprofilesave_status').offset().top
			    }, 1000);
			 
		},
		
		saveProfileFailure : function(response){
			
			$(event.target).offsetParent().find('#siteprofilesave_status').removeClass('has-success').addClass('has-error');
			
			$(event.target).offsetParent().find('#siteprofilesave_status').show();
			
			$('html, body').animate({
		        scrollTop: $(event.target).offsetParent().find('#siteprofilesave_status').offset().top
		    }, 1000);
			
		},

		/**
		 * Function to add additional email element to site profile form
		 */
		addAnotherEmailElement : function(e) {
 

			e.preventDefault();
			
			this.$el.find('.div_email:last').clone().find("input").val("").end().appendTo('.div_email:last');
			this.$el.find('.div_email:last').find(".del_email").show();
 

		},

		/**
		 * Function to delete additional email element from site profile form
		 */
		delEmailElement : function(el) {

			el.preventDefault();

			$(el.target).parent().remove();

		},

		/**
		 * Function to add additional phone element to site profile form
		 */
		addAnotherPhoneElement : function(e) {
			
			e.preventDefault();

			this.$el.find('.div_phone:last').clone().find("input").val("").end().appendTo('.div_phone:last');
			this.$el.find('.div_phonel:last').find(".del_phone").show();

		},

		/**
		 * Function to delete additional phone element from site profile form
		 * 
		 * @param el
		 */
		delPhoneElement : function(el) {
			el.preventDefault();
			$(el.target).parent().remove();

		}

	});

	return SiteProfileView;

});