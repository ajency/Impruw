/**
 *  Add Tariff .js *  
 */
define(['modal', 'tpl!templates/modal/AddPlan.tpl'], 
      function(Modal, template) {


        var AddPlanModal = Modal.extend({

            id: 'add-plan',

            template: template,

            events: {
            	'click #btn_addplan'		: 'addNewPlan',
            	'change .chk_tariffdays'	: 'showhideTariffform' 
            },

            /**
             * Initialize the manager
             */
            initialize: function(args) {

                var html = this.outerTemplate({
                    title: 'Add Plan'
                });
                
                this.$el.html(html);
                
                //add markup
                var h =  this.template({});
                
               this.$el.find('.modal-content').append(h);
                
                //append to body
                $('body').append(this.$el);

                this.$el.modal();
               
            },
            
            /**
    		 * Function to add new plan
    		 * @param evt
    		 */
    		addNewPlan : function(evt){
    			$(evt.target).prop('disabled',true);
    			
    			var form_plan = $(evt.target).parent().parent().find('#form_addplan');  
    			form_data = $(form_plan).serializeArray() 
    			 $(evt.target).next().show(); 
    			 
    			var evt_ = evt;
    			var self_ = this;
    				
    			var data = {		action			: 'add_new_plan_ajx',						 
    								addplan_data 	: form_data 								 
    						};
    				
    				
    			$.post(	AJAXURL,
    					data,
    					function(response){ 
    				      response.popupmodel = true ; //to show alert message in popup window
    						if(response.code=='OK'){	
    							
    							response.model = true; 
    							
    							$(evt.target).prop('disabled',false);
    							ImpruwDashboard.vent.trigger('new-plan-added',response,evt_);
    								
    						 	setTimeout(function(){
    						 		self_.hide();
    							   }, 2100);
    							 	 
    						 
    						}
    						else{
    							ImpruwDashboard.vent.trigger('new-plan-added',response,evt_); 
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

        return AddPlanModal;

    });
