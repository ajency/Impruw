(function ($) {
	"use strict";
	$(function () {
		// Place your administration-specific JavaScript here

		 jQuery('#save_site_plan').click(function() {

		 	var form = $('#save_site_plan').closest("form") ;

		 	var siteId = $("input[name=id]").val();
		 	var paymentPlan = $('#blog_payment_plan').val();
		 	var ajxURL = aj_billing_api_url+'/'+siteId+'/site/'+paymentPlan;

		 	var ajxOptions = {
		 		method: 'PUT',
		 		url: ajxURL
		 	};

		 	if (paymentPlan==='-1') {
		 		var msg = 'Please select a plan before saving';
    			$('.plan-setting-updated-msg').empty();
    			$('.plan-setting-updated-msg').append(msg);
    			return
		 	}
		 	else{
		 		var jqxhr = $.ajax(ajxOptions)
		 		.done(function(data, textStatus, jqXHR){
		 			if (data.update_success) {
		 				var msg = "Plan successfully updated";
		 				$('.plan-setting-updated-msg').empty();
		 				$('.plan-setting-updated-msg').append(msg);
		 			}
		 		})
		 		.fail(function(jqXHR, textStatus, errorThrown){
		 			var msg = 'Error in updating plan';
		 			$('.plan-setting-updated-msg').empty();
		 			$('.plan-setting-updated-msg').append(msg);
		 		});
		 	}

    	});

	
	});

}(jQuery));