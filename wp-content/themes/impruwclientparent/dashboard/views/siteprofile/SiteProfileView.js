/**
 * The SiteProfile View.
 * 
 */

define([ 'underscore', 'jquery', 'backbone', 
		'text!templates/siteprofile/SiteProfileViewTpl.tpl',
		'lib/parsley/parsley' ], 
		function(_, $, Backbone, SiteProfileViewTpl,parsley) {

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
			
			_.bindAll(this , 'saveProfileSuccess', 'saveProfileFailure','parsleyInitialize');
			
				
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
			
			
			this.parsleyInitialize(this.$el.find('#form-siteprofile-business'));
			this.parsleyInitialize(this.$el.find('#form-siteprofile-social'));

			return this;
		},

		/**
		 * Function to save site profile
		 */
		saveProfile : function(evt) {
			
			if (this.$el.find('#form-siteprofile-business').parsley('validate')){

				if (this.$el.find('#form-siteprofile-social').parsley('validate')){
					$(evt.target).next().show();
					
					var self = this;
					
					var formBusiness = this.$el.find('#form-siteprofile-business').serializeArray();
					
					var formSocial = this.$el.find('#form-siteprofile-social').serializeArray();
					
					var data = 	{ 
									'business'  : formBusiness,
								 	'social'	: formSocial
								};
		
					$siteProfileSaveStatus = window.impruwSite.saveSiteProfile(data, {
																					event : evt,
																					success : self.saveProfileSuccess,
																					failure : self.saveProfileFailure
																				});					
					$(event.target).next().hide();
				}
			}
 
			
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

		},
		
		
		/**
		 * Function to initialize parsley validation for a form
		 * @param formelement
		 */
		
		parsleyInitialize : function(formelement){
			
		 	
			formelement.parsley({
	    		errors: {
	    			
	    			errorsWrapper: '<span class="help-block" style="display:block"></span>',
	    	    	  
	    	    	errorElem: '<span style="display:block"></span>',
	    	    	
	    		    container: function (element) {
		    		    		var $container = element.parent().parent().find(".p-messages");
		    		    		if ($container.length === 0) {
		    	                   $container = $("<div class='p-messages'></div>").insertAfter(element);
		    		    		}
		    		    		return $container;
	    		    },
	    		   
	    		},
	            listeners: {
	               onFieldSuccess: function ( elem, constraints, ParsleyField ) {  
	                  elem.parent().parent().removeClass("has-error").addClass("has-success");
	                  elem.parent().parent().find('.fui-check-inverted,.fui-cross-inverted').remove();
	                  elem.after('<span class="validation-icon input-icon fui-check-inverted"></span>') 
	               } ,
	               
	               onFieldError: function ( elem, constraints, ParsleyField ) {  
	                   elem.parent().parent().removeClass("has-success").addClass("has-error");
	                   console.log(elem)
	                   elem.parent().parent().find('.fui-check-inverted,.fui-cross-inverted').remove();
	                   elem.after('<span class="validation-icon input-icon fui-cross-inverted"></span>') 
	                }  
	           }
			});
			
		}
		
		

	});

	return SiteProfileView;

});