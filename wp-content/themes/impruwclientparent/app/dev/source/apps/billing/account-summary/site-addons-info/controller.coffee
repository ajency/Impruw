define [ 'app', 'controllers/base-controller'
         'apps/billing/account-summary/site-addons-info/views' ], ( App, AppController )->
    App.module 'BillingApp.SiteAddOnsInfo', ( SiteAddOnsInfo, App, Backbone, Marionette, $, _ )->
        class SiteAddOnsInfo.Controller extends AppController

            # initiliaze controller
            initialize : ( opts )->
                @siteAddOnCollection = App.request "get:all:site:addons"
                
                App.execute "when:fetched", @siteAddOnCollection, => 
                    @view = @getView @siteAddOnCollection

                    @listenTo @view, "update:selected:addons", @updateSelectedAddOns
                    
                    @show @view,
                        loading : true

            getView :(siteAddOnCollection)->
                if (IS_SITEADDON_ALLOWED  is 1) and (PLAN_FEATURE_COUNT['site_add_ons'][0]['allowed_count']>0)
                    new SiteAddOnsInfo.View.SiteAddOnsInfoView
                        collection: siteAddOnCollection
                else
                    new SiteAddOnsInfo.View.DisabledSiteAddOnsInfo
               

            updateSelectedAddOns: (selectedAddOns)->
                data = {selectedAddOns: selectedAddOns}

                responseFn = (response)=>
                    console.log "response in controller"
                    @view.triggerMethod "selected:addons:updated", response

                $.post "#{AJAXURL}?action=update-selected-site-addons", data, responseFn, 'json'
                    

        App.commands.setHandler "show:site:addons:info", ( opts ) ->
            new SiteAddOnsInfo.Controller opts