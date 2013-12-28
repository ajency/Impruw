/**
 * This is room model
 */

define([ "jquery", "underscore", "backbone" ], function($, _, Backbone) {
	
	var RoomModel = Backbone.Model.extend({
	 
		addRoomUrl : AJAXURL + '?action=add_new_room_ajx',
	 	
		/**	Function to add new room
		 * @param args
		 * @param fn
		 */
		saveRoom :function(args,  fn){
		 
			var _self = this;
			
			var data = {	category	:args.category, 
					  	 	nos			:args.nos,
					  	 	description :args.description,
					  	 	facilities	:args.facilities   	};
			 
			$.post(	this.addRoomUrl,
					data,
					function(response){
				
						if(response.code=='OK'){
						 
							/*_self.set(response.site_data)*/
							
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

	return RoomModel;
})