define ['app'
        'text!apps/billing/account-summary/templates/accountSubscriptionInfo.html'], (App, viewTpl)->

    App.module 'BillingApp.AccountSubscriptionInfo.View', (View, App, Backbone, Marionette, $, _)->

        class View.AccountSubscriptionInfoView extends Marionette.ItemView

            template: viewTpl

            serializeData : ->
            	data = super()
            	data.timezone = BT_TIMEZONE

            	if data.subscription_status is 'Canceled'
            		data.nextBillingDate ='N/A'
            		data.nextBillAmount = '0'
            	
            	data



