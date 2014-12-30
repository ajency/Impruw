define [ 'app'
         'text!apps/billing/site-payment-page/templates/payment-layout.html'], ( App, viewTpl )->
    App.module 'BillingApp.SitePayment.View', ( View, App, Backbone, Marionette, $, _ )->
        class View.Layout extends Marionette.Layout

            template : viewTpl

            regions :
                selectedPlanRegion : '#selected-plan'
                activeSubscriptionRegion : '#active-sub-region'
                paymentRegion : '#payment-region'





