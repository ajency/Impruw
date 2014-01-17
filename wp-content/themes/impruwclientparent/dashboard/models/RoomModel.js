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
		saveRoomData :function(args,  fn){
		 
			var _self = this;
			
			var data = {	category			: args.category, 
					  	 	nos					: args.nos,
					  	 	description 		: args.description,
					  	 	facilities			: args.facilities,
					  	 	checkinformat		: args.checkinformat,
					  	 	checkintime			: args.checkintime,
					  	 	additionalpolicies	: args.additionalpolicies,
					  	 	tax_option  		: args.tax_option,
					  	 	room_attachments 	: args.room_attachments,
					  	 	plantariffids		: args.plantariffids
					  	 };
			 
			$.post(	this.addRoomUrl,
					data,
					function(response){
				
						if(response.code=='OK'){
						 
							/*_self.set(response.site_data)*/
							_self.set(response.roomdata);
							if(!_.isUndefined(fn.success) && _.isFunction(fn.success))
								fn.success(response,fn.event,fn._self);  
						 
							fn.addroomtoCollection(_self,fn._self,fn.event)
							
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