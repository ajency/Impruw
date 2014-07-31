define [ 'app', 'controllers/base-controller'
         'text!apps/billing/update-billing/templates/view.html'
         'apps/billing/update-billing/card-details/controller'], ( App, AppController,viewTpl )->
    App.module 'BillingApp.UpdateBilling', ( UpdateBilling, App, Backbone, Marionette, $, _ )->

        class UpdateBilling.Controller extends AppController

            initialize : ( opts )->

                @layout = @getLayout()

                @siteModel =  App.request "get:site:model"

                # trigger set:active:menu event
                App.vent.trigger "set:active:menu", 'billing'

                @listenTo @layout ,"show",=>
                    App.execute "when:fetched",@siteModel,=>
                        customerId = @siteModel.get 'braintree_customer_id'

                        App.execute "show:card",
                            region :@layout.cardRegion
                            customerId : customerId

                @show @layout

            getLayout : ->
                new LayoutView

        class LayoutView extends Marionette.Layout

            template: viewTpl

            onShow: ->
                @$el.find('input[type="checkbox"]').checkbox()

            regions:
                cardRegion : '#card-region'
                addressRegion : '#address-region'



        App.commands.setHandler "show:billing:info:app", ( opts ) ->
                new UpdateBilling.Controller opts