define [ 'app', 'controllers/base-controller'
         'apps/billing/site-plans/views' ], ( App, AppController )->
    App.module 'BillingApp.SitePaymentPlans', ( SitePaymentPlans, App, Backbone, Marionette, $, _ )->
        class SitePaymentPlans.Controller extends AppController

            # initiliaze controller
            initialize : ( opts )->
                @subscriptionCollection = App.request "get:site:subscriptions"
                @featurePlanCollection = App.request "get:all:feature:plans"

                @layout = @getLayout()

                App.vent.trigger "set:active:menu", 'billing'

                @show @layout,
                    loading : true

                @listenTo @layout, "show", =>
                    App.execute "when:fetched",  @subscriptionCollection, => 
                        currentSubscriptionModel = @subscriptionCollection.at(0)
                        console.log currentSubscriptionModel
                        @currentSubscriptionStatus = currentSubscriptionModel.get('subscription_status')
                        @currentSubscriptionPrice = currentSubscriptionModel.get('price')
                        App.execute "when:fetched",  @featurePlanCollection, => 
                            @view = @getView() 
                            @layout.viewPlanRegion.show @view

            getLayout : ( model ) ->
                new SitePaymentPlans.View.Layout

            getView :->
                new SitePaymentPlans.View.PlansView
                    collection: @featurePlanCollection
                    currentSubscriptionStatus : @currentSubscriptionStatus
                    currentSubscriptionPrice : @currentSubscriptionPrice

        App.commands.setHandler "show:site:plans:app", ( opts ) ->
            new SitePaymentPlans.Controller opts