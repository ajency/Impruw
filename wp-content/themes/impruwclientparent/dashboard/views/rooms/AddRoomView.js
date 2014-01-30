/**
 * The AddRoom View.
 * 
 */

define([ 'underscore', 'jquery', 'backbone','roommodel','roomcollection',
		'text!templates/siteprofile/AddRoomViewTpl.tpl','jqueryui','parsley','radio', 'inputmask', 'rowlink' ], 
      function(_, $, Backbone, RoomModel, RoomCollection, AddRoomViewTpl, jqueryui) {

	var AddRoomView = Backbone.View.extend({

         id : 'add-room',

         events : {
			 	'click #btn_saveroom'				: 'saveRoom', 
			 	'click #btn_updateroom'				: 'updateRoom',	

			 	'click #btn_addfacility'			: 'addFacility',
			 	'click .delete'						: 'deleteFacility',
			 	'click .edit'						: 'editFacility',
			 	'click .cancel_editfacility'		: 'cancelEditFacility',
			 	'click .savefacililty' 				: 'savefacility', 
			 	
			 	'click #btn_add_addon'				: 'add_addon',			 	
			 	'click .delete-addonlink'			: 'deleteAddonType',
			 	'click .edit-addonlink'				: 'editAddonType',	
			 	'click .cancel-addonlink'			: 'cancelEditAddon',
			 	'click .saveaddontype'				: 'updateAddonType', 
			 	
			 	'click .edit-taxlink'				: 'editTaxType',
			 	'click .update-taxlink'				: 'updateTaxType',
			 	'click .delete-taxlink'				: 'deleteTaxType',
			 	'click .cancel-taxlink'				: 'cancelEditTaxType',
			 		
			 	'click .edit-additional-policies'	: 'editAdditionalPolicies',
			 	'click .save-additional-policies'	: 'saveAdditionalPolicies',
			 	'click .delete-additional-policies'	: 'cancelAdditionalPoliciesUpdate',			 	
			 	
			 	'click .edit-checkintime'			: 'editCheckintime',
			 	'click .save-checkintime'			: 'saveCheckintime',
			 	'click .delete-checkintime'			: 'cancelCheckintimeUpdate',			 	
			 	 
			 	'change .tax__option'				: 'tax_option',
			 	'click .edit-taxoption'				: 'edittaxoption',
			 	'click .save-taxoption'				: 'saveTaxOption',
			 	'click .delete-taxoption'			: 'cancelTaxOptionUpdate',			 	
			 	 
			 	'click .editplan_link'				: 'editplanModelData', 
			 	'click .deleteplan_link'			: 'deleteplan',	
			 		
			    'click .add_tax_btn'				: 'showAddTaxModal',
                'click .btn_addplanmodal'			: 'showAddPlanModal',
                'click #btn_add_addon'				: 'showAddAddOnModal',
                'click #btn_add_daterange'			: 'showAddDateRangeModal',
                'click .addtariff_link'				: 'showTariffModal',
                
                'click .edittariff-link'			: 'editTariffModelData', 
                'click .deletedaterange_lnk'		: 'deleteDateRange',
                'click .editdaterange_lnk'			: 'enableEditDateRange',
                'click .savedaterange_lnk'			: 'saveDateRange',
                'click .canceleditdaterange_lnk'	: 'cancelEditRange',
                
                'click .filepopup'					: 'showFilePopup',
                'click .btn_deleteAttachment'		: 'deleteRoomAttachment',
                	
                'click #select_featuredimg'			: 'showFeaturedImgFilePopup',
                'click .btn_del_featuredimg'		: 'deleteFeaturedImage' 
                
		}, 

		initialize : function(args) {
			 
			
			/* if(!_.isUndefined(args)){
				this.model = args;
			} */
			if(!_.isUndefined(args)){
				this.fetchAllFacilities(args);	
			}
			else{
				this.fetchAllFacilities();	
			}
			
				
			this.popupViewManager = new Backbone.ChildViewContainer();	

		},

		render : function() {
			
			
		},

		/*
		 * 
		 */
		renderTemplate:function(editRoomModel2){
			 
			var template = _.template(AddRoomViewTpl);			 
			var html = template({
				roomdata : this.allFacilities,
				editroomdata : editRoomModel2
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
			
			this.$el.find(".aj-imp-long-form-actions").affix();
			
			
			
			
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


 			// Long Form Actions
			$(".aj-imp-long-form-actions").affix({
				offset: { top: 200 }
			});

			if( $(window).width()< 768){
				$(".aj-imp-long-form-actions").affix({
					offset: { top: function () {
				        return (this.top = $('.aj-imp-left').outerHeight(true))
				      } 
				  	}					
				});
			}

			// Long form dyanamic width
			$(window).load(function() { 
				var w = $('.aj-imp-right').width();
				$('.aj-imp-long-form-actions.affix').width(w);

				var m = $('.aj-imp-left').width();
				$('.aj-imp-long-form-actions.affix').css('margin-left', (m));

				if( $(window).width()< 768){
					var w = $('window').width();
					$('.aj-imp-long-form-actions.affix').width(w);

					$('.aj-imp-long-form-actions.affix').css('margin-left', (0));
				}
			});
			$(window).scroll(function() { 
				var w = $('.aj-imp-right').width();
				$('.aj-imp-long-form-actions.affix').width(w);

				var m = $('.aj-imp-left').width();
				$('.aj-imp-long-form-actions.affix').css('margin-left', (m));

				if( $(window).width()< 768){
					var w = $('window').width();
					$('.aj-imp-long-form-actions.affix').width(w);

					$('.aj-imp-long-form-actions.affix').css('margin-left', (0));
				}
			});
			$(window).resize(function() { 
				var w = $('.aj-imp-right').width();
				$('.aj-imp-long-form-actions.affix').width(w);

				var m = $('.aj-imp-left').width();
				$('.aj-imp-long-form-actions.affix').css('margin-left', (m));

				if( $(window).width()< 768){
					var w = $('window').width();
					$('.aj-imp-long-form-actions.affix').width(w);

					$('.aj-imp-long-form-actions.affix').css('margin-left', (0));
				}
			});

			/* js for dashboard --scroll indicators */
			$.fn.justtext = function() {
				   return $(this).clone()
				           .children()
				           .remove()
				           .end()
				           .text();
			};
			
			// Global var to cache info about indicators for easy access. 
			var indicators = [];
			var rawIndicators = "";
			var $articles = $(".scroll-indicator-container");
			
			// Create a bubble for each article
			$articles.each(function(index, article){
				var iInverse = $articles.length - index - 1;
				var margins = 'margin: ' + (index+0.5) + 'em 0 ' + (iInverse+0.5) + 'em 0;'; 
				var text = $(article).find(".scroll-ref").justtext();
				rawIndicators +=  '<a class="indicator indicator--upcoming" style="' + margins + '" href="#' + article.id + '"><span class="indicator-tooltip">' + text + '</span></a>';
			});


			this.$el.append(rawIndicators);

			  // Utility function to calculate the proper top coordinate for a bubble when it's on the move (position: absolute)
			  var getNodeTopPos = function(indicator, target) {
				var indMargTop = parseInt(indicator.css("margin-top").replace("px", ""));
				var targCenter =  target.outerHeight(false)/2;
				var indCenter = indicator.outerHeight(false)/2;
				return target.offset().top - indMargTop + targCenter - indCenter;
			  }


			  // 
			  // INITIAL SET UP OF INDICATOR OBJECT
			  //

			  var calcIndicatorInfo = function(){

				indicators = []
				$(".indicator").each(function(){
				  
				  var o = {
					$indicator: $(this),
					$target: $( $(this).attr("href") ),
					$targetTitle: $( $(this).attr("href") + " .scroll-ref" )
				  };

				  // When it's abs positioned (on the move), this is the top pos
				  o.absPos = getNodeTopPos(o.$indicator, o.$targetTitle); 

				  // When it's abs positioned, at this scroll pos we should make the indicator fixed to the bottom
				  o.absBottomStop = window.innerHeight - (o.absPos + o.$indicator.outerHeight(true));

				  // Top / bottom stops for being 'viewable'
				  o.viewableTopStop = o.$target.offset().top - window.innerHeight;
				  o.viewableBottomStop = o.$target.offset().top + o.$target.outerHeight();
				  indicators[indicators.length] = o;
				  
				});
			  };

			  //
			  // ON RESIZE FUNCTION - UPDATE THE CACHED POSITON VALUES
			  //

			  var initIndicators = function() {
				calcIndicatorInfo();
				// Bug fix - without timeout scroll top reports 0, even when it scrolls down the page to last page loaded position
				// http://stackoverflow.com/questions/16239520/chrome-remembers-scroll-position
				setTimeout(function(){
				  var st = $(document).scrollTop();
				  _.each(indicators, function(p){
					if(st<=p.absPos && st>=(-1*p.absBottomStop))
					  p.$indicator.removeClass("indicator--upcoming").removeClass("indicator--passed").addClass("indicator--active")
						  .css({ "top" : p.absPos });
					else if(st>=(-1*p.absBottomStop)) 
					  p.$indicator.removeClass("indicator--active").removeClass("indicator--upcoming").addClass("indicator--passed").css({ "top" : "" });
					else
					  p.$indicator.removeClass("indicator--active").removeClass("indicator--passed").addClass("indicator--upcoming").css({ "top" : "" });
					
					if(st>=p.viewableTopStop && st<=(p.viewableBottomStop))
					  p.$indicator.addClass("indicator--viewing");
					else
					  p.$indicator.removeClass("indicator--viewing");
				  });
				}, 0);
			  }

			  //
			  // SCROLL FUNCTION - UPDATE ALL OF THE INDICATORS
			  //

			  var adjustIndicators = function() {
				var st = $(document).scrollTop();

				// The indicators that SHOULD be scrolling
				var anticipated = _.filter(indicators, function(o) { return (st<=o.absPos && st>=(-1*o.absBottomStop)) });

				// The $ elements that are indeed scrolling
				var active$ = $(".indicator--active");

				// Anything in anticipated that isn't in active should be activated ...
				var needsActivation = _.filter(anticipated, function(o) { return !_.contains(active$, o.$indicator[0]); })

				// ... And anything thats in active that isn't in anticipated needs to be stopped. 
				var anticipatedEls = _.pluck(anticipated, "$indicator");
				var needsDeactivation = _.filter(active$, function(o) { 
				  return !_.find(anticipatedEls, function(e){ return e[0] == o }); 
				});

				// Do the Activation
				_.each(needsActivation, function(o) {
				  o.$indicator
					.removeClass("indicator--upcoming").removeClass("indicator--passed")
					.addClass("indicator--active")
					.css({ "top" : o.absPos })
				});

				_.each(needsDeactivation, function(i$){
				  var indicator = _.find(indicators, function(i) {
					return i.$indicator[0] == i$;
				  });
				  if(st>=indicator.absPos) {
					// Went off top. now passed. 
					indicator.$indicator.removeClass("indicator--active").addClass("indicator--passed").css({ "top" : "" });
				  }
				  else {
					// Went off bottom. now upcoming. 
					indicator.$indicator.removeClass("indicator--active").addClass("indicator--upcoming").css({ "top" : "" });
				  }
				});

				$(indicators).each(function(){
				  if(st>=this.viewableTopStop && st<=(this.viewableBottomStop))
					this.$indicator.addClass("indicator--viewing");
				  else
					this.$indicator.removeClass("indicator--viewing");
				});

			  }

			  //
			  // BIND EVENTS
			  //

			  $(document).scroll(function() {
				adjustIndicators();
			  });
			  $(window).resize(function() {
				initIndicators();
				adjustIndicators();
			  });
			  
			  initIndicators();
			  adjustIndicators();
			  
			  $(".indicator").click(function(e){
			  	e.preventDefault();
			  	$('html, body').animate({
			        scrollTop: $($(e.target).attr('href')).offset().top - 110
			    }, 1000);
				initIndicators();
				adjustIndicators();
			  })
 		
				 	
			return this;
			
		},
		
		
		
		/**
		 * Function to fetch all room facilities, addon types, date ranges & plans 
		 */
		fetchAllFacilities : function(editRoomModel1){
			
			var self_ = this;
						
			var data = {action:'fetch_all_room_facilities'}
			var allFacilities = ''
			$.post(	AJAXURL,
					data,
					function(response){
				
						if(response.code=='OK'){
						 
						 	self_.allFacilities  = response.data;
							if(!_.isUndefined(editRoomModel1))
							{    
								self_.renderTemplate(editRoomModel1);
							}
							else
								self_.renderTemplate();
							
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
				  return;
				  
               if (!this.$el.find('#frm_roomdesc').parsley('validate'))
				  return;
               
               $(evt.target).prop('disabled',true)
               $(evt.target).next().show();	  
					  
               var roomcategory 		= $("#roomcategory").val();
               var roomnos 				= $("#roomnos").val();
               var roomdescription 		= $("#roomdescription").val();
               var checkinformat 		= $('input[type="radio"][name="checkin_format"]:checked').val();
               var checkintime        	= $("#checkin_time").val();
               var additionalpolicies 	= $("#additional_policies").val();
               var tax_option 			= $('input[type="radio"][name="tax_option1"]:checked').val() ;
               var room_attachments 	= $('#hdn_roomattachments').val();
               var roomFeaturedImg 		= $('#hdn_roomfeaturedimg').val();
               var facilityValues = new Array();
					  
               //Read checked facillities
               $.each($("input[name='facility[]']:checked"),
               function () {
				  facilityValues.push($(this).val());
               });
				    
               facilityValues.join (", ");
			  
               var plantariffids = $('#hdn_plantariffids').val();
               
               var room = new RoomModel();
			  
			  
               var data = { 
					  	 	'category'			: roomcategory, 
					  	 	'nos'				: roomnos,
					  	 	'description' 		: roomdescription,
					  	 	'facilities'		: facilityValues,
					  	 	'checkinformat'		: checkinformat,
					  	 	'checkintime'		: checkintime,
					  	 	'additionalpolicies': additionalpolicies,
					  	 	'tax_option'		: tax_option,
					  	 	'room_attachments'	: room_attachments,
					  	 	'roomfeaturedimg'	: roomFeaturedImg,
					  	 	'plantariffids'		: plantariffids
					  	 	
					};
			  
			  room.saveRoomData(data, {
					event : evt,
					_self:self,
					success :self.saveSuccess,
					failure :self.saveFailure,
					addroomtoCollection : self.addRoomModeltoCollection
					
				});
			   
				  
				  /*	$(evt.target).next().show();
					
					var self = this;*/
				 
			 			
		},
		
		
		/**
		 * Function to add room modal to collection
		 * @param room
		 * @param self
		 * @param evnt
		 */
		addRoomModeltoCollection : function(room,self,evnt) {
			 	
			self.$el.find('.has-error').removeClass('has-error')
			self.$el.find('.has-success').removeClass('has-success')
			
			$(evnt.target).prop('disabled',false)
		 	self.$el.find('#frm_addroom')[0].reset();
			self.$el.find('#frm_roomdesc')[0].reset();
			 
			if(appHasProperty('roomCollection')){							 
				getAppInstance().roomCollection.add(room);
			}
		},
		
		 /**
		 * Function to update room
		 * @param evt
		 */
		updateRoom : function(evt) {
			
               var self = this;
			
               if (!this.$el.find('#frm_addroom').parsley('validate'))
				  return;
				  
               if (!this.$el.find('#frm_roomdesc').parsley('validate'))
				  return;
               
               $(evt.target).prop('disabled',true)
               $(evt.target).next().show();	  
					  
               var roomcategory 		= $("#roomcategory").val();
               var roomnos 				= $("#roomnos").val();
               var roomdescription 		= $("#roomdescription").val();
               var checkinformat 		= $('input[type="radio"][name="checkin_format"]:checked').val()
               var checkintime        	= $("#checkin_time").val();
               var additionalpolicies 	= $("#additional_policies").val();
               var tax_option 			= $('input[type="radio"][name="tax_option1"]:checked').val() 
               var room_attachments 	= $('#hdn_roomattachments').val();
               var roomFeaturedImg 		= $('#hdn_roomfeaturedimg').val();
               var roomId 				= $('#hdn_roomId').val();
               var facilityValues = new Array();
					  
               //Read checked facillities
               $.each($("input[name='facility[]']:checked"),
               function () {
				  facilityValues.push($(this).val());
               });
				    
               facilityValues.join (", ");
			  
               var plantariffids = $('#hdn_plantariffids').val();
               
               var data = { 
				  	 	'category'			: roomcategory, 
				  	 	'nos'				: roomnos,
				  	 	'description' 		: roomdescription,
				  	 	'facilities'		: facilityValues,
				  	 	'checkinformat'		: checkinformat,
				  	 	'checkintime'		: checkintime,
				  	 	'additionalpolicies': additionalpolicies,
				  	 	'tax_option'		: tax_option,
				  	 	'room_attachments'	: room_attachments,
				  	 	'roomfeaturedimg'	: roomFeaturedImg,
				  	 	'plantariffids'		: plantariffids,
				  	 	'roomid'			: roomId
				  	 	
				  	 	
				};
                
               room = getAppInstance().roomCollection.get(roomId)
               
               
              // var room = new RoomModel(data);
			  
			 	  
			  room.updateRoomData(data, {
					event : evt,
					_self:self,
					success :self.saveSuccess,
					failure :self.saveFailure
					//addroomtoCollection : self.addRoomModeltoCollection
					
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
										+'<span class="hidden inputEditFacility" > '
										+'	<form name="frm_editfacility" id="frmeditfacility-'+response.facililty.term_id+'"   > '
							 			+'		<input type="text" class="form-control input-sm"  '
							 			+'				placeholder="Edit Facility" name="inputfacility-'+response.facililty.term_id+'" id="inputfacility-'+response.facililty.term_id+'"' 
							 			+'				parsley-validation-minlength="0" '
							 			+'				value="'+$('#new_facilityname').val()+'"   >'
							 			+'	</form>'
							 			+'</span>'
										
										+'</label>'
										+'<div class="action">'
										+'<a href="javascript:void(0)" class="edit"  term-id="'+
										response.facililty.term_id+'">Edit</a>&nbsp;<a href="javascript:void(0)" class="cancel_editfacility hidden"  term-id="'+
										response.facililty.term_id+'">Cancel</a>&nbsp;<a href="javascript:void(0)"'
										+'class="delete" term-id="'+response.facililty.term_id+'">Delete</a>'
										+'</div>'
										+'</div>' );
							 	
							 	
							 	self_.$el.find('input[type="checkbox"]').checkbox();
							 	self_.$el.find('#new_facilityname').val("");
							 	response.inlineresultmsg = true;
							 	response.facilitymsgspan = true;
								self_.saveSuccess(response,evt_,self_);  
							}
							else{
								 response.inlineresultmsg = true;
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
			 
			if( $(evt.target).is(":checked") ){ // check if the radio is checked
				var val = $(evt.target).val(); // retrieve the value
				//alert(val)
            }
			
		},
		
		
		
		
		/**
		 * Function to show add tax model
		 * @param evt
		 */
		showAddTaxModal : function(evt){
			 
			
			 var addTaxModal = _.bind(function(_, AddTaxModal) {
				    
				 
				 if(this.isEventListenedTo('new-tax-added')){
					 
					ImpruwDashboard.vent.trigger('modal-closed'); //stop listening to any previous  add tax events
				 }
					 
				 	
                    
				 	var addTax = this.popupViewManager.findByCustom("add-tax-popup");

                    //ensure Menu manager is created just once
                    if (_.isUndefined(addTax)){
                        addTax = new AddTaxModal();
                        this.popupViewManager.add(addTax, "add-tax-popup");
                    }

                    //start listening event
                    this.listenToOnce(ImpruwDashboard.vent, 'new-tax-added', this.newTaxAdded);
                    

                    //modal hide event
                    this.listenTo(ImpruwDashboard.vent, 'modal-closed', this.stopListeningEvents);

                    addTax.open();

                }, this); 

                require(['underscore', 'addtaxmodal'], addTaxModal);
		},
		
		
		/*functino triggered when new tax is saved */
		newTaxAdded:function(response,evt_){
			ImpruwDashboard.vent.trigger('modal-closed');
			//this.stopListening(ImpruwDashboard.vent, 'new-tax-added');
			 
			self_ = this ;
			response.model = true
			
		 	 
			if(response.code=='OK'){
				
			
				if($('#tax_list').hasClass('hidden'))
					$('#tax_list').removeClass('hidden')
					$("#tax_list").find('.no-data').remove();
					
					$("#tax_list").append(''+
							'<tbody id="blocktaxtype-'+response.taxData.id+'">'+
							'<td id="block_edittaxtype-'+response.taxData.id+'">'+
							
							
							'	<span class="lbl_tax">'+response.taxData.name+'</span>'+
							'	<div class="form-group hidden">'+ 
							'		<div class="">'+
							'			<input type="text" class="form-control" name="input_edittaxtype-'+response.taxData.id+'" id="input_edittaxtype-'+response.taxData.id+'"'+ 
							'					placeholder="Service Tax" required parsley-trigger="blur" parsley-validation-minlength="0"'+
							'					parsley-required-message = "Please enter tax type"   value="'+response.taxData.name+'"  />'+
							'			<div class="p-messages"></div>'+
							'		</div>'+
							'	</div>	'+  
							
							'</td>'+
							'<td id="block_edittaxpercent-'+response.taxData.id+'" >'+
							
							
							'	<span class="lbl_tax">'+response.taxData.percent+'</span>'+
							'	<div class="form-group hidden">'+  
							'		<div class="">'+
							'			<input type="text" class="form-control" name="input_edittaxprice-'+response.taxData.id+'"  id="input_edittaxprice-'+response.taxData.id+'" '+ 
							'				placeholder="12.5%"" required parsley-trigger="blur" parsley-validation-minlength="0"  '+
							'				parsley-required-message = "Please enter percentage"   value="'+response.taxData.percent+'"  />  '+
							'				<div class="p-messages"></div> '+	 															
							'		</div> '+
							'	</div> '+
							
							'</td>'+
							'<td>'+
							'	<a href="javascript:void(0)" class="edit-link edit-taxlink" taxtype-id="'+response.taxData.id+'"  > '+
							'		<span class="glyphicon glyphicon-pencil"  taxtype-id="'+response.taxData.id+'" ></span> Edit</a>'+
							'	<a href="javascript:void(0)" class="edit-link cancel-taxlink hidden" taxtype-id="'+response.taxData.id+'" >'+
							'		<span class="glyphicon glyphicon-ban-circle"  taxtype-id="'+response.taxData.id+'" ></span> Cancel</a>'+
							'	<a href="javascript:void(0)" class="delete-link delete-taxlink" taxtype-id="'+response.taxData.id+'">'+
							'		<span class="glyphicon glyphicon-trash"  taxtype-id="'+response.taxData.id+'" ></span> Delete</a>'+
							'</td>'+
					'</tbody>');
				
				/*self_.$el.find('input[type="checkbox"]').checkbox();*/
			 	/*self_.$el.find('#new_facilityname').val("");*/
				 self_.saveSuccess(response,evt_,self_); 
				 
				 var addTax = this.popupViewManager.findByCustom("add-tax-popup");
				 setTimeout(function(){
					 addTax.hide();
				   }, 2100);
			}
			else{
				 self_.saveFailure(response,evt_,self_);  
				
			}
				
		 	
			
		},
        
		
		 
        
        /**
		 * Function to show add plan model
		 * @param evt
		 */
		showAddPlanModal : function(evt,plandetails){
			 
			 var addPlanModal = _.bind(function(_, AddPlanModal) {

				 
				 	if(this.isEventListenedTo('new-plan-added')){
				 		 
						ImpruwDashboard.vent.trigger('add-plan-closed'); //stop listening to any previous  add tax events
				 	}
				 	
				 	if(this.isEventListenedTo('plan-updatesaved')){
				 		 
						ImpruwDashboard.vent.trigger('edit-plan-closed'); //stop listening to any previous  add tax events
				 	}
				  	 
				 	
                    var addPlan = this.popupViewManager.findByCustom("add-plan-popup");

                  //ensure plan-popup is created just once
                    if (_.isUndefined(addPlan)){
                        addPlan = new AddPlanModal();
                        this.popupViewManager.add(addPlan, "add-plan-popup");
                    }

                    if(_.isUndefined(plandetails)){
                    	
                     	 //start listening event
                        this.listenToOnce(ImpruwDashboard.vent, 'new-plan-added', this.newPlanAdded);
                        //modal hide event
                        this.listenTo(ImpruwDashboard.vent, 'add-plan-closed', this.stopListeningEvents);
                        addPlan.open();
                        
                        
                    }
                    else{
                    	this.listenToOnce(ImpruwDashboard.vent, 'plan-updatesaved', this.planUpdateSaved);
                    	//modal hide event
                        this.listenTo(ImpruwDashboard.vent, 'edit-plan-closed', this.stopListeningEvents);
                        addPlan.open({plandata:plandetails});
                    }
                    var daterange_id = $(evt.target).attr('daterange-id')
        			$('#hdn_daterange').val(daterange_id)
                       
                }, this); 

                require(['underscore', 'addplanmodal'], addPlanModal);
			
			
		},
		
		/**
		 *	 Function triggered when new plan is added 
		 */
		newPlanAdded : function(response,evt_){
			ImpruwDashboard.vent.trigger('add-plan-closed');
			
			if(response.code=="OK"){
				 
				this.saveSuccess(response,evt_,this);  
				
				$('.daterangeplan-table').append('<tr>'+
						 '<td>'+
							'<a href="#plan1" data-toggle="modal">'+response.plandata.plan+'</a>'+
						'</td>   ' +
						'<td>    ' +
							 response.plandata.plandescription+  
						'</td>   ' +
						'<td> -  ' +
						'</td>   ' +
						'<td> -  ' +							
						'</td>   ' +
						'<td>    ' +						 
						'<a href="javascript:void(0)" class="editplan_link" planid="'+response.plandata.planid+'"    ><span class="glyphicon glyphicon-pencil"></span> Edit Plan</a>'+
						'<a href="javascript:void(0)" class="addtariff_link" planid="'+response.plandata.planid+'"    ><span class="glyphicon glyphicon-plus"></span> Add Tariff</a>'+
						'<a href="javascript:void(0)" class="edit-link edittariff-link  hidden"  planid="'+response.plandata.planid+'"   date-range-plan-tariffid=""  ><span class="glyphicon glyphicon-pencil"></span> Edit Tariff</a>'+
					'</td>'+
					'</tr>');
				
				
				 
			}
			else{
				this.saveFailure(response,evt_,this);  
			}
				
			
		},
		
		
		/**
		 *	 Function triggered when plan is updated
		 */
		planUpdateSaved : function(response,evt_){
			ImpruwDashboard.vent.trigger('edit-plan-closed');
			
			if(response.code=="OK"){
				 
				this.saveSuccess(response,evt_,this);  
				 
			 	
				this.$el.find('.plan-row-'+response.plandata.plan_id)
					.find('.block-plan-description').html(response.plandata.plan_description)
					
				this.$el.find('.plan-row-'+response.plandata.plan_id)
						.find('.block-plan-name a').html(response.plandata.plan_label);
				  
				$(evt_.target).closest('tr .block-plan-description').html(response.plandata.plan_description)
			   
			}
			else{
				this.saveFailure(response,evt_,this);  
			}
				
			
		},
		
		/**
		 * Function to delete plan
		 */
		deleteplan : function(evt){
			
			var evt_ = evt;
			var self_ = this;
			 
			
			var planid = $(evt.target).attr('planid');
			
			 var data = {	  action		: 'delete_plan_ajx',
				  	  		  planid  : planid	
				  };
		  
			 
			$.post(	AJAXURL,
					data,
					function(response){
						 
						if(response.code=='OK'){
							
							
							response.inlineresultmsg = true;
						 	response.daterangemsgspan = true;
							self_.saveSuccess(response,evt_,self_); 
							
							$(evt_.target).parent().parent().remove();
							
						}
						else{
							esponse.inlineresultmsg = true;
						 	response.daterangemsgspan = true;
							self_.saveFailure(response,evt_,self_); 
							
							}						
					});
			
		},
        
		
		
		
		
		
		
		
		/**
		 * Function to show edit tariff popup modal
		 * Fetch tariff data and show popup modal
		 * @param evt
		 */
		editTariffModelData	: function(evt){
			
			var evt_ = evt;
			var self_ = this;
			
			var daterange_plan_tariff_id = $(evt.target).attr('date-range-plan-tariffid')
				
			var data = {		action					: 'fetch_daterange_plan_tariff_data_ajx',						 
								daterange_plan_tariff_i :  daterange_plan_tariff_id 								 
						};
			 
			
			$.post(	AJAXURL,
					data,
					function(response){ 
					 
						if(response.code=='OK'){		
							 self_.showTariffModal(evt_,response.dateTariff)
						 
						}
						else{
							/*$(evt.target).html('Save');
							$(evt.target).prop('disabled',false);
							 */
							self_.saveFailure(response,evt_,self_);
						} 
				
			 });
			
		},
		
		
		
		
		
		
		
		
		
		
		
		
		 /**
		 * Function to show add tariff modal
		 * @param evt
		 */
		showTariffModal : function(evt,dateplanTariff){
		 	
			 var addTariffModal = _.bind(function(_, AddTariffModal) {

				 	if(this.isEventListenedTo('new-tariff-added')){
				 		 
						ImpruwDashboard.vent.trigger('add-tariff-closed'); //stop listening to any previous  add tax events
				 	}
				 	
				 	if(this.isEventListenedTo('tariff-updated')){
				 		 
						ImpruwDashboard.vent.trigger('edit-tariff-closed'); //stop listening to any previous  add tax events
				 	}
				 
				 	 
                    var addTariff = this.popupViewManager.findByCustom("add-tariff-popup");

                    //ensure Menu manager is created just once
                    if (_.isUndefined(addTariff)){
                        addTariff = new AddTariffModal();
                        this.popupViewManager.add(addTariff, "add-tariff-popup");
                    }

                    
                    if(_.isUndefined(dateplanTariff)){
                    	//start listening event
                        this.listenToOnce(ImpruwDashboard.vent, 'new-tariff-added', this.newTariffAdded);

                        //modal hide event
                        this.listenTo(ImpruwDashboard.vent, 'add-tariff-closed', this.stopListeningEvents);

                        addTariff.open();                    	
                    }
                    else{
                    	//start listening event
                        this.listenToOnce(ImpruwDashboard.vent, 'tariff-updated', this.tariffupdated);

                        //modal hide event
                        this.listenTo(ImpruwDashboard.vent, 'edit-tariff-closed', this.stopListeningEvents);

                        addTariff.open({daterangePlanTariff: dateplanTariff});
                        var daterangePlanTariffId = $(evt.target).attr('date-range-plan-tariffid')
                        $('#hdn_dateplantariff').val(daterangePlanTariffId);
                    	
                    }
                    	
                    
                   
                    var daterangeId = $(evt.target).closest('.daterangeplan-table').attr('daterange-id')
        			var planId 		= $(evt.target).attr('planid')
                    $('#hdn_daterangeId').val(daterangeId)
                    $('#hdn_planId').val(planId) 

                }, this); 

                require(['underscore', 'addtariffmodal'], addTariffModal);
			
			
		},
		
		/**
		 *	 Function triggered when new plan is added 
		 */
		newTariffAdded : function(response,evt_){
			ImpruwDashboard.vent.trigger('add-tariff-closed');
			
			if(response.code=="OK"){
				
				var planRow = $('#planlist_'+response.tariffdata.daterangeid).find('.plan-row-'+response.tariffdata.planid);
				
				planRow.find('.block-plan-weekday-tariff').html('$ '+response.tariffdata.weekdaytariff);
				planRow.find('.block-plan-weekend-tariff').html('$ '+response.tariffdata.weekendtariff);
				planRow.find('.block-plan-tariff-action').find('.edittariff-link')
						.attr('date-range-plan-tariffid',response.tariffdata.daterangePlanTariffId).removeClass('hidden')
				
				planRow.find('.block-plan-tariff-action').find('.addtariff_link').addClass('hidden')		
				
				var inputPlanTariffIds =  $('#hdn_plantariffids').val();
				 
				if($('#hdn_plantariffids').val()=="")
					$('#hdn_plantariffids').val(response.tariffdata.plantariffid);
				else
					$('#hdn_plantariffids').val(inputPlanTariffIds+','+response.tariffdata.plantariffid);
				  
				this.saveSuccess(response,evt_,this);  
				  
			}
			else{
				this.saveFailure(response,evt_,this);  
			}
				
			
		},
		
		/**
		 * Function triggered when tariff is updated
		 */
		tariffupdated : function(response,evt_){
			
			
			ImpruwDashboard.vent.trigger('edit-tariff-closed');
			 
			if(response.code=="OK"){
				
				
				var planRow = $('#planlist_'+response.tariffdata.daterangeid).find('.plan-row-'+response.tariffdata.planid);
				 
				
				planRow.find('.block-plan-weekday-tariff').html('$ '+response.tariffdata.weekdaytariff);
				planRow.find('.block-plan-weekend-tariff').html('$ '+response.tariffdata.weekendtariff);
				planRow.find('.block-plan-tariff-action').find('.edittariff-link')
						.attr('date-range-plan-tariffid',response.tariffdata.daterangePlanTariffId).removeClass('hidden')
						
				
				var inputPlanTariffIds =  $('#hdn_plantariffids').val();
			 
				if($('#hdn_plantariffids').val()=="")
					$('#hdn_plantariffids').val(response.tariffdata.plantariffid);
				else
					$('#hdn_plantariffids').val(inputPlanTariffIds+','+response.tariffdata.plantariffid);
				  
				this.saveSuccess(response,evt_,this);  
				  
			}
			else{
				this.saveFailure(response,evt_,this);  
			}
			
		},
		
		
		
        /**
		 * Function to show add tax model
		 * @param evt
		 */
		showAddAddOnModal : function(evt){
			 
			 var addAddOnModal = _.bind(function(_, AddAddOnModal) {
				 	 
				 	
				 	if(this.isEventListenedTo('new-add-on-added')){
				 		ImpruwDashboard.vent.trigger('modal-closed'); //stop listening to any previous  add addon events
				 	}
				 	 
				 
                    var addOn = this.popupViewManager.findByCustom("add-addon-popup");

                    //ensure Menu manager is created just once
                    if (_.isUndefined(addOn)){
                        addOn = new AddAddOnModal();
                        this.popupViewManager.add(addOn, "add-addon-popup");
                    }

                    //start listening event
                    this.listenToOnce(ImpruwDashboard.vent, 'new-add-on-added', this.newAddOnAdded);
                    //modal hide event
                    this.listenTo(ImpruwDashboard.vent, 'modal-closed', this.stopListeningEvents);

                    addOn.open();

                }, this); 

                require(['underscore', 'addaddonmodal'], addAddOnModal);
			
			
		},
		
		/* function lilstner view */ 
		newAddOnAdded : function(response,evt_){
			
			ImpruwDashboard.vent.trigger('modal-closed');
			
			response.model = true
			 
			if(response.code=='OK'){
				
				if($('#addons_list').hasClass('hidden'))
			 		$('#addons_list').removeClass('hidden')
			 	
			    $("#addons_list").find('.no-data').remove();
				
			 	$("#addons_list").append(''+
				 	'<tbody id="blockaddontype-'+response.addontype.id+'">'+
					'<td id="block_editaddontype-'+response.addontype.id+'">'+
			 		
						'<span class="lbl_addon">'+response.addontype.label+'</span>'+
						'<div class="form-group hidden"> '+ 
				 			'<div class="">'+
								'<input type="text" class="form-control" name="input_editaddontype-'+response.addontype.id+'" id="input_editaddontype-'+response.addontype.id+'"  '+
									'placeholder="Scuba diving" required parsley-trigger="blur" parsley-validation-minlength="0" '+
									'parsley-required-message = "Please enter addon type"    value="'+response.addontype.label+'"  /> '+
									'<div class="p-messages"></div> '+
							'</div> '+
						'</div> '+
				 	
					
					'</td>'+
					'<td id="block_editaddonprice-'+response.addontype.id+'" >'+ 
						'<span class="lbl_addon">'+response.addontype.price+'</span>'+
						'<div class="form-group hidden"> '+
							'<div class="">'+
								'<input type="text" class="form-control"  name="input_editaddonprice-'+response.addontype.id+'"  id="input_editaddonprice-'+response.addontype.id+'" '+
								'placeholder="12.99" required parsley-trigger="blur" parsley-validation-minlength="0"  '+
								'parsley-required-message = "Please enter price"   value="'+response.addontype.price+'"   />  '+
								'<div class="p-messages"></div> '+
							'</div> '+
						'</div>  '+
					'</td>'+
					'<td>'+
						'<a href="javascript:void(0)" class="edit-link edit-addonlink" addontype-id="'+response.addontype.id+'"  > '+
							'<span class="glyphicon glyphicon-pencil"  addontype-id="'+response.addontype.id+'"></span> Edit</a>'+
						'<a href="javascript:void(0)" class="edit-link cancel-addonlink hidden" addontype-id="'+response.addontype.id+'">'+
						'	<span class="glyphicon glyphicon-ban-circle"  addontype-id="'+response.addontype.id+'"></span> Cancel</a>'+
						'<a href="javascript:void(0)" class="delete-link delete-addonlink" addontype-id="'+response.addontype.id+'">'+
							'<span class="glyphicon glyphicon-trash"  addontype-id="'+response.addontype.id+'"></span> Delete</a>'+
					'</td>'+
			 	'</tbody>');
				
				 this.saveSuccess(response,evt_,this);  
				 var addOn = this.popupViewManager.findByCustom("add-addon-popup");
				 setTimeout(function(){
					 addOn.hide();
				   }, 2100);
				 
			}
			else{ 
				 
				 this.saveFailure(response,evt_,this);  				
			}
			
		},
		
		
		
		
		 /**
		 * Function to show add daterange modal
		 * @param evt
		 */
		showAddDateRangeModal : function(evt){
			
			
			if(this.isEventListenedTo('new-date-range-added')){
				 
				ImpruwDashboard.vent.trigger('modal-closed'); //stop listening to any previous  add daterange events
		 	}
			
			 
			
			 var addDaterangeModal = _.bind(function(_, AddDateRangeModal) {

                    var dateRange = this.popupViewManager.findByCustom("add-daterange-popup");

                    //ensure Menu manager is created just once
                    if (_.isUndefined(dateRange)){
                        dateRange = new AddDateRangeModal();
                        this.popupViewManager.add(dateRange, "add-daterange-popup");
                    }

                    //start listening event
                    this.listenToOnce(ImpruwDashboard.vent, 'new-date-range-added', this.newDateRangeAdded);

                    //modal hide event
                    this.listenTo(ImpruwDashboard.vent, 'modal-closed', this.stopListeningEvents);
                    dateRange.open();
                    

                }, this); 

                require(['underscore', 'adddaterangemodal'], addDaterangeModal); 
			
			
		},
		
		/**
		 * Triggered when new date  range added.
		 * appends new date range element to daterange list
		 * @param response
		 * @param evt_
		 */
		newDateRangeAdded : function(response,evt_){
			response.model = true;
			 
			if(response.code=='OK'){
			 	
				var dateRangePlanFn = _.bind(function(DaterangePlanTpl){
					
					var html = _.template(DaterangePlanTpl, {daterange : response.daterange});
					
					$('#tbl_daterangelist').append(html)
					
					//this.$el.find('tbody').append(html);
				}, this);
				
				require(['text!templates/siteprofile/DaterangePlansTpl.tpl'],dateRangePlanFn );
			 	  
				
				
				$('#rowlink'+response.daterange.id).collapse({
	                toggle : true 
	            });
				
				response.popupmodel = true;
				
				this.saveSuccess(response,evt_,this);  //show success message
				
				//hide daterange popup model
				var dateRange = this.popupViewManager.findByCustom("add-daterange-popup");
				
				setTimeout(function(){     
					 dateRange.hide();
				   }, 2100);
			}
			else{
				  response.popupmodel = true;
				 this.saveFailure(response,evt_,this); 
			}
				
			
		},
		
		/**
		 * Function to delete date range
		 */
		deleteDateRange : function(evt){
			
			var x;
			var r=confirm("Deleting selected date range will, delete all plans under the date range. Are you sure you want to delete the daterange??!");
			if (r==true){
				
					var evt_ = evt;
					var self_ = this;
					 
					
					var daterange_id = $(evt.target).attr('daterange-id');
					
					 var data = {	action			: 'delete_daterange_ajx',
							 		daterange_id  	: daterange_id	
						  };
				  
					 var deleteDateRangeFn = _.bind(function(response){
						 
							if(response.code=='OK'){
								response.inlineresultmsg = true;
							 	response.daterangemsgspan = true;
								this.saveSuccess(response,evt_,this); 
								
								//$(evt_.target).parent().parent().remove();
								$(evt_.target).closest('.table-vc').closest('tr').remove();
							}
							else{
								response.inlineresultmsg = true;
							 	response.daterangemsgspan = true;
							 	this.saveFailure(response,evt_,this); 
								}						
						},this)
						
					$.post(	AJAXURL,
							data,
							deleteDateRangeFn
							);
			}
			
		},
		
		
		/**
		 * Show edit input elements for selected daterange
		 */
		enableEditDateRange : function(evt){
					
			$(evt.target).html('<span class="glyphicon glyphicon-floppy-disk"></span>Save')
			$(evt.target).removeClass('editdaterange_lnk').addClass('savedaterange_lnk');
			$(evt.target).parent().parent().find('.canceleditdaterange_lnk').removeClass('hidden');
			$(evt.target).parent().parent().find('.daterange_frominput').removeClass('hidden');
			$(evt.target).parent().parent().find('.daterange_toinput').removeClass('hidden');
			$(evt.target).parent().parent().find('.daterange_fromtxt').addClass('hidden');
			$(evt.target).parent().parent().find('.daterange_totxt').addClass('hidden');
			
			$(evt.target).parent().parent().find('br').removeClass('hidden')

			
			/*$(evt.target).parent().parent().find('.daterange_fromlabel').addClass('hidden');
			$(evt.target).parent().parent().find('.daterange_tolabel').addClass('hidden');*/
			
		},
		saveDateRange : function(evt){
			 var evt_ = evt;
			 var self_ = this; 
			var from_date = $(evt.target).parent().parent().find('.fromdaterange_input').val();
			var to_date = $(evt.target).parent().parent().find('.todaterange_input').val();
		 	
			var daterange_id = $(evt.target).attr('daterange-id');
			
			 var data = {	action			: 'update_daterange',
					 		daterange_id  	: daterange_id,
					 		from_daterange 	: from_date,
					 		to_daterange 	: to_date
				  };
			 
			 
		  
			 
			$.post(	AJAXURL,
					data,
					function(response){
						 
				
				 
				
				
						if(response.code=='OK'){
							$(evt.target).html('<span class="glyphicon glyphicon-pencil"></span>Edit')
							$(evt.target).addClass('editdaterange_lnk').removeClass('savedaterange_lnk');
							$(evt.target).parent().parent().find('.canceleditdaterange_lnk').addClass('hidden');
							$(evt.target).parent().parent().find('.daterange_frominput').addClass('hidden');
							$(evt.target).parent().parent().find('.daterange_toinput').addClass('hidden');
							$(evt.target).parent().parent().find('.daterange_fromtxt').removeClass('hidden');
							$(evt.target).parent().parent().find('.daterange_totxt').removeClass('hidden');
							
							$(evt.target).parent().parent().find('.daterange_fromlabel').removeClass('hidden');
							$(evt.target).parent().parent().find('.daterange_tolabel').removeClass('hidden');
							
							$(evt.target).parent().parent().find('.daterange_fromtxt').html(response.daterange_data.from_date);
							$(evt.target).parent().parent().find('.daterange_totxt').html(response.daterange_data.to_date);
							
							response.inlineresultmsg = true;
						 	response.daterangemsgspan = true;
							self_.saveSuccess(response,evt_,self_); 
						}
						else{
							
							response.inlineresultmsg = true;
						 	response.daterangemsgspan = true;
							self_.saveFailure(response,evt_,self_);
							
							}						
					});
			
		},
		
		cancelEditRange : function(evt){
		
			$(evt.target).parent().find('.savedaterange_lnk').html('<span class="glyphicon glyphicon-pencil"></span>Edit')
			
			$(evt.target).parent().find('.savedaterange_lnk').addClass('editdaterange_lnk').removeClass('savedaterange_lnk');
			
			
			$(evt.target).parent().parent().find('.canceleditdaterange_lnk').addClass('hidden');
			$(evt.target).parent().parent().find('.daterange_frominput').addClass('hidden');
			$(evt.target).parent().parent().find('.daterange_toinput').addClass('hidden');
			$(evt.target).parent().parent().find('.daterange_fromtxt').removeClass('hidden');
			$(evt.target).parent().parent().find('.daterange_totxt').removeClass('hidden');
			
			$(evt.target).parent().parent().find('.daterange_fromlabel').removeClass('hidden');
			$(evt.target).parent().parent().find('.daterange_tolabel').removeClass('hidden');
 
			$(evt.target).parent().parent().find('br').addClass('hidden')
		},
		
		/**
		 * Function to stop listening to events
		 */
		stopListeningEvents : function(){
			//this.stopListening(SiteBuilder.vent, 'new-add-on-added', this.refetchHtml);
			this.stopListening(ImpruwDashboard.vent, 'new-add-on-added');
			this.stopListening(ImpruwDashboard.vent, 'new-tax-added');
			this.stopListening(ImpruwDashboard.vent, 'new-date-range-added');
			this.stopListening(ImpruwDashboard.vent, 'new-plan-added');
			this.stopListening(ImpruwDashboard.vent, 'new-tariff-added');
		},
		
		/**
		 * Function to check if listening to event
		 * @param eventName
		 * @returns
		 */
		isEventListenedTo: function(eventName) {
			
			if(_.isUndefined(ImpruwDashboard.vent._events))
				return false
				
			if(!_.isUndefined(ImpruwDashboard.vent._events[eventName]))
			  return !!ImpruwDashboard.vent._events[eventName];
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
			 
			
			var deleteFacilityFn = _.bind(function(response){ 
				if(response.code=='OK'){
					response.inlineresultmsg = true;
					response.facilitymsgspan = true;
					this.saveSuccess(response,evt_,this);  
					this.$el.find('#facility-'+facilityId).remove()   
				}
				else{
					response.inlineresultmsg = true;
					response.facilitymsgspan = true;
					this.saveFailure(response,evt_,this);  
					$(evt_.target).prop('disabled',false).html('Delete'); 
				}
		
			}, this);
			
			$.post(	AJAXURL,
					data,
					deleteFacilityFn);	
		  
			
		},
		
		
		/**
		 * Function to delete addontype 
		 */
		deleteAddonType:function(evt){
			  
			
			  $(evt.target).parent().html(function (i, old) {
			     return old
			         .replace('Delete', 'Deleting')								         
			});	
			 $(evt.target).prop('disabled',true);
			  
			
			/* $(evt.target).html('Deleting');
			 $(evt.target).prop('disabled',true);*/
		 
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
						  
							 
							response.inlineresultmsg = true;
							self_.saveSuccess(response,evt_,self_);  
							self_.$el.find('#blockaddontype-'+addonTypeId).remove() 
							
							
							//if addons-list table has only header row and no addons are present in addons list. add empty addon row
							if(self_.$el.find('#addons_list tr').length ==1){
								if(self_.$el.find('#addons_list .no-data').length==0){
									self_.$el.find('#addons_list').append('<tr class="no-data">'+
											'<td>No Add-ons Defined</td>'+
											'<td>No Add-ons Defined</td>'+
											'<td>No Add-ons Defined</td>'+
										'</tr>')
								}
							}
							
						}
						else{
							$(evt_.target).prop('disabled',false);
							$(evt.target).html('Delete');
							response.inlineresultmsg = true;
							 self_.saveFailure(response,evt_,self_);  
						}
				
					});	
		  
			
		},
		
		
		deleteTaxType : function(evt){
			
			$(evt.target).parent().html(function (i, old) {
			     return old
			         .replace('Delete', 'Deleting')								         
			});	
			
			//$(evt.target).html('Deleting');
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
							response.inlineresultmsg = true;
							self_.saveSuccess(response,evt_,self_);
							self_.$el.find('#blocktaxtype-'+taxTypeId).remove()  
							
							//if tax-list table has only header row and no taxexs are present in tax list. add empty tax row
							if(self_.$el.find('#tax_list tr').length ==1){
								if(self_.$el.find('#tax_list .no-data').length==0){
									self_.$el.find('#tax_list').append('<tr class="no-data">'+
											'<td>No Taxes Set</td>'+
											'<td>No Taxes Set</td>'+
											'<td>No Taxes Set</td>'+
										'</tr>')
								}
							}
							
							  
						}
						else{
							$(evt_.target).prop('disabled',false);
							$(evt.target).html('Delete');
							response.inlineresultmsg = true;
							 self_.saveFailure(response,evt_,self_);  
						}
				
					});	
		},
		
		
		/**
		 * Function to edit facililty 
		 */
		editFacility:function(event){
			
			facilityId = $(event.target).attr("term-id");
			var facilityBlock = $(event.target).closest('.facility');
			
			facilityBlock.find('.inputEditFacility').removeClass('hidden')
			facilityBlock.find('.inputEditFacility input').show();
			facilityBlock.find('#facLabel-'+facilityId).addClass('hidden')
			
			
			$(event.target).addClass("savefacililty").removeClass("edit")
			$(event.target).html("Save")
			 $(event.target).parent().find('.cancel_editfacility').removeClass('hidden')
			$("#facLabel-"+facilityId).addClass('input-group');
			 
			this.parsleyInitialize($('#frmeditfacility-'+facilityId));
			
		},
		
		
		/**
		 * Function to cancel edit facility
		 * @param evt
		 */
		cancelEditFacility : function(evt){
			 
			var facilityId = $(evt.target).attr("term-id"); 
			
			var facilityBlock = $(evt.target).closest('.facility');			
			facilityBlock.find('.inputEditFacility').addClass('hidden')
			facilityBlock.find('.inputEditFacility input').hide();			
			facilityBlock.find('#facLabel-'+facilityId).removeClass('hidden')
			
			
			var actionBlock = $(evt.target).closest('.action'); 		
			
			actionBlock.find('.savefacililty').html(function (i, old) {
								     return old
								         .replace('Save', 'Edit')								         
								});	
			actionBlock.find('.savefacililty').removeClass("savefacililty").addClass("edit")
			actionBlock.find('.savefacililty').prop('disabled',false);
			
			$(evt.target).addClass('hidden')	 
			 
		},
		
		/**
		 * Function to edit addon type
		 */
		editAddonType:function(evt){
			
			var addonTypeID = $(evt.target).attr("addontype-id");
			$(evt.target).addClass("saveaddontype").removeClass("edit-addonlink")
			$(evt.target).find('.glyphicon').removeClass('glyphicon-pencil').addClass('glyphicon-floppy-disk')
			
			$(evt.target).html(function (i, old) {
								     return old
								         .replace('Edit', 'Save')
								         
								});	
			var addonType = $('#block_editaddontype-'+addonTypeID).html()
			var addonPrice = $('#block_editaddonprice-'+addonTypeID).html()
		 
			$('#blockaddontype-'+addonTypeID).find('.form-group').removeClass('hidden')
			$('#blockaddontype-'+addonTypeID).find('.lbl_addon').addClass('hidden')
			$(evt.target).parent().find('.cancel-addonlink').removeClass('hidden')
			 
		},
		
		
		/**
		 * Function to cancel edit of addon 
		 */
		cancelEditAddon : function(evt){
			var addonTypeId =  $(evt.target).attr('addontype-id')
			$('#blockaddontype-'+addonTypeId).find('.form-group').addClass('hidden')
		 	
			var addonNameLblSpan = $('#block_editaddontype-'+addonTypeId).find('.lbl_addon') ;
			var addonPriceLblSpan = $('#block_editaddonprice-'+addonTypeId).find('.lbl_addon') ;
			
			addonNameLblSpan.removeClass('hidden')
			addonPriceLblSpan.removeClass('hidden')
			$(evt.target).addClass('hidden')
		 	
			
			var editSaveLink = $(evt.target).parent().find('.saveaddontype');
			editSaveLink.addClass('edit-addonlink').removeClass('saveaddontype');
			
			
			
			editSaveLink.html(function (i, old) {
			     return old
			         .replace('Save', 'Edit')
			         
			});	
			
			editSaveLink.find('.glyphicon').addClass('glyphicon-pencil').removeClass('glyphicon-floppy-disk')
			//$(evt.target).addClass('edit-addonlink').removeClass('saveaddontype')	
			
		},
		
		
		/**
		 * Function to edit tax type
		 * @param evt
		 */
		editTaxType : function(evt){
			
			var taxTypeID = $(event.target).attr("taxtype-id");
			$(event.target).addClass("update-taxlink").removeClass("edit-taxlink")			 
			
			$(evt.target).html(function (i, old) {
								     return old
								         .replace('Edit', 'Save')
								         
								});	
			$(evt.target).find('.glyphicon').removeClass('glyphicon-pencil').addClass('glyphicon-floppy-disk')			
			
			var taxnType = $('#block_edittaxtype-'+taxTypeID).html()
			var taxPercent = $('#block_edittaxpercent-'+taxTypeID).html()
		 
			$('#blocktaxtype-'+taxTypeID).find('.form-group').removeClass('hidden')
			$('#blocktaxtype-'+taxTypeID).find('.lbl_tax').addClass('hidden')
			$(event.target).parent().find('.cancel-taxlink').removeClass('hidden')
			 
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
							   
							 	response.inlineresultmsg = true;
								self_.saveSuccess(response,evt_,self_); 
							  							
								$('#blockaddontype-'+addonTypeId).find('.form-group').addClass('hidden')
							 	
								var addonNameLblSpan = $('#block_editaddontype-'+addonTypeId).find('.lbl_addon') ;
								var addonPriceLblSpan = $('#block_editaddonprice-'+addonTypeId).find('.lbl_addon') ;
								
								addonNameLblSpan.removeClass('hidden')
								addonPriceLblSpan.removeClass('hidden')
								
								addonNameLblSpan.html(response.updatedaddontype.label)
								addonPriceLblSpan.html(response.updatedaddontype.price)
								
								$(evt_.target).parent().find('.cancel-addonlink').addClass('hidden')
								
								$(evt_.target).html(function (i, old) {
								     return old
								         .replace('Save', 'Edit')
								         
								});	
								
								$(evt_.target).find('.glyphicon').addClass('glyphicon-pencil').removeClass('glyphicon-floppy-disk')
								$(evt.target).addClass('edit-addonlink').removeClass('saveaddontype')						
							 	 
							}
							else{
								 response.inlineresultmsg = true;
								 self_.saveFailure(response,evt_,self_);  
							}
					
						});	
		},
		
		
		/**
		 * Function to cancel edit of tax type 
		 * @param evt
		 */
		cancelEditTaxType : function(evt){
			
			 
			var taxTypeID =  $(evt.target).attr('taxtype-id');	
			
			$('#blocktaxtype-'+taxTypeID).find('.form-group').addClass('hidden')

			var taxtype_lbl_span = $('#block_edittaxtype-'+taxTypeID).find('.lbl_tax') ;
			var taxpercent_lbl_span = $('#block_edittaxpercent-'+taxTypeID).find('.lbl_tax') ;
											
			taxtype_lbl_span.removeClass('hidden')
			taxpercent_lbl_span.removeClass('hidden')
			$(evt.target).parent().find('.cancel-taxlink').addClass('hidden')
											
			$(evt.target).parent().find('.update-taxlink').html(function (i, old) {
			     return old
			    .replace('Save', 'Edit')
											         
			});	
											
			$(evt.target).parent().find('.update-taxlink').find('.glyphicon').addClass('glyphicon-pencil').removeClass('glyphicon-floppy-disk')
			$(evt.target).parent().find('.update-taxlink').addClass('edit-taxlink').removeClass('update-taxlink')
			
		},
		
		/**
		 * Function to save updated tax changes
		 */
		updateTaxType : function(evt){
		 
			
			var self_ = this;
			
			var evt_ = evt;
			var taxTypeId =  $(evt.target).attr('taxtype-id')			
			var taxTypeName = $('#input_edittaxtype-'+taxTypeId).val()
			var taxTypePercent = $('#input_edittaxprice-'+taxTypeId).val() 
 
	 		/*if (!this.$el.find('#form_add_addon').parsley('validate'))
				  return;
				 */
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
								
							  	response.inlineresultmsg = true;
								self_.saveSuccess(response,evt_,self_); 
								
								
								$('#blocktaxtype-'+taxTypeId).find('.form-group').addClass('hidden')
								 
								
								var taxtype_lbl_span = $('#block_edittaxtype-'+taxTypeId).find('.lbl_tax') ;
								var taxpercent_lbl_span = $('#block_edittaxpercent-'+taxTypeId).find('.lbl_tax') ;
								
								taxtype_lbl_span.removeClass('hidden')
								taxpercent_lbl_span.removeClass('hidden')
								
								taxtype_lbl_span.html(response.updatedtaxtype.name)
								taxpercent_lbl_span.html(response.updatedtaxtype.percent)
								 
								 $(evt_.target).parent().find('.cancel-taxlink').addClass('hidden')
								
								$(evt_.target).html(function (i, old) {
								     return old
								         .replace('Save', 'Edit')
								         
								});	
								
								$(evt_.target).find('.glyphicon').addClass('glyphicon-pencil').removeClass('glyphicon-floppy-disk')
								$(evt.target).addClass('edit-taxlink').removeClass('update-taxlink')
							 	 
							   
							}
							else{
								 response.inlineresultmsg = true;
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
				 	 
					$(evt_.target).closest('.facility').find('.inputEditFacility').addClass('hidden')
					$(evt_.target).closest('.facility').find('.inputEditFacility input').hide();
					$(evt_.target).closest('.facility').find('#facLabel-'+facilityId).html( $("#inputfacility-"+facilityId).val());
					$(evt_.target).closest('.facility').find('#facLabel-'+facilityId).removeClass('hidden')
					 $(evt_.target).closest('.action').find('.cancel_editfacility').addClass('hidden')
					 $(evt_.target).removeClass("savefacililty").addClass("edit")
					 $(evt_.target).html("Edit")
					 $(evt.target).prop('disabled',false);
						 
					// $("#facLabel-"+facilityId).removeClass('input-group');
					// $("#facLabel-"+facilityId).html( $("#inputfacility-"+facilityId).val());
					 response.inlineresultmsg = true;
					 response.facilitymsgspan = true;
					 self_.saveSuccess(response,evt_,self_);  	 
					 
					 
					 
					 
					 
						
					 
					 
					 
				}
				else{
						$(evt.target).html('Save');
						$(evt.target).prop('disabled',false);
						response.inlineresultmsg = true;
						response.facilitymsgspan = true;
						self_.saveFailure(response,evt_,self_);  
				} 
		
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
				 response.inlineresultmsg = true;
				 if(response.code=='OK'){
				 	 
					 
					 $(evt_.target).parent().find('.taxoption_edit').addClass('hidden')
					 $(evt_.target).parent().find('.delete-taxoption').addClass('hidden')
					 $(evt_.target).parent().find('.taxoptiontext').removeClass('hidden')
					 $(evt_.target).removeClass('save-taxoption').addClass('edit-taxoption');
					 
					 if(response.taxoption.trim()==""){
						 $(evt_.target).parent().find('.taxoptiontext').html('<p class="alert">Please select Tax option</p>')
					 }
					 else{
						 if(response.taxoption.trim()=="With Tax"){
						
							 self_.$el.find('#div_addtax').removeClass('hidden');
							 self_.$el.find('#div_taxlist').removeClass('hidden');	
						 }
						 else{
							 self_.$el.find('#div_addtax').addClass('hidden');
							 self_.$el.find('#div_taxlist').addClass('hidden');
						 }
						 $(evt_.target).parent().find('.taxoptiontext').html(response.taxoption)
					 }
					 
					  
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
			
			$(evt.target).parent().parent().parent().find('.checkinformat_edit').removeClass('hidden')
			$(evt.target).parent().parent().parent().find('.checkinformat_text').addClass('hidden')
			
			$(evt.target).html(function (i, old) {
			     return old
			         .replace('Edit', 'Save')
			         
			});			
			
		},
		
		
		
		/**
		 * Function to cancel edit of checkin time
		 * @param evt
		 */
		cancelCheckintimeUpdate : function(evt_){
			$(evt_.target).addClass('hidden')
			 $(evt_.target).parent().parent().parent().find('.checkinformat_edit').addClass('hidden')
			 $(evt_.target).parent().parent().parent().find('.checkinformat_text').removeClass('hidden')
			 
			  $(evt_.target).parent().find('.checkintime_edittext').addClass('hidden')
					 $(evt_.target).parent().find('.delete-checkintime').addClass('hidden')
					 $(evt_.target).parent().find('.checkintime_text').removeClass('hidden')
					// $(evt_.target).removeClass('save-checkintime').addClass('edit-checkintime');
			
			
			 
			 $(evt_.target).parent().find('.save-checkintime').html(function (i, old) {
			     return old
			         .replace('Save', 'Edit')
			         
			});
			 $(evt_.target).parent().find('.save-checkintime').removeClass('save-checkintime').addClass('edit-checkintime');
			 
		},
		
		
		saveCheckintime : function(evt){
			 
			$(evt.target).prop('disabled',true);
			
			$(evt.target).html(function (i, old) {
			     return old
			         .replace('Save', 'Saving') 
			});
			
			var evt_ = evt;
			var self_ = this;
			
			//var selCheckinFormat = $(evt.target).parent().parent().parent().find('input[type="radio"][name="checkin_format"]:checked').val();
			
			//var selCheckinFormat = $(evt.target).parent().parent().parent().find('input[name=checkin_format]:checked').val();
			
			var selCheckinFormat = $('input[type="radio"][name="checkin_format"]:checked').val();
			
			 
			var data = {	action			: 'update_checkintime',						 
							checkintime 	: $(evt.target).parent().find('#checkin_time').val(),
							checkinformat	: selCheckinFormat
						};
			
			
			$.post(	AJAXURL,
			data,
			function(response){ 
				 
				 if(response.code=='OK'){
				 	 
					 $(evt_.target).parent().parent().parent().find('.checkinformat_edit').addClass('hidden')						
					 $(evt_.target).parent().parent().parent().find('.checkinformat_text').removeClass('hidden')					 
					 
					 $(evt_.target).parent().find('.checkintime_edittext').addClass('hidden')
					 $(evt_.target).parent().find('.delete-checkintime').addClass('hidden')
					 $(evt_.target).parent().find('.checkintime_text').removeClass('hidden')
					 $(evt_.target).removeClass('save-checkintime').addClass('edit-checkintime');
					 
					 if(response.checkinTime.trim()==""){
						 $(evt_.target).parent().find('.checkintime_text').html('<p class="alert">Please enter checkin time.</p>')
					 }
					 else{
						 $(evt_.target).parent().find('.checkintime_text').html(response.checkinTime)
					 }
					 
					 if(response.checkinformat.trim()==""){
						 $(evt_.target).parent().parent().parent().find('.checkinformat_text').html('<p class="alert">Please select Check-in time format</p>')
					 }
					 else{
						 $(evt_.target).parent().parent().parent().find('.checkinformat_text').html(response.checkinformat+"-hour Format")
					 }
					 
					 
					  
					 $(evt_.target).prop('disabled',false);
					 $(evt_.target).html(function (i, old) {
					     return old
					         .replace('Saving', 'Edit')
					         
					});	 
					 response.checkintime = true;
					 response.inlineresultmsg = true;
					 self_.saveSuccess(response,evt_,self_);  	 
					 
				}
				else{
						$(evt.target).html('Save');
						$(evt.target).prop('disabled',false);
						response.inlineresultmsg = true;
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
					 
					 if(response.additionalPolicies.trim()==""){
						 $(evt_.target).parent().find('.addpoliciestext').html('<p class="alert">Add additional policies if any.</p>') 
					 }
					 else{
						 $(evt_.target).parent().find('.addpoliciestext').html(response.additionalPolicies.trim())
					 }
					 
					  
					 $(evt_.target).prop('disabled',false);
					 $(evt_.target).html(function (i, old) {
					     return old
					         .replace('Saving', 'Edit')
					         
					});	 
			 
					 response.inlineresultmsg = true;
					 self_.saveSuccess(response,evt_,self_);  	 
					 
				}
				else{
						$(evt.target).html('Save');
						$(evt.target).prop('disabled',false);
						response.inlineresultmsg = true;
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
		
		
		
		 
		 
		
		/**
		 * 
		 * @param evt
		 */
		editplanModelData	: function(evt){
			
			var evt_ = evt;
			var self_ = this;
				
			var data = {		action			: 'fetch_plan_details_ajx',						 
								plan_id 		:  $(evt.target).attr('planid') 								 
						};
		 
			$.post(	AJAXURL,
					data,
					function(response){ 
					  
						if(response.code=='OK'){		
							 self_.showAddPlanModal(evt_,response.data)
						 
						}
						else{
							/*$(evt.target).html('Save');
							$(evt.target).prop('disabled',false);
							self_.saveFailure(response,evt_,self_);  */
						} 
				
			 });
			
		},
		
		
		 /** Open media manager
		 * @param  {[type]} evt [description]
		 * @return {[type]}     [description]
		 */
		showFeaturedImgFilePopup : function(evt){

			var popupFn = _.bind(function(_, MediaManager) {

                 var mediamanager = getAppInstance().ViewManager.findByCustom("media-manager");

                 //if not present create new
                 if (_.isUndefined(mediamanager)) {
                     mediamanager = new MediaManager();
                     ImpruwDashboard.ViewManager.add(mediamanager, "media-manager");
                 }

                 //start listening to event
                 this.listenTo(getAppInstance().vent,'image-selected', this.roomFeaturedImgSelected);


                 mediamanager.open();

             }, this);

            require(['underscore', 'mediamanager'], popupFn);
			
		},
		
		
		/**
		 * Function triggered when room attachment is selected
		 * @param image
		 * @param size
		 */
		roomFeaturedImgSelected : function(image, size){
		   
			//stop listening to image-selected event
          //   this.stopListening(ImpruwDashboard.vent, 'image-selected', this.updateSelf);

            if (!_.isObject(image))
                throw 'Invalid <image> datatype. Must be an Object';

            this.dataSource = {};

            this.dataSource.attachmentID    = image.get('id');
            this.dataSource.size            = size;
            
           // $("#cloneme").clone().prop({ id: "im-a-clone", name: "im-a-clone" }).appendTo(document.body);

            var attachments =  $('#hdn_roomfeaturedimg').val()
            
            if(attachments.search(this.dataSource.attachmentID)<0){
            	$('.room-featured-img').removeClass('hidden')
            	 $('.room-featured-img').find('img').attr('src',image.get('sizes')[size].url) ;
            	  
            	 $('.room-featured-img').find('.btn_del_featuredimg').attr('attachment-id',image.get('id')) ;
             
            	  
            	 $('#hdn_roomfeaturedimg').val(this.dataSource.attachmentID)
            	  
             } 
			 
		},
		
		
		
		
		
		
		/**
		 * Open media manager
		 * @param  {[type]} evt [description]
		 * @return {[type]}     [description]
		 */
		showFilePopup : function(evt){

			var popupFn = _.bind(function(_, MediaManager) {

                 var mediamanager = getAppInstance().ViewManager.findByCustom("media-manager");

                 //if not present create new
                 if (_.isUndefined(mediamanager)) {
                     mediamanager = new MediaManager();
                     ImpruwDashboard.ViewManager.add(mediamanager, "media-manager");
                 }

                 //start listening to event
                 this.listenTo(getAppInstance().vent,'image-selected', this.roomAttachmentSelected);


                 mediamanager.open();

             }, this);

            require(['underscore', 'mediamanager'], popupFn);
			
		},
		 
		/**
		 * Function triggered when room attachment is selected
		 * @param image
		 * @param size
		 */
		roomAttachmentSelected : function(image, size){
		  
			//stop listening to image-selected event
            this.stopListening(ImpruwDashboard.vent, 'image-selected', this.updateSelf);

            if (!_.isObject(image))
                throw 'Invalid <image> datatype. Must be an Object';

            this.dataSource = {};

            this.dataSource.attachmentID    = image.get('id');
            this.dataSource.size            = size;
            
           // $("#cloneme").clone().prop({ id: "im-a-clone", name: "im-a-clone" }).appendTo(document.body);

            var attachments =  $('#hdn_roomattachments').val()
            
            if(attachments.search(this.dataSource.attachmentID)<0){
            	 
            	 var attimgBlockId = 'attimgBlock_'+this.dataSource.attachmentID ;
            	 $(".room-attachment-img").clone().prop({ id: attimgBlockId, name: "im-a-clone" }).insertAfter($('div.room-attachment-img:last')).removeClass('room-attachment-img').removeClass('hidden');
            	
            	 $('#'+attimgBlockId).find('img').attr('src',image.get('sizes')[size].url) ;
            	  
            	 $('#'+attimgBlockId).find('.btn_deleteAttachment').attr('attachment-id',image.get('id')) ;
             
            	 if($('#hdn_roomattachments').val()!=""){
            		 $('#hdn_roomattachments').val($('#hdn_roomattachments').val()+','+this.dataSource.attachmentID)            	 
            	 }
            	 else{
            		 $('#hdn_roomattachments').val(this.dataSource.attachmentID)
            	 }
             } 
			
		},
		 
		/**
		 * Delete attachment from hidden field and remove thumbnail preview
		 */
		deleteRoomAttachment : function(evt){
			var attachment 			 = $(evt.target).attr('attachment-id');
			
			var hdn_room_attachments = $('#hdn_roomattachments').val(); 
			var room_attachments 	 = hdn_room_attachments.split(',');
			
		 	var newAttachment = _.without(room_attachments,attachment);
		 	$('#hdn_roomattachments').val(newAttachment.join());
			
			$(evt.target).closest('.fileinput-preview').remove();
		},
		
		
		deleteFeaturedImage : function(evt){
			
			$('.room-featured-img').find('img').attr('src','');
			$('.room-featured-img').addClass('hidden');
			$('#hdn_roomfeaturedimg').val('');
			
		},
		
		
		/**
		 * Function to show message after success of save 
		 * @param response
		 * @param event
		 * @param _self
		 */
		saveSuccess : function(response,event,_self){
			 
			if(!_.isUndefined($(event.target).next().get(0))) 
				var next_element = $(event.target).next().get(0);
			else
				var next_element = $(event.target).next();
			
			//if( $(event.target).next().get(0).tagName =="IMG") // hide next element only if its a loader image
			if( next_element.tagName =="IMG")
				$(event.target).next().hide(); 
			
			var message_span = '';
			 
			
			if(!_.isUndefined(response.inlineresultmsg)){
			 
				if( (_.isUndefined(response.facilitymsgspan))  && (_.isUndefined(response.daterangemsgspan)) ){
					 
					if(_.isUndefined(response.checkintime )){ 
						message_span = $(event.target).closest('.form-group').find('.status_message');
					}
					else{
						message_span = $(event.target).closest('.form-group').parent().find('.checkin_span_block').find('.status_message');
					}
					
				}	
				else{
					message_span = $(event.target).closest('form').find('.status_message')
				}
				 
			}
			else if(!_.isUndefined(response.popupmodel)){
				 
				message_span = $(event.target).closest('.modal-content').find('.status_message');
				 
			}
			
			else{
				 
				message_span = _self.$el.find('#roomsave_status')
				 
				 
			}
		 
			 message_span.removeClass('alert-error').addClass('alert-success');
			_self.showAlertMessage(event,response,_self,message_span);			 
			 
		},
		
		/**
		 * Function to show message after failure of save 
		 * @param response
		 * @param event
		 * @param _self
		 */
		saveFailure : function(response,event,_self){
			 
			if(!_.isUndefined($(event.target).next().get(0))) 
				var next_element = $(event.target).next().get(0);
			else
				var next_element = $(event.target).next();
			
			//if( $(event.target).next().get(0).tagName =="IMG") // hide next element only if its a loader image
			if( next_element.tagName =="IMG")
				$(event.target).next().hide();  
			
			
			if(!_.isUndefined(response.inlineresultmsg)){
				 
				if( (_.isUndefined(response.facilitymsgspan))  && (_.isUndefined(response.daterangemsgspan)) ){ 
					 
						message_span = $(event.target).closest('.form-group').find('.status_message');
					}	
				else{
					 
					message_span = $(event.target).closest('form').find('.status_message')
				}
				
			}
			else if(!_.isUndefined(response.popupmodel)){
				 
				message_span = $(event.target).closest('.modal-content').find('.status_message') 
				 
			}
			else{
				 
				message_span = _self.$el.find('#roomsave_status');
				 
			}
			message_span.removeClass('alert-success').addClass('alert-error');
			_self.showAlertMessage(event,response,_self,message_span);			 
			
		}, 
		
		
		/**
		 * Function to show status message on success/failure
		 * 
		 * @param event
		 * @param response
		 */		
		showAlertMessage : function(event,response,_self,message_span){
			
			$(event.target).prop('disabled',false)
			
			if(!_.isUndefined(response.inlineresultmsg)){
				
				 
				var $div2 = message_span;
				$div2.html(response.msg)
				$div2.removeClass('hidden');
				 
				
				 setTimeout(function(){	
							$div2.addClass('hidden');
							 
				   }, 2000);
				 
				
				
				
				//$div2.delay(1800).addClass('hidden');
				//$(event.target).closest('form').find('.status_message').html(response.msg);
				//$(event.target).closest('form').find('.status_message').removeClass('hidden');
				  
				/* Move to top at status message after success/failure */
				/* $('html, body').animate({
			        scrollTop: $(event.delegateTarget).find('#roomsave_status').offset().top
			    }, 1000);*/
				 
				
			}
			else if(!_.isUndefined(response.popupmodel)){
				var $div2  = message_span;
				$div2.html(response.msg)
				$div2.removeClass('hidden');
				
				 setTimeout(function(){		 
							 $div2.addClass('hidden');							  
				   }, 2000);
				//$(event.target).parent().find('.status_message').html(response.msg);
				//$(event.target).parent().find('.status_message').removeClass('hidden');
				  
				/* Move to top at status message after success/failure */
				/* $('html, body').animate({
			        scrollTop: $(event.delegateTarget).find('#roomsave_status').offset().top
			    }, 1000);*/
			}
			else{
				var $div2  = message_span;
				$div2.html(response.msg)
				$div2.removeClass('hidden');
				
				
				 
				
				//_self.$el.find('#roomsave_status').html(response.msg)
				//_self.$el.find('#roomsave_status').removeClass('hidden');
				/* Move to top at status message after success/failure */
				 $('html, body').animate({
			        scrollTop: _self.$el.find('#roomsave_status').offset().top
			    }, 1000);
				 
				 setTimeout(function(){		 
					 $div2.addClass('hidden');							  
		   }, 5000);
				
			}
			
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