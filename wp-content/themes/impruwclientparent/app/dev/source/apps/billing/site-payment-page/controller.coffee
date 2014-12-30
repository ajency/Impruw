define [ 'app', 'controllers/base-controller'
         'apps/billing/site-payment-page/views' ], ( App, AppController )->
    App.module 'BillingApp.SitePayment', ( SitePayment, App, Backbone, Marionette, $, _ )->
        class SitePayment.Controller extends AppController

            # initiliaze controller
            initialize : ( opts )->
                @siteModel = App.request "get:site:model"

                #selected plan data
                @selectedPlanId = opts.planId
                @selectedPlanModel = App.request "get:braintreeplan:by:id", @selectedPlanId

                @layout = @getLayout @siteModel

                App.vent.trigger "set:active:menu", 'billing'

                @listenTo @layout, "show", =>
                    #show selected plan
                    # App.execute "when:fetched", @selectedPlanModel, =>
                    #     @layout.selectedPlanRegion.show @selectedPlan @selectedPlanModel

                @show @layout,
                    loading : true

            getLayout : ( model ) ->
                new SitePayment.View.Layout
                    model : model


        App.commands.setHandler "show:site:payment:app", ( opts ) ->
            new SitePayment.Controller opts