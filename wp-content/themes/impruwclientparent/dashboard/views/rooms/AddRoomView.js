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
			 	'click .savefacililty' 		: 'savefacility', 
			 	'click #btn_add_addon'		: 'add_addon',
			 	'click #btn_savenewaddon'	: 'saveNewAddon',
			 	'click .delete-link'		: 'deleteAddonType',
			 	'click .edit-link'			: 'editAddonType',			 	
			 	'click .saveaddontype'		: 'updateAddonType'
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
				roomdata : this.allFacilities
			}); 

			this.$el.html(html);
			
			//set custom selectbox & checkbox
			this.$el.find('select').selectpicker();
			this.$el.find('input[type="checkbox"]').checkbox();
			//this.$el.find('input[type="radio"]').radio();
			
			//initialize parsley validation for the forms
			this.parsleyInitialize(this.$el.find('#frm_addroom'));
			this.parsleyInitialize(this.$el.find('#frm_roomdesc'));			 
			this.parsleyInitialize(this.$el.find('#form_addfacility'));		
			this.parsleyInitialize(this.$el.find('#form_add_addon'));		
			
			this.$el.find(".aj-imp-long-form-actions").affix()
			 	
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
			  checkinformat 	=  $('input[type="radio"][name="checkin_format"]:checked').val()
			  checkintime 	= $("#checkin_time").val();
			  additionalpolicies 	= $("#additional_policies").val();
					  
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
					  	 	'facilities'	:facilityValues,
					  	 	'checkinformat'	:checkinformat,
					  	 	'checkintime'	:checkintime,
					  	 	'additionalpolicies':additionalpolicies
					  	 	
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
		
		add_addon:function(evt){
			$('#btn_updateaddon').hide();
			$('#btn_savenewaddon').show();
			$("#add-addon").find(".modal-header h4").text("Add Add-Ons")
			
		},
		
		/**
		 * 
		 * @param evt
		 */
		saveNewAddon:function(evt){
			var self_ = this;
			
			var evt_ = evt;
			 
			if (!this.$el.find('#form_add_addon').parsley('validate'))
				  return;
			
			 $(evt.target).next().show();
			  
			  var data = {	  action		:'save_new_addon_type',
					  new_addon_type	:$('#addontype_name').val(),
					  new_addon_price	:$('#addontype_price').val()	
					  };
			  
				 
				$.post(	AJAXURL,
						data,
						function(response){
							 
							
							if(response.code=='OK'){
								
								
							 	 
							 	 
							 	if($('#addons_list').hasClass('hidden'))
							 		$('#addons_list').removeClass('hidden')
							 		
							 	 $("#addons_list").append(''+
							 	'<tbody id="blockaddontype-'+response.addontype.id+'">'+
								'<td id="block_editaddontype-'+response.addontype.id+'">'+response.addontype.label+'</td>'+
								'<td id="block_editaddonprice-'+response.addontype.id+'" >'+response.addontype.price+'</td>'+
								'<td>'+
									'<a href="javascript:void(0)" class="edit-link" addontype-id="'+response.addontype.id+'"  > <span class="glyphicon glyphicon-pencil"></span> Edit</a>'+
									'<a href="javascript:void(0)" class="delete-link" addontype-id="'+response.addontype.id+'"><span class="glyphicon glyphicon-trash"></span> Delete</a>'+
								'</td>'+
							'</tbody>'); 
							
							 	$(evt_.target).parent().parent().find('.close').click();
							 	$(evt_.target).parent().parent().find('#addontype_name').val("")
							 	$(evt_.target).parent().parent().find('#addontype_price').val("")
							 	/*self_.$el.find('input[type="checkbox"]').checkbox();*/
							 	/*self_.$el.find('#new_facilityname').val("");*/
								 self_.saveSuccess(response,evt_,self_);  
							}
							else{
								
								console.log("erro new addon")
								 //self_.saveFailure(response,evt_,self_);  
							}
					
						});	
			
		},
		
		 
		/**
		 * Function to delete facililty 
		 */
		deleteFacility:function(evt){
			
			 $(evt.target).html('Deleting');
			 $(evt.target).prop('disabled',true);
		 
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
							$(evt_.target).prop('disabled',false);
							$(evt.target).html('Delete');
							 self_.saveFailure(response,evt_,self_);  
						}
				
					});	
		  
			
		},
		
		
		/**
		 * Function to delete addontype 
		 */
		deleteAddonType:function(evt){
			
			 $(evt.target).html('Deleting');
			 $(evt.target).prop('disabled',true);
		 
			var self_ = this;
			
			var evt_ = evt;
			
			addonTypeId = $(event.target).attr("addontype-id");
			
			 var data = {		action		:'delete_room_addon_type',
					 			addonTypeId	:addonTypeId
				  		};
			 
			 
			$.post(	AJAXURL,
					data,
					function(response){ 
						if(response.code=='OK'){
						  
							self_.$el.find('#blockaddontype-'+addonTypeId).remove()  
							self_.saveSuccess(response,evt_,self_);  
						}
						else{
							$(evt_.target).prop('disabled',false);
							$(evt.target).html('Delete');
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
		 * Function to edit addon type
		 */
		editAddonType:function(event){
			/*var label = $(evt.target).attr('addontype-label')
			var price = $('#block_editaddonprice-'+label).html()
			console.log(label)
			console.log(price)
			$("#addontype_name").val(label)
			$("#addontype_price").val(price)
			$("#hdn_addonlabel").val(label)
			
			$('#btn_updateaddon').show();
			$('#btn_savenewaddon').hide();
			
			$("#add-addon").find(".modal-header h4").text("Update Addon")
			 */
			
			addonTypeID = $(event.target).attr("addontype-id");
			$(event.target).addClass("saveaddontype").removeClass("edit-link")
			$(event.target).html("Save")
			var addonType = $('#block_editaddontype-'+addonTypeID).html()
			var addonPrice = $('#block_editaddonprice-'+addonTypeID).html()
			 
			
			$('#block_editaddontype-'+addonTypeID).html("<div class='add-text'> <input type='text' name='input_editaddontype-"+addonTypeID+"' id='input_editaddontype-"+addonTypeID+"' class='form-control input-sm parsley-validated parsley-error'  value='"+addonType+"' /> </div>")
			$('#block_editaddonprice-'+addonTypeID).html("<div class='add-text'><input type='text' name='input_editaddonprice-"+addonTypeID+"'  id='input_editaddonprice-"+addonTypeID+"'   class='form-control input-sm parsley-validated parsley-error'  value='"+addonPrice+"' /> </div> ")
			
			/*$("#addontype-"+addonTypeID).addClass('input-group');
			$("#addontype-"+addonTypeID).html("<form name='frm_editfacility' id='frmeditfacility-"+facilityId+"'  >" +
					"<input type='text' class='form-control input-sm' " +
					"placeholder='Edit Facility' name='inputfacility-"+facilityId+"' id='inputfacility-"+facilityId+"'"+
					"parsley-validation-minlength='0' " +
					"value='"+$("#facLabel-"+facilityId).attr('facililtyname')+"'  > </form>");
			this.parsleyInitialize($('#frmeditfacility-'+facilityId));  */
			
		},
		
		
		
		updateAddonType : function(evt){
			 
			var self_ = this;
			
			var evt_ = evt;
			var addonTypeId =  $(evt.target).attr('addontype-id')			
			var addonTypeLabel = $('#input_editaddontype-'+addonTypeId).val()
			var addonTypePrice = $('#input_editaddonprice-'+addonTypeId).val() 
 
	 		/*if (!this.$el.find('#form_add_addon').parsley('validate'))
				  return;
				 */
			//console.log( $(evt.target).next().prop('tagName')) 
			// $(evt.target).next().next().show()
			 
			
			 
			  
			  var data = {	  action		:'update_addon_type',
					  addon_edit 	:addonTypeId,
					  addon_type	:addonTypeLabel,
					  addon_price	:addonTypePrice	
					  };
			  
				 
				$.post(	AJAXURL,
						data,
						function(response){
							 
							
							if(response.code=='OK'){
								
								console.log('update success')
							 	console.log(response)
							 	
							 	/*$("#addons_list").append(''+
							 	'<tbody id="blockaddontype-'+response.addontype.label+'">'+
								'<td id="block_editaddontype-'+response.addontype.label+'">'+response.addontype.label+'</td>'+
								'<td id="block_editaddonprice-'+response.addontype.label+'" >'+response.addontype.price+'</td>'+
								'<td>'+
									'<a href="javascript:void(0)" class="edit-link" addontype-label="'+response.addontype.label+'"  data-toggle="modal" data-target="#add-addon"> <span class="glyphicon glyphicon-pencil"></span> Edit</a>'+
									'<a href="javascript:void(0)" class="delete-link" addontype-label="'+response.addontype.label+'"><span class="glyphicon glyphicon-trash"></span> Delete</a>'+
								'</td>'+
							'</tbody>');*/
							 	
							 	$("#blockaddontype-"+response.updatedaddontype.id).html('<tr><td id="block_editaddontype-"'+response.updatedaddontype.id+'>'+response.updatedaddontype.label+'</td>'+
															'<td id="block_editaddonprice-"'+response.updatedaddontype.id+'>'+response.updatedaddontype.price+'</td>'+
															'<td>'+
																'<a href="javascript:void(0)" class="edit-link" addontype-id="'+response.updatedaddontype.id+'" > <span class="glyphicon glyphicon-pencil"></span> Edit</a>'+
																'<a href="javascript:void(0)" class="delete-link" addontype-id="'+response.updatedaddontype.id+'"><span class="glyphicon glyphicon-trash"></span> Delete</a>'+
															'</td>'+
														'</tr></tbody>')
														
								 
							
							 	$(evt_.target).parent().parent().find('.close').click();
							 	/*$(evt_.target).parent().parent().find(".modal-body").find('#addontype_name').val("")
							 	$(evt_.target).parent().parent().find('#addontype_price').val("")*/
							 	$(evt_.target).next().next().hide();
							 	/*self_.$el.find('input[type="checkbox"]').checkbox();
							 	self_.$el.find('#new_facilityname').val("");*/
								self_.saveSuccess(response,evt_,self_);  
							}
							else{
								 self_.saveFailure(response,evt_,self_);  
							}
					
						});	
		},
		
		/**
		 * Function to save updated facility 
		 */
		savefacility : function(evt){
			
			 
			var evt_ = evt;
			var self_ = this;
			
			 $(evt.target).html('Saving');
			 $(evt.target).prop('disabled',true);
			 
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
					 $(evt.target).prop('disabled',false);
						 
					 $("#facLabel-"+facilityId).removeClass('input-group');
					 $("#facLabel-"+facilityId).html( $("#inputfacility-"+facilityId).val());
					 self_.saveSuccess(response,evt_,self_);  	 
					 
				}
				else{
						$(evt.target).html('Save');
						$(evt.target).prop('disabled',false);
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
			
			if( $(event.target).next().get(0).tagName =="IMG") // hide next element only if its a loader image
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
			 
			if( $(event.target).next().get(0).tagName =="IMG") // hide next element only if its a loader image
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