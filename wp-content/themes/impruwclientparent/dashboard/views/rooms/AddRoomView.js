/**
 * The AddRoom View.
 * 
 */

define([ 'underscore', 'jquery', 'backbone','roommodel',
		'text!templates/siteprofile/AddRoomViewTpl.tpl','lib/parsley/parsley','radio','jqueryui' ], function(_, $,
		Backbone, RoomModel, AddRoomViewTpl,parsley,radio,jqueryui) {

	var AddRoomView = Backbone.View.extend({

		id : 'add-room',

	 events : {
			 	'click #btn_saveroom'				: 'saveRoom', 
			 	'click #btn_addfacility'			: 'addFacility',
			 	'click .delete'						: 'deleteFacility',
			 	'click .edit'						: 'editFacility',
			 	'click .savefacililty' 				: 'savefacility', 
			 	
			 	'click #btn_add_addon'				: 'add_addon',
			 	'click #btn_savenewaddon'			: 'saveNewAddon',
			 	'click .delete-addonlink'			: 'deleteAddonType',
			 	'click .edit-addonlink'				: 'editAddonType',			 	
			 	'click .saveaddontype'				: 'updateAddonType',
			 		
			 	'change .tax__option'				: 'tax_option',
			 	
			 	'click #btn_addtax'					: 'addNewTaxType',
			 	'click .edit-taxlink'				: 'editTaxType',
			 	'click .update-taxlink'				: 'updateTaxType',
			 	'click .delete-taxlink'				: 'deleteTaxType',
			 		
			 	'click .edit-additional-policies'	: 'editAdditionalPolicies',
			 	'click .save-additional-policies'	: 'saveAdditionalPolicies',
			 	'click .delete-additional-policies'	: 'cancelAdditionalPoliciesUpdate',			 	
			 	
			 	'click .edit-checkintime'			: 'editCheckintime',
			 	'click .save-checkintime'			: 'saveCheckintime',
			 	'click .delete-checkintime'			: 'cancelCheckintimeUpdate',
			 	
			 	'click .edit-taxoption'				: 'edittaxoption',
			 	'click .save-taxoption'				: 'saveTaxOption',
			 	'click .delete-taxoption'			: 'cancelTaxOptionUpdate',			 	
			 	
			 	'click .edit-checkinformat'			: 'editCheckinFormat',
			 	'click .save-checkinformat'			: 'saveCheckinFormat',
			 	'click .delete-checkinformat'		: 'cancelCheckinFormat',			 	
			 	
			 	'click #btn_savedaterange'			: 'saveDateRange',
			 	
			 	'click #btn_addplan'				: 'addNewPlan'
			 	 
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
			this.$el.find('input[type="radio"]').radio();
			
			//initialize parsley validation for the forms
			this.parsleyInitialize(this.$el.find('#frm_addroom'));
			this.parsleyInitialize(this.$el.find('#frm_roomdesc'));			 
			this.parsleyInitialize(this.$el.find('#form_addfacility'));		
			this.parsleyInitialize(this.$el.find('#form_add_addon'));		
			
			this.$el.find(".aj-imp-long-form-actions").affix()
			
			
			
			var datepickerSelector = '.dated';
			$(datepickerSelector).datepicker({
			  showOtherMonths: true,
			  selectOtherMonths: true,
			  dateFormat: "d MM, yy",
			  yearRange: '-1:+1'
			}).prev('.btn').on('click', function (e) {
			  e && e.preventDefault();
			  $(datepickerSelector).focus();
			});

		// Now let's align datepicker with the prepend button
		$(datepickerSelector).datepicker('widget').css({'margin-left': -$(datepickerSelector).prev('.btn').outerWidth()});
			 	
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
			  tax_option 			= $('input[type="radio"][name="tax_option1"]:checked').val() 
					  
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
					  	 	'additionalpolicies':additionalpolicies,
					  	 	'tax_option'		: tax_option  
					  	 	
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
		
		/*add_addon:function(evt){
			$('#btn_updateaddon').hide();
			$('#btn_savenewaddon').show();
			$("#add-addon").find(".modal-header h4").text("Add Add-Ons")
			
		},*/
		
		
		tax_option : function(evt){
			//alert($(evt.target).val())
			console.log(evt)
			if( $(evt.target).is(":checked") ){ // check if the radio is checked
				var val = $(evt.target).val(); // retrieve the value
				//alert(val)
			}
			
			//tax_option  	= $('input[name=tax_option1]:checked').val()
			  // tax_option  	=  $('input[type="radio"][name="tax_option1"]:checked').val()
			//   console.log( tax_option )
			   
			   console.log( $( 'input[name=tax_option1]:checked' ).val())
			
		},
		
		/**
		 * Add new tax type
		 */
		
		addNewTaxType :function(evt){
				var self_ = this;
			
				var evt_ = evt;
			 
				if (!this.$el.find('#form_add_tax').parsley('validate'))
					return;
				$(evt.target).next().show();
				
				
				var data = {	  action				:'save_new_tax',
						  		  new_tax_name			:$('#taxname').val(),
						  		  new_tax_percent		:$('#taxpercent').val()	
						  };
				  
					 
					$.post(	AJAXURL,
							data,
							function(response){
								 
								
								if(response.code=='OK'){
									
									
								 	 console.log(response)
								 	 
								 	if($('#tax_list').hasClass('hidden'))
								 		$('#tax_list').removeClass('hidden')
								 		
								 	 $("#tax_list").append(''+
								 	'<tbody id="blocktaxtype-'+response.taxData.id+'">'+
									'<td id="block_edittaxtype-'+response.taxData.id+'">'+response.taxData.name+'</td>'+
									'<td id="block_edittaxprice-'+response.taxData.id+'" >'+response.taxData.percent+'</td>'+
									'<td>'+
										'<a href="javascript:void(0)" class="edit-link edit-taxlink" taxtype-id="'+response.taxData.id+'"  > <span class="glyphicon glyphicon-pencil"></span> Edit</a>'+
										'<a href="javascript:void(0)" class="delete-link delete-taxlink" taxtype-id="'+response.taxData.id+'"><span class="glyphicon glyphicon-trash"></span> Delete</a>'+
									'</td>'+
								'</tbody>'); 
								
								 	$(evt_.target).parent().parent().find('.close').click();
								 	$(evt_.target).parent().parent().find('#taxtype_name').val("")
								 	$(evt_.target).parent().parent().find('#taxtype_price').val("")
								 	/*self_.$el.find('input[type="checkbox"]').checkbox();*/
								 	/*self_.$el.find('#new_facilityname').val("");*/
									 self_.saveSuccess(response,evt_,self_);  
								}
								else{
									
									//console.log("error new tax")
									  self_.saveFailure(response,evt_,self_);  
								}
						
							});	
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
									'<a href="javascript:void(0)" class="edit-link edit-addonlink" addontype-id="'+response.addontype.id+'"  > <span class="glyphicon glyphicon-pencil"></span> Edit</a>'+
									'<a href="javascript:void(0)" class="delete-link delete-addonlink" addontype-id="'+response.addontype.id+'"><span class="glyphicon glyphicon-trash"></span> Delete</a>'+
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
		
		
		deleteTaxType : function(evt){
			
			$(evt.target).html('Deleting');
			$(evt.target).prop('disabled',true);
		 
			var self_ = this;
			
			var evt_ = evt;
			
			taxTypeId = $(event.target).attr("taxtype-id");
			
			 var data = {		action		:'delete_room_tax_type',
					 			taxTypeId	:taxTypeId
				  		};
			 
			 
			$.post(	AJAXURL,
					data,
					function(response){ 
						if(response.code=='OK'){
						  
							self_.$el.find('#blocktaxtype-'+taxTypeId).remove()  
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
			$(event.target).addClass("saveaddontype").removeClass("edit-addonlink")
			$(event.target).html("Save")
			var addonType = $('#block_editaddontype-'+addonTypeID).html()
			var addonPrice = $('#block_editaddonprice-'+addonTypeID).html()
			 
			
			//$('#block_editaddontype-'+addonTypeID).html("<div class='add-text'> <input type='text' name='input_editaddontype-"+addonTypeID+"' id='input_editaddontype-"+addonTypeID+"' class='form-control input-sm parsley-validated parsley-error'  value='"+addonType+"' /> </div>")
			//$('#block_editaddonprice-'+addonTypeID).html("<div class='add-text'><input type='text' name='input_editaddonprice-"+addonTypeID+"'  id='input_editaddonprice-"+addonTypeID+"'   class='form-control input-sm parsley-validated parsley-error'  value='"+addonPrice+"' /> </div> ")
			
			
			
			
			$('#block_editaddontype-'+addonTypeID).html("<div class='form-group'>" 
														+"<div class=''>"
															+"<input type='text' class='form-control' name='input_editaddontype-"+addonTypeID+"' id='input_editaddontype-"+addonTypeID+"' "
															+"placeholder='Scuba diving' required parsley-trigger='blur' parsley-validation-minlength='0'"
															+" parsley-required-message = 'Please enter addon type'    value='"+addonType+"'  />"
															+"<div class='p-messages'></div>"
														+"</div>"
													+"</div> ")
			
			$('#block_editaddonprice-'+addonTypeID).html("<div class='form-group'>" 
															+"<div class=''>"
																+"<input type='text' class='form-control'  name='input_editaddonprice-"+addonTypeID+"'  id='input_editaddonprice-"+addonTypeID+"'   "
																+"placeholder='12.99' required parsley-trigger='blur' parsley-validation-minlength='0'"
																+" parsley-required-message = 'Please enter price'   value='"+addonPrice+"'   />"
																+"<div class='p-messages'></div>"
															+"</div>"
														+"</div> ")
			
			
			
			/*$("#addontype-"+addonTypeID).addClass('input-group');
			$("#addontype-"+addonTypeID).html("<form name='frm_editfacility' id='frmeditfacility-"+facilityId+"'  >" +
					"<input type='text' class='form-control input-sm' " +
					"placeholder='Edit Facility' name='inputfacility-"+facilityId+"' id='inputfacility-"+facilityId+"'"+
					"parsley-validation-minlength='0' " +
					"value='"+$("#facLabel-"+facilityId).attr('facililtyname')+"'  > </form>");
			this.parsleyInitialize($('#frmeditfacility-'+facilityId));  */
			
		},
		
		
		/**
		 * Function to edit tax type
		 * @param evt
		 */
		editTaxType : function(evt){
			
			taxTypeID = $(event.target).attr("taxtype-id");
			$(event.target).addClass("update-taxlink").removeClass("edit-taxlink")
			$(event.target).html("Save")
			var taxnType = $('#block_edittaxtype-'+taxTypeID).html()
			var taxPercent = $('#block_edittaxpercent-'+taxTypeID).html()
			 
			
			//$('#block_edittaxtype-'+taxTypeID).html("<div class='add-text'> <input type='text' name='input_edittaxtype-"+taxTypeID+"' id='input_edittaxtype-"+taxTypeID+"' class='form-control input-sm parsley-validated parsley-error'  value='"+taxnType+"' /> </div>")
			//$('#block_edittaxpercent-'+taxTypeID).html("<div class='add-text'><input type='text' name='input_edittaxprice-"+taxTypeID+"'  id='input_edittaxprice-"+taxTypeID+"'   class='form-control input-sm parsley-validated parsley-error'  value='"+taxPercent +"' /> </div> ")
			
			$('#block_edittaxtype-'+taxTypeID).html("<div class='form-group'>" 
														+"<div class=''>"
															+"<input type='text' class='form-control' name='input_edittaxtype-"+taxTypeID+"' id='input_edittaxtype-"+taxTypeID+"' "
															+"placeholder='Service Tax' required parsley-trigger='blur' parsley-validation-minlength='0'"
															+"parsley-required-message = 'Please enter tax type'   value='"+taxnType+"'  />"
															+"<div class='p-messages'></div>"
														+"</div>"
													+"</div> ")
			
			$('#block_edittaxpercent-'+taxTypeID).html("<div class='form-group'>" 
															+"<div class=''>"
																+"<input type='text' class='form-control' name='input_edittaxprice-"+taxTypeID+"'  id='input_edittaxprice-"+taxTypeID+"'  "
																+"placeholder='12.5%' required parsley-trigger='blur' parsley-validation-minlength='0'"
																+"parsley-required-message = 'Please enter percentage'   value='"+taxPercent+"'  />"
																+"<div class='p-messages'></div>"
															+"</div>"
														+"</div> ")
		
		},		
		
		/**
		 * Save edited addon changs
		 * @param evt
		 */
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
			 
			this.parsleyInitialize(this.$el.find('#input_editaddontype-'+addonTypeId));	
			this.parsleyInitialize(this.$el.find('#input_editaddonprice-'+addonTypeId));	
			
			if (!this.$el.find('#input_editaddontype-'+addonTypeId).parsley('validate'))
				  return;
			if (!this.$el.find(' #input_editaddonprice-'+addonTypeId).parsley('validate'))
				return;
			
			
			
			 
			  
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
																'<a href="javascript:void(0)" class="edit-link edit-addonlink" addontype-id="'+response.updatedaddontype.id+'" > <span class="glyphicon glyphicon-pencil"></span> Edit</a>'+
																'<a href="javascript:void(0)" class="delete-link delete-addonlink" addontype-id="'+response.updatedaddontype.id+'"><span class="glyphicon glyphicon-trash"></span> Delete</a>'+
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
		 * Function to save updated tax changes
		 */
		updateTaxType : function(evt){
			console.log('save changes to tax')
			
			var self_ = this;
			
			var evt_ = evt;
			var taxTypeId =  $(evt.target).attr('taxtype-id')			
			var taxTypeName = $('#input_edittaxtype-'+taxTypeId).val()
			var taxTypePercent = $('#input_edittaxprice-'+taxTypeId).val() 
 
	 		/*if (!this.$el.find('#form_add_addon').parsley('validate'))
				  return;
				 */
			//console.log( $(evt.target).next().prop('tagName')) 
			// $(evt.target).next().next().show()
			 
			this.parsleyInitialize(this.$el.find('#input_edittaxtype-'+taxTypeId));	
			this.parsleyInitialize(this.$el.find('#input_edittaxprice-'+taxTypeId));	
			
			if (!this.$el.find('#input_edittaxtype-'+taxTypeId).parsley('validate'))
				  return;
			if (!this.$el.find(' #input_edittaxprice-'+taxTypeId).parsley('validate'))
				return;
			  
			  var data = {	  action		:'update_tax_type',
					  tax_editid 	:taxTypeId,
					  tax_typename	:taxTypeName,
					  tax_percent	:taxTypePercent	
					  };
			  
				 
				$.post(	AJAXURL,
						data,
						function(response){
							 
							
							if(response.code=='OK'){
								
								console.log('update success')
							 	console.log(response)
							 	 
							 	
							 	$("#blocktaxtype-"+response.updatedtaxtype.id).html('<tr><td id="block_edittaxtype-'+response.updatedtaxtype.id+'">'+response.updatedtaxtype.name+'</td>'+
															'<td id="block_edittaxpercent-'+response.updatedtaxtype.id+'">'+response.updatedtaxtype.percent+'</td>'+
															'<td>'+
																'<a href="javascript:void(0)" class="edit-link edit-taxlink" taxtype-id="'+response.updatedtaxtype.id+'" > <span class="glyphicon glyphicon-pencil"></span> Edit</a>'+
																'<a href="javascript:void(0)" class="delete-link delete-taxlink" taxtype-id="'+response.updatedtaxtype.id+'"><span class="glyphicon glyphicon-trash"></span> Delete</a>'+
															'</td>'+
														'</tr></tbody>')
														
								 
							
							 	$(evt_.target).parent().parent().find('.close').click();
							 	/*$(evt_.target).parent().parent().find(".modal-body").find('#taxtype_name').val("")
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
		 * 
		 * @param evt
		 */
		editCheckinFormat : function(evt){
			
			$(evt.target).parent().find('.checkinformat_edit').removeClass('hidden')
			$(evt.target).parent().find('.delete-checkinformat').removeClass('hidden')
			$(evt.target).parent().find('.checkinformat_text').addClass('hidden')
			$(evt.target).addClass('save-checkinformat').removeClass('edit-checkinformat');
			
			$(evt.target).html(function (i, old) {
			     return old
			         .replace('Edit', 'Save')
			         
			});	
			
		},
		
		
		
		
		/**
		 * Edit taxoption
		 * @param evt
		 */
		 edittaxoption : function(evt){
			
			$(evt.target).parent().find('.taxoption_edit').removeClass('hidden')
			$(evt.target).parent().find('.delete-taxoption').removeClass('hidden')
			$(evt.target).parent().find('.taxoptiontext').addClass('hidden')
			$(evt.target).addClass('save-taxoption').removeClass('edit-taxoption');
			
			$(evt.target).html(function (i, old) {
			     return old
			         .replace('Edit', 'Save')
			         
			});			
			
		},
		
		
		saveCheckinFormat : function(evt){
			
			$(evt.target).prop('disabled',true);
			
			$(evt.target).html(function (i, old) {
			     return old
			         .replace('Save', 'Saving') 
			});
			
			
			var evt_ = evt;
			var self_ = this;
			
			var data = {	action		: 'update_checkinformat',						 
							checkinformat 	: $(evt.target).parent().find('input[type="radio"][name="checkin_format"]:checked').val()
						};
			//$('input[type="radio"][name="tax_option1"]:checked').val() 
			
			$.post(	AJAXURL,
			data,
			function(response){ 
				 
				 if(response.code=='OK'){
				 	 
					 
					 $(evt_.target).parent().find('.checkinformat_edit').addClass('hidden')
					 $(evt_.target).parent().find('.delete-checkinformat').addClass('hidden')
					 $(evt_.target).parent().find('.checkinformat_text').removeClass('hidden')
					 $(evt_.target).removeClass('save-checkinformat').addClass('edit-checkinformat');
					 
					 $(evt_.target).parent().find('.checkinformat_text').html(response.checkinformat)
					  
					 $(evt_.target).prop('disabled',false);
					 $(evt_.target).html(function (i, old) {
					     return old
					         .replace('Saving', 'Edit')
					         
					});	 
			 
					 
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
		 * Function to cancel edit of checkin format
		 * @param evt
		 */
		cancelCheckinFormat : function(evt_){
			$(evt_.target).addClass('hidden')
			 $(evt_.target).parent().find('.checkinformat_edit').addClass('hidden')
			 $(evt_.target).parent().find('.checkinformat_text').removeClass('hidden')
			 $(evt_.target).parent().find('.save-checkinformat').html(function (i, old) {
			     return old
			         .replace('Save', 'Edit')
			         
			});
			 $(evt_.target).parent().find('.save-checkinformat').removeClass('save-checkinformat').addClass('edit-checkinformat');
			 
		},
		
		
		/**
		 * Function to save tax option 
		 * @param evt
		 */
		saveTaxOption : function(evt){
			
			$(evt.target).prop('disabled',true);
			
			$(evt.target).html(function (i, old) {
			     return old
			         .replace('Save', 'Saving') 
			});
			
			
			var evt_ = evt;
			var self_ = this;
			
			var data = {	action		: 'update_taxoption',						 
							taxoption 	: $(evt.target).parent().find('input[type="radio"][name="tax_option1"]:checked').val()
						};
			//$('input[type="radio"][name="tax_option1"]:checked').val() 
			
			$.post(	AJAXURL,
			data,
			function(response){ 
				 
				 if(response.code=='OK'){
				 	 
					 
					 $(evt_.target).parent().find('.taxoption_edit').addClass('hidden')
					 $(evt_.target).parent().find('.delete-taxoption').addClass('hidden')
					 $(evt_.target).parent().find('.taxoptiontext').removeClass('hidden')
					 $(evt_.target).removeClass('save-taxoption').addClass('edit-taxoption');
					 
					 $(evt_.target).parent().find('.taxoptiontext').html(response.taxoption)
					  
					 $(evt_.target).prop('disabled',false);
					 $(evt_.target).html(function (i, old) {
					     return old
					         .replace('Saving', 'Edit')
					         
					});	 
			 
					 
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
		 * cancel edit of tax option
		 * @param evt_
		 */
		cancelTaxOptionUpdate: function(evt_){
			
			 $(evt_.target).addClass('hidden')
			 $(evt_.target).parent().find('.taxoption_edit').addClass('hidden')
			 $(evt_.target).parent().find('.taxoptiontext').removeClass('hidden')
			 $(evt_.target).parent().find('.save-taxoption').html(function (i, old) {
			     return old
			         .replace('Save', 'Edit')
			         
			});
			 $(evt_.target).parent().find('.save-taxoption').removeClass('save-taxoption').addClass('edit-taxoption');
			 
			 
			
		},
		
		
		
		/**
		 * Edit check in time
		 * @param evt
		 */
		editCheckintime : function(evt){
			
			$(evt.target).parent().find('.checkintime_edittext').removeClass('hidden')
			$(evt.target).parent().find('.delete-checkintime').removeClass('hidden')
			$(evt.target).parent().find('.checkintime_text').addClass('hidden')
			$(evt.target).addClass('save-checkintime').removeClass('edit-checkintime');
			
			$(evt.target).html(function (i, old) {
			     return old
			         .replace('Edit', 'Save')
			         
			});			
			
		},
		
		
		
		
		saveCheckintime : function(evt){
			 
			$(evt.target).prop('disabled',true);
			
			$(evt.target).html(function (i, old) {
			     return old
			         .replace('Save', 'Saving') 
			});
			
			
			var evt_ = evt;
			var self_ = this;
			
			var data = {	action					: 'update_checkintime',						 
							checkintime 	: $(evt.target).parent().find('#checkin_time').val()
						};
			
			
			$.post(	AJAXURL,
			data,
			function(response){ 
				 
				 if(response.code=='OK'){
				 	 
					 
					 $(evt_.target).parent().find('.checkintime_edittext').addClass('hidden')
					 $(evt_.target).parent().find('.delete-checkintime').addClass('hidden')
					 $(evt_.target).parent().find('.checkintime_text').removeClass('hidden')
					 $(evt_.target).removeClass('save-checkintime').addClass('edit-checkintime');
					 
					 $(evt_.target).parent().find('.checkintime_text').html(response.checkinTime)
					  
					 $(evt_.target).prop('disabled',false);
					 $(evt_.target).html(function (i, old) {
					     return old
					         .replace('Saving', 'Edit')
					         
					});	 
			 
					 
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
		 * edit additional policies
		 */
		editAdditionalPolicies : function(evt){
			$(evt.target).parent().find('.addpoliciestext_edit').removeClass('hidden')
			$(evt.target).parent().find('.delete-additional-policies').removeClass('hidden')
			$(evt.target).parent().find('.addpoliciestext').addClass('hidden')
			$(evt.target).addClass('save-additional-policies').removeClass('edit-additional-policies');
			
			$(evt.target).html(function (i, old) {
			     return old
			         .replace('Edit', 'Save')
			         
			});
			 
		},
		
		
		saveAdditionalPolicies : function(evt){
			 
			$(evt.target).prop('disabled',true);
			
			$(evt.target).html(function (i, old) {
			     return old
			         .replace('Save', 'Saving') 
			});
			
			
			var evt_ = evt;
			var self_ = this;
			
			var data = {	action					: 'update_additional_policies',						 
							additional_policies 	: $(evt.target).parent().find('#additional_policies').val()
						};
			
			
			$.post(	AJAXURL,
			data,
			function(response){ 
				 
				 if(response.code=='OK'){
				 	 
					 
					 $(evt_.target).parent().find('.addpoliciestext_edit').addClass('hidden')
					 $(evt_.target).parent().find('.delete-additional-policies').addClass('hidden')
					 $(evt_.target).parent().find('.addpoliciestext').removeClass('hidden')
					 $(evt_.target).removeClass('save-additional-policies').addClass('edit-additional-policies');
					 console.log(response.additional_policies)
					 $(evt_.target).parent().find('.addpoliciestext').html(response.additionalPolicies)
					  
					 $(evt_.target).prop('disabled',false);
					 $(evt_.target).html(function (i, old) {
					     return old
					         .replace('Saving', 'Edit')
					         
					});	 
			 
					 
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
		 * cancel edit of additional policies
		 * @param evt_
		 */
		cancelAdditionalPoliciesUpdate: function(evt_){
			
			 $(evt_.target).addClass('hidden')
			 $(evt_.target).parent().find('.addpoliciestext_edit').addClass('hidden')
			 $(evt_.target).parent().find('.addpoliciestext').removeClass('hidden')
			 $(evt_.target).parent().find('.save-additional-policies').html(function (i, old) {
			     return old
			         .replace('Save', 'Edit')
			         
			});
			 $(evt_.target).parent().find('.save-additional-policies').removeClass('save-additional-policies').addClass('edit-additional-policies');
			 
			 
			
		},
		
		
		
		saveDateRange : function(evt){
			
			var fromDaterange 	=  $(evt.target).closest('.modal-content').find('#fromdaterange').val() 
			var toDaterange		=  $(evt.target).closest('.modal-content').find('#todaterange').val() 
			$(evt.target).next().show();
			 
			
			var evt_ = evt;
			var self_ = this;
			
			var data = {	action			: 'add_date_range',						 
							fromdaterange 	: fromDaterange,
							todaterange		: toDaterange
						};
			
			
			$.post(	AJAXURL,
			data,
			function(response){ 
				 
				 if(response.code=='OK'){ 		
					 
					 $(evt_.target).parent().parent().find('.close').click();					  
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
		 * Function to add new plan
		 * @param evt
		 */
		addNewPlan : function(evt){
			
			var form_plan = $(evt.target).parent().parent().find('#form_addplan');  
			form_data = $(form_plan).serializeArray() 
			  
			 
			var evt_ = evt;
			var self_ = this;
				
			var data = {	action			: 'add_new_plan_tariff',						 
								addplan_data 	: form_data 								 
						};
				
				
			$.post(	AJAXURL,
					data,
					function(response){ 
					 
						if(response.code=='OK'){		
						 
							$(evt_.target).parent().parent().find('.close').click();					  
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