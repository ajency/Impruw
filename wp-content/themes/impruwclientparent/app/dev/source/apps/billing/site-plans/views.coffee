define [ 'app'
         'text!apps/billing/site-plans/templates/view.html'
         'text!apps/billing/site-plans/templates/pricingLayoutView.html'
         'bootbox' ], ( App, viewTpl,pricingLayoutViewTpl, bootbox )->
    App.module 'BillingApp.SitePaymentPlans.View', ( View, App, Backbone, Marionette, $, _ )->

        # Main payment page layout
        class View.Layout extends Marionette.Layout

            template : pricingLayoutViewTpl

            regions :
                viewPlanRegion : '#view-site-plans'

            onRender :->
                $("html, body").animate
                    scrollTop: 0
                ,   "slow" 
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

        class SinglePlanView extends Marionette.ItemView

            template : '<div class="panel panel-default text-center">
                        <div class="panel-heading">
                            <h3>{{plan_title}}</h3>
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
                                <span class="ribbon"> <a href="#/billing/payment-page" class="btn btn-block activate-link paid-plan-link">{{#polyglot}}Choose Plan{{/polyglot}}</a></span>
                            </li>
                        </ul>
                    </div>'

            className : 'col-md-3'

            serializeData : ->
                data = super()
                data.currency = COUNTRY_BASED_CURRENCY 
                data.plan_title = _.polyglot.t(data.plan_title)
                data

            onShow:->
                sitePlanId = @model.get 'id'
                braintreePlanId = @model.get 'braintree_plan'
                #append  the plan id to the plan activation link
                activateLink = @$el.find( '.activate-link' ).attr 'href'
                newactivateLink = "#{activateLink}/#{sitePlanId}/#{braintreePlanId}"
                @$el.find( '.activate-link' ).attr 'href', newactivateLink
                if  @model.get('id') is PAYMENT_PLAN_ID 
                    @$el.find( '.panel-default' ).addClass 'active'
                    @$el.find( '.activate-link' ).text _.polyglot.t('Active Plan')
                    @$el.find( '.activate-link' ).attr 'href', 'javascript:void(0)'

            events :
                'click .paid-plan-link' :(e) ->
                        currentSubscriptionStatus = Marionette.getOption @, 'currentSubscriptionStatus'
                        currentSubscriptionPrice = parseFloat(Marionette.getOption @, 'currentSubscriptionPrice')
                        chosenPlanPrice = parseFloat(@model.get('price'))
                        if chosenPlanPrice < currentSubscriptionPrice
                            e.preventDefault()
                            bootbox.alert "<h4 class='delete-message'>" + _.polyglot.t('Sorry , you cannot downgrade plans mid cycle') + "</h4><p>#{ _.polyglot.t 'If you wish to subscribe to a lower plan you could cancel current subscription and then subscribe to a plan of your choice at the end of the current billing cycle.'}<br/>#{ _.polyglot.t 'If you have already cancelled your plan, please wait till the end of the cycle to select this plan.'}</p>"
                        if (chosenPlanPrice > currentSubscriptionPrice) and (currentSubscriptionStatus is 'Canceled')
                            e.preventDefault()
                            bootbox.alert "<h4 class='delete-message'>" + _.polyglot.t('Sorry , you cannot subscribe to another paid plan since your paid subscription is currently canceled') + "</h4><p>#{ _.polyglot.t 'If you wish to subscribe to another paid plan you could do so at the end of the current billing cycle'}</p>"
                        if (chosenPlanPrice > currentSubscriptionPrice) and (currentSubscriptionStatus is 'Past Due')
                            e.preventDefault()
                            bootbox.alert "<h4 class='delete-message'>" + _.polyglot.t('Sorry , you cannot subscribe to another paid plan when your current subscription is past payment due') + "</h4><p>#{ _.polyglot.t 'Please verify your card details and make the due payment'}</p>"

        class View.PlansView extends Marionette.CompositeView

            template : viewTpl

            itemView : SinglePlanView

            itemViewContainer : '.price-plans'

            itemViewOptions : ->
                currentSubscriptionStatus : Marionette.getOption @, 'currentSubscriptionStatus'
                currentSubscriptionPrice : Marionette.getOption @, 'currentSubscriptionPrice'

            serializeData :->
                data = super()
                data.currency = COUNTRY_BASED_CURRENCY
                data.THEMEURL = THEMEURL
                data

            onShow:->
                if PAYMENT_PLAN_ID is '1'
                    @$el.find( '#free-plan' ).addClass 'active'
                    @$el.find( '#free-plan .free-plan-link' ).text _.polyglot.t('Active Plan')

            events :
                'click .free-plan-link' : ->
                    # if current plan is not free 
                    if PAYMENT_PLAN_ID != "1"
                        bootbox.confirm "<h4 class='delete-message'>#{ _.polyglot.t 'Are you sure you want to switch to free plan?'}</h4><p>#{ _.polyglot.t 'Doing so will cancel your current paid subscription and default free plan will be activated at the end of your current billing cycle'}</p>",(result)=>
                            if result is true
                                @$el.find('#pay_loader').show()
                                @trigger "switch:to:free:plan"

                


                            

                    








