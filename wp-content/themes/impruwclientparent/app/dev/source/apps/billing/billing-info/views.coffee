define ['app'
        'text!apps/billing/billing-info/templates/view.html'], (App, viewTpl)->

    App.module 'BillingApp.BillingInfo.View', (View, App, Backbone, Marionette, $, _)->

        class View.Layout extends Marionette.Layout

            initialize: ->
                # Main layout for billing
            template: viewTpl

            # set the flatui checkbox radio and bootstrap select ui
            onShow: ->
                @$el.find('input[type="checkbox"]').checkbox()
                @$el.find('select').selectpicker()

