define ['app'
        'text!apps/billing/account-summary/templates/billingInfo.html'], (App, viewTpl)->

    App.module 'BillingApp.BillingInfo.View', (View, App, Backbone, Marionette, $, _)->

        class View.BillingInfoView extends Marionette.ItemView

            template: viewTpl

        class View.EmptyBillingInfoView extends Marionette.ItemView

            template: '<div class="row">
                            <div class="col-sm-12">
                                <div class="alert alert-info">
                                    No Billing Info Available
                                </div>
                            </div>
                        </div>'



