define ['app'
        'text!apps/billing/account-summary/templates/billingInfo.html'], (App, viewTpl)->

    App.module 'BillingApp.BillingInfo.View', (View, App, Backbone, Marionette, $, _)->

        class View.BillingInfoView extends Marionette.ItemView

            template: viewTpl

            serializeData :->
                data= super()
                data.active_since = Marionette.getOption @ ,'activationDate'
                data

        class View.EmptyBillingInfoView extends Marionette.ItemView

            template: '<div class="aj-imp-widget-head row">
                        No Billing info available
                        </div>'



