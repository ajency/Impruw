/**
 * The UserProfile View.
 * 
 */

define([ 'underscore', 'jquery', 'backbone',
		'text!templates/siteprofile/UserProfileViewTpl.tpl','lib/parsley/parsley' ], function(_, $,
		Backbone, UserProfileViewTpl,parsley) {

	var UserProfileView = Backbone.View.extend({

		id : 'user-profile',

	 events : {
			 	'click #btn_saveusergeneral'	: 'saveUserProfileGeneral',
			 	'click #btn_updatepassword'		: 'updateUserPassword',
		}, 

		initialize : function(args) {
			
		//	_.bindAll(this , 'saveProfileSuccess', 'saveProfileFailure');
				_.bindAll(this , 'showAlertMessage','parsleyInitialize' );
				
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

			
			this.parsleyInitialize(this.$el.find('#form_usergeneral'));
			this.parsleyInitialize(this.$el.find('#form_userpass'));
			 
			
			return this;
		},

		/**
		 * Function to save user profile
		 */
		saveUserProfileGeneral : function(evt) {
			
			  if (this.$el.find('#form_usergeneral').parsley('validate')){
				  
				  	$(evt.target).next().show();
					
					var self = this;
				
					var formGeneral = this.$el.find('#form_usergeneral').serializeArray();
				 
					var data = { 'general'  : formGeneral 	};
					
					$userProfileSaveStatus = window.impruwUser.saveUserProfile(data, {
																				event : evt,
																				_self:self,
																				success : self.saveProfileSuccess,
																				failure : self.saveProfileFailure
																			});
			  }
			 			
		},
		 
		saveProfileSuccess : function(response,event,_self){
			$(event.target).next().hide(); 
			 
			 $(event.target).offsetParent().offsetParent().offsetParent()
			 				.find('#userprofilesave_status').removeClass('alert-error').addClass('alert-success');
			 console.log(_self);
			 _self.showAlertMessage(event,response);
			/* $(event.target).offsetParent().offsetParent().offsetParent().find('#userprofilesave_status').html(response.msg);
			 $(event.target).offsetParent().offsetParent().offsetParent().find('#userprofilesave_status').show();
			 $('html, body').animate({
			        scrollTop: $(event.target).offsetParent().offsetParent().offsetParent().find('#userprofilesave_status').offset().top
			    }, 1000);*/
			 
		},
		
		saveProfileFailure : function(response,event,_self){
			 
			$(event.target).next().hide();
			$(event.target).offsetParent().offsetParent().offsetParent()
							.find('#userprofilesave_status').removeClass('alert-success').addClass('alert-error');
			
			_self.showAlertMessage(event,response);
			/*$(event.target).offsetParent().offsetParent().offsetParent().find('#userprofilesave_status').html(response.msg);
			$(event.target).offsetParent().offsetParent().offsetParent().find('#userprofilesave_status').show();
			
			$('html, body').animate({
		        scrollTop: $(event.target).offsetParent().offsetParent().offsetParent().find('#userprofilesave_status').offset().top
		    }, 1000);*/
			
		}, 

		updateUserPassword:function(evt){
			
			 if (this.$el.find('#form_userpass').parsley('validate')){
			
					$(evt.target).next().show();
				
					var self = this;
				
					var formPassData = this.$el.find('#form_userpass').serializeArray();
				 
					var data = { 'passData'  : formPassData 	};
					
					window.impruwUser.updateUserPassword(data, {
																event:evt,
																_self:self,
																success : self.updatePassSuccess,
																failure : self.updatePassFailure
															});
			 }
			
		},
		
		
		/**
		 * 
		 * @param response
		 * @param event
		 */
		updatePassSuccess : function(response,event,_self){
			
			$(event.target).next().hide(); 
			$(event.target).offsetParent().offsetParent().offsetParent()
							.find('#userprofilesave_status').removeClass('alert-error').addClass('alert-success');
			_self.showAlertMessage(event,response);
		},
		
		updatePassFailure : function(response,event,_self){
			
			$(event.target).next().hide();			
			$(event.target).offsetParent().offsetParent().offsetParent()
							.find('#userprofilesave_status').removeClass('alert-success').addClass('alert-error');
			_self.showAlertMessage(event,response);
			
		}, 
		
		
		showAlertMessage : function(event,response){
			
			$(event.target).offsetParent().offsetParent().offsetParent()
							.find('#userprofilesave_status').html(response.msg);
			$(event.target).offsetParent().offsetParent().offsetParent()
							.find('#userprofilesave_status').show();
			
			$('html, body').animate({
		        scrollTop: $(event.target).offsetParent().offsetParent().offsetParent()
		        						   .find('#userprofilesave_status').offset().top
		    }, 1000);
		},
		
		
		
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
	                  //#patch in chrome as style was not getting applied to error label
	                  $('<style></style>').appendTo($(document.body)).remove();

	               } ,
	               
	               onFieldError: function ( elem, constraints, ParsleyField ) {  
	                   elem.parent().parent().removeClass("has-success").addClass("has-error");
	                   console.log(elem)
	                   elem.parent().find('.fui-check-inverted,.fui-cross-inverted').remove();
	                   elem.after('<span class="validation-icon input-icon fui-cross-inverted"></span>')
	                   //#patch in chrome as style was not getting applied to error label
	                   $('<style></style>').appendTo($(document.body)).remove(); 
	                }  
	           }
			});
			
		}
		
		

		 
		 

	});

	return UserProfileView;

});