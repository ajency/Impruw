/**
 * The RoomListView.
 * 
 */

define([ 'underscore', 'jquery', 'backbone','roommodel',
		'text!templates/siteprofile/RoomListViewTpl.tpl','lib/parsley/parsley','radio','jqueryui' ], 
      function(_, $, Backbone, RoomModel, ListRoomViewTpl,parsley,radio,jqueryui) {

	var RoomListView = Backbone.View.extend({

         id : 'list-room',

         events : {
        	 
			    //'click .deletedaterange_lnk'		: 'deleteDateRange' 
                
		}, 

		initialize : function(args) {
			
			//this.popupViewManager = new Backbone.ChildViewContainer();	
			this.renderTemplate();
		},

		render : function(allFacilities) {

			//this.fetchAllFacilities();
			
		},

		/*
		 * 
		 */
		renderTemplate:function(){
			 
			var template = _.template(ListRoomViewTpl);			 
			var html = template({
				roomdata : ImpruwDashboard.rooms
			}); 

			this.$el.html(html);
			
			//set custom selectbox & checkbox
			this.$el.find('select').selectpicker();
			this.$el.find('input[type="checkbox"]').checkbox();
			this.$el.find('input[type="radio"]').radio();
			
			//initialize parsley validation for the forms
			 
			//this.parsleyInitialize(this.$el.find('#form_add_addon'));		
			
		//	this.$el.find(".aj-imp-long-form-actions").affix();
			
		/* var addPlan = this.popupViewManager.findByCustom("add-plan-popup");

            //ensure Menu manager is created just once
            if (_.isUndefined(addPlan)){
                addPlan = new AddPlanModal();
                this.popupViewManager.add(addPlan, "add-plan-popup");
            }

            //start listening event
            this.listenTo(ImpruwDashboard.vent, 'new-plan-added', this.newPlanAdded);*/
			
			
			  
				 	
			return this;
			
		},
		
		
		
		 
		 
		
	  
		
		
		
		 
		
		 
        
        /**
		 * Function to show add plan model
		 * @param evt
		 */
		showAddPlanModal : function(evt){
			
			
			
			 var addPlanModal = _.bind(function(_, AddPlanModal) {

                    var addPlan = this.popupViewManager.findByCustom("add-plan-popup");

                    //ensure Menu manager is created just once
                    if (_.isUndefined(addPlan)){
                        addPlan = new AddPlanModal();
                        this.popupViewManager.add(addPlan, "add-plan-popup");
                    }

                    //start listening event
                    this.listenTo(ImpruwDashboard.vent, 'new-plan-added', this.newPlanAdded);

                    //modal hide event
                    this.listenTo(ImpruwDashboard.vent, 'add-plan-closed', this.stopListeningEvents);

                    addPlan.open();
                    
                    var daterange_id = $(evt.target).attr('daterange-id')
        			$('#hdn_daterange').val(daterange_id)

                }, this); 

                require(['underscore', 'addplanmodal'], addPlanModal);
			
			
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
					console.log('.form group msg')
					message_span = $(event.target).closest('.form-group').find('.status_message');
				}	
				else{
					console.log('form message')
					message_span = $(event.target).closest('form').find('.status_message')
				}
				 
			}
			else if(!_.isUndefined(response.popupmodel)){
				console.log('popup message1')
				message_span = $(event.target).closest('.modal-content').find('.status_message');
				 
			}
			
			else{
				console.log('default message1')
				message_span = _self.$el.find('#roomsave_status')
				 
				 
			}
			console.log(message_span)
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
					console.log('.form group msg')
						message_span = $(event.target).closest('.form-group').find('.status_message');
					}	
				else{
					console.log('form message')
					message_span = $(event.target).closest('form').find('.status_message')
				}
				
			}
			else if(!_.isUndefined(response.popupmodel)){
				console.log('popup message1')
				message_span = $(event.target).closest('.modal-content').find('.status_message') 
				 
			}
			else{
				console.log('default message')
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
				
				console.log('show inline msg')
				
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

	return RoomListView;

});