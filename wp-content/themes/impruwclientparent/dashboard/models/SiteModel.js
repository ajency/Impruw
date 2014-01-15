/**
 * This is Site model 
 * 
 */
define([ "jquery", "underscore", "backbone" ], function($, _, Backbone) {
	
	var SiteModel = Backbone.Model.extend({
		
		url : function(){
			return AJAXURL;// + '?action=get_site_data_ajx',
		},

		// siteProfileUrl : AJAXURL + '?action=save_site_data_ajx',
		// removebusLogoUrl : AJAXURL + '?action=remove_business_logo',

		/**
		 * Override sync function for the model
		 * @return {[type]} [description]
		 */
		sync : function(method, model, options){

			


			options = options || {};
                  
			switch(method){

				case 'read':
					// Set the action and ID.
                    options.data = _.extend( options.data || {}, {
                        action 	:  'get_site_data_ajx',
                        id 		:  this.get('id'),
                    });
                    break;
				case 'update':
					
					// Set the action and ID.
					// options.attrs is for update action
                    options.attrs = _.extend( options.attrs || {}, {
                        action 	:  'update_site_data',
                        id 		:  this.get('id'),
                    });

                    // Record the values of the changed attributes.
                    if ( model.hasChanged() ) {
                        options.attrs.changes = {};

                        _.each( model.changed, function( value, key ) {
                            options.attrs.changes[ key ] = this.get( key );
                        }, this );
                    }

					break;
				case 'delete':

					break;

			}

			return Backbone.Model.prototype.sync.apply( this, arguments );

		},

		parse : function(response){

			if(response.code === 'OK')
				return response.data;
			else if(response.code === 'ERROR')
				this.trigger('model-fetch-failed', response);
		},
		
		/**
		 * Function to get site emails
		 * @returns array containing site email ids
		 */
		getSiteProfileEmails : function(){
			var emails;

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
			
			phoneNos = this.get('phone').split(',');
			
			if(_.isArray(phoneNos))
				return phoneNos;
			
			return[];
			
		},
		
		
		
		/**
		 * Function to remove business logo
		 * @param args
		 * @param fn
		 */
		removeSiteBusinessLogo : function(args, fn){
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