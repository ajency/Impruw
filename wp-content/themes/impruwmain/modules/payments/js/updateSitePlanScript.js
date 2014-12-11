(function ($) {
	"use strict";
	$(function () {
		// Place your administration-specific JavaScript here

		 jQuery('#save_site_plan').click(function() {
		 	alert('save plan');

		 	var form = $('#save_site_plan').closest("form") ;

		 	var siteId = $("input[name=id]").val();
		 	var paymentPlan = $('#blog_payment_plan').val();

		 	alert(paymentPlan);
		 	alert(aj_billing_api_url);

		 	var ajxURL = aj_billing_api_url+'/'+siteId+'/site/'+paymentPlan;

		 	alert(ajxURL);

		 	var ajxOptions = {
		 		method: 'PUT',
		 		url: ajxURL
		 	};

		 	$.ajax(ajxOptions).done(function(data, textStatus, jqXHR){
		 		alert('hi');
		 	});
    
    	});

	
	});

}(jQuery));