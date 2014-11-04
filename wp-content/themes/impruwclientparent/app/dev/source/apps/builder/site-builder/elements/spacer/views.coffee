define ['app'], (App)->

    # Row views
    App.module 'SiteBuilderApp.Element.Spacer.Views', (Views, App, Backbone, Marionette, $, _)->

        # Menu item view
        #class Views.SpacerView extends Marionette.ItemView

        # layouts
        class Views.SpacerView extends Marionette.ItemView
            # basic template
            template: '<hr>'

            className: 'spacer'

            onRender: ->
                className = _.slugify @model.get 'style'
                @$el.addClass className

            onShow : ->
               # @$el.attr "data-content", _.polyglot.t("Update address ")+" <a href='#{SITEURL}/dashboard/#/site-profile'>"+_.polyglot.t("here")+"</a> "
               # @$el.popover
               #    html : true
               #    placement : 'top'