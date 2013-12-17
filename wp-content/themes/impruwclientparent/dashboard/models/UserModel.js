/**
 * This is user model
 */

define([ "jquery", "underscore", "backbone" ], function($, _, Backbone) {
	
	var UserModel = Backbone.Model.extend({
		
		url : AJAXURL + '?action=get_user_profile_ajx',
		userProfileUrl : AJAXURL + '?action=save_user_profile_ajx',
		userPassUrl : AJAXURL + '?action=update_user_passwrd_ajx',
		/*fetch : function(){
			return true;	
			
		}*/
		
		
		
		
		/**
		 * Function to get site profile (business, social)
		 * @param data
		 * @param fn
		 */
		getUserProfile : function(fn){
			
			_self = this;
			console.log('get user profile')
			//console.log(this.get('id'))
			 var data = {
				//	action: 'save_admissiondetails',
					
					user_id :_self.get('id')
				 	 
				};
			
			$.get(this.url,data,function(response){
				
				console.log(response);
				if(response.code === 'OK'){
				/*	if(_.isObject(response.siteProfileData))	
						_self.set(response.siteProfileData);
					if(!_.isUndefined(fn.success) && _.isFunction(fn.success))
						  */fn.success(response);
 					
				}
				else{
					fn.error(response); 
					/*console.log("Error fetching site profile");*/
					
					
				}
			}); 
			
			
		},
		
		
		saveUserProfile :function(args,  fn){
			//console.log("saveuser profile")
			 
			var _self = this;
			
			var data = {	userprofile_general :args.general 
					
						};
			 
			$.post(	this.userProfileUrl,
					data,
					function(response){
				
				console.log("save user profile status ")
				console.log(response)
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
		
		  
		updateUserPassword :function(args,  fn){
			//console.log("saveuser profile")
			 
			var _self = this;
			
			var data = {	userprofile_passdata :args.passData	};
			 
			$.post(	this.userPassUrl,
					data,
					function(response){
				
				console.log("save user password ")
				console.log(response)
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
			
			}
		
		
		
		
	});

	return UserModel;
})