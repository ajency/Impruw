define ['app'
        'text!apps/billing/payment-page/templates/view.html'], (App, viewTpl)->

    App.module 'BillingApp.Payment.View', (View, App, Backbone, Marionette, $, _)->

        class View.Layout extends Marionette.Layout

            initialize: ->
                # Main layout for billing
            template: viewTpl

            # set the flatui checkbox radio and bootstrap select ui
            onShow: ->
                @$el.find('input[type="checkbox"]').checkbox()
                @$el.find('select').selectpicker()

