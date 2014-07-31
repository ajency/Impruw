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

                        view = @getView pendingSubscriptionModel
                    else
                        @subscriptionModel = App.request "get:subscription:by:id", @subscriptionId
                        view = @getLinkView @subscriptionModel

                    @listenTo view, "switch:to:free:plan", @deactiveSubscription

                    @show view,
                        loading : true

            getView : ( pendingSubscriptionModel ) ->
                new PendingSubscription.View
                    model : pendingSubscriptionModel

            getLinkView : ->
                new PendingSubscription.LinkView
                    model : @subscriptionModel

            deactiveSubscription : ->
                App.execute "when:fetched", subscriptionModel, =>
                    status = @subscriptionModel.get 'status'
                    cancelDate = @subscriptionModel.get 'bill_end'

                    options =
                        method : 'POST'
                        url : AJAXURL
                        data :
                            'currentSubscriptionId' : @subscriptionId
                            'cancelDate' : cancelDate
                            'status' : status
                            'action' : 'change-to-free-plan'

                    $.ajax( options ).done ( response )=>
                        console.log response
        #                    window.location.reload()


        class PendingSubscription.View extends Marionette.ItemView
            template : '
                                                <div>
                                                Your subscription to <b>{{plan_name}}</b> will begin at the end
                                                of current billing cycle. You will be billed for your
                                                selected plan on <b> {{start_date}} </b>(except free plan).
                                                If you have decided to opt for the free plan,
                                                your current plan will not be renewed and you will lose
                                                your domain name</div>'

        class PendingSubscription.LinkView extends Marionette.ItemView

            template : '<a href="javascript:void(0)" class="red-link" id="deactivate-sub">
                                                <span class="glyphicon glyphicon-ban-circle"></span>
                                                Deactivate Subscription</a>'
            events :
                'click #deactivate-sub ' : ->
                    if confirm "Deactivate plan?"
                        @trigger "switch:to:free:plan"
            onShow :->
                planName =  @model.get 'plan_name'
                if planName is 'Free'
                    @$el.hide()



        App.commands.setHandler "show:pending:subscription", ( opts ) ->
            new PendingSubscription.Controller opts