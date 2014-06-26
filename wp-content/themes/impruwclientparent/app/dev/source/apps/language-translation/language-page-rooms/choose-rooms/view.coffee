define ['app'], (App)->

            App.module 'LanguageApp.LanguagePageRooms.ChooseRooms.Views', (Views, App, Backbone, Marionette, $, _)->

                class ChooseRoomsItemView extends Marionette.ItemView

                    template : '<option value="{{ID}}"">{{post_title}}</option>'


                class Views.ChooseRoomsView extends Marionette.CompositeView 

                    template: "<form>
                                Pick a Room: 
                    			<select class='js-room-select' id='js-room-select'>
									<option>Choose a room</option>
								</select>
                                </form>"
                    itemView : ChooseRoomsItemView 

                    itemViewContainer : ".js-room-select"  

                    events: "click div.js-room-select ul.selectpicker li" : "loadRoomApps"  

                    onShow :->
                    	@$el.find('select').selectpicker()

                    loadRoomApps: (e) ->
                        #get the selectedIndex from the li element
                        selectedIndex = $(e.currentTarget).attr('rel')

                        #The the option's value based on the selectedIndex
                        selectedRoomId = $('select#js-room-select option:eq(' + selectedIndex + ')').attr('value')

                        @trigger 'load:original:rooms', selectedRoomId  unless selectedRoomId is "" 
                        @trigger 'load:translated:rooms', selectedRoomId  unless selectedRoomId is "" 

