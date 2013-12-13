/**
 * This is Site model 
 * 
 */
define([ "jquery", "underscore", "backbone" ], function($, _, Backbone) {
	
	var SiteModel = Backbone.Model.extend({
		
		url : AJAXURL + '?action=get_site_data_ajx',
		
		siteProfileUrl : AJAXURL + '?action=save_site_data_ajx',

		
		/**
		 * Function to get site emails
		 * @returns array containing site email ids
		 */
		getSiteProfileEmails : function(){
			var emails;
			
			if(_.isUndefined(this.get('email')))
				return [];
			
			
			emails = this.get('email').split(',');
			
			if(_.isArray(emails))				
				return emails;
				
			return [];
		},
		
		
		/**
		 * Function to get site phone nos
		 * @returns array containing phone nos
		 */
		getSiteProfilePhoneNos : function(){
			var phoneNos;
			
			if(_.isUndefined(this.get('phone')))
				return [];
			
			phoneNos = this.get('phone').split(',');
			
			if(_.isArray(phoneNos))
				return phoneNos;
			
			return[];
			
		},
		
		
		/**
		 * Function to get site profile (business, social)
		 * @param data
		 * @param fn
		 */
		getSiteProfile : function(fn){
			
			_self = this;
			console.log('getsiteprofile')
			//console.log(this.get('id'))
			 var data = {
				//	action: 'save_admissiondetails',
					
					siteprofile_id :_self.get('id'),
				 	 
				};
			
			$.get(this.url,data,function(response){
				
				console.log(response);
				if(response.code === 'OK'){
				//	if(_.isObject(response.siteProfileData))	
						_self.set(response.siteProfileData);
				//	if(!_.isUndefined(fn.success) && _.isFunction(fn.success))
						fn.success(response);  
					
					
				}
				else{
					console.log("Error fetching site profile");
					
					
				}
			}); 
			
			
		},
		
		saveSiteProfile :function(args,  fn){
			console.log('save profile')
			console.log(args)
			var _self = this;
			alert("model save sitepofile")
			
			var data = {	siteprofile_business :args.business,
				 			siteprofile_social :args.social,	 
						};
			 
			 
			$.post(	this.siteProfileUrl,
					data,
					function(response){
						if(response.code=='OK'){
						
							console.log(fn);
							
							_self.set(response.site_data)
							
							console.log(window.impruwSite);
							if(!_.isUndefined(fn.success) && _.isFunction(fn.success))
								fn.success(response);  
						}
							
						else{
							console.log("status failed")
							if(!_.isUndefined(fn.failure) && _.isFunction(fn.failure))
								fn.failure(response);
						}
				
					});			
			
		}
	
	});

	return SiteModel;
})