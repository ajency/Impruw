/**
 *  Add Tax .js *  
 */
define(['modal', 'tpl!templates/modal/AddOn.tpl','parsley'], 
      function(Modal, template) {


        var AddAddOnModal = Modal.extend({

            id: 'add-tax',

            template: template,

            events: {
            	'click #btn_savenewaddon'			: 'saveNewAddon'
                
            },

            /**
             * Initialize the manager
             */
            initialize: function(args) {
            	
                var html=this.outerTemplate({
                    title: 'New Add On'
                });
                
                this.$el.html(html);
                
                //add markup
                var h = this.template({});
                
                this.$el.find('.modal-content').append(h);
                
                //append to body
                $('body').append(this.$el);

                this.$el.modal();
                parsleyInitialize($('#form_add_addon'));
            },


            
            /**
    		 * 
    		 * @param evt
    		 */
    		saveNewAddon:function(evt){
    			var self_ = this;
    			
    			var evt_ = evt;
    			console.log('save new addon')
    			 
    			if (!this.$el.find('#form_add_addon').parsley('validate'))
    				  return;
    			
    			 $(evt.target).next().show();
    			  
    			  var data = { 	action		:'save_new_addon_type',
    					  		new_addon_type	:$('#addontype_name').val(),
    					  		new_addon_price	:$('#addontype_price').val()	
    					  	 };
    			  
    				 
    				$.post(	AJAXURL,
    						data,
    						function(response){
    							 
    							response.popupmodel = true ; //to show alert message in popup window
    							if(response.code=='OK'){
    									 
    							 	//$(evt_.target).parent().parent().find('#addontype_name').val("");
    							 	//$(evt_.target).parent().parent().find('#addontype_price').val("");
    								self_.$el.find('#form_add_addon')[0].reset();
    								
    								self_.$el.find('.validation-icon').remove()
    								self_.$el.find('.has-error').removeClass('has-error')
    								self_.$el.find('.has-success').removeClass('has-success')
    								
    							 	ImpruwDashboard.vent.trigger('new-add-on-added',response,evt_);
    							 	
    							 	
    							 	// $(evt_.target).parent().parent().find('.close').click();
    							 	
    							 	/*self_.$el.find('input[type="checkbox"]').checkbox();*/
    							 	/*self_.$el.find('#new_facilityname').val("");*/
    								
    							}
    							else{
    								
    								 
    								ImpruwDashboard.vent.trigger('new-add-on-added',response,evt_);
    								 
    							}
    					
    						});	
    			
    		} 
    		
            
        });

        return AddAddOnModal;

    });
