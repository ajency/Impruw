   
    jQuery(document).ready(function(){

    	jQuery( '#frm_registration' ).parsley();
 
    	//console.log(ajaxurl)

		jQuery("#btn_create").on("click",function(){

			jQuery("#registration_loader").show();
			if(jQuery( '#frm_registration').parsley( 'validate' ))
			{
				//console.log("valid form")
				if(jQuery("#inputSitename").attr("site_exists") == 1 )
				{
					jQuery("#registration_loader").hide();
					return false
				}
				if(jQuery("#inputEmail").attr("email_exists") == 1)
				{
					jQuery("#registration_loader").hide();
						return false	;
				}	

					

					 var data = {
							action: 'save_new_user',													 
							frmdata:jQuery("#frm_registration").serializeArray()
						};
					
			        
					 // since 2.8 ajaxurl is always defined in the admin header and points to admin-ajax.php
						jQuery.post(ajaxurl, data, function(response) {
										 	
							if(response.code =='OK')
							{	
								console.log(response.msg)
								jQuery("#registration_loader").hide(); 
								jQuery("#registration_status").html(response.msg)
								return true
							}
							else if(response.code =='ERROR')
							{	
								alert("invalid captcha")
							
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
    
     
		/*jQuery( '#inputEmail' ).parsley( 'addListener', {
			'onFieldSuccess': function ( elem ) { alert("listner test"); console.log(elem);
 	  
 	  } });*/
		
		
		 
        
      }) 
      
      
 
    
    
    
 
   
    
    