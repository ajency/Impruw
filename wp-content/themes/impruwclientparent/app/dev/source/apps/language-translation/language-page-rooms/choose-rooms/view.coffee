define ['app'], (App)->

            App.module 'LanguageApp.LanguagePageRooms.ChooseRooms.Views', (Views, App, Backbone, Marionette, $, _)->

                class Views.EmptyView extends Marionette.ItemView

                    template: '<div class="empty-info">You have no rooms. Add rooms by going to Rooms tab on the Dashboard. Once you have filled out your room details, you can come back here to add translations.</div>'


                class Views.ChooseRoomsView extends Marionette.ItemView 

                    template: "<form class='form-horizontal'>
                                Pick a Room: 
                    			<select class='js-room-select' id='js-room-select'>
									<option value='-1'>Choose a room</option>
								</select>
                                </form>" 

                    events: "click div.js-room-select ul.selectpicker li" : "loadRoomApps"  

                    onShow :->
                        _.each @collection.models, (model,index)=>
                            room_id = model.get 'ID'
                            room_name = model.get 'post_title'
                            html = "<option value='"+room_id+"' >"+room_name+"</option>"
                            @$el.find('select').append html 

                        @defaultRoomApps()

                    loadRoomApps: (e) ->
                        #get the selectedIndex from the li element
                        selectedIndex = $(e.currentTarget).attr('rel')

                        #The the option's value based on the selectedIndex
                        selectedRoomId = $('select#js-room-select option:eq(' + selectedIndex + ')').attr('value')

                        unless selectedRoomId is '-1'
                            @trigger 'load:original:rooms', selectedRoomId  
                            @trigger 'load:translated:rooms', selectedRoomId 

                        else
                            @$el.find('.alert').remove()
                            @$el.append('<div class="alert alert-success">'+_.polyglot.t("Please select a room to translate")+'</div>')
                            @$el.find('.alert').fadeOut 5000 

                    defaultRoomApps:()->
                        selectedRoomId = @$el.find("select#js-room-select")[0].options[1].value
                        
                        unless selectedRoomId is '-1'
                            @trigger 'load:original:rooms', selectedRoomId  
                            @trigger 'load:translated:rooms', selectedRoomId 

                        @$el.find( "#js-room-select option[value='"+selectedRoomId+"']" ).attr 'selected' : 'selected'
                        @$el.find('#js-room-select').selectpicker()


