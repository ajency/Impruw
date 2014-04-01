/****Pink Theme JS****/

//Left Menu Height
jQuery(window).resize(function() { 
	var f = jQuery('.site-footer').height();
	var h = jQuery(document).height() - (f);
	jQuery('.long-bar > .column').height(h);
	jQuery('.site-page').height(h);
});
jQuery(window).load(function() { 
	var f = jQuery('.site-footer').height();
	var h = jQuery(document).height() - (f);
	
	setTimeout(function(){
		jQuery(window).resize();
	}, 500);
});