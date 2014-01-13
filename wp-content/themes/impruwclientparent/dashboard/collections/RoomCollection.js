/* The RooomCollection 
 */

define(['underscore', 'backbone',  'roommodel'],
    function(_, Backbone,  RoomModel) {

        var RoomCollection = Backbone.Collection.extend({

            //model property
            model: RoomModel,
            /**
             * Url to fetch all menus for the Site
             * @returns {String}
             */
            url: function() {
                return AJAXURL + '?action=get_room_list_ajx'
            }, 
	        /**
	         * Pasrse JSOn response to check if code is OK
	         */
	        parse: function(response) {
	
	            if (response.code === "OK") {
	                return response.data;
	            }

        } 
            
        }) ;
        
        return RoomCollection;         
       
	}) 