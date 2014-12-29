define [ 'app'
         'text!apps/billing/site-plans/templates/view.html' ], ( App, viewTpl )->
    App.module 'BillingApp.SitePaymentPlans.View', ( View, App, Backbone, Marionette, $, _ )->
        class SinglePlanView extends Marionette.ItemView

            template : '<div class="panel panel-default text-center" id="free-plan">
                        <div class="panel-heading">
                            <h3>{{title}}</h3>
                        </div>
                        <div class="panel-body">
                            <h3 class="panel-title price">{{currencyIsoCode}} {{price}}</h3>
                            <span></span>
                        </div>
                        <ul class="list-group">
                            <li class="list-group-item">{{#polyglot}}Assisted Set-Up{{/polyglot}}</li>
                            <li class="list-group-item">{{#polyglot}}Unlimited Pages{{/polyglot}}</li>
                            <li class="list-group-item">{{#polyglot}}Easy to use Content Management System (CMS){{/polyglot}}</li>
                            <li class="list-group-item">{{#polyglot}}Mobile and Tablet Ready Site{{/polyglot}}</li>
                            <li class="list-group-item">{{#polyglot}}Facebook/Twitter Widgets{{/polyglot}}</li>
                            <li class="list-group-item">{{#polyglot}}Search Engine Optimisation (SEO){{/polyglot}}</li>
                            <li class="list-group-item">{{#polyglot}}Online Support{{/polyglot}}</li>
                            <li class="list-group-item">{{#polyglot}}Continuous Development{{/polyglot}}</li>
                            {{#plan_features}}
                            <li class="list-group-item">{{count}} x {{name}}</li>
                            {{/plan_features}}
                            <li class="list-group-item"><span class="ribbon">
                        <a href="javascript:void(0)" class="btn btn-block activate-link free-plan-link">{{#polyglot}}Choose Plan{{/polyglot}}</a></span></li>
                        </ul>
                    </div>'

            className : 'col-sm-4'

            serializeData : ->
                data = super()
                data.currency = Marionette.getOption @, 'currency'
                data

        class View.PlansView extends Marionette.CompositeView

            template : viewTpl

            itemView : SinglePlanView

            itemViewContainer : '.price-plans'

            serializeData :->
                data = super()
                data.THEMEURL = THEMEURL
                data









