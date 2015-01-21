define [ 'app', 'controllers/base-controller'
         'apps/billing/account-summary/account-plan-info/controller'
         'apps/billing/account-summary/account-subscription-info/controller'
         'apps/billing/account-summary/site-addons-info/controller'
         'apps/billing/account-summary/assisted-setup-info/controller'
         'apps/billing/account-summary/views' ], ( App, AppController )->
    App.module 'BillingApp.AccountSummary', ( AccountSummary, App, Backbone, Marionette, $, _ )->
        class AccountSummary.Controller extends AppController

            # initiliaze controller
            initialize : ( opts )->

                @layout = @getLayout()

                @siteModel =  App.request "get:site:model"

                

                # trigger set:active:menu event
                App.vent.trigger "set:active:menu", 'billing'

                @listenTo @layout ,"show",=>
                    App.execute "show:account:plan:info",
                        region : @layout.accountPlanRegion

                    App.execute "show:account:subscription:info",
                        region : @layout.accountSubscriptionRegion

                    App.execute "show:site:addons:info",
                        region : @layout.siteAddOnRegion

                    App.execute "when:fetched",  @siteModel, =>
                        @assistedSetupPlanId = @siteModel.get('assistedSetUpPlanId')
                        App.execute "show:assisted:setup:info",
                            region : @layout.assistedSetupRegion
                            assistedSetupPlanId : @assistedSetupPlanId


                @listenTo @layout.accountPlanRegion, "load:subscription:info:app", @loadSubscriptionInfoApp

                # show main layout
                @show @layout,
                    loading : true


            # get layout
            getLayout : ->
                new AccountSummary.View.Layout

            loadSubscriptionInfoApp :->
                App.execute "show:account:subscription:info",
                    region : @layout.accountSubscriptionRegion

        App.commands.setHandler "show:account:summary:app", ( opts ) ->
            new AccountSummary.Controller opts