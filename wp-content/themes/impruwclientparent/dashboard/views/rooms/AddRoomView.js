/**
 * The UserProfile View.
 * 
 */

define([ 'underscore', 'jquery', 'backbone',
		'text!templates/siteprofile/AddRoomViewTpl.tpl','lib/parsley/parsley' ], function(_, $,
		Backbone, AddRoomViewTpl,parsley) {

	var UserProfileView = Backbone.View.extend({

		id : 'add-room',

	 events : {
			 	'click #btn_saveroom'	: 'saveRoom', 
			 	
		}, 

		initialize : function(args) {
			
			//	_.bindAll(this , 'saveProfileSuccess', 'saveProfileFailure');
			//_.bindAll(this , 'showAlertMessage','parsleyInitialize' ); 
			/*if(_.isUndefined(args.user))
				this.showInvalidCallView();
			
			this.user = args.user;*/

		},

		render : function() {

			var self = this; 
			
			var template = _.template(AddRoomViewTpl);

			var html = template(); 

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
		saveRoom : function(evt) {
			
			  if (this.$el.find('#form_addroom').parsley('validate')){
				  
				  /*	$(evt.target).next().show();
					
					var self = this;
				
					var formGeneral = this.$el.find('#form_addroom').serializeArray();
				 
					var data = { 'general'  : formGeneral 	};
					
					$addRoomStatus = window.impruwUser.saveUserProfile(data, {
																				event : evt,
																				_self:self,
																				success : self.saveProfileSuccess,
																				failure : self.saveProfileFailure
																			});*/
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