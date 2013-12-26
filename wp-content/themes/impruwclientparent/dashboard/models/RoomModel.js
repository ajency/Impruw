/**
 * This is room model
 */

define([ "jquery", "underscore", "backbone" ], function($, _, Backbone) {
	
	var UserModel = Backbone.Model.extend({
		
		url : AJAXURL + '?action=get_user_profile_ajx',
		userProfileUrl : AJAXURL + '?action=save_user_profile_ajx',
		userPassUrl : AJAXURL + '?action=update_user_passwrd_ajx',
		 
		
		
		
		 
		
		/**		 
		 * @param args
		 * @param fn
		 */
		saveRoom :function(args,  fn){
						 
			var _self = this;
			
			var data = {	userprofile_general :args.general  	};
			 
			$.post(	this.userProfileUrl,
					data,
					function(response){
				
						if(response.code=='OK'){
						
							_self.set(response.site_data)
							
							if(!_.isUndefined(fn.success) && _.isFunction(fn.success))
								fn.success(response,fn.event,fn._self);  
						}
						else{
							 
							if(!_.isUndefined(fn.failure) && _.isFunction(fn.failure))
								fn.failure(response,fn.event,fn._self); 
						}
				
					});			
			
			},
		
		  
		updateUserPassword :function(args,  fn){
			 
			var _self = this;
			
			var data = {	userprofile_passdata :args.passData	};
			 
			$.post(	this.userPassUrl,
					data,
					function(response){
				 
						if(response.code=='OK'){
						
							_self.set(response.site_data)
							
							if(!_.isUndefined(fn.success) && _.isFunction(fn.success))
								fn.success(response,fn.event,fn._self);  
						}
						else{
							 
							if(!_.isUndefined(fn.failure) && _.isFunction(fn.failure))
								fn.failure(response,fn.event,fn._self); 
						}
				
					});			
			
			}
		
		
		
		
	});

	return UserModel;
})