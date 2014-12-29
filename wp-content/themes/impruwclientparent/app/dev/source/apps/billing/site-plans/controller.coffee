define [ 'app', 'controllers/base-controller'
         'apps/billing/site-plans/views' ], ( App, AppController )->
    App.module 'BillingApp.SitePaymentPlans', ( SitePaymentPlans, App, Backbone, Marionette, $, _ )->
        class SitePaymentPlans.Controller extends AppController

            # initiliaze controller
            initialize : ( opts )->
                @sitePlanCollection = App.request "get:all:billing:plans"

                App.execute "when:fetched",  @sitePlanCollection, => 
                    console.log  @sitePlanCollection
                    @view = @getView() 

                    # trigger set:active:menu event
                    App.vent.trigger "set:active:menu", 'billing'

                    @show @view,
                        loading:true


            getView :->
                new SitePaymentPlans.View.PlansView
                    collection: @sitePlanCollection

        App.commands.setHandler "show:site:plans:app", ( opts ) ->
            new SitePaymentPlans.Controller opts