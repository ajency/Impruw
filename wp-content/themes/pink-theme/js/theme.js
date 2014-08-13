/****Pink Theme JS****/

//Left Menu Height
jQuery(window).resize(function() { 
	var f = jQuery('.site-footer').height();
	var h = jQuery('.site-style-container').height() - (f);
	var lbh = jQuery('.long-bar > .column').css('min-height');

	jQuery('.long-bar > .column').height(h);
	jQuery('#jPanelMenu-menu').height(h);

	if (h < 500) {
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