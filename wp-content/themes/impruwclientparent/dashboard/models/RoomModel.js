/**
 * This is room model
 */

define([ "jquery", "underscore", "backbone" ], function($, _, Backbone) {
	
	var RoomModel = Backbone.Model.extend({
		
		//url : AJAXURL + '?action=get_user_profile_ajx',
		addRoomUrl : AJAXURL + '?action=add_new_room_ajx',
		
		 
	  
		
		/**		 
		 * @param args
		 * @param fn
		 */
		saveRoom :function(args,  fn){
			console.log("save room model")
						 
			var _self = this;
			
			var data = {	category	:args.category, 
					  	 	nos			:args.nos,
					  	 	description :args.description,
					  	 	facilities	:args.facilities   	};
			 
			$.post(	this.addRoomUrl,
					data,
					function(response){
				
						if(response.code=='OK'){
							console.log(response)
						
							/*_self.set(response.site_data)
							
							if(!_.isUndefined(fn.success) && _.isFunction(fn.success))
								fn.success(response,fn.event,fn._self);  */
						}
						else{
							console.log('error')
							console.log(response)
							 
							/*if(!_.isUndefined(fn.failure) && _.isFunction(fn.failure))
								fn.failure(response,fn.event,fn._self); */
						}
				
					});			
			
			} 
		
		
		
	});

	return RoomModel;
})