/****Pink Theme JS****/

//Left Menu Height
jQuery(window).resize(function() { 
	var f = jQuery('#site-footer-region').height();
	var h = jQuery(document).height() - (f);
	jQuery('.long-bar > .column').height(h);
});
jQuery(window).load(function() { 
	var f = jQuery('#site-footer-region').height();
	var h = jQuery(document).height() - (f);
	jQuery('.inner-left-bar > .column').height(h);
});