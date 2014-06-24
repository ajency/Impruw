/****Pink Theme JS****/

//Left Menu Height
jQuery(window).resize(function() { 
	var f = jQuery('.site-footer').height();
	var h = jQuery('.site-style-container').height() - (f);
	var lbh = jQuery('.long-bar > .column').height();

	if (h >= lbh) {
		jQuery('.long-bar > .column').height(h);
		jQuery('#jPanelMenu-menu').height(h);
	}
	else if (lbh >= h) {
		jQuery('.site-page').height(lbh);
	}
});

jQuery(window).load(function() { 
	var f = jQuery('.site-footer').height();
	var h = jQuery('.site-style-container').height() - (f);
	var lbh = jQuery('.long-bar > .column').height;
	
	setTimeout(function(){
		jQuery(window).resize();
	}, 500);
});