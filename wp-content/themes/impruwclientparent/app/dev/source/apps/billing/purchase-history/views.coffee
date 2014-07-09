define ['app'
        'text!apps/billing/purchase-history/templates/view.html'], (App, viewTpl)->

    App.module 'BillingApp.PurchaseHistory.View', (View, App, Backbone, Marionette, $, _)->

        class View.Layout extends Marionette.Layout

            initialize: ->
                # Main layout for billing
            template: viewTpl

            # set the flatui checkbox radio and bootstrap select ui
            onShow: ->
                @$el.find('input[type="checkbox"]').checkbox()
                @$el.find('select').selectpicker()

