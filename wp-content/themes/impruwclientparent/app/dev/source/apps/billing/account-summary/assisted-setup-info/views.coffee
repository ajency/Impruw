define ['app'], (App)->

    App.module 'BillingApp.AssistedSetupInfo.View', (View, App, Backbone, Marionette, $, _)->

        class View.AssistedSetupInfoView extends Marionette.ItemView

            template: "                    
                        <div class='aj-imp-widget-head row'>
                            <h6 class='aj-imp-sub-head col-sm-12 text-center'>
                                <small>Need us to help you set up your site?</small>
                            </h6>
                        </div>
                        <br>
                        <p>Below are some of the benefits you can avail of:</p>
                        <ul>
                            <li>
                                Lorem Ipsum available
                            </li>
                            <li>
                                All the Lorem Ipsum generators on the Internet
                            </li>
                            <li>
                                making this the first true generator
                            </li>
                        </ul>
                        <a href='#/billing/payment-page/{{assistedSetupId}}' class='btn btn-sm btn-block aj-imp-orange-btn' id=''> Yes, I'm in! </a>
                    "

            serializeData : ->
                assistedSetupId = Marionette.getOption @, 'assistedSetupPlanId'
                data = super()
                data.assistedSetupId = assistedSetupId
                data
                





