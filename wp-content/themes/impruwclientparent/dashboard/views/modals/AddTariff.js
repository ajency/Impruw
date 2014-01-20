/**
 *  Add Tariff .js *  
 */
define(['underscore','modal', 'tpl!templates/modal/AddTariff.tpl','tpl!templates/modal/EditTariff.tpl'], 
      function(_,Modal, template,editTariffTpl) {


        var AddTariffModal = Modal.extend({

            id: 'add-tariff',

            template: template,
            editTariffTpl : editTariffTpl,

            events: {
            	'click #btn_addtariff'		 : 'addNewTariff',
            	'change .chk_tariffdays'	 : 'showhideTariffform',
            	'click #btn_save_edittariff' : 'saveUpdatedTariff'	 
            },

            /**
             * Initialize the manager
             */
            initialize: function(args) {
 
                
            }, 
            
            open: function(args) {
            	console.log(args)
            	
            	if(_.isUndefined(args)){
            		var modalTitle = 'Add Tariff';
            	}
            	else{
            		var modalTitle = 'Edit Tariff' ;
            	}
            		
            	 var html = this.outerTemplate({
                     title: modalTitle
                 });
                 
                 this.$el.html(html);
                 
                 
                 if(_.isUndefined(args)){
                	 //add markup
                 var h =  this.template({});
                 }
                 else{
                	 var h =  this.editTariffTpl({datePlanTariff : args.daterangePlanTariff}) ;
                 }
                 
                 
                this.$el.find('.modal-content').append(h);
                 
                 //append to body
                 $('body').append(this.$el);

                 this.$el.modal();
                 this.$el.find('input[type="checkbox"]').checkbox();
                 
                 
                 
                this.$el.modal('show');
                ImpruwDashboard.vent.trigger(this.id + '-opened');
            },
            
            
            
            saveUpdatedTariff : function(evt){
            	
            	$(evt.target).prop('disabled',true);
    			
    			var form_tariff = $(evt.target).parent().parent().find('#form_edittariff');  
    			form_data = $(form_tariff).serializeArray() 
    			 $(evt.target).next().show(); 
    			 
    			var evt_ = evt;
    			var self_ = this;
    				
    			var data = {		action			: 'save_updated_plan_tariff_ajx',						 
    								updatetariff_data 	: form_data 								 
    						};
    				
    				
    			$.post(	AJAXURL,
    					data,
    					function(response){ 
    				      response.popupmodel = true ; //to show alert message in popup window
    						if(response.code=='OK'){	
    							
    							response.model = true; 
    							
    							$(evt.target).prop('disabled',false);
    							ImpruwDashboard.vent.trigger('tariff-updated',response,evt_);
    							self_.$el.find('#form_edittariff')[0].reset();	
    						 	setTimeout(function(){
    						 		self_.hide();
    							   }, 2100);
    						
    						 	
    						 
    						}
    						else{
    							  
    							$(evt.target).prop('disabled',false);
    							
    						} 
    				
    			 });
            },
            
            
            /**
    		 * Function to add new tariff
    		 * @param evt
    		 */
    		 addNewTariff : function(evt){
    			$(evt.target).prop('disabled',true);
    			
    			var form_tariff = $(evt.target).parent().parent().find('#form_addtariff');  
    			form_data = $(form_tariff).serializeArray() 
    			 $(evt.target).next().show(); 
    			 
    			var evt_ = evt;
    			var self_ = this;
    				
    			var data = {		action			: 'add_new_plan_tariff',						 
    								addtariff_data 	: form_data 								 
    						};
    				
    				
    			$.post(	AJAXURL,
    					data,
    					function(response){ 
    				      response.popupmodel = true ; //to show alert message in popup window
    						if(response.code=='OK'){	
    							
    							response.model = true; 
    							
    							$(evt.target).prop('disabled',false);
    							ImpruwDashboard.vent.trigger('new-tariff-added',response,evt_);
    							self_.$el.find('#form_addtariff')[0].reset();	
    						 	setTimeout(function(){
    						 		self_.hide();
    							   }, 2100);
    						
    						 	
    						 
    						}
    						else{
    							  
    							$(evt.target).prop('disabled',false);
    							
    						} 
    				
    			 });
    			 
    			
    		}, 
    		
    		
    		/**
    		 * 
    		 * @param evt
    		 */
    		 showhideTariffform: function(evt){
    			 
    			tariffType = $(evt.target).attr('tariff-type');
    			
    			if($(evt.target).is(':checked') == true){
    				if(tariffType=='weekend'){
    					console.log('weekend enable');
    					$('.formel_weekendtariff').attr('disabled',false);
    				}
    				if(tariffType=='weekday'){
    					console.log('weekday enable');
    					$('.formel_weedaytariff').attr('disabled',false);
    				}
    			}				
    			else{
    				//console.log('unchecked')
    				if(tariffType=='weekend'){ 
    					console.log('weekend disable');
    					$('.formel_weekendtariff').attr('disabled',true);
    					$('.formel_weekendtariff').val('');
    				}
    				if(tariffType=='weekday'){
    					console.log('weekday disable');
    					$('.formel_weedaytariff').attr('disabled',true);
    					$('.formel_weedaytariff').val('');
    					
    				}
    				 
    			}
    		}  
            
            
            
        });

        return AddTariffModal;

    });
