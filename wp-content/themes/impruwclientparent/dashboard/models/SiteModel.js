/**
 * This is Site model 
 * 
 */
define([ "jquery", "underscore", "backbone",'mainview' ], function($, _, Backbone,mainView) {
	
	var SiteModel = Backbone.Model.extend({
		
		url : AJAXURL + '?action=get_site_data',
		
		siteProfileUrl : AJAXURL + '?action=save_site_data_ajx',

		
		saveSiteProfile :function(args){
			
			alert("model save sitepofile")
			var data = {
					//action: 'save_admissiondetails',
				 
				siteprofile_general :$('#form-siteprofile-general').serializeArray(),
				siteprofile_business :$('#form-siteprofile-business').serializeArray(),
				siteprofile_social :$('#form-siteprofile-social').serializeArray(),
				siteprofile_meta :$('#form-siteprofile-meta').serializeArray(),
				 	 
				};
			 
			 
			$.post(this.siteProfileUrl,data,function(response){
					if(response.code=='OK'){
						console.log("status ok ")
						window.impruwSite = response.site_data;
						console.log(window.impruwSite);
						
						mainView.show();
					}
						
					else{
						console.log("status failed")
						
					}
				
				
				}
			)
			
			
		}
	
	});

	return SiteModel;
})