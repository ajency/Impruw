/**
 * The UserProfile View.
 * 
 */

define([ 'underscore', 'jquery', 'backbone',
		'tpl!templates/support.tpl','parsley'], 
		function(_, $,Backbone, template) {

		var SupportView = Backbone.View.extend({

			id : 'support',
			events : {
				'click #cf_send'	: 'submitSupportForm'
			},
			

		 	render : function() {

				var html = template(); 

				this.$el.html(html);
				 
				parsleyInitialize(this.$el.find('#frm_support'));
				return this;
			},
			
			
			
			submitSupportForm : function(evt){
				
				$(evt.target).next().removeClass('hidden');
				
				if (!this.$el.find('#frm_support').parsley('validate')){
					$(this.target).next().addClass('hidden');
					 return;
				}
				
			    var formData = getFormData(this.$el.find('#frm_support'));
				 
			     
			    
				var data = { 	action		:'send_support_form_message', 					  		 
 					  			support_formdata	:formData	
 					  	 };
			 
				
				$.post(	AJAXURL,
						data,
						function(response){
					 		if(response.code=='OK'){
									 
							 	//reset form 
					 			self_.$el.find('#frm_support')[0].reset();
								
								//remove validation styles
								self_.$el.find('.validation-icon').remove()
								self_.$el.find('.has-error').removeClass('has-error')
								self_.$el.find('.has-success').removeClass('has-success')
								
							    ImpruwDashboard.vent.trigger('new-add-on-added',response,evt_);
							  
							}
							else{
								
								 
								ImpruwDashboard.vent.trigger('new-add-on-added',response,evt_);
								 
							}
					
						});	
				 
				
			}

		});

		return SupportView;

});