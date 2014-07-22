define ['app'
        'text!apps/billing/account-summary/templates/purchaseHistory.html'], (App, viewTpl)->

    App.module 'BillingApp.PurchaseHistory.View', (View, App, Backbone, Marionette, $, _)->

        class View.Layout extends Marionette.Layout

            template: viewTpl

            onShow: ->
                @$el.find('input[type="checkbox"]').checkbox()
                @$el.find('select').selectpicker()



