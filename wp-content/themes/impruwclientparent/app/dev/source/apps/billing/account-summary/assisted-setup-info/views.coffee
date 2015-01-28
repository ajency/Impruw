define ['app'], (App)->

    App.module 'BillingApp.AssistedSetupInfo.View', (View, App, Backbone, Marionette, $, _)->

        class View.AssistedSetupInfoView extends Marionette.ItemView

            template: "<div class='aj-imp-widget-head row'>
                            <h6 class='aj-imp-sub-head col-sm-12 text-center'>
                                <small>{{#polyglot}}Need us to help you set up your site?{{/polyglot}}</small>
                            </h6>
                        </div>
                        <br>
                        <p>{{#polyglot}}Below are some of the benefits you can avail of:{{/polyglot}}</p>
                        <ul>
                            <li>
                                {{#polyglot}}Lorem Ipsum available{{/polyglot}}
                            </li>
                            <li>
                                {{#polyglot}}All the Lorem Ipsum generators on the Internet{{/polyglot}}
                            </li>
                            <li>
                                {{#polyglot}}making this the first true generator{{/polyglot}}
                            </li>
                        </ul>
                        <a href='#/billing/payment-page/{{assistedSetupId}}' class='btn btn-sm btn-block aj-imp-orange-btn' id=''> {{#polyglot}}Yes, I'm in!{{/polyglot}} </a>
                    "

            serializeData : ->
                assistedSetupId = Marionette.getOption @, 'assistedSetupPlanId'
                data = super()
                data.assistedSetupId = assistedSetupId
                data

        class View.AssistedSetupPaidInfoView extends Marionette.ItemView

            template: " <div class='aj-imp-widget-head row'>
                            <h6 class='aj-imp-sub-head col-sm-12 text-center'>
                                <small>{{#polyglot}}You have already opted for Assisted set up{{/polyglot}}</small>
                            </h6>
                        </div>
                        <br>
                        <p>{{#polyglot}}Below are some of the benefits you can avail of:{{/polyglot}}</p>
                        <ul>
                            <li>
                                {{#polyglot}}Lorem Ipsum available{{/polyglot}}
                            </li>
                            <li>
                                {{#polyglot}}All the Lorem Ipsum generators on the Internet{{/polyglot}}
                            </li>
                            <li>
                                {{#polyglot}}making this the first true generator{{/polyglot}}
                            </li>
                        </ul>
                    "                





