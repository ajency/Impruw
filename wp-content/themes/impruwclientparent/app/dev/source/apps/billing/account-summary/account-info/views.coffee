define ['app'
        'text!apps/billing/account-summary/templates/accountInfo.html'], (App, viewTpl)->

    App.module 'BillingApp.AccountInfo.View', (View, App, Backbone, Marionette, $, _)->

        class View.AccountInfoView extends Marionette.ItemView

            template: viewTpl

            onShow :->
                planName = @model.get 'plan_name'

                if planName is "Free"
                    @$el.find('#deactivate-sub').hide()

            events :
             'click #deactivate-sub' :->
                 console.log @model



