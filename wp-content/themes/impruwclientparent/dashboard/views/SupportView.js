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
				
				var evt_ 	= evt ;
				var self_ 	= this; 
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
								 
					 			$(evt_.target).next().addClass('hidden')
					 			var message_span = self_.$el.find('#support_status');
					 			message_span.html(response.message);
					 			message_span.removeClass('alert-error').addClass('alert-success').removeClass('hidden');
					 			
					 			var $div2  = message_span;
					 			
					 			$('html, body').animate({
							        scrollTop: $div2.offset().top
							    }, 1000);
					 			
					 			 
					 			 setTimeout(function(){		 
									 $div2.addClass('hidden');							  
					 			 }, 5000);
					 			 
							 	//reset form 
					 			self_.$el.find('#frm_support')[0].reset();
								
								//remove validation styles
								self_.$el.find('.validation-icon').remove()
								self_.$el.find('.has-error').removeClass('has-error')
								self_.$el.find('.has-success').removeClass('has-success')
								
							    
							  
							}
							else{
								
								 
								$(evt_.target).next().addClass('hidden')
					 			var message_span = self_.$el.find('#support_status');
					 			message_span.html(response.message);
					 			message_span.removeClass('alert-success').addClass('alert-error').removeClass('hidden');
					 			
					 			var $div2  = message_span;
					 			
					 			$('html, body').animate({
							        scrollTop: $div2.offset().top
							    }, 1000);
								 
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
				 
			} 
			
			
			
			

		});

		return SupportView;

});