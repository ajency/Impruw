define ['app'
        'text!apps/billing/account-summary/templates/accountPlanInfo.html'
        'bootbox' ], (App, viewTpl, bootbox )->

    App.module 'BillingApp.AccountPlanInfo.View', (View, App, Backbone, Marionette, $, _)->

        class View.AccountPlanInfoView extends Marionette.ItemView

            template: viewTpl

            events:
            	'click .deactivate-subscription': 'deactivateSubscription'

            onShow  :->
                $('[data-toggle="popover"]').popover()

            serializeData : ->
            	data = super()
            	data.THEMEURL = THEMEURL
            	data
                
            mixinTemplateHelpers:(data)->
                data = super data
                if data.plan_title is "Default plan"
                    data.plan_title = _.polyglot.t("Free")
                data

            deactivateSubscription: (e)->
                e.preventDefault()

                if PAYMENT_PLAN_ID is '1'
                    html = '<div class="alert alert-error"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+_.polyglot.t("You are already on a free plan")+'</div>'
                    @$el.find( '#deactivate_plan_status' ).empty()
                    @$el.find( '#deactivate_plan_status' ).append html
                    return
                
                # if current plan is not free 
                if PAYMENT_PLAN_ID != '1'
                    bootbox.confirm "<h4 class='delete-message'>#{ _.polyglot.t 'Are you sure you want to switch to free plan?'}</h4><p>#{ _.polyglot.t 'Doing so will cancel your current paid subscription and default free plan will be activated at the end of your current billing cycle'}</p>",(result)=>
                        if result is true
                            @$el.find('#deactivate_plan_loader').show()
                            @trigger "switch:to:free:plan"

            onCancelSubscriptionSuccess :->
            	@$el.find('#deactivate_plan_loader').hide() 
            	html = '<div class="alert alert-error"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+_.polyglot.t("Your subscription has been successfully cancelled.You will be defaulted to the free plan at the end of the subscription's cycle")+'</div>' 
            	@$el.find( '#deactivate_plan_status' ).empty()
            	@$el.find( '#deactivate_plan_status' ).append html

            onCancelSubscriptionError :(errorMsg)->
            	@$el.find('#deactivate_plan_loader').hide()
            	html = '<div class="alert alert-error"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+errorMsg+'</div>'
            	@$el.find( '#deactivate_plan_status' ).empty()
            	@$el.find( '#deactivate_plan_status' ).append html




