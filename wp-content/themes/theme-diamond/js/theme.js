/****Diamond Theme JS****/
jQuery(window).load(function() { 
	setTimeout(function(){
		if ( jQuery(".menu-bar").parents(".site-header").length == 1 && jQuery.trim( jQuery('.site-page').html() ).length ) { 
			jQuery(".site-page").css("margin-top", "-2.06em");
		} else {
		   // Do Nothing
		}
	}, 500);
});