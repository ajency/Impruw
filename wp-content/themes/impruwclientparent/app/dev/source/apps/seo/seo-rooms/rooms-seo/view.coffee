define ['app'
		'text!apps/seo/templates/seo-room-content.html'], (App, seoroomcontentTpl)->

            App.module 'SeoApp.SeoRooms.Rooms.Views', (Views, App, Backbone, Marionette, $, _)->

                class Views.RoomContentItemView extends Marionette.ItemView

                    template : seoroomcontentTpl

                    events:
                      "click #btn-save-room-seo-details": (e) ->
                        e.preventDefault()
                        newSeoTitle = $("#room_seo_title").val()
                        newSeoDesc = $("#room_meta_description").val()
                        newSeoKeywords = $("#room_meta_keywords").val()
                        includeSiteMapCheckbox = @$el.find("input[type='checkbox']")

                        if includeSiteMapCheckbox.is(":checked")
                            includeSiteMap = true
                        else
                            includeSiteMap = false
                        @trigger "room:seo:save", newSeoTitle , newSeoDesc, newSeoKeywords, includeSiteMap

                    onRoomSeoUpdated :() ->
                      @$el.find('.alert').remove()
                      @$el.append('<div class="alert alert-success">'+_.polyglot.t("Room Seo Details updated")+'</div>')
                      @$el.find('.alert').fadeOut 5000                      
