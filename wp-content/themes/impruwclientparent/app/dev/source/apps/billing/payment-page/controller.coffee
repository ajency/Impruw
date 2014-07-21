define [ 'app', 'controllers/base-controller'
         'apps/billing/payment-page/views' ], ( App, AppController )->
    App.module 'BillingApp.Payment', ( Payment, App, Backbone, Marionette, $, _ )->
        class Payment.Controller extends AppController

            # initiliaze controller
            initialize : ( opts )->
                @siteModel = opts.model

                @selectedPlanId = opts.planId

                @layout = @getLayout @siteModel

                console.log @siteModel

                # trigger set:active:menu event
                App.vent.trigger "set:active:menu", 'billing'

                @listenTo @layout, "show", =>
                    @selectedPlanModel = App.request "get:plan:by:id", @selectedPlanId
                    App.execute "when:fetched",@selectedPlanModel,=>
                        @layout.selectedPlanRegion.show @selectedPlan @selectedPlanModel

                # show main layout
                @show @layout,
                    loading : true

            # get layout
            getLayout : ( model ) ->
                new Payment.View.Layout
                    model : model

            selectedPlan : ( selectedPlanModel ) ->
                new Payment.View.SelectedPlanView
                    model : selectedPlanModel


        App.commands.setHandler "show:payment:app", ( opts ) ->
            new Payment.Controller opts