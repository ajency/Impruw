/**
 * The RoomListView.
 * 
 */

define([ 'underscore', 'jquery', 'backbone','roomcollection',
		'text!templates/siteprofile/RoomListViewTpl.tpl','radio'], 
      function(_, $, Backbone, RoomCollection, ListRoomViewTpl) {

	var RoomListView = Backbone.View.extend({

         id : 'list-room',

         events : {
        	'click a.retry' : 'reTry'    
		}, 

		initialize : function(args) {
			
			_.bindAll(this, 'showFetchError','addNewRoom');
			
			
			console.log('initalize room list view....')
			console.log(getAppInstance().roomCollection);
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
			
			var roomFn = _.bind(function(RoomTpl){
				
				var html = _.template(RoomTpl, {room : room});
				this.$el.find('tbody').append(html);
			}, this);
			
			require(['text!templates/rooms/room.tpl'],roomFn );
		},
		
		/**
		 * 
		 */
		showFetchError : function(response){
			this.$el.html(response.message);
			this.$el.html('<a href="#" class="retry">try Now</a>');
			
		}
	});

	return RoomListView;

});