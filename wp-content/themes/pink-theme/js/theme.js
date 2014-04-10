/****Pink Theme JS****/

//Left Menu Height
jQuery(document).ready(function(){
	jQuery(window).resize(function() { 
		var f = jQuery('.site-footer').height();
		var h = jQuery('.site-style-container').height() - (f);
		jQuery('.long-bar > .column').height(h);
		jQuery('#jPanelMenu-menu').height(h);
	});
	jQuery(window).load(function() { 
		var f = jQuery('.site-footer').height();
		var h = jQuery('.site-style-container').height() - (f);
		
		setTimeout(function(){
			jQuery(window).resize();
		}, 500);
	
		// jPanelMenu
		var jPM = jQuery.jPanelMenu({
	    	menu: '.left-menu',
		    trigger: '.left-menu-trigger'
		});
	
		jPM.on();
	});
});