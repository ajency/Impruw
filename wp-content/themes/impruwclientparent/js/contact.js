/**
 * [description]
 * @param  {[type]} $ [description]
 * @return {[type]}   [description]
 */

$(document).ready(function($){
	
	$('#contact-form-save').click(function(){

		if(!$(this).closest('form').parsley('validate'))
			return;

		var data = getFormData($(this).closest('form'));
		
		data['action'] = 'send-contact-form-message';

		$.post(AJAXURL,
				data,
				function(response){

					if(response.code === 'OK'){

						$('#contact-form-reset').click();
						var html = '<div class="alert alert-success alert-dismissable">\
									  <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>\
									  <strong>Success!</strong> Message sent successfully\
									</div>';

						$('#contact-form-save').closest('form').parent().prepend(html);
					}
					else if(response.code === 'ERROR'){

						$('#contact-form-reset').click();
						var html = '<div class="alert alert-danger alert-dismissable">\
									  <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>\
									  <strong>Error!</strong>'+response.message+'\
									</div>';
						$('#contact-form-save').closest('form').parent().prepend(html);
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

});