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
                                            <li class="list-group-item">Mobile & Tablet Ready Site</li>
                                            <li class="list-group-item">Unlimited Pages</li>
                                            <li class="list-group-item">5 Languages</li>
                                            <li class="list-group-item">Flexible, easy-to-use Site builder</li>
                                            <li class="list-group-item">24/7 security monitoring</li>
                                            <li class="list-group-item">24/7 technical support</li>
                                            <li class="list-group-item"><span class="ribbon">
                                                <a href="#/billing/payment-page" class="btn btn-block activate-link">Choose Plan</a></span></li>
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

                #append  the plan id to the plan activation link
                activateLink = @$el.find( '.activate-link' ).attr 'href'
                newactivateLink = "#{activateLink}/#{siteModelPlanId}"
                @$el.find( '.activate-link' ).attr 'href',newactivateLink

                #highlight the active plan
                if  siteModelPlanId is activePlanID
                    @$el.find( '.panel-default' ).addClass 'active'
                    @$el.find( '.activate-link' ).text 'Active Plan'
                    @$el.find( '.activate-link' ).attr 'href','javascript:void(0)'



        class View.PlansView extends Marionette.CompositeView

            template : viewTpl

            itemView : SinglePlanView

            itemViewContainer : '.price-plans'

            itemViewOptions : ->
                currency : Marionette.getOption @, 'currency'
                activePlanID : Marionette.getOption @, 'activePlanId'

            onShow :->
                activePlanID = Marionette.getOption @, 'activePlanId'
                if activePlanID is 'Free'
                    @$el.find('#free-plan').addClass 'active'





