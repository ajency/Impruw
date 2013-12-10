   
    jQuery(document).ready(function(){

    	
    	function assign_class(valid,elem )
    	{
    		if(valid==false)
    		{
    			$container = jQuery("<span></span>").insertAfter(elem);
    			  elem.parent().find('.data-loader').remove();
    			elem.parent().find('.fui-check-inverted').remove()
	            elem.parent().find('.fui-cross-inverted').remove();
    			elem.parent().removeClass("has-success")
	            elem.after('<span class="input-icon fui-cross-inverted"></span>') 
	            
    			 
    			elem.parent().addClass("has-error")	             
	           
	     
	             return $container; 
    		}
    		if(valid==true)
    		{
    			 $container = jQuery("<span></span>").insertAfter(elem);
    			elem.parent().find('.data-loader').remove();
    			elem.parent().find('.fui-check-inverted').remove();
    			elem.parent().find('.fui-cross-inverted').remove();
    			
    			elem.parent().removeClass("has-error");
    			elem.after('<span class="input-icon fui-check-inverted"></span>') 
    			elem.parent().addClass("has-success")
    			// return $container; 
    			 
    			
    		}
    		
    	}
    	
    	
    	//alert(template_path)
    	jQuery( '#frm_registration' ).parsley({
    		priorityEnabled: true ,
    		 validateIfUnchanged: false ,
    		errors: {
    		    container: function (element,ParsleyField) {
    		     
    		      // console.log(element.context['id'])
    		       jQuery( '#'+element.context['id']).parent().find('.data-loader').remove();
    		       
    		       console.log("field error")
    		       console.log(ParsleyField)
    		       console.log(ParsleyField.valid)
    		       console.log("------------")
    		       
    		       if(ParsleyField ==false){
    		        	$container = assign_class(false,jQuery( '#'+element.context['id']));
    		        	 return $container
    		        }//end if(ParsleyField ==false)
    		       
    		    }//end container: function (element,ParsleyField)
    		},//end errors:
    		 listeners: {
    		        onFieldValidate: function ( elem, ParsleyForm ) { 
    		        	 console.log("onFieldValidate..");
    		        	 console.log(ParsleyForm)
    		        	 console.log(ParsleyForm.valid)
    		        	 console.log("...............")
    		        	
    		        	 
    		        	jQuery( '#'+elem.context['id']).parent().find('.data-loader').remove();
    		        	jQuery( '#'+elem.context['id']).after('<span class="input-icon data-loader"><img src="http://localhost/impruw/wp-content/themes/impruwmain/images/270(1).gif"/></span>')    // Executed when a field passes validation
    		        	 
    		        	 
    		        	if( (ParsleyForm.valid ==true) && (ParsleyForm.validatedOnce ==true) ){
    		        		  jQuery( '#'+elem.context['id']).parent().find('.data-loader').remove();	 
    		        		  assign_class(true,jQuery( '#'+elem.context['id']));
    		        		 		 
    		        	}   // Executed when a field passes validation
    		        
    		       	 
    		        	 
    		        	if( (ParsleyForm.valid ==false)&& (ParsleyForm.validatedOnce ==true) ){
    		        		 
    		        		 jQuery( '#'+elem.context['id']).parent().find('.data-loader').remove();	 
    	    		          $container = assign_class(false,jQuery( '#'+elem.context['id']));
    	    		          return $container;
    	    		          
    	    		          
    	    		     }//end if(ParsleyField ==false)
    		        	 
    		        	 
    		        	 
    		        	 
    		        	},//end onFieldValidate: function ( elem, ParsleyForm )
    		        // Executed on validation. Return true to ignore field validation
    		      //, onFormValidate: function ( isFormValid, event, ParsleyForm ) {}     // Executed once on form validation. Return (bool) false to block submit, even if valid
    		      //, onFieldError: function ( elem, constraints, ParsleyField ) {}     // Executed when a field is detected as invalid
    		       onFieldSuccess: function ( elem, constraints, ParsleyField ) {  
    		    	   console.log("field succes")
    		    	   console.log(ParsleyField)
    		    	   console.log(ParsleyField.valid)
    		    	   console.log("===========")
    		    	   
    		    	   jQuery( '#'+elem.context['id']).parent().find('.data-loader').remove();
    		    
    		    	   if( (ParsleyField.valid ==true) && (ParsleyField.validatedOnce ==true)  ){	
    		    	
    		    		   $container =  	assign_class(true, jQuery( '#'+elem.context['id'])); 
    		    		//   return $container;
    		     
    		     }   // Executed when a field passes validation
    		    }//end onFieldSuccess: function ( elem, constraints, ParsleyField ) {  
    		  }//end listeners
    		
    	});
 
    	
    	
    	
    	
    	
    	jQuery( '#recaptcha_response_field' ).parsley( 'validate' );
    	//$( '#recaptcha_response_field' ).parsley( 'addConstraint', { minlength: 2 } );
    	
    	
    	
    	//console.log(ajaxurl)

		jQuery("#btn_create").click(function(){

			jQuery("#registration_loader").show();
			if(jQuery( '#frm_registration').parsley( 'validate' ))
			{
				 
					

					 var data = {
							action: 'save_new_user',													 
							frmdata:jQuery("#frm_registration").serializeArray(),
							ajax_nonce :ajax_nonce
						};
					
			        
					 // since 2.8 ajaxurl is always defined in the admin header and points to admin-ajax.php
						jQuery.post(ajaxurl, data, function(response) {
										 	
							if(response.code =='OK')
							{	
								console.log(response.msg)
								jQuery("#registration_loader").hide(); 
								//jQuery("#registration_status").html(response.msg)
								jQuery("#register_success").show();
								
								
								jQuery("#register_success").html('<div class="alert alert-success">'+
								'<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>'+
								response.msg+'</div>')
								jQuery("#scrolltosuccess").click();
								
								return true
							}
							else if(response.code =='ERROR')
							{	
								//alert("invalid captcha")
							
								 jQuery("#recaptcha_reload").click();
								 jQuery("#registration_loader").hide();
								 jQuery("#registration_status_div").show()
								 jQuery("#registration_status").html('<div class="alert alert-error">'+
									'<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>'+
									response.msg+'</div>')
								 
								 console.log(response.msg)
								 return false;
							} 
						});//end  jQuery.post(ajaxurl, data, function(response)	
				
			}
			else
			{
				jQuery("#registration_status_div").show()				
				jQuery("#registration_loader").hide();
				//console.log("invalid form")
				return false
				
			}
			
		})
        
  //  })
    
     
		jQuery( '#inputName' ).parsley( 'addListener', {
			//'onFieldSuccess': function ( elem ) {   console.log(elem.context.name);	 console.log("success");jQuery( '#inputName' ).parent().removeClass("has-error")  },
			//'onFieldError': function ( elem ) {  console.log(elem.context.name); console.log("error"); jQuery( '#inputName' ).parent().addClass("has-error")	  }			
			//'onFieldValidate': function ( elem ) {   console.log(elem.context.name); console.log("validate");jQuery( '#inputName' ).next("span").append("<span class='input-icon'><img src='"+template_path+"/images/270(1).gif' width='20' height='20' ></span>")	  }
		});
		
		
		 
		
		jQuery('#inputEmail').off( 'keyup.ParsleyField' )
		jQuery('#inputEmail').off( 'keyup' )
		
		
		
		
	/*	jQuery("#inputName").on("blur",function(){
			
			var v = /^[a-zA-Z ]+$/.test( jQuery("#inputName").val());
			console.log(v);
			
		})*/
		
		
		

		jQuery("#btn_login").click(function(){

			
			if(jQuery( '#frm_login').parsley( 'validate' ))
			{
				jQuery("#login_loader").show();
				 var data = {
							action: 'user_login',													 
							 pdemail: jQuery("#inputEmail").val(),
				                pdpass: jQuery("#inputPass").val(),
							ajax_nonce :ajax_nonce
						};
					
			        
					 // since 2.8 ajaxurl is always defined in the admin header and points to admin-ajax.php
						jQuery.post(ajaxurl, data, function(response) {
										 	
							if(response.code =='OK')
							{	
								console.log(response)
								jQuery("#login_loader").hide(); 
								//jQuery("#registration_status").html(response.msg)
								jQuery("#login_success").show();
								jQuery("#login_status").html('<div class="alert alert-success">'+
								'<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>'+
								response.msg+'</div>')
								
								//window.location(response.blog_url)
								window.location.href=response.blog_url;
								//jQuery("#scrolltosuccess").click();
								
								return true
							}
							else if((response.code =='ERROR') || (response.code =='FAILED') )
							{	
								//alert("invalid captcha")
							
								
								 jQuery("#login_loader").hide();
								 jQuery("#login_status_div").show()
								 jQuery("#login_status").html('<div class="alert alert-error">'+
											'<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>'+
											response.msg+'</div>')
								 
								 console.log(response.msg)
								 return false;
							} 
						});//end  jQuery.post(ajaxurl, data, function(response)	
			
			}
		})//jQuery("#btn_create").click(function(){
		
		
		
		
		
		
		
		
		
		
		
		
jQuery('#frm_login' ).parsley({
    		
    		errors: {
    		    container: function (element) {
    		       
    		      // console.log(element.context['id'])
    		            $container = jQuery("<span></span>").insertAfter(element);
    		           /* jQuery( '#'+element.context['id']).parent().addClass("has-error")
    		             jQuery( '#'+element.context['id']).parent().removeClass("has-success")
    		            jQuery( '#'+element.context['id']).parent().find('.fui-check-inverted').remove()
    		            
    		            jQuery( '#'+element.context['id']).after('<span class="input-icon fui-cross-inverted"></span>') */
    		        
    		        return $container;
    		    },
    		    
    		    classHandler: function ( elem  ) {
    		    	
    		    	
    		    	console.log("handle errors")
    		    	jQuery( '#'+elem.context['id']).parent().addClass("has-error")
		             jQuery( '#'+elem.context['id']).parent().removeClass("has-success")
		            jQuery( '#'+elem.context['id']).parent().find('.fui-check-inverted').remove()
		            
		            jQuery( '#'+elem.context['id']).after('<span class="input-icon fui-cross-inverted"></span>') 	
    		    	
    		    }
    		    
    		    
    		},
    		
    		
    		 listeners: {
    		        onFieldValidate: function ( elem, ParsleyForm ) { 
    		        	 console.log("loading...");
    		        	return false; },
    		        // Executed on validation. Return true to ignore field validation
    		      //, onFormValidate: function ( isFormValid, event, ParsleyForm ) {}     // Executed once on form validation. Return (bool) false to block submit, even if valid
    		      //, onFieldError: function ( elem, constraints, ParsleyField ) {}     // Executed when a field is detected as invalid
    		       onFieldSuccess: function ( elem, constraints, ParsleyField ) {  
    		       jQuery( '#'+elem.context['id']).parent().removeClass("has-error");
    		       jQuery( '#'+elem.context['id']).parent().addClass("has-success")
    		       jQuery( '#'+elem.context['id']).parent().find('.fui-check-inverted').remove();
    		       jQuery( '#'+elem.context['id']).parent().find('.fui-cross-inverted').remove();
    		       jQuery( '#'+elem.context['id']).after('<span class="input-icon fui-check-inverted"></span>') }   // Executed when a field passes validation
    		    }
    		
    	});
		
		
		
		
		 
        
      }) 
      
      
 
    
    
    
 
   
    
    