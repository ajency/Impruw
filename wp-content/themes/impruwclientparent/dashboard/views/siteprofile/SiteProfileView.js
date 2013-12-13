/**
 * The SiteProfile View.
 * 
 */

define([ 'underscore', 'jquery', 'backbone',
		'text!templates/siteprofile/SiteProfileViewTpl.tpl' ], function(_, $,
		Backbone, SiteProfileViewTpl) {

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

			g = this.site;
			var template = _.template(SiteProfileViewTpl);

			var html = template({
				site : this.site
			});

			this.$el.html(html);

			return this;
		},

		/**
		 * Function to save site profile
		 */
		saveProfile : function(evt) {

			$(evt.target).next().show();
			
			var self = this;
			
			var formGeneral = this.$el.find('#cxfvxcvxc');
			var data = {};
			$siteProfileSaveStatus = window.impruwSite.saveSiteProfile(data, {
																			success : self.saveProfileSuccess,
																			failure : self.saveProfileFailure
																		});
			$('#siteprofilesubmitm_loader').hide()
			if($siteProfileSaveStatus){
				$("#siteprofilesave_status").removeClass('has-error').addClass('has-success')
				$("#siteprofilesave_status").show();
				$.scrollTo( '#siteprofilesave_status', 800, {easing:'elasout'} );
			}
			else{
				
				$("#siteprofilesave_status").removeClass('has-success').addClass('has-error')
				$("#siteprofilesave_status").show();
			  
				$('html, body').animate({
			        scrollTop: $("#siteprofilesave_status").offset().top
			    }, 2000);
			}
			
		},
		
		saveProfileSuccess : function(response){
			//uipdate with message
			console.log(response);
		},
		
		saveProfileFailure : function(response){
			console.log("Failed");
		},

		/**
		 * Function to add additional email element to site profile form
		 */
		addAnotherEmailElement : function() {

			$('.div_email:last').clone().find("input").val("").end().appendTo(
					'.div_email:last');
			$('.div_email:last').find(".del_email").show();

		},

		/**
		 * Function to delete additional email element from site profile form
		 */
		delEmailElement : function(el) {

			$(el.target).parent().remove();

		},

		/**
		 * Function to add additional phone element to site profile form
		 */
		addAnotherPhoneElement : function() {

			$('.div_phone:last').clone().find("input").val("").end().appendTo(
					'.div_phone:last');
			$('.div_phonel:last').find(".del_phone").show();

		},

		/**
		 * Function to delete additional phone element from site profile form
		 * 
		 * @param el
		 */
		delPhoneElement : function(el) {

			$(el.target).parent().remove();

		},

	});

	return SiteProfileView;

});