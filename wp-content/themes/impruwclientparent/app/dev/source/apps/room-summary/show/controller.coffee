define ['app', 'controllers/base-controller'
        'apps/room-summary/show/views'], (App, AppController)->
    App.module 'RoomSummaryApp.Show', (Show, App, Backbone, Marionette, $, _)->
        class Show.Controller extends AppController

            # initiliaze controller
            initialize: ()->
                @layout = @getLayout()

                @sitemodel = App.request "get:site:model"

                # trigger set:active:menu event
                App.vent.trigger "set:active:menu", 'room-summary'

                @listenTo @layout, "show", =>
                    App.execute "show:checkin:time:form",
                        region: @layout.checkinRegion
                        model: @sitemodel

                    App.execute "show:policies:form",
                        region: @layout.policiesRegion
                        model: @sitemodel

                    App.execute "show:currency:dropdown",
                        region: @layout.currencyRegion
                        model: @sitemodel

                # show main layout
                @show @layout


            # get layout
            getLayout: ->
                new Show.View.Layout


    App.RoomSummaryApp.Show.Controller