/**
 *  Add Tax .js *  
 */
define(['modal', 'tpl!templates/modal/AddTax.tpl','parsley'], 
      function(Modal, template) {


        var AddTaxModal = Modal.extend({

            id: 'add-tax',

            template: template,

            events: {
            	'click #btn_addtax'		: 'addNewTaxType'
                
            },

            /**
             * Initialize the manager
             */
            initialize: function(args) {

                var html = this.outerTemplate({
                    title: 'Add Tax'
                });
                
                this.$el.html(html);
                
                //add markup
                var h =  this.template({});
                
                this.$el.find('.modal-content').append(h);
                
                //append to body
                $('body').append(this.$el);

                this.$el.modal();
                parsleyInitialize($('#form_add_tax'));
            },
            
            
            /**
    		 * Add new tax type
    		 */
    		
    		addNewTaxType :function(evt){
    			
    			console.log('new  tax added click')
    			if (!this.$el.find('#form_add_tax').parsley('validate'))
    				  return;
    			
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
    								 
    								response.popupmodel = true;  
    								if(response.code=='OK'){
    									//$(evt_.target).parent().parent().find('#taxtype_name').val("")
    								 //	$(evt_.target).parent().parent().find('#taxtype_price').val("")
    									self_.$el.find('#form_add_tax')[0].reset();
    								 	
    									self_.$el.find('.validation-icon').remove()
        								self_.$el.find('.has-error').removeClass('has-error')
        								self_.$el.find('.has-success').removeClass('has-success')
    								 	  								 	
    								 	ImpruwDashboard.vent.trigger('new-tax-added',response,evt_);
    								  
    							 	
    							 	
    								 	//$(evt_.target).parent().parent().find('.close').click();
    									
    								 	 
    								}
    								else{
    									//ImpruwDashboard.vent.trigger('new-tax-added',response,evt_)
    									//console.log("error new tax")
    									 
    								}
    						
    							});	
    		} 
            
        });

        return AddTaxModal;

    });
