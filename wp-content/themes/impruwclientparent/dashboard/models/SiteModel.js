/**
 * This is Site model 
 * 
 */
define([ "jquery", "underscore", "backbone" ], function($, _, Backbone) {
	
	var SiteModel = Backbone.Model.extend({
		
		url : AJAXURL + '?action=get_site_data',
		
		siteProfileUrl : AJAXURL + '?action=get_site_data',

		
		saveSiteProfile :function(args){
			
			$.post(this.siteProfileUrl,{
				
			})
			
			
		}
	
	});

	return SiteModel;
})