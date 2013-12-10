   
jQuery(document).ready(function($) {
   
   $('#btn_create_site').click(function(e){
      
      e.preventDefault();
      
      if($('#frm_registration').parsley('validate')){
         
         $(this).next().show();
         
      }
      
   });
   
   $('#frm_registration').parsley({
      errors:{
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
               
               
              
            }
       }
   });
   $("select").selectpicker();
   
}); 
      
 
    
    
    
 
   
    
    