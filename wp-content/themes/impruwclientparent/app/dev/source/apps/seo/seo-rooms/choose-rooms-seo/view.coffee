define ['app'], (App)->

            App.module 'SeoApp.SeoRooms.ChooseSeoRooms.Views', (Views, App, Backbone, Marionette, $, _)->

                class Views.EmptyView extends Marionette.ItemView

                    template: '<div class="empty-info">You have no rooms. Add rooms by going to Rooms tab on the Dashboard. Once you have filled out your room details, you can come back here to update SEO.</div>'


                class Views.ChooseRoomsView extends Marionette.ItemView 

                    template: "<form class='form-horizontal'>
                                Pick a Room: 
                    			<select class='js-seo-room-select' id='js-seo-room-select'>
									<option value='-1'>Choose a room</option>
								</select>
                                </form>" 

                    events: "click div.js-seo-room-select ul.selectpicker li" : "loadSeoRoomApp"  

                    onShow :->
                        _.each @collection.models, (model,index)=>
                            room_id = model.get 'ID'
                            room_name = model.get 'post_title'
                            html = "<option value='"+room_id+"' >"+room_name+"</option>"
                            @$el.find('select').append html 

                        @defaultRoomApp()

                    loadSeoRoomApp: (e) ->
                        #get the selectedIndex from the li element
                        selectedIndex = $(e.currentTarget).attr('rel')

                        #The the option's value based on the selectedIndex
                        selectedRoomId = $('select#js-seo-room-select option:eq(' + selectedIndex + ')').attr('value')

                        unless selectedRoomId is '-1'
                            @trigger 'load:rooms', selectedRoomId  

                        else
                            @$el.find('.alert').remove()
                            @$el.append('<div class="alert alert-success">'+_.polyglot.t("Please select a room to edit SEO")+'</div>')
                            @$el.find('.alert').fadeOut 5000 

                    defaultRoomApp:()->
                        selectedRoomId = @$el.find("select#js-seo-room-select")[0].options[1].value
                        
                        unless selectedRoomId is '-1'
                            @trigger 'load:rooms', selectedRoomId  

                        @$el.find( "#js-seo-room-select option[value='"+selectedRoomId+"']" ).attr 'selected' : 'selected'
                        @$el.find('#js-seo-room-select').selectpicker()


