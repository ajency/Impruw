/**
 * This is Site model 
 * 
 */
define([ "jquery", "underscore", "backbone" ], function($, _, Backbone) {
	
	var SiteModel = Backbone.Model.extend({
		
		url : AJAXURL + '?action=get_site_data',

		/*fetch : function(){
			return true;	
			
		}*/
	});

	return SiteModel;
})