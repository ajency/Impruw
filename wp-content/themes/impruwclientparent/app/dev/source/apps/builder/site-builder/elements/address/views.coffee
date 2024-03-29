define ['app'], (App)->

    # Row views
    App.module 'SiteBuilderApp.Element.Address.Views', (Views, App, Backbone, Marionette, $, _)->

        # Menu item view
        #class Views.AddressView extends Marionette.ItemView

        #className : 'address'

        # layouts
        class Views.AddressView extends Marionette.ItemView
            # basic template
            template: 'test'

            className: 'address'

            onRender: ->
                className = _.slugify @model.get 'style'
                @$el.addClass className
                @$el.addClass "text-#{@model.get('align')}"

            onShow : ->
                @$el.attr "data-content", _.polyglot.t("Update address ")+" <a href='#{SITEURL}/dashboard/#/site-profile' target='BLANK'>"+_.polyglot.t("here")+"</a> "
                if @model.get('phone_link') is 'enable'
                    @$el.find('.addr-phone').wrap "<a class='phone' href='tel:#{@model.get('phone_no')}'></a>"
                @$el.popover
                    html : true
                    placement : 'top'

            events : 
                'click .phone' :(e)->
                    e.preventDefault()