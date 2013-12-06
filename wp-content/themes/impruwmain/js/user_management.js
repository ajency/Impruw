   
    jQuery(document).ready(function(){

    	
    	//alert(template_path)
    	jQuery( '#frm_registration' ).parsley({
    		
    		errorsWrapper: '',
    		errorElem: '<span></span>'
    		
    	});
 
    	//console.log(ajaxurl)

		jQuery("#btn_create").click(function(){

			jQuery("#registration_loader").show();
			if(jQuery( '#frm_registration').parsley( 'validate' ))
			{
				/*/console.log("valid form")
				if(jQuery("#inputSitename").attr("site_exists") == 1 )
				{
					jQuery("#registration_loader").hide();
					return false
				}
				if(jQuery("#inputEmail").attr("email_exists") == 1)
				{
					jQuery("#registration_loader").hide();
						return false	;
				}	*/

					

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
								jQuery("#register_success").html(response.msg)
								jQuery("#scrolltosuccess").click();
								
								return true
							}
							else if(response.code =='ERROR')
							{	
								//alert("invalid captcha")
							
								 jQuery("#recaptcha_reload").click();
								 jQuery("#registration_loader").hide();
								 jQuery("#registration_status_div").show()
								 jQuery("#registration_status").html(response.msg)
								 
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
			'onFieldSuccess': function ( elem ) {   console.log(elem.context.name);	 console.log("success");jQuery( '#inputName' ).parent().removeClass("has-error")  },
			'onFieldError': function ( elem ) {  console.log(elem.context.name); console.log("error"); jQuery( '#inputName' ).parent().addClass("has-error")	  },			
			//'onFieldValidate': function ( elem ) {   console.log(elem.context.name); console.log("validate");jQuery( '#inputName' ).next("span").append("<span class='input-icon'><img src='"+template_path+"/images/270(1).gif' width='20' height='20' ></span>")	  }
		});
		
		
		jQuery( '#inputEmail' ).parsley( 'addListener', {
			'onFieldSuccess': function ( elem ) {   console.log(elem.context.name);	 console.log("success");jQuery( '#inputEmail' ).parent().removeClass("has-error")  },
			'onFieldError': function ( elem ) {  console.log(elem.context.name); console.log("error"); jQuery( '#inputEmail' ).parent().addClass("has-error")	  },			
			//'onFieldValidate': function ( elem ) {   console.log(elem.context.name); console.log("validate");jQuery( '#inputEmail' ).next("span").append("<span class='input-icon'><img src='"+template_path+"/images/270(1).gif'  width='20' height='20' ></span>")	  }
		});
		
		jQuery( '#inputSitename' ).parsley( 'addListener', {
			'onFieldSuccess': function ( elem ) {   console.log(elem.context.name);	 console.log("success");jQuery( '#inputSitename' ).parent().removeClass("has-error")  },
			'onFieldError': function ( elem ) {  console.log(elem.context.name); console.log("error"); jQuery( '#inputSitename' ).parent().addClass("has-error")	  },			
			//'onFieldValidate': function ( elem ) {   console.log(elem.context.name); console.log("validate");jQuery( '#inputSitename' ).next("span").append("<span class='input-icon'><img src='"+template_path+"/images/270(1).gif'  width='20' height='20' ></span>")	  }
		});
		
		
		jQuery( '#inputPass' ).parsley( 'addListener', {
			'onFieldSuccess': function ( elem ) {   console.log(elem.context.name);	 console.log("success");jQuery( '#inputPass' ).parent().removeClass("has-error")  },
			'onFieldError': function ( elem ) {  console.log(elem.context.name); console.log("error"); jQuery( '#inputPass' ).parent().addClass("has-error")	  },			
			//'onFieldValidate': function ( elem ) {   console.log(elem.context.name); console.log("validate");jQuery( '#inputPass' ).next("span").append("<span class='input-icon'><img src='"+template_path+"/images/270(1).gif'  width='20' height='20' ></span>")	  }
		});
		
		jQuery( '#inputRepass' ).parsley( 'addListener', {
			'onFieldSuccess': function ( elem ) {   console.log(elem.context.name);	 console.log("success");jQuery( '#inputRepass' ).parent().removeClass("has-error")  },
			'onFieldError': function ( elem ) {  console.log(elem.context.name); console.log("error"); jQuery( '#inputRepass' ).parent().addClass("has-error")	  },			
			//'onFieldValidate': function ( elem ) {   console.log(elem.context.name); console.log("validate");jQuery( '#inputRepass' ).next("span").append("<span class='input-icon'><img src='"+template_path+"/images/270(1).gif'  width='20' height='20' ></span>")	  }
		});
		
		 
		
		jQuery("#btn_login").on("click",function(){
			jQuery.post(ajaxurl, {
                action: 'user_login',
                pdemail: jQuery("#inputEmail").val(),
                pdpass: jQuery("#inputPass").val(),
            },
                    function(response) {
                        console.log(response);
                        if (response.success == true)
                        {
                           /* if (jQuery("#noaccess_redirect_url").length > 0)
                                window.location.href = jQuery("#noaccess_redirect_url").val();
                            else
                                window.location.href = jQuery("#hdn_siteurl").val() + '/jobs/';*/
                        }
                        else
                        {
                            //jQuery("#div_loginmsg").html(response.msg);
                        }
                    })
		})
		 
        
      }) 
      
      
 
    
    
    
 
   
    
    