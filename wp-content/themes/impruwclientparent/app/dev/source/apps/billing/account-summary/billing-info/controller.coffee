define [ 'app', 'controllers/base-controller'
         'apps/billing/account-summary/billing-info/views' ], ( App, AppController )->
    App.module 'BillingApp.BillingInfo', ( BillingInfo, App, Backbone, Marionette, $, _ )->
        class BillingInfo.Controller extends AppController

            # initiliaze controller
            initialize : ( opts )->

                subscriptionModel = opts.subscriptionModel

                App.execute "when:fetched",subscriptionModel,=>

                    creditCardToken =  subscriptionModel.get 'payment_method_token'

                    if _.isEmpty creditCardToken
                        @view = @getEmptyCardView()
                    else
                        creditCardModel = App.request "get:card:info", creditCardToken
                        @view = @getView creditCardModel


                    @show @view,
                        loading :true

            getEmptyCardView :->
                new BillingInfo.View.EmptyBillingInfoView

            getView : ( creditCardModel ) ->
                new BillingInfo.View.BillingInfoView
                    model : creditCardModel

        App.commands.setHandler "show:billing:info", ( opts ) ->
            new BillingInfo.Controller opts