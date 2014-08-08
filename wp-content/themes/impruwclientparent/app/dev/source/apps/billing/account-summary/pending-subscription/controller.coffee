define [ 'app', 'controllers/base-controller' ], ( App, AppController )->
    App.module 'BillingApp.PendingSubscription', ( PendingSubscription, App, Backbone, Marionette, $, _ )->
        class PendingSubscription.Controller extends AppController

            # initiliaze controller
            initialize : ( opts )->
                @subscriptionId = opts.subscriptionId

                pendingSubscriptionModel = App.request "get:pending:subscription", @subscriptionId

                App.execute "when:fetched", pendingSubscriptionModel, =>
                    status = pendingSubscriptionModel.get 'pending'

                    if status is true

                        @view = @getView pendingSubscriptionModel
                    else
                        @subscriptionModel = App.request "get:subscription:by:id", @subscriptionId
                        @view = @getLinkView @subscriptionModel

                    @listenTo @view, "switch:to:free:plan", @deactiveSubscription

                    @show @view,
                        loading : true

            getView : ( pendingSubscriptionModel ) ->
                new PendingSubscription.View
                    model : pendingSubscriptionModel

            getLinkView : ->
                new PendingSubscription.LinkView
                    model : @subscriptionModel

            deactiveSubscription : ->
                App.execute "when:fetched", @subscriptionModel, =>
                    status = @subscriptionModel.get 'status'
                    cancelDate = @subscriptionModel.get 'bill_end'
                    subscriptionType = @subscriptionModel.get 'subscription_type'

                    options =
                        method : 'POST'
                        url : AJAXURL
                        data :
                            'currentSubscriptionId' : @subscriptionId
                            'cancelDate' : cancelDate
                            'status' : status
                            'subscriptionType' : subscriptionType
                            'action' : 'change-to-free-plan'

                    $.ajax( options ).done ( response )=>
                        @view.triggerMethod "plan:deactivated"


        class PendingSubscription.View extends Marionette.ItemView
            template : '<div class="aj-imp-help-text">
                            <span class="icon icon-info2"></span>
                            <p>
                                Your subscription to <b>{{plan_name}}</b> plan will begin at the end of current billing cycle. You will be billed for your selected plan on <b> {{start_date}} </b> unless its Free Plan. If you have decided to opt for the Free plan, your current plan will not be renewed and you will lose your domain name.
                            </p>
                        </div>'

        class PendingSubscription.LinkView extends Marionette.ItemView

            template : '<a href="javascript:void(0)" class="red-link" id="deactivate-sub">
                            <span class="glyphicon glyphicon-ban-circle"></span> Deactivate Subscription
                        </a>
                        <img src="{{THEMEURL}}/images/loader.gif" width="38" height="30"
                        id="pay_loader" style="display:none ">
                        <div class="alert alert-success" id="display-msg" style="display:none;">
                            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
                                &times;
                            </button>
                            {{#polyglot}}Plan deactivated.{{/polyglot}}
                        </div>'

            events :
                'click #deactivate-sub ' : ->
                    if confirm "Deactivate plan?"
                        @$el.find('#pay_loader').show()
                        @trigger "switch:to:free:plan"

            serializeData : ->
                data = super()
                data.THEMEURL = THEMEURL
                data

            onShow :->
                planName =  @model.get 'plan_name'
                if planName is 'Free'
                    @$el.hide()

            onPlanDeactivated :->
                @$el.find('#pay_loader').hide()
                @$el.find('#display-msg').show()


        App.commands.setHandler "show:pending:subscription", ( opts ) ->
            new PendingSubscription.Controller opts