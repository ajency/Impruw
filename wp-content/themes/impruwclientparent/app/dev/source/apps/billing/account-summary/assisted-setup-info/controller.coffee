define [ 'app', 'controllers/base-controller'
         'apps/billing/account-summary/assisted-setup-info/views' ], ( App, AppController )->
    App.module 'BillingApp.AssistedSetupInfo', ( AssistedSetupInfo, App, Backbone, Marionette, $, _ )->
        class AssistedSetupInfo.Controller extends AppController

            # initialize controller
            initialize : ( opts )->
                @assistedSetupPlanId = opts.assistedSetupPlanId

                console.log @assistedSetupPlanId

                # trigger set:active:menu event
                App.vent.trigger "set:active:menu", 'billing'
                @view = @getView()
                @show @view,
                    loading : true


            getView :->
                new AssistedSetupInfo.View.AssistedSetupInfoView
                    assistedSetupPlanId : @assistedSetupPlanId

        App.commands.setHandler "show:assisted:setup:info", ( opts ) ->
            new AssistedSetupInfo.Controller opts