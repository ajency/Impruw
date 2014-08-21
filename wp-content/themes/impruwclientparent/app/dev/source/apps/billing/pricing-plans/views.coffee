define [ 'app'
         'text!apps/billing/pricing-plans/templates/view.html' ], ( App, viewTpl )->
    App.module 'BillingApp.PaymentPlans.View', ( View, App, Backbone, Marionette, $, _ )->
        class SinglePlanView extends Marionette.ItemView

            template : '<div class="panel panel-default text-center">
                            <div class="panel-heading">
                                <h3>{{plan_name}}</h3>
                            </div>
                            <div class="panel-body">
                                <h3 class="panel-title price">&#163; {{price}}</h3>
                            </div>
                            <ul class="list-group">
                                <li class="list-group-item">{{#polyglot}}Mobile and Tablet Ready Site{{/polyglot}}</li>
                                <li class="list-group-item">{{#polyglot}}Unlimited Pages{{/polyglot}}</li>
                                <li class="list-group-item">{{#polyglot}}5 Languages{{/polyglot}}</li>
                                <li class="list-group-item">{{#polyglot}}Flexible, easy-to-use Site builder{{/polyglot}}</li>
                                <li class="list-group-item">{{#polyglot}}24/7 security monitoring{{/polyglot}}</li>
                                <li class="list-group-item">{{#polyglot}}24/7 technical support{{/polyglot}}</li>
                                <li class="list-group-item"><span class="ribbon">
                                    <a href="#/billing/payment-page" class="btn btn-block activate-link">{{#polyglot}}Choose Plan{{/polyglot}}</a></span></li>
                            </ul>
                        </div>'

            className : 'col-sm-4'

            serializeData : ->
                data = super()
                data.currency = Marionette.getOption @, 'currency'
                data

            onShow : ->
                siteModelPlanId = @model.get 'plan_id'
                activePlanID = Marionette.getOption @, 'activePlanID'
                pendingPlanID = Marionette.getOption @, 'pendingPlanID'
                domainName = Marionette.getOption @, 'domainName'

                #append  the plan id to the plan activation link
                activateLink = @$el.find( '.activate-link' ).attr 'href'
                newactivateLink = "#{activateLink}/#{siteModelPlanId}"
                @$el.find( '.activate-link' ).attr 'href', newactivateLink

                #highlight the active plan
                if  siteModelPlanId is activePlanID
                    @$el.find( '.panel-default' ).addClass 'active'
                    @$el.find( '.activate-link' ).text _.polyglot.t('Active Plan')
                    @$el.find( '.activate-link' ).attr 'href', 'javascript:void(0)'

                    billStart = Marionette.getOption @, 'billStart'
                    billEnd = Marionette.getOption @, 'billEnd'

                    html = "<span class='active'>"+_.polyglot.t('Domain name:')+" #{domainName}</span>
                            <span class='active'>"+_.polyglot.t('Billing cycle: From')+" #{billStart} "+_.polyglot.t('to')+" #{billEnd} </span>"
                    @$el.find( '.panel-body' ).append html


                #highlight the pending plan
                if  siteModelPlanId is pendingPlanID
                    @$el.find( '.panel-heading' ).append( '<span class="pending">'+_.polyglot.t("Pending Activation")+'</span>' )
                    startDate = Marionette.getOption @, 'startDate'
                    html = "<span class='pending'>"+_.polyglot.t('Domain name:')+" #{domainName}</span>
                            <span class='pending'>"+_.polyglot.t('Will activate on:')+" #{startDate} </span>"
                    @$el.find( '.panel-body' ).append html
                    @$el.find( '.activate-link' ).attr 'href', 'javascript:void(0)'


        class View.PlansView extends Marionette.CompositeView

            template : viewTpl

            itemView : SinglePlanView

            itemViewContainer : '.price-plans'

            serializeData :->
                data = super()
                data.THEMEURL = THEMEURL
                data

            itemViewOptions : ->
                currency : Marionette.getOption @, 'currency'
                activePlanID : Marionette.getOption @, 'activePlanId'
                pendingPlanID : Marionette.getOption @, 'pendingPlanId'
                domainName : Marionette.getOption @, 'domainName'
                billStart : Marionette.getOption @, 'billStart'
                billEnd : Marionette.getOption @, 'billEnd'
                startDate : Marionette.getOption @, 'startDate'

            onShow : ->
                activePlanID = Marionette.getOption @, 'activePlanId'
                pendingPlanID = Marionette.getOption @, 'pendingPlanId'

                if activePlanID is 'Free'
                    @$el.find( '#free-plan' ).addClass 'active'
                    @$el.find( '#free-plan .free-plan-link' ).text _.polyglot.t('Active Plan')

                if pendingPlanID is 'Free'
                    @$el.find( '#free-plan .panel-heading' ).append '<span class="pending">'+_.polyglot.t("Pending Activation")+'</span>'
                    startDate = Marionette.getOption @, 'startDate'
                    siteName = Marionette.getOption @, 'siteName'
                    html = "<span class='pending'>"+_.polyglot.t('Domain name:')+" #{siteName}.impruw.com</span>
                            <span class='pending'>"+_.polyglot.t('Will activate on:')+" #{startDate} </span>"
                    @$el.find( '#free-plan .panel-body' ).append html

            events :
                'click .free-plan-link' : ->
                    activePlanID = Marionette.getOption @, 'activePlanId'
                    if activePlanID != "Free"
                        if confirm "Switch to free plan?"
                            @$el.find('#pay_loader').show()
                            @trigger "switch:to:free:plan"

            onFreePlanSwitch :->
                @$el.find('#pay_loader').hide()
                html = "<div class='alert alert-success'>
                            <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>"+_.polyglot.t('Switched to free plan after end of billing cycle.')+"</div>"
                @$el.find('#billingsave_status').append html









