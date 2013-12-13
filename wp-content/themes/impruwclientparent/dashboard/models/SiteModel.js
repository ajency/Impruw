/**
 * This is Site model 
 * 
 */
define([ "jquery", "underscore", "backbone" ], function($, _, Backbone) {
	
	var SiteModel = Backbone.Model.extend({
		
		url : AJAXURL + '?action=get_site_data_ajx',
		
		siteProfileUrl : AJAXURL + '?action=save_site_data_ajx',

		
		getSiteProfileEmails : function(args){
			var emails;
			
			emails = args.split(',');
			
			return emails;
			
		},
		
		getSiteProfilePhoneNos : function(args){
			var phoneNos;
			
			phoneNos = args.split(',');
			
			return phoneNos;
			
		},
		
		getSiteProfile : function(){
			
			_self = this;
			//console.log('getsiteprofile')
			//console.log(this.get('id'))
			 var data = {
				//	action: 'save_admissiondetails',
					
					siteprofile_id :_self.get('id'),
				 	 
				};
			
			$.post(this.url,data,function(response){
				console.log(response);
				if(response.code=='OK'){
					_self.set(response.siteProfileData)
					 
				}
				else{
					console.log("Error fetching site profile")
				}
			}) 
			
			
		},
		
		saveSiteProfile :function(args){
			var _self = this;
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
						
						_self.set(response.site_data)
						
						console.log(window.impruwSite);
						  
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