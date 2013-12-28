/**
 * The AddRoom View.
 * 
 */

define([ 'underscore', 'jquery', 'backbone','roommodel',
		'text!templates/siteprofile/AddRoomViewTpl.tpl','lib/parsley/parsley' ], function(_, $,
		Backbone, RoomModel, AddRoomViewTpl,parsley) {

	var AddRoomView = Backbone.View.extend({

		id : 'add-room',

	 events : {
			 	'click #btn_saveroom'		: 'saveRoom', 
			 	'click #btn_addfacility'	: 'addFacility',
			 	'click .delete'				: 'deleteFacility',
			 	'click .edit'				: 'editFacility',
			 	'click .savefacililty' 		: 'savefacility' 
		}, 

		initialize : function(args) {
			
			//	_.bindAll(this , 'saveSuccess', 'saveFailure');
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
							 
							 if(!_.isUndefined(self_.failure) && _.isFunction(self_.failure))
								 self_.failure(response,self_.event,self_);  
						}
				
					});	
			 
			
			},
			
		 
		
		/**
		 * Function to save room
		 * @param evt
		 */
		saveRoom : function(evt) {
			
			var self = this;
			
			  if (!this.$el.find('#frm_addroom').parsley('validate'))
				  return
				  
			  if (!this.$el.find('#frm_roomdesc').parsley('validate'))
				  return
			 $(evt.target).prop('disabled',true)
			 $(evt.target).next().show();	  
					  
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
					  
			  var room = new RoomModel();
			  
			  
			  var data = { 
					  	 	'category'		:roomcategory, 
					  	 	'nos'			:roomnos,
					  	 	'description' 	:roomdescription,
					  	 	'facilities'	:facilityValues 
					};
			  
			  room.saveRoom(data, {
					event : evt,
					_self:self,
					success : self.saveSuccess,
					failure : self.saveFailure
				});
			  
			     
				  
				  /*	$(evt.target).next().show();
					
					var self = this;*/
				
					
			 			
		},
		
		
		/**
		 * Add new facility
		 */
		addFacility :function(evt){
			var self_ = this;
			
			var evt_ = evt;
		 
			  if (!this.$el.find('#form_addfacility').parsley('validate'))
				  return;
				  
			  $(evt.target).next().show();
			  
			  var data = {	  action		:'save_new_room_facility',
					  	  new_facility	:$('#new_facilityname').val()	
					  };
			  
				 
				$.post(	AJAXURL,
						data,
						function(response){
							 
							
							if(response.code=='OK'){
								
								//display newly added facility
							 	$(evt_.target).closest(".facility") 
							 				.before( '<div class="facility" id="facility-'
							 				+response.facililty.term_id+'" >'
										+'<label for="checkbox2" class="checkbox checked">'
										+'<input type="checkbox" data-toggle="checkbox" checked="checked" ' 
										+'name="facility[]"   value="'+$('#new_facilityname').val()+'"   >'
										+'<span id="facLabel-'+response.facililty.term_id+'" facililtyname="'+
										$('#new_facilityname').val()+'"  >'
										+$('#new_facilityname').val()
										+'</span>'
										+'</label>'
										+'<div class="action">'
										+'<a href="javascript:void(0)" class="edit"  term-id="'+
										response.facililty.term_id+'">Edit</a>&nbsp;<a href="javascript:void(0)"'
										+'class="delete" term-id="'+response.facililty.term_id+'">Delete</a>'
										+'</div>'
										+'</div>' );
							 	
							 	
							 	self_.$el.find('input[type="checkbox"]').checkbox();
							 	self_.$el.find('#new_facilityname').val("");
								self_.saveSuccess(response,evt_,self_);  
							}
							else{
								 self_.saveFailure(response,evt_,self_);  
							}
					
						});	
			
			
		},
		 
		/**
		 * Function to delete facililty 
		 */
		deleteFacility:function(evt){
		 
			var self_ = this;
			
			var evt_ = evt;
			
			facilityId = $(event.target).attr("term-id");
			
			 var data = {		action		:'delete_room_facility',
				  	  			facility	:facilityId	
				  		};
			 
			 
			$.post(	AJAXURL,
					data,
					function(response){ 
						if(response.code=='OK'){
							 
							self_.$el.find('#facility-'+facilityId).remove()  
							self_.saveSuccess(response,evt_,self_);  
						}
						else{
							 self_.saveFailure(response,evt_,self_);  
						}
				
					});	
		  
			
		},
		
		
		/**
		 * Function to edit facililty 
		 */
		editFacility:function(evt){
			facilityId = $(event.target).attr("term-id");
			$(event.target).addClass("savefacililty").removeClass("edit")
			$(event.target).html("Save")
			 
			$("#facLabel-"+facilityId).addClass('input-group');
			$("#facLabel-"+facilityId).html("<form name='frm_editfacility' id='frmeditfacility-"+facilityId+"'  >" +
					"<input type='text' class='form-control input-sm' " +
					"placeholder='Edit Facility' name='inputfacility-"+facilityId+"' id='inputfacility-"+facilityId+"'"+
					"parsley-validation-minlength='0' " +
					"value='"+$("#facLabel-"+facilityId).attr('facililtyname')+"'  > </form>");
			this.parsleyInitialize($('#frmeditfacility-'+facilityId));
			
		},
		
		/**
		 * Function to save updated facility 
		 */
		savefacility : function(evt){
			var evt_ = evt;
			var self_ = this;
			 
			facilityId = $(evt.target).attr("term-id");
			
			var data = {		action		: 'update_room_facility',
								fac_id		: facilityId,
								fac_name 	: $("#inputfacility-"+facilityId).val()
			};


			$.post(	AJAXURL,
			data,
			function(response){ 
				 
				 if(response.code=='OK'){
				 	 
					 facilityId = $(evt_.target).attr("term-id"); 
					 $(evt_.target).removeClass("savefacililty").addClass("edit")
					 $(evt_.target).html("Edit")
						 
					 $("#facLabel-"+facilityId).removeClass('input-group');
					 $("#facLabel-"+facilityId).html( $("#inputfacility-"+facilityId).val());
					 self_.saveSuccess(response,evt_,self_);  	 
					 
				}
				else{
					 self_.saveFailure(response,evt_,self_);  
				} 
		
			});	
		
		
		
			
		},
		
		
		/**
		 * Function to show message after success of save 
		 * @param response
		 * @param event
		 * @param _self
		 */
		saveSuccess : function(response,event,_self){
			 
			$(event.target).next().hide(); 
		 	 
			 $(event.delegateTarget).find('#roomsave_status')  
			 				.removeClass('alert-error').addClass('alert-success');
			 
			_self.showAlertMessage(event,response);			 
			 
		},
		
		/**
		 * Function to show message after failure of save 
		 * @param response
		 * @param event
		 * @param _self
		 */
		saveFailure : function(response,event,_self){
			 
			$(event.target).next().hide();
			$(event.delegateTarget).find('#roomsave_status') 
							.removeClass('alert-success').addClass('alert-error');
			
			_self.showAlertMessage(event,response);			 
			
		}, 
		
		
		/**
		 * Function to show status message on success/failure
		 * 
		 * @param event
		 * @param response
		 */		
		showAlertMessage : function(event,response){
			 $(event.target).prop('disabled',false)
			$(event.delegateTarget).find('#roomsave_status').html(response.msg);
			$(event.delegateTarget).find('#roomsave_status').removeClass('hidden');
			  
			/* Move to top at status message after success/failure */
			$('html, body').animate({
		        scrollTop: $(event.delegateTarget).find('#roomsave_status').offset().top
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
	    		    }
	    		   
	    		},
	            listeners: {
	               onFieldSuccess: function ( elem, constraints, ParsleyField ) {  
	                  elem.parent().parent().removeClass("has-error").addClass("has-success");
	                  elem.parent().find('.fui-check-inverted,.fui-cross-inverted').remove();
	                  elem.after('<span class="validation-icon input-icon fui-check-inverted"></span>') 
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

	return AddRoomView;

});