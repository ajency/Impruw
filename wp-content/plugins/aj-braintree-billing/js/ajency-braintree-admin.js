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

		

		$('#add_another_feature').click(function() {
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


		$('#save_plan').click(function() {
		 	var arr, selectedlanguage;

		 	var data = $("#save-plan-form").serialize();

		 	$.post(	
		 			ajaxurl, 
		 			data, 
		 			function(response) {
			            jQuery('#setting-error-settings_updated').empty();
			            jQuery('#setting-error-settings_updated').append('<div class="updated settings-error" >'+response.msg+'</div>');

		 			});
     
    	});

    	$('#ajbilling_save_object_type').click(function(){
    		alert('save object type');

    		var selected_object_type = $('#ajbilling_object_type').val();

    		if (selected_object_type==-1) {
    			var msg = 'Please select an object type';
    			$('.object-validation-error').empty();
    			$('.object-validation-error').append('<div class="ui-state-error ui-corner-all" >'+msg+'</div>');
    			$('.ui-state-error').fadeOut(5000);
    			return
    		}
    		else{
    			var data = {'action':'update-objectType','object_type':selected_object_type};

    			$.post(	
    				ajaxurl, 
    				data, 
    				function(response) {
    					var object_type = response.object_type.toUpperCase();
    					if (response.code==='OK') {
    						$( ".object_type_section" ).replaceWith( "<label>"+object_type+"</label>" );
    						$( "#ajbilling_save_object_type" ).remove();
    						$('.ajbilling_save_object_type').addClass('hidden');
    						$('.ajbilling-plan-listing').removeClass('hidden');
    					}
    					else{
    						var msg = response.msg;
    						$('.object-validation-error').empty();
    						$('.object-validation-error').append('<div class="ui-state-error ui-corner-all" >'+msg+'</div>');
    						$('.ui-state-error').fadeOut(5000);	
    					}
    				});

    		}
    	});

	
	});

}(jQuery));
