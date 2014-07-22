define [ 'app', 'controllers/base-controller'
         'apps/billing/account-summary/billing-info/views' ], ( App, AppController )->
    App.module 'BillingApp.BillingInfo', ( BillingInfo, App, Backbone, Marionette, $, _ )->
        class BillingInfo.Controller extends AppController

            # initiliaze controller
            initialize : ( opts )->
                siteModel = opts.model

                brainTreeCustomerId = siteModel.get 'braintree_customer_id'

                creditCardModel =  App.request "get:card:info",brainTreeCustomerId

                cardExists = creditCardModel.get 'card_exists'

                if cardExists is true
                    @view = @getView creditCardModel
                else
                    @view = @getEmptyCardView()

                # trigger set:active:menu event
                App.vent.trigger "set:active:menu", 'billing'

                # show main layout
                @show @view,
                    loading :true



            getEmptyCardView :->
                new BillingInfo.View.EmptyBillingInfoView

            # get layout
            getView : ( subscriptionModel ) ->
                new BillingInfo.View.BillingInfoView
                    model : subscriptionModel
                    activationDate : @activationDate

        App.commands.setHandler "show:billing:info", ( opts ) ->
            new BillingInfo.Controller opts