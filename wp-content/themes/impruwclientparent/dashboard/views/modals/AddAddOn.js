/**
 *  Add Tax .js *  
 */
define(['views/modals/Modal', 'text!templates/modal/AddOn.tpl'], 
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

                var html = _.template(this.outerTemplate, {
                    title: 'New Add On'
                });
                
                this.$el.html(html);
                
                //add markup
                var h = _.template(this.template,{});
                
                this.$el.find('.modal-content').append(h);
                
                //append to body
                $('body').append(this.$el);

                this.$el.modal();
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
    			  
    			  var data = {	  action		:'save_new_addon_type',
    					  new_addon_type	:$('#addontype_name').val(),
    					  new_addon_price	:$('#addontype_price').val()	
    					  };
    			  
    				 
    				$.post(	AJAXURL,
    						data,
    						function(response){
    							 
    							
    							if(response.code=='OK'){
    									 
    								    								
    								
    								$(evt_.target).parent().parent().find('#addontype_name').val("");
    							 	$(evt_.target).parent().parent().find('#addontype_price').val("");
    							 	
    							 	response.popupmodel = true ; //to show alert message in popup window
    							 	
    							 	ImpruwDashboard.vent.trigger('new-add-on-added',response,evt_);
    							 	ImpruwDashboard.vent.trigger('modal-closed');
    							 	
    							 	// $(evt_.target).parent().parent().find('.close').click();
    							 	
    							 	/*self_.$el.find('input[type="checkbox"]').checkbox();*/
    							 	/*self_.$el.find('#new_facilityname').val("");*/
    								
    							}
    							else{
    								
    								console.log("error : new addon")
    								ImpruwDashboard.vent.trigger('new-add-on-added',response,evt_);
    								 
    							}
    					
    						});	
    			
    		} 
    		
            
        });

        return AddAddOnModal;

    });
