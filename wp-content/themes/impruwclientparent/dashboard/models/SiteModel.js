/**
 * This is Site model 
 * 
 */
define([ "jquery", "underscore", "backbone" ], function($, _, Backbone) {
	
	var SiteModel = Backbone.Model.extend({
		
		url : AJAXURL + '?action=get_site_data_ajx',
		
		siteProfileUrl : AJAXURL + '?action=save_site_data_ajx',
		removebusLogoUrl : AJAXURL + '?action=remove_business_logo',
		
		/**
		 * Function to get site emails
		 * @returns array containing site email ids
		 */
		getSiteProfileEmails : function(){
			var emails;
			
			/*if(!this.has('email'))
				return [];*/
			
			
			emails = this.getBusinessDetails('email').split(',');
			
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
			
			/*if(!this.has('phone'))
				return [];*/
			
			phoneNos = this.getBusinessDetails('phone').split(',');
			
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

			
			var data = {
				siteprofile_id :_self.get('id')
			};
			
			$.get(this.url,data,function(response){
				

				if(response.code === 'OK'){
					if(_.isObject(response.siteProfileData))	
						_self.set(response.siteProfileData);
					if(!_.isUndefined(fn.success) && _.isFunction(fn.success))
						fn.success(response);  
 					
				}
				else{
					fn.error(response); 
					throw "Error fetching site profile";
					
				}
			}); 
			
			
		},
		
		
		getBusinessDetails : function(field){

			if(!this.has('businessDetails'))
				return ''

			var details = this.get('businessDetails');

			if(_.isUndefined(details[field]))
				return '';

			return details[field];
		},
		
		
		getSocialDetails : function(field){
			
			if(!this.has('socialDetails'))
				return ''

			var details = this.get('socialDetails');

			if(_.isUndefined(details[field]))
				return '';

			return details[field];
		},
		
		
		
		getGeneralDetails : function(field){
			
			if(!this.has('generalDetails'))
				return ''

			var details = this.get('generalDetails');

			if(_.isUndefined(details[field]))
				return '';

			return details[field];
		},
		
		/**
		 * Function to remove business logo
		 * @param args
		 * @param fn
		 */
		removeSiteBusinessLogo : function(args, fn){
			console.log('remove business logo 2')
			var _self = this;
			 
			
			var data = { };
			 
			 
			$.post(	this.removebusLogoUrl,
					data,
					function(response){
						if(response.code=='OK'){
						
							_self.set(response.site_data)
							
							console.log(window.impruwSite);
							if(!_.isUndefined(fn.success) && _.isFunction(fn.success))
								fn.success(response);  
						}
						else{
							 
							if(!_.isUndefined(fn.failure) && _.isFunction(fn.failure))
								fn.failure(response);
						}
				
					});	
			
		},
		
		/**
		 * Function to save site Profile
		 * @param args
		 * @param fn
		 */
		saveSiteProfile :function(args,  fn){
  
			var _self = this;
			 
			var evt_ = event;
			var data = {	siteprofile_business 	 : args.business, 
				 			siteprofile_social 	 	 : args.social,
				 			 
				 			siteprofile_businesslogo : args.siteprofile_businesslogo
						};
			 
			 
			$.post(	this.siteProfileUrl,
					data,
					function(response){
						if(response.code=='OK'){
						
							_self.set(response.site_data)
							
							console.log(window.impruwSite);
							if(!_.isUndefined(fn.success) && _.isFunction(fn.success))
								fn.success(response,evt_);  
						}
						else{
							 
							if(!_.isUndefined(fn.failure) && _.isFunction(fn.failure))
								fn.failure(response,evt_);
						}
				
					});			
			
		}
	
	});

	return SiteModel;
})