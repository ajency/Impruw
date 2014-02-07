define ['backbone'], (Backbone)->

	# Room Model
	class RoomModel extends Backbone.Model

		idAttribute : 'ID'

		defaults :
			post_title 		: ''
			post_content 	: ''
			image			: ''


	# Room Collection
	class RoomCollection extends Backbone.Collection

		url :
			AJAXURL + '?action=get-all-rooms'

		parse :(resp)-> 
			
			if resp.code is 'OK'
				resp.data


	RoomModel : RoomModel
	RoomCollection : RoomCollection
