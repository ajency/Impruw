/**
 * [description]
 * @param  {[type]} $ [description]
 * @return {[type]}   [description]
 */

jQuery(document).ready(function($){
	
	$('#contact-form-save').click(function(){

		if(!$(this).closest('form').valid())
			return;

		var data = getFormData($(this).closest('form'));
		
		data['action'] = 'send-contact-form-message';

		$.post(AJAXURL,
				data,
				function(response){

					$('#contact-form-save').closest('form').parent().find('.alert').remove();

					if(response.code === 'OK'){

						$('#contact-form-reset').click();
						var html = '<div class="alert alert-success alert-dismissable">\
									  <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>\
									  <strong>Success!</strong> Message sent successfully\
									</div>';

						$('#contact-form-save').closest('form').before(html);
						$('#contact-form-save').closest('form').find('input[type="reset"]').click()
					}
					else if(response.code === 'ERROR'){

						$('#contact-form-reset').click();
						var html = '<div class="alert alert-danger alert-dismissable">\
									  <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>\
									  <strong>Error!</strong>'+response.message+'\
									</div>';
						$('#contact-form-save').closest('form').before(html);
					}

				},'json');
	});

	var getFormData = function(form) {

        var serializedData = $(form).serializeArray();

        var data = {};

        $.each(serializedData, function(key, ele) {
            data[ele.name] = ele.value;
        });

        return data;

       }
       
      
        // create the slugs for the class names
        function slugify(str) {
            var $slug = '';
            var trimmed = $.trim(str);
            $slug = trimmed.replace(/[^a-z0-9-]/gi, '-').
            replace(/-+/g, '-').
            replace(/^-|-$/g, '');
            return $slug.toLowerCase();
        }
        
    // get the class name based on the daterange
        function getDateRangeClassName(date){
            var date_range_name = ''; 
           
            for(var i=0; i< DATERANGE.length; i++){
                    
               var from_date = new Date(DATERANGE[i].from_date);
                    
               var to_date = new Date(DATERANGE[i].to_date);
               
               if( date >= from_date && date <= to_date){
                   
                    var class_name = DATERANGE[i].daterange_name;
                    
                    var class_name_slug = slugify(class_name);
                                                        
                    date_range_name = class_name_slug;
                   
                    break;
               }
               else{
                   date_range_name = 'class_name_slug';
               }
            
            }
            
            return date_range_name;
        }
       
        // get class name based on avaialbilty status
        function getAvailabilityClassName(date){
            
            var status = '';
           
            for(var i=0; i< BOOKING.length; i++){
                    
               var check = moment(BOOKING[i].bdate).isSame(date);
               
               if(check){
                   
                    status = BOOKING[i].status;
               }
               else{
                   status = 'available';
               } 
            }
            
            return status;
        }
        
        
        function showDateRangeColour(date){
            
           var date_range_slug = getDateRangeClassName(date);
            
           var status = getAvailabilityClassName(date);
  
           var class_name = ['true',date_range_slug+' '+status];
           
           return class_name;
        }
    
    // generate the datepicker  for the room booking 
       $('#room-booking-calendar').datepicker({
          inline: true,
          numberOfMonths: 2,
          dateFormat: 'yy-mm-dd',
          beforeShowDay : showDateRangeColour
        });
        
        getColour();
       
        function getColour(){
            
          var classNames = ['green', 'red', 'orange', 'blue', 'pink'];
          
          var arr =[]; 
          for(var i=0; i< DATERANGE.length; i++){

              var date_range_name = DATERANGE[i].daterange_name;

              var slug_name= slugify(date_range_name);

              arr.push(slug_name); 
           }
           
           $.each(arr, function(key, val) {
              $(" ." + val ).addClass("booking-" + classNames[key]);
           });
      }
        
        
      

});