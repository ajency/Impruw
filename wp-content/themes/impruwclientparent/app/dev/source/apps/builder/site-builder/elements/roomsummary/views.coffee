define ['app'], (App)->

    # Row views
    App.module 'SiteBuilderApp.Element.RoomSummary.Views', (Views, App, Backbone, Marionette, $, _)->

        # Menu item view
        class Views.RoomSummaryView extends Marionette.ItemView

            className: 'roomsummary'

            roomNotSetTemplate: '<div class="room-placeholder">
                                    <div class="room-img">
                                        <div class="image-placeholder"><span class="bicon icon-uniF10E"></span>Room Image</div>
                                    </div>
                                    <div class="room-title">'+_.polyglot.t("Your Room Title")+'</div>
                                    <div class="room-excerpt">'+_.polyglot.t("Choose room to display")+'</div>
                                    <div class="room-actions">
                                        <div class="price">'+_.polyglot.t("Total:")+'{{no_of_rooms}}<small> '+_.polyglot.t("rooms")+'</small></div>
                                        <button class="btn btn-room">'+_.polyglot.t("View Details")+'</button>
                                  </div>
            					    </div>'

            singleRoomTemplate: '<div class="room-summary-container">
                                      <div class="room-summary-title">
                                          <h4>Room Summary</h4>
                                      </div>
                                      <div class="room-summary">
                                          <div class="room-summary-item">
                                              <span class="key">No. of Rooms</span>
                                              <span class="value">3</span>
                                          </div>
                                          <div class="room-summary-item">
                                              <span class="key">Guests</span>
                                              <span class="value">2</span>
                                          </div>
                                          <div class="room-summary-item">
                                              <span class="key">Room Type</span>
                                              <span class="value">Deluxe Room</span>
                                          </div>
                                          <div class="room-summary-item">
                                              <span class="key">Check-in</span>
                                              <span class="value">10.00 AM</span>
                                          </div>
                                          <div class="room-summary-item">
                                              <span class="key">Check-out</span>
                                              <span class="value">1.00 PM</span>
                                          </div>
                                      </div>
                                  </div>'

            events :
               'click .room-img > img' : 'showMediaManager'
               'click .room-placeholder' : 'showRoomSummaryEditPopup'

            showMediaManager : (e)->
               e.stopPropagation()
               @trigger "show:media:manager", @_getImageRatio()

            mixinTemplateHelpers : (data)->
               data = super data
               
               data.post_content = _.prune data.post_content, 200
               imageModel = Marionette.getOption @, 'imageModel'
               if not imageModel.isNew()
                  data.image_url = if imageModel.get('sizes').medium then imageModel.get('sizes').medium.url else imageModel.get('sizes').full.url

               data

            _getImageRatio : ->
               width = @$el.find('.room-img > img').width()
               height = @$el.find('.room-img > img').height()
               "#{parseInt width}:#{parseInt height}"


            showRoomSummaryEditPopup :(evt)->
                  evt.preventDefault()
                  @$el.closest('.element-wrapper').find('.aj-imp-settings-btn').click()

            onShow:->
               isSingle = Marionette.getOption @, 'isSingleRoom'

               if not _.isUndefined isSingle
                  @$el.closest('.element-wrapper').children('.element-controls').find('.aj-imp-settings-btn').remove()

                  @$el.attr "data-content", _.polyglot.t('Update display details')+ " <a href='#{SITEURL}/dashboard/#/room-summary'>"+_.polyglot.t('here')+"</a> "
                  @$el.popover
                     html : true
                     placement : 'top'



            onBeforeRender: ->
               isSingle = Marionette.getOption @, 'isSingleRoom'

               if not _.isUndefined isSingle
                  @template = @singleRoomTemplate

               roomNotSet = Marionette.getOption @, 'roomNotSet'

               if not _.isUndefined roomNotSet
                  @template = @roomNotSetTemplate
