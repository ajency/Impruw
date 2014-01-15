/**
 * The UserProfile View.
 * 
 */

define([ 'underscore', 'jquery', 'backbone',
		'text!templates/siteprofile/UserProfileViewTpl.tpl','parsley' ], function(_, $,
		Backbone, UserProfileViewTpl,parsley) {

	var UserProfileView = Backbone.View.extend({

		id : 'user-profile',

	 events : {
			 	'click #btn_saveusergeneral'	: 'saveUserProfileGeneral',
			 	'click #btn_updatepassword'		: 'updateUserPassword'
		}, 

		initialize : function(args) {
			//console.log(args)
			//	_.bindAll(this , 'saveProfileSuccess', 'saveProfileFailure');
			_.bindAll(this , 'showAlertMessage','parsleyInitialize' );
				
			if(_.isUndefined(getAppInstance().impruwUser))
				this.showInvalidCallView();
			
			this.user = getAppInstance().impruwUser;

		},

		render : function() {

			var self = this; 
			
			var template = _.template(UserProfileViewTpl);

			var html = template({
				user : this.user
			}); 

			this.$el.html(html);
			
			//set custom selectbox & checkbox
			this.$el.find('select').selectpicker();
			this.$el.find('input[type="checkbox"]').checkbox();
			
			//initialize parsley validation for the forms
			this.parsleyInitialize(this.$el.find('#form_usergeneral'));
			this.parsleyInitialize(this.$el.find('#form_userpass'));			 
			
			return this;
		},

		
		/**
		 * Function to save user profile
		 * @param evt
		 */
		saveUserProfileGeneral : function(evt) {
			
			  if (this.$el.find('#form_usergeneral').parsley('validate')){
				  
				  	$(evt.target).next().show();
					
					var self = this;
				
					var formGeneral = this.$el.find('#form_usergeneral').serializeArray();
				 
					var data = { 'general'  : formGeneral 	};
					
					$userProfileSaveStatus = getAppInstance().impruwUser.saveUserProfile(data, {
																				event : evt,
																				_self:self,
																				success : self.saveProfileSuccess,
																				failure : self.saveProfileFailure
																			});
			  }
			 			
		},
		 
		
		/**
		 * Function to show message after success of save profile
		 * @param response
		 * @param event
		 * @param _self
		 */
		saveProfileSuccess : function(response,event,_self){
			$(event.target).next().hide(); 
			 
			 $(event.target).offsetParent().offsetParent().offsetParent()
			 				.find('#userprofilesave_status').removeClass('alert-error').addClass('alert-success');
			 
			 _self.showAlertMessage(event,response);
			 ImpruwDashboard.vent.trigger("user-profile-updated",response);;
			 
		},
		
		/**
		 * Function to show message after failure of saveprofile
		 * @param response
		 * @param event
		 * @param _self
		 */
		saveProfileFailure : function(response,event,_self){
			 
			$(event.target).next().hide();
			$(event.target).offsetParent().offsetParent().offsetParent()
							.find('#userprofilesave_status').removeClass('alert-success').addClass('alert-error');
			
			_self.showAlertMessage(event,response);			 
			
		}, 

		/**
		 * Function to update user password
		 * @param evt
		 */
		updateUserPassword:function(evt){
			
			 if (this.$el.find('#form_userpass').parsley('validate')){
			
					$(evt.target).next().show();
				
					var self = this;
				
					var formPassData = this.$el.find('#form_userpass').serializeArray();
				 
					var data = { 'passData'  : formPassData 	};
					
					getAppInstance().impruwUser.updateUserPassword(data, {
																event:evt,
																_self:self,
																success : self.updatePassSuccess,
																failure : self.updatePassFailure
															});
			 }
			
		},
		
		
		/**
		 * Function to show success message after password update success
		 * @param response
		 * @param event
		 * @param _self
		 */
		updatePassSuccess : function(response,event,_self){
			
			$(event.target).next().hide(); 
			$(event.target).offsetParent().offsetParent().offsetParent()
							.find('#userprofilesave_status').removeClass('alert-error').addClass('alert-success');
			_self.showAlertMessage(event,response);
		},
		
		/**
		 * Function to show failure message after password update failure
		 * @param response
		 * @param event
		 * @param _self
		 */
		updatePassFailure : function(response,event,_self){
			
			$(event.target).next().hide();			
			$(event.target).offsetParent().offsetParent().offsetParent()
							.find('#userprofilesave_status').removeClass('alert-success').addClass('alert-error');
			_self.showAlertMessage(event,response);
			
		}, 
		
		
		/**
		 * Function to show status message on success/failure
		 * 
		 * @param event
		 * @param response
		 */		
		showAlertMessage : function(event,response){
			
			$(event.target).offsetParent().offsetParent().offsetParent()
							.find('#userprofilesave_status').html(response.msg);
			$(event.target).offsetParent().offsetParent().offsetParent()
							.find('#userprofilesave_status').show();
			
			/* Move to top at status message after success/failure */
			$('html, body').animate({
		        scrollTop: $(event.target).offsetParent().offsetParent().offsetParent()
		        						   .find('#userprofilesave_status').offset().top
		    }, 1000);
		},
		
		
		/**
		 *  Function to initialize parsley validation for form
		 * @param formelement
		 */
		parsleyInitialize : function(formelement){			
		 	
			formelement.parsley({
	    		errors: {
	    			
	    			errorsWrapper: '<span class="help-block" style="display:block"></span>',
	    	    	  
	    	    	errorElem: '<span style="display:block"></span>',
	    	    	
	    		    container: function (element) {
		    		    		var $container = element.parent().find(".p-messages");
		    		    		if ($container.length === 0) {
		    	                   $container = $("<div class='p-messages'></div>").insertAfter(element);
		    		    		}
		    		    		return $container;
	    		    },
	    		   
	    		},
	            listeners: {
	               onFieldSuccess: function ( elem, constraints, ParsleyField ) {  
	                  elem.parent().parent().removeClass("has-error").addClass("has-success");
	                  elem.parent().find('.fui-check-inverted,.fui-cross-inverted').remove();
	                  elem.after('<span class="validation-icon input-icon fui-check-inverted"></span>') 
	                  //#patch in chrome as style change effect was not visible for error label
	                  $('<style></style>').appendTo($(document.body)).remove();

	               } ,
	               
	               onFieldError: function ( elem, constraints, ParsleyField ) {  
	                   elem.parent().parent().removeClass("has-success").addClass("has-error");
	                  
	                   elem.parent().find('.fui-check-inverted,.fui-cross-inverted').remove();
	                   elem.after('<span class="validation-icon input-icon fui-cross-inverted"></span>')
	                   //#patch in chrome as style change effect was not visible for error label
	                   $('<style></style>').appendTo($(document.body)).remove(); 
	                }  
	           }
			});
			
		}	
		 

	});

	return UserProfileView;

});