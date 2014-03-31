/**
 * The RoomListView.
 * 
 */

define([ 'underscore', 'jquery', 'backbone','roomcollection',
		'text!templates/siteprofile/RoomListViewTpl.tpl','roommodel','radio'], 
      function(_, $, Backbone, RoomCollection, ListRoomViewTpl, RoomModel) {

	var RoomListView = Backbone.View.extend({

         id : 'list-room',

         events : {
        	'click a.retry' 		  : 'reTry',
        	'click a.deleteroom_link' : 'deleteRoom',
        	'click a.editroom_link'	  : 'editRoom'
		}, 

		initialize : function(args) {
			
			_.bindAll(this, 'showFetchError','addNewRoom');
			
			
			//console.log('initalize room list view....')
			//console.log(getAppInstance().roomCollection);
			//check if app property is set
			if(!appHasProperty('roomCollection'))
				getAppInstance().roomCollection = new RoomCollection();	
			
			this.listenTo(getAppInstance().vent, 'room-collection-fetch-failed', this.showFetchError);
			
			this.listenTo(getAppInstance().roomCollection, 'add', this.addNewRoom);
			
		},
		
		reTry : function(e){
			e.preventDefault();
			getAppInstance().roomCollection.fetch({remove:false, add:true});
		},
		
		/**
		 * 
		 * @returns {___anonymous275_1390}
		 */
		render : function() {

			var html = _.template(ListRoomViewTpl,{}); 

			this.$el.html(html);
			
			//set custom selectbox & checkbox
			this.$el.find('select').selectpicker();
			this.$el.find('input[type="checkbox"]').checkbox();
			this.$el.find('input[type="radio"]').radio();
			
			//getAppInstance().vent.trigger('view-switched-started')
			//show loader
			//this.$el.html('Fetching Rooms..... Please Wait....');
			getAppInstance().roomCollection.fetch({ add:true});
			
			return this;
		},
		
		/**
		 * 
		 */
		addNewRoom : function(room){
			this.listenTo(room,'change',this.roomdataUpdated)
			var roomFn = _.bind(function(RoomTpl){
				
				var html = _.template(RoomTpl, {room : room});
				this.$el.find('tbody').append(html);
			}, this);
			
			require(['text!templates/rooms/room.tpl'],roomFn );
		},
		
		/**
		 * Triggered when room is changed
		 * Function to update room list after room is updated
		 * @param room
		 */
		roomdataUpdated : function(room){
			
			var roomRow = this.$el.find('#row_room_'+room.id)
			
			var roomFn = _.bind(function(RoomTpl){
				
				var html = _.template(RoomTpl, {room : room});
				
				roomRow.replaceWith(html)
				
				this.$el.find('.divHourFormat').find('span').html(room.get('checkinformat'))
				this.$el.find('.divCheckinTime').find('span').html(room.get('checkintime'))
				
				//this.$el.find('tbody').append(html);
			}, this);
			
			require(['text!templates/rooms/room.tpl'],roomFn );
			 
			
		},
		
		/**
		 * 
		 */
		showFetchError : function(response){
			this.$el.html(response.message);
			this.$el.html('<a href="#" class="retry">try Now</a>');
			
		},
		
		
		deleteRoom : function(evt){
			var r=confirm("Are you sure you want to delete this room?");
			if (r==true){
			
			var room_id = $(evt.target).attr('room-id');
			var room = new RoomModel();
			room.deleteRoom(room_id,evt);
			this.listenTo(getAppInstance().vent, 'room-deleted', this.roomDeleted);
			}
			
		},
		
		roomDeleted : function(response,evt){
			//console.log('room  deleted ')
			
			this.stopListening(ImpruwDashboard.vent, 'room-deleted');
			
			$(evt.target).closest('tr').remove()
			
		},
		
		editRoom : function(evt){
			
		 
			
		}
		
		
		
		
		/**
		 * Function to stop listening to events
		 
		stopListeningEvents : function(){
			//this.stopListening(SiteBuilder.vent, 'new-add-on-added', this.refetchHtml);
			this.stopListening(ImpruwDashboard.vent, 'room-deleted');
		
		},*/
		
		
		
		
	});

	return RoomListView;

});