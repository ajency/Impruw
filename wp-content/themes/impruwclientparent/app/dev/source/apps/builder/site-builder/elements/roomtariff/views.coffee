define ['app'
        'text!apps/builder/site-builder/elements/roomtariff/template/mainTpl.html'], (App, mainTpl)->
    App.module 'SiteBuilderApp.Element.RoomTariff.Views', (Views, App, Backbone, Marionette, $, _)->

        # Menu item view
        class Views.RoomTariffView extends Marionette.ItemView

            template: mainTpl

            onShow: ->
                @$el.attr "data-content", _.polyglot.t("Add/Edit room tariff")+" <a href='#{SITEURL}/dashboard/#rooms'>"+_.polyglot.t('here')+"</a> "
                @$el.popover
                    html : true
                    placement : 'top'

