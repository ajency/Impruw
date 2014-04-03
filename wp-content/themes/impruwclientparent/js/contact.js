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
       
       // generate the datepicker  for the room booking
       
        function showDateRangeColour(date){
         var date1 = new Date(2014, 4, 1);
         var date2 = new Date(2014, 4, 12);
         if (date >= date1 && date <= date2) {
                return [true, 'red', ''];
            }
         else{
         return [true, 'pink', ''];
             }
        }
        
       $('#room-booking-calendar').datepicker({
          inline: true,
          numberOfMonths: 2,
          dateFormat: 'yy-mm-dd',
          beforeShowDay : showDateRangeColour
        });
        
      

});