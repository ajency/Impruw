/**
 * This is the main javascript file for the Ajency Braintree plugin's main administration view.
 *
 * This includes the header, options, and other information that should provide
 * The User Interface to the end administrator.
 *
 * @package   ajency-braintree
 * @author    Team Ajency <team@ajency.in>
 * @license   GPL-2.0+
 * @link      http://ajency.in
 * @copyright 11-28-2014 Ajency.in
 */

(function ($) {
	"use strict";
	$(function () {
		// Place your administration-specific JavaScript here

		

		jQuery('#add_another_feature').click(function() {
			var plan_feature_tbl_body = $('#plan_feature_table tbody');
			var i = $('#plan_feature_table tbody tr').size() + 1;
			var featureIndex = i-1;
			alert(featureIndex);

        	var tr_html = '<tr valign="top"><td scope="row"><input name="site_plan_feature['+featureIndex+'][name]" id="" type="text" value="" class="regular-text" /> </td><td><select name="site_plan_feature['+featureIndex+'][enabled]" id="site_plan_feature_status"><option selected="selected" value="-1">--Select Status--</option> <option value="1">Enabled</option><option value="0">Disabled</option> </select> </td> <td> <select name="site_plan_feature['+featureIndex+'][count]" id="site_plan_feature_count"> <option selected="selected" value="-1">--Select Count--</option> <option value="-1">N/A</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select> </td><td> <a href="#" id="remScnt">Remove</a></td></tr>';

			$(tr_html).appendTo(plan_feature_tbl_body);
			i++;
			return false;
		});

		$('#remScnt').live('click', function() { 
			var plan_feature_tbl_body = $('#plan_feature_table tbody');
			var i = $('#plan_feature_table tbody tr').size() + 1;
		 	if( i > 2 ) {
		 		$(this).closest('tr').remove();
		 		i--;
		 	}
		 	return false;
        });


		 jQuery('#save_plan').click(function() {
		 	var arr, selectedlanguage;

		 	alert('Save plan');

		 	var data = $("#save-plan-form").serialize();

		 	jQuery.post(	
		 			ajaxurl, 
		 			data, 
		 			function(data,response) {
		 				alert('Got this from the server: ' + response);

		 				alert("Response success")

		 				// if (response.code === "ERROR") {
				          //   errorMsg = response.msg;
				          //   $('#display-reset-msg').empty();
				          //   return $('#display-reset-msg').append(errorMsg);
				          // }

		 				console.log(response);

		 			});
     
    	});

	
	});

}(jQuery));
