define ['app'], (App)->

    App.module 'Dashboard.Home.CurrentSitePlan.View', (View, App, Backbone, Marionette, $, _)->

        class View.CurrentSitePlanView extends Marionette.ItemView

            className : 'aj-imp-help-text'

            template: '<span class="icon icon-info2"></span>
                        <p>
                        {{planHelpText}}
                        {{#polyglot}}Click <a href="#/billing/account-summary">here</a> to view/update your plan details.{{/polyglot}}
                        </p>'

            serializeData : ->
                data = super()
                data.planHelpText = _.polyglot.t("You are currently active on the #{data.plan_title} plan.")
                data


        class View.CurrentFreePlanView extends Marionette.ItemView

            className : 'aj-imp-help-text'

            template: '<span class="icon icon-info2"></span>
                        <p>
                        {{#polyglot}}You are currently active on the free plan. To add your own website domain{{/polyglot}} <a href="#/billing/pricing-plans">{{#polyglot}}upgrade your plan{{/polyglot}}</a> {{#polyglot}}and add your website url from your{{/polyglot}} <a href="#/site-profile">{{#polyglot}}site profile{{/polyglot}}</a>
                        </p>
                      '
