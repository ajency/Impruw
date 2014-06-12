define ['app'], (App)->

    # Row views
    App.module 'SiteBuilderApp.Element.RoomTitle.Views', (Views, App, Backbone, Marionette, $, _)->

        # Menu item view
        class Views.RoomTitleView extends Marionette.ItemView

            className: 'roomtitle'

            template: '<div class="room-title-container clearfix">
            							<div class="room-title">
            								<h1>{{#polyglot}}Your Room Title{{/polyglot}}</h1>
            								<div class="room-title-desc">{{#polyglot}}Room Title Desc1{{/polyglot}}<br>
                                                {{#polyglot}}Room Title Desc2{{/polyglot}}
                                            </div>
            							</div>
            							<div class="room-title-actions">
            								<button class="btn btn-sm btn-book">{{#polyglot}}Booking{{/polyglot}} &amp; {{#polyglot}}Availability{{/polyglot}}</button>
            							</div>
            						</div>'

            onShow: ->
                @$el.attr "data-content", _.polyglot.t('Update room title')+ " <a href='#{SITEURL}/dashboard/#rooms'>"+_.polyglot.t('here')+"</a> "
                @$el.popover
                    html : true
                    placement : 'top'