define [ 'app', 'controllers/base-controller'
         'apps/room-summary/currency/views' ], ( App, AppController )->
    App.module 'RoomSummaryApp.Currency', ( Currency, App, Backbone, Marionette, $, _ )->
        class Currency.Controller extends AppController

            # initiliaze controller
            initialize : ( opts )->
                @sitemodel = opts.model

                @view = @getCurrencyFormView @sitemodel

                @listenTo @view, "update:currency:clicked", @updateCurrency

                @show @view,
                    loading : true

            getCurrencyFormView : ( model ) ->
                new Currency.View.CurrencyForm
                    model : model

            updateCurrency : ( updatedCurrency )=>
                @sitemodel.set updatedCurrency
                @sitemodel.save null,
                    wait : true
                    onlyChanged : true
                    success : @currencyUpdated

            currencyUpdated: =>
                @view.triggerMethod "currency:updated"


        App.commands.setHandler "show:currency:dropdown", ( opts ) ->
            new Currency.Controller opts

