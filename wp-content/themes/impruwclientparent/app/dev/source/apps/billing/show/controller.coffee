define ['app', 'controllers/base-controller'
        'apps/billing/show/views'], (App, AppController)->
    App.module 'BillingApp.Show', (Show, App, Backbone, Marionette, $, _)->
        class Show.Controller extends AppController

            # initiliaze controller
            initialize: ()->

                @layout = @getLayout()

                # trigger set:active:menu event
                App.vent.trigger "set:active:menu", 'billing'

                # show main layout
                @show @layout

            # get layout
            getLayout: ->
                new Show.View.Layout

    App.BillingApp.Show.Controller