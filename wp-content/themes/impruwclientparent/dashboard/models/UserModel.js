/**
 * This is user model
 */

define([ "jquery", "underscore", "backbone" ], function($, _, Backbone) {
	
	var UserModel = Backbone.Model.extend({
		
		url : AJAXURL + '?action=get_user_data',

		/*fetch : function(){
			return true;	
			
		}*/
	});

	return UserModel;
})