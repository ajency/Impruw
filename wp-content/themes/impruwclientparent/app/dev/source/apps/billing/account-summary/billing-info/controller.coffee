define [ 'app', 'controllers/base-controller'
         'apps/billing/account-summary/billing-info/views' ], ( App, AppController )->
    App.module 'BillingApp.BillingInfo', ( BillingInfo, App, Backbone, Marionette, $, _ )->
        class BillingInfo.Controller extends AppController

            # initiliaze controller
            initialize : ( opts )->

                brainTreeCustomerId = opts.braintreeCustomerId

                creditCardModel =  App.request "get:card:info",brainTreeCustomerId

                App.execute "when:fetched",creditCardModel,=>

                    cardExists = creditCardModel.get 'card_exists'

                    if cardExists is true
                        @view = @getView creditCardModel
                    else
                        @view = @getEmptyCardView()

                    # trigger set:active:menu event
                    App.vent.trigger "set:active:menu", 'billing'

                    # show main layout
                    @show @view



            getEmptyCardView :->
                new BillingInfo.View.EmptyBillingInfoView

            getView : ( creditCardModel ) ->
                new BillingInfo.View.BillingInfoView
                    model : creditCardModel

        App.commands.setHandler "show:billing:info", ( opts ) ->
            new BillingInfo.Controller opts