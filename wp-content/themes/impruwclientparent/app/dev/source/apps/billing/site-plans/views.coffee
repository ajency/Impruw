define [ 'app'
         'text!apps/billing/site-plans/templates/view.html' ], ( App, viewTpl )->
    App.module 'BillingApp.SitePaymentPlans.View', ( View, App, Backbone, Marionette, $, _ )->
        class SinglePlanView extends Marionette.ItemView

            template : '<div class="panel panel-default text-center">
                        <div class="panel-heading">
                            <h3>{{title}}</h3>
                        </div>
                        <div class="panel-body">
                            <h3 class="panel-title price">{{currency}} {{price}}</h3>
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
                            {{#is_count_type}}<li class="list-group-item">{{name}} : {{count_display_label}} </li>{{/is_count_type}}
                            {{^is_count_type}}<li class="list-group-item">{{name}}</li>{{/is_count_type}}
                            {{/plan_features}}
                            <li class="list-group-item">
                                <span class="ribbon"> <a href="#/billing/payment-page" class="btn btn-block activate-link">{{#polyglot}}Choose Plan{{/polyglot}}</a></span>
                            </li>
                        </ul>
                    </div>'

            className : 'col-sm-4'

            serializeData : ->
                data = super()
                data.currency = COUNTRY_BASED_CURRENCY 
                data

            onShow:->
                sitePlanId = @model.get 'id'
                braintreePlanId = @model.get 'braintreePlanId'
                #append  the plan id to the plan activation link
                activateLink = @$el.find( '.activate-link' ).attr 'href'
                newactivateLink = "#{activateLink}/#{sitePlanId}/#{braintreePlanId}"
                @$el.find( '.activate-link' ).attr 'href', newactivateLink
                if  @model.get('id') is PAYMENT_PLAN_ID 
                    @$el.find( '.panel-default' ).addClass 'active'
                    @$el.find( '.activate-link' ).text _.polyglot.t('Active Plan')
                    @$el.find( '.activate-link' ).attr 'href', 'javascript:void(0)'

        class View.PlansView extends Marionette.CompositeView

            template : viewTpl

            itemView : SinglePlanView

            itemViewContainer : '.price-plans'

            serializeData :->
                data = super()
                data.currency = COUNTRY_BASED_CURRENCY
                data

            onShow:->
                if PAYMENT_PLAN_ID is '1'
                    @$el.find( '#free-plan' ).addClass 'active'
                    @$el.find( '#free-plan .free-plan-link' ).text _.polyglot.t('Active Plan')









