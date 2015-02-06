define ['app'], (App)->

    App.module 'BillingApp.AssistedSetupInfo.View', (View, App, Backbone, Marionette, $, _)->

        class View.AssistedSetupInfoView extends Marionette.ItemView

            template: "<div class='aj-imp-widget-head row'>
                            <h6 class='aj-imp-sub-head col-sm-12 text-center'>
                                <small>{{#polyglot}}Need us to help you set up your site?{{/polyglot}}</small>
                            </h6>
                        </div>
                        <br/>
                        <p>{{#polyglot}}Our Website Builder allows you to create your own website by simply dragging and dropping new elements onto the page. But if you're too busy or just don't want to, select our Assisted Set Up Package and one of our developers will build it for you.{{/polyglot}}</p>
                        <br>
                        <p>{{#polyglot}}Below are some of the benefits you can avail of:{{/polyglot}}</p>
                        <ul>
                            <li>
                                {{#polyglot}}1 month Free Hosting{{/polyglot}}
                            </li>
                            <li>
                                {{#polyglot}}Easy to use Content Management System (CMS){{/polyglot}}
                            </li>
                            <li>
                                {{#polyglot}}Mobile and tablet ready site{{/polyglot}}
                            </li>
                            <li>
                                {{#polyglot}}5 x Email Accounts{{/polyglot}}
                            </li>
                            <li>
                                {{#polyglot}}Facebook / Twitter Widgets{{/polyglot}}
                            </li>
                            <li>
                                {{#polyglot}}Search Engine Optimization (SEO){{/polyglot}}
                            </li>
                            <li>
                                {{#polyglot}}Online Support{{/polyglot}}
                            </li>
                            <li>
                                {{#polyglot}}Full Range of Usage Statistics{{/polyglot}}
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





