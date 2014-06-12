define ['app'
        'text!apps/billing/show/templates/mainview.html'], (App, mainviewTpl)->
    App.module 'BillingApp.Show.View', (View, App, Backbone, Marionette, $, _)->
        class View.Layout extends Marionette.Layout

            initialize: ->


                # Main edit profile template
            template: mainviewTpl


            # set the flatui checkbox radio and bootstrap select ui
            onShow: ->
                @$el.find('input[type="checkbox"]').checkbox()
                @$el.find('select').selectpicker()

