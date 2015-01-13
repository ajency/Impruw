define ['app'
        'text!apps/billing/account-summary/templates/mainView.html'], (App, viewTpl)->

    App.module 'BillingApp.AccountSummary.View', (View, App, Backbone, Marionette, $, _)->

        class View.Layout extends Marionette.LayoutView

            template: viewTpl

            regions :
                accountPlanRegion : '#account-plan-info'
                accountSubscriptionRegion : '#account-subscription-info'
                # accountInfoRegion : '#account-info'
                siteAddOnRegion : '#site-addons-info'
                pendingSubscriptionRegion : '#pending-sub'
                billingInfoRegion : '#billing-info'
                purchaseHistoryRegion : '#purchase-history'

            onRender :->
                @$el.find( '.spinner-markup' ).spin @_getOptions()

            # spinner options
            _getOptions : ->
                lines : 10
                length : 6
                width : 2.5
                radius : 7
                corners : 1
                rotate : 9
                direction : 1
                color : '#ff9e2c'
                speed : 1
                trail : 60
                shadow : false
                hwaccel : true
                className : 'spinner'
                zIndex : 2e9
                top : '0px'
                left : '40px'


