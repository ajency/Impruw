
jQuery(document).ready(function($) {
   
   /****************** Sign up.js ********************/
   $('#btn_create_site').click(function(e){
      
      e.preventDefault();

      var _this = this;
      
      if($('#frm_registration').parsley('validate')){
         
         $(this).next().show();
         var data = {
            action     : 'save_new_user',													 
            frmdata    : $("#frm_registration").serializeArray(),
            ajax_nonce : ajax_nonce
         };


         // since 2.8 ajaxurl is always defined in the admin header and points to admin-ajax.php
         $.post(ajaxurl, data, function(response) {
            
            $(_this).next().hide();
            
            if(response.code =='OK'){
               
                $("#register_message").html('<div class="alert alert-success">'+
                                                   '<button aria-hidden="true" data-dismiss="alert" class="close" type="button">x</button>'+
                                                   response.msg+'</div>');
                
               $("#scrolltosuccess").click();

                return true;
            }
            else if(response.code =='ERROR')
            {	
                //alert("invalid captcha")

                 $("#recaptcha_reload").click();
                 $("#registration_status_div").show()
                 $("#register_message").html('<div class="alert alert-error">'+
                                                   '<button aria-hidden="true" data-dismiss="alert" class="close" type="button">x</button>'+
                                                   response.msg+'</div>')

                 return false;
            } 
        });//end  $.post(ajaxurl, data, function(response)	
				
         
      }
      
   }); 
   
   $('#frm_registration').parsley({
      errors:{
    	  
    	  errorsWrapper: '<span class="help-block" style="display:block"></span>',
    	  
    	  errorElem: '<span style="display:block"></span>',
			  
         container: function (element, isRadioOrCheckbox) {
               var $container = element.parent().find(".p-messages");
               if ($container.length === 0) {
                   $container = $("<div class='p-messages'></div>").insertAfter(element);
               }
               return $container;
           }
      },
      listeners: {
            onFieldValidate: function ( elem, ParsleyField ) { 
               if(ParsleyField.validatedOnce !== true){
                  elem.parent().find('.validation-icon').remove();
                  elem.after('<span class="validation-icon input-icon data-loader"><img src="http://localhost/impruw/wp-content/themes/impruwmain/images/270(1).gif"/></span>')    // Executed when a field passes validation
               }
            },
            onFormValidate: function ( isFormValid, event, ParsleyForm ) {
               
            },
            onFieldError: function ( elem, constraints, ParsleyField ) {
               //remove previous errors
               elem.parent().find('.validation-icon').remove();
               var tag = elem.prop('tagName');
               elem.parent().find('.validation-icon').remove();
               switch(tag){
                  case 'SELECT':
                     elem.next().after('<span class="validation-icon input-icon fui-cross-inverted"></span>');
                     break;
                  case 'INPUT':
                     if(elem.attr('type') == 'checkbox'){
                        
                     }
                     else{
                        elem.after('<span class="validation-icon input-icon fui-cross-inverted"></span>');
                     }
                     break;
                  default:
                     elem.after('<span class="validation-icon input-icon fui-cross-inverted"></span>');
                     break;
               }

               elem.closest('.form-group').removeClass('has-success').addClass('has-error');
              
            },
            onFieldSuccess: function ( elem, constraints, ParsleyField ) {
               
               var tag = elem.prop('tagName');
               elem.parent().find('.validation-icon').remove();
               switch(tag){
                  case 'SELECT':
                     elem.next().after('<span class="validation-icon input-icon fui-check-inverted"></span>');
                     break;
                  case 'INPUT':
                     console.log(elem.attr('type'));
                     if(elem.attr('type') == 'checkbox'){
                        
                     }
                     else{
                        elem.after('<span class="validation-icon input-icon fui-check-inverted"></span>');
                     }
                     break;
                  default:
                     elem.after('<span class="validation-icon input-icon fui-check-inverted"></span>');
                     break;
               }

               elem.closest('.form-group').removeClass('has-error').addClass('has-success');
            }
       }
   });
   
   
//   $( '#frm_registration' ).parsley( 'addItem', '#recaptcha_response_field' );
   
   $("select").selectpicker();
   /************************* /signup.js *********************************/
   
   
   /************************ login.js ***********************************/
   $('#frm_login' ).parsley({
    		errors: {
    			
    			errorsWrapper: '<span class="help-block" style="display:block"></span>',
    	    	  
    	    	errorElem: '<span style="display:block"></span>',
    	    	
    		    container: function (element) {
	    		    		var $container = element.parent().find(".p-messages");
	    		    		if ($container.length === 0) {
	    	                   $container = $("<div class='p-messages'></div>").insertAfter(element);
	    		    		}
	    		    		return $container;
    		    },
    		   /* classHandler: function ( elem  ) {
    		    	elem.parent().addClass("has-error").removeClass("has-success");
		            elem.parent().find('.fui-check-inverted').remove()
		            elem.after('<span class="input-icon fui-cross-inverted"></span>') 	
    		    }*/
    		},
            listeners: {
               onFieldSuccess: function ( elem, constraints, ParsleyField ) {  
                  elem.parent().parent().removeClass("has-error").addClass("has-success");
                  elem.parent().find('.fui-check-inverted,.fui-cross-inverted').remove();
                  elem.after('<span class="validation-icon input-icon fui-check-inverted"></span>') 
               } ,
               
               onFieldError: function ( elem, constraints, ParsleyField ) {  
                   elem.parent().parent().removeClass("has-success").addClass("has-error");
                   console.log(elem)
                   elem.parent().find('.fui-check-inverted,.fui-cross-inverted').remove();
                   elem.after('<span class="validation-icon input-icon fui-cross-inverted"></span>') 
                }  
           }
   });
   
   $("#btn_login").click(function() {
      
      if ($('#frm_login').parsley('validate')){
         
         $("#login_loader").show();
         
         var data = {
            action      : 'user_login',
            pdemail     : $("#inputEmail").val(),
            pdpass      : $("#inputPass").val(),
            ajax_nonce  : ajax_nonce
         };


         // since 2.8 ajaxurl is always defined in the admin header and points to admin-ajax.php
         $.post(ajaxurl, data, function(response) {

            if (response.code == 'OK'){
               
               $("#login_loader").hide();
               $("#login_success").show();
               $("#login_status").html('<div class="alert alert-success">' +
                       '<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>' +
                       response.msg + '</div>')

               window.location.href = response.blog_url;
               return true;
            }
            else if ((response.code == 'ERROR') || (response.code == 'FAILED')){
               
               $("#login_loader").hide();
               $("#login_status_div").show()
               $("#login_status").html('<div class="alert alert-error">' +
                       '<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>' +
                       response.msg + '</div>')

               return false;
            }
         });
      }
   });
   /************************ /login.js ***********************************/
   
}); 
      
 
    
    
    
 
   
    
    