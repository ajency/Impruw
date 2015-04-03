define [ 'app', 'controllers/base-controller'
         'apps/billing/account-summary/assisted-setup-info/views' ], ( App, AppController )->
    App.module 'BillingApp.AssistedSetupInfo', ( AssistedSetupInfo, App, Backbone, Marionette, $, _ )->
        class AssistedSetupInfo.Controller extends AppController

            # initialize controller
            initialize : ( opts )->
                @siteModel =  App.request "get:site:model"

                App.execute "when:fetched",  @siteModel, =>
                    @assistedSetupPlanId = @siteModel.get('assistedSetUpPlanId')
                    @assistedSetUpTransactionId = @siteModel.get('braintree_assisted_setup')

                    # trigger set:active:menu event
                    App.vent.trigger "set:active:menu", 'billing'
                    if @assistedSetUpTransactionId is ""
                        @view = @getView()
                    else
                        @view = @getPaidView()
               
                    @show @view,
                        loading : true


            getView :->
                new AssistedSetupInfo.View.AssistedSetupInfoView
                    assistedSetupPlanId : @assistedSetupPlanId

            getPaidView :->
                new AssistedSetupInfo.View.AssistedSetupPaidInfoView
                    assistedSetupPlanId : @assistedSetupPlanId
                    assistedSetUpTransactionId : @assistedSetUpTransactionId

        App.commands.setHandler "show:assisted:setup:info", ( opts ) ->
            new AssistedSetupInfo.Controller opts