(function ($) {
	"use strict";
	$(function () {
		// Place your administration-specific JavaScript here

		 jQuery('#save_site_plan').click(function(e) {

		 	var form = $('#save_site_plan').closest("form") ;

		 	var siteId = $("input[name=id]").val();
		 	var paymentPlan = $('#blog_payment_plan').val();
		 	var ajxURL = aj_billing_api_url+'/'+siteId+'/site/'+paymentPlan;

		 	var self = $( this );

            var loaderContainer = $( '<span/>', {
                'class': 'loader-image-container'
            }).insertAfter( self );

            var loader = $( '<img/>', {
                src: ''+site_url+ '/wp-admin/images/loading.gif',
                'class': 'loader-image'
            }).appendTo( loaderContainer );

		 	var ajxOptions = {
		 		method: 'PUT',
		 		url: ajxURL
		 	};

		 	if (paymentPlan==='-1') {
		 		var msg = 'Please select a plan before saving';
    			$('.plan-setting-updated-msg').empty();
    			$('.plan-setting-updated-msg').append('<span class="display-msg">'+msg+'</span>');
    			$('.display-msg').fadeOut (5000);
    			return
		 	}
		 	else{
		 		var jqxhr = $.ajax(ajxOptions)
		 		.done(function(data, textStatus, jqXHR){
		 			if (data.update_success) {
		 				loaderContainer.remove();
		 				var msg = "Plan successfully updated";
		 				$('.plan-setting-updated-msg').empty();
		 				$('.plan-setting-updated-msg').append('<span class="display-msg">'+msg+'</span>');
		 				$('.display-msg').fadeOut (5000);
		 			}
		 		})
		 		.fail(function(jqXHR, textStatus, errorThrown){
		 			loaderContainer.remove();
		 			var msg = 'Error in updating plan';
		 			$('.plan-setting-updated-msg').empty();
		 			$('.plan-setting-updated-msg').append('<span class="display-msg">'+msg+'</span>');
		 			$('.display-msg').fadeOut (5000);
		 		});
		 	}

    	});

	
	});

}(jQuery));