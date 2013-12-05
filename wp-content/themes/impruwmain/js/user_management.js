   
    jQuery(document).ready(function(){

    	jQuery( '#frm_registration' ).parsley();
 
    	console.log(ajaxurl)

		jQuery("#btn_create").on("click",function(){

			jQuery("#registration_loader").show();
			if(jQuery( '#frm_registration').parsley( 'validate' ))
			{
				console.log("valid form")
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

					console.log(jQuery("#frm_registration").serializeArray());

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
				//jQuery("#registration_status").html("Please fill the required details.")
				jQuery("#registration_loader").hide();
				console.log("invalid form")
				return false
				
			}
			
		})
        
  //  })
    
    
   /*  jQuery("#inputEmail").blur(function() { 
        console.log("focusout"+jQuery.trim(jQuery("#inputEmail").val()));

        var data = {
				action: 'check_email_exists',
			//	tbl_field: 'user_login',
				email:jQuery.trim(jQuery("#inputEmail").val())
			};
		
        
		 // since 2.8 ajaxurl is always defined in the admin header and points to admin-ajax.php
			jQuery.post(ajaxurl, data, function(response) {
							 	
				if(response.code =='000')
				{	
					console.log(response.msg)
					jQuery("#emailexists_error").remove();
					jQuery("#inputEmail").attr("email_exists",1);
					jQuery("#inputEmail").after("<ul id='emailexists_error'> <li   class='required' >"+response.msg+"</li></ul>");
					jQuery("#inputEmail").focus();
					return false
				}
				else
				{	
					jQuery("#inputEmail").attr("email_exists",0);
					jQuery("#emailexists_error").remove(); 
					console.log(response.msg)
					 return true;
				} 
			});//end  jQuery.post(ajaxurl, data, function(response)
        
      })  
      
      */
      
    
    /*
      
       jQuery("#inputSitename").blur(function() { 
        console.log("site name on blur"+jQuery.trim(jQuery("#inputSitename").val())+"--");

        var inputsitename = jQuery.trim(jQuery("#inputSitename").val())

        var regx = /^[A-Za-z0-9]+$/;
        


        
		if( (inputsitename!="") && (regx.test(inputsitename)) )
		{
        
		        var data = {
						action: 'check_sitename_exists',
					//	tbl_field: 'user_login',
						sitename:jQuery("#inputSitename").val()
					};
				console.log("response.....")
		        
				 // since 2.8 ajaxurl is always defined in the admin header and points to admin-ajax.php
					jQuery.post(ajaxurl, data, function(response) {
						console.log(response);				 	
						if(response.code =='000')
						{	
							console.log(response.msg)
							jQuery("#site_exists_error").focus();
							jQuery("#site_exists_error").remove();
							jQuery("#inputSitename").attr("site_exists","1")
							jQuery("#inputSitename").after("<ul id='site_exists_error'><li class='required' >"+response.msg+"</li></ul>");
							jQuery("#inputSitename").focus();
							return false
						}
						else
						{	
							jQuery("#inputSitename").attr("site_exists","0") 
							jQuery("#site_exists_error").remove();
							console.log(response.msg);
							 return true	
						} 
					});//end  jQuery.post(ajaxurl, data, function(response)
		}//end if(jQuery("#inputSitename").val()!="")
*/

		/*jQuery( '#inputEmail' ).parsley( 'addListener', {
			'onFieldSuccess': function ( elem ) { alert("listner test"); console.log(elem);



			  } });*/
		
		
		jQuery("#div_languageselector").children("ul").on("change",function(){
			
			console.log(jQuery("#div_languageselector").children("ul").val());
			
		})
		
        
      }) 
      
      
 
    
    
    
 
   /* jQuery(document).ready(function(){
    
   /* jQuery('input').keyup(function() {
    var $th = $(this);
    $th.val( $th.val().replace(/[^a-zA-Z0-9]/g, function(str) { alert('You typed " ' + str + ' ".\n\nPlease use only letters and numbers.'); return ''; } ) );

});* / 




    
    
    jQuery("#inputName").focusout(function() { 
        console.log(jQuery("focusout"+"#inputName").val());
      })
     /* .blur(function() {
        console.log(jQuery("blur"+jQuery("#inputName").val() );
      });* /
    


    
    })*/
    
    