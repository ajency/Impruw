/**
 * The UserProfile View.
 * 
 */

define([ 'underscore', 'jquery', 'backbone','roommodel',
		'text!templates/siteprofile/AddRoomViewTpl.tpl','lib/parsley/parsley' ], function(_, $,
		Backbone, RoomModel, AddRoomViewTpl,parsley) {

	var UserProfileView = Backbone.View.extend({

		id : 'add-room',

	 events : {
			 	'click #btn_saveroom'	: 'saveRoom', 
			 	'click #btn_addfacility'	: 'addFacility', 
		}, 

		initialize : function(args) {
			
			//	_.bindAll(this , 'saveRoomSuccess', 'saveRoomFailure');
			//_.bindAll(this , 'showAlertMessage','parsleyInitialize' ); 
			/*if(_.isUndefined(args.user))
				this.showInvalidCallView();
			
			this.user = args.user;*/
			

		},

		render : function(allFacilities) {

			var self = this; 
		    self.fetchAllFacilities();
			
		},

		/*
		 * 
		 */
		renderTemplate:function(){
			var template = _.template(AddRoomViewTpl);			 
			var html = template({
				facilities : this.allFacilities
			}); 

			this.$el.html(html);
			
			//set custom selectbox & checkbox
			this.$el.find('select').selectpicker();
			this.$el.find('input[type="checkbox"]').checkbox();
			
			//initialize parsley validation for the forms
			this.parsleyInitialize(this.$el.find('#frm_addroom'));
			this.parsleyInitialize(this.$el.find('#frm_roomdesc'));			 
			this.parsleyInitialize(this.$el.find('#form_addfacility'));	
			//this.parsleyInitialize(this.$el.find('#frm_newfacility'));	
			return this;
			
		},
		
		
		
		/**
		 * Function to fetch all room facilities
		 */
		fetchAllFacilities : function(){
			
			var self_ = this;
						
			var data = {action:'fetch_all_room_facilities'}
			var allFacilities = ''
			$.post(	AJAXURL,
					data,
					function(response){
				
						if(response.code=='OK'){
						
						 	self_.allFacilities  = response.data;
							
							self_.renderTemplate()
							
							if(!_.isUndefined(self_.success) && _.isFunction(self_.success))
								self_.success(response,self_.event,self_);  
						}
						else{
							//console.log(response)
							 
							 if(!_.isUndefined(self_.failure) && _.isFunction(self_.failure))
								 self_.failure(response,self_.event,self_);  
						}
				
					});	
			 
			
			},
			
		 
		
		/**
		 * Function to save user profile
		 * @param evt
		 */
		saveRoom : function(evt) {
			
			  if (this.$el.find('#frm_addroom').parsley('validate')){
				  
				  if (this.$el.find('#frm_roomdesc').parsley('validate')){
					  
					  roomcategory 		= $("#roomcategory").val();
					  roomnos 			= $("#roomnos").val();
					  roomdescription 	= $("#roomdescription").val();
					  
					  var facilityValues = new Array();
					  
				       //Read checked facillities
					   $.each($("input[name='facility[]']:checked"),
				       function () {
				    	   			facilityValues.push($(this).val());
				       });
				    
				       facilityValues.join (", ");
				
					  
					  var room = new RoomModel({ category		:roomcategory, 
						  						 nos			:roomnos,
						  						 description 	:roomdescription,
						  						 facilities		:facilityValues  }  );
					  room.saveRoom();
				  }
				  
				  /*	$(evt.target).next().show();
					
					var self = this;
				
					var formGeneral = this.$el.find('#form_addroom').serializeArray();
				 
					var data = { 'general'  : formGeneral 	};
					
					$addRoomStatus = window.impruwUser.saveUserProfile(data, {
																				event : evt,
																				_self:self,
																				success : self.saveRoomSuccess,
																				failure : self.saveRoomFailure
																			});*/
			  }
			 			
		},
		
		
		/**
		 * Add new facility
		 */
		addFacility :function(evt){
			var self_ = this;
		 
			  if (this.$el.find('#form_addfacility').parsley('validate')){
				  
				  $(evt.target).next().show();
				  
				  var data = {	  action		:'save_new_room_facility',
						  	  new_facility	:$('#new_facilityname').val()	
						  };
				  
					 
					$.post(	AJAXURL,
							data,
							function(response){
								console.log(response)
						
								if(response.code=='OK'){
									 
									self_.saveRoomSuccess(response,evt,self_);  
								}
								else{
									 self_.saveRoomFailure(response,evt,self_);  
								}
						
							});	
				  
				  
			  }
			
		},
		 
		
		/**
		 * Function to show message after success of save profile
		 * @param response
		 * @param event
		 * @param _self
		 */
		saveRoomSuccess : function(response,event,_self){
			$(event.target).next().hide(); 
			 
			 $(event.target).offsetParent().offsetParent().offsetParent()
			 				.find('#roomsave_status').removeClass('alert-error').addClass('alert-success');
			 
			 _self.showAlertMessage(event,response);			 
			 
		},
		
		/**
		 * Function to show message after failure of saveprofile
		 * @param response
		 * @param event
		 * @param _self
		 */
		saveRoomFailure : function(response,event,_self){
			 
			$(event.target).next().hide();
			$(event.target).offsetParent().offsetParent().offsetParent()
							.find('#roomsave_status').removeClass('alert-success').addClass('alert-error');
			
			_self.showAlertMessage(event,response);			 
			
		}, 
		
		
		/**
		 * Function to show status message on success/failure
		 * 
		 * @param event
		 * @param response
		 */		
		showAlertMessage : function(event,response){
			
			console.log(event)
			console.log($(event.target.form).offsetParent())
			/*$(event.target).form().offsetParent()
							.find('#roomsave_status').html(response.msg);
			$(event.target).form().offsetParent()
							.find('#roomsave_status').show();
			
			/* Move to top at status message after success/failure * /
			$('html, body').animate({
		        scrollTop: $(event.target).form().offsetParent()
		        						   .find('#roomsave_status').offset().top
		    }, 1000);*/
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