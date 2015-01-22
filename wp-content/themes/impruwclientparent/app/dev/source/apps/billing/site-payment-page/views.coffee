define [ 'app'
         'text!apps/billing/site-payment-page/templates/payment-layout.html'
         'text!apps/billing/site-payment-page/templates/paymentView.html'
         'text!apps/billing/site-payment-page/templates/cardList.html' 
         'text!apps/billing/site-payment-page/templates/newCustomerPaymentView.html' ], ( App, paymentLayoutViewTpl,paymentViewTpl,cardListTpl,newCustomerPaymentViewTpl )->

    App.module 'BillingApp.SitePayment.View', ( View, App, Backbone, Marionette, $, _ )->
        
        # Main payment page layout
        class View.Layout extends Marionette.Layout

            template : paymentLayoutViewTpl

            regions :
                paymentRegion : '#payment-page-region'

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


        class SingleCreditCard extends  Marionette.ItemView

            template : cardListTpl

            onShow:->
                activePaymentToken = Marionette.getOption @, 'activePaymentToken'
                if @model.get('token') is activePaymentToken
                    @$el.find('.single-card').addClass('selected').parents('div').siblings().find('.single-card').removeClass "selected"

            events :
                'click' :->
                    @$el.find('.single-card').addClass('selected').parents('div').siblings().find('.single-card').removeClass "selected"



        #payment view when using stored credit card
        class View.PaymentPageView extends  Marionette.CompositeView

            template : paymentViewTpl

            itemView : SingleCreditCard

            itemViewContainer : '.card-list'

            modelEvents:
                'change': 'render'

            onShow  :->
                @$el.find( '#exp_month' ).selectpicker()
                @$el.find( '#exp_year' ).selectpicker()

            itemViewOptions :(model,index) ->
                activePaymentToken : Marionette.getOption @, 'activePaymentToken'

            serializeData : ->
                activePlanName = Marionette.getOption @, 'activePlanName'
                currentSubscriptionAmount = Marionette.getOption @, 'currentSubscriptionAmount'
                currencySymbol = Marionette.getOption @, 'currencySymbol'
                billingPeriodStartDate = Marionette.getOption @, 'billingPeriodStartDate'
                billingPeriodEndDate = Marionette.getOption @, 'billingPeriodEndDate'
                nextBillingDate = Marionette.getOption @, 'nextBillingDate'
                selectedPlanName = Marionette.getOption @, 'selectedPlanName'
                selectedPlanAmount = Marionette.getOption @, 'selectedPlanAmount'
                prorationCharge = Marionette.getOption @, 'prorationCharge'
                currentSubscriptionDaysLeft = Marionette.getOption @, 'currentSubscriptionDaysLeft'
                isSubscription = Marionette.getOption @, 'isSubscription'
                
                data = super()
                data.THEMEURL = THEMEURL
                data.activePlanName = activePlanName
                data.currentSubscriptionAmount = currentSubscriptionAmount
                data.currencySymbol = currencySymbol
                data.billingPeriodStartDate = billingPeriodStartDate
                data.billingPeriodEndDate = billingPeriodEndDate
                data.nextBillingDate = nextBillingDate
                data.selectedPlanName = selectedPlanName
                data.selectedPlanAmount = selectedPlanAmount
                data.prorationCharge = prorationCharge
                data.currentSubscriptionDaysLeft = currentSubscriptionDaysLeft
                data.isSubscription = isSubscription
                data

            events :
                'click #btn-add-card':(e)->
                    e.preventDefault()
                    # collapse add card and show loader
                    @$el.find( '#addcard_loader' ).show()
                    cardNumber = @$el.find( '#card_number' ).val()
                    nameOnCard = @$el.find( '#card_name' ).val()
                    expMonth = @$el.find( '#exp_month' ).val()
                    expYear = @$el.find( '#exp_year' ).val()
                    cvv = @$el.find( '#card-cvv' ).val()

                    clientToken =  @collection.models[0].get 'braintree_client_token'
                    client = new braintree.api.Client clientToken : clientToken
                    client.tokenizeCard number : cardNumber, cvv : cvv, cardholderName : nameOnCard, expiration_month : expMonth, expiration_year : expYear, ( err, nonce )=>
                        @trigger "add:credit:card", nonce

                'click #btn-stored-pay' : ( e ) ->
                    e.preventDefault()

                    cardToken = @$el.find('.selected .token').val()

                    if _.isUndefined cardToken
                        html = '<div class="alert alert-error">
                                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+_.polyglot.t("Please select a card")+'</div>'
                        @$el.find( '#billingpay_status' ).append html
                    else
                        @$el.find( '#paycredit_loader' ).show()
                        @trigger "make:payment:with:stored:card", cardToken

                'click #btn-stored-assisted-setup-pay' : ( e ) ->
                    e.preventDefault()

                    cardToken = @$el.find('.selected .token').val()

                    if _.isUndefined cardToken
                        html = '<div class="alert alert-error">
                                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+_.polyglot.t("Please select a card")+'</div>'
                        @$el.find( '#billingpay_status' ).append html
                    else
                        @$el.find( '#paycredit_loader' ).show()
                        @trigger "make:assistedsetup:payment:stored:card", cardToken

            onAddCreditCardSuccess : ->
                @$el.find('input').val ''
                @$el.find( '#addcard_status' ).empty()
                @$el.find( '#addcard_loader' ).hide()
                html = '<div class="alert alert-success">
                            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+_.polyglot.t("Card Added Successfully!")+'</div>'
                @$el.find( '#addcard_status' ).append( html )

            onAddCreditCardError : ( errorMsg )->
                @$el.find( '#addcard_status' ).empty()
                @$el.find( '#addcard_loader' ).hide()
                html = "<div class='alert alert-error'>
                            <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>
                            #{errorMsg}
                        </div>"
                @$el.find( '#addcard_status' ).append( html )

            onPaymentSuccess : ->
                @$el.find( '#billingpay_status' ).empty()
                @$el.find( '#paycredit_loader' ).hide()
                html = '<div class="alert alert-success">
                            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+_.polyglot.t("Payment Successful!")+'</div>'
                @$el.find( '#billingpay_status' ).append( html )

            onPaymentError : ( errorMsg )->
                @$el.find( '#billingpay_status' ).empty()
                @$el.find( '#paycredit_loader' ).hide()
                html = "<div class='alert alert-error'>
                            <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>
                            #{errorMsg}
                        </div>"
                @$el.find( '#billingpay_status' ).append( html )


        #payment view when using new credit card
        class View.FirstTimePaymentView extends  Marionette.ItemView

            template : newCustomerPaymentViewTpl

            serializeData : ->
                activePlanName = Marionette.getOption @, 'activePlanName'
                currentSubscriptionAmount = Marionette.getOption @, 'currentSubscriptionAmount'
                currencySymbol = Marionette.getOption @, 'currencySymbol'
                billingPeriodStartDate = Marionette.getOption @, 'billingPeriodStartDate'
                billingPeriodEndDate = Marionette.getOption @, 'billingPeriodEndDate'
                nextBillingDate = Marionette.getOption @, 'nextBillingDate'
                selectedPlanName = Marionette.getOption @, 'selectedPlanName'
                selectedPlanAmount = Marionette.getOption @, 'selectedPlanAmount'
                prorationCharge = Marionette.getOption @, 'prorationCharge'
                currentSubscriptionDaysLeft = Marionette.getOption @, 'currentSubscriptionDaysLeft'
                isSubscription = Marionette.getOption @, 'isSubscription'
                console.log isSubscription

                data = super()
                data.THEMEURL = THEMEURL
                data.activePlanName = activePlanName
                data.currentSubscriptionAmount = currentSubscriptionAmount
                data.currencySymbol = currencySymbol
                data.billingPeriodStartDate = billingPeriodStartDate
                data.billingPeriodEndDate = billingPeriodEndDate
                data.nextBillingDate = nextBillingDate
                data.selectedPlanName = selectedPlanName
                data.selectedPlanAmount = selectedPlanAmount
                data.prorationCharge = prorationCharge
                data.currentSubscriptionDaysLeft = currentSubscriptionDaysLeft
                data.isSubscription = isSubscription
                data

            events :
                'click #btn-pay' : ( e ) ->
                    e.preventDefault()
                    @$el.find( '#pay_loader' ).show()

                    cardNumber = @$el.find( '#card_number' ).val()
                    nameOnCard = @$el.find( '#card_name' ).val()
                    expMonth = @$el.find( '#exp_month' ).val()
                    expYear = @$el.find( '#exp_year' ).val()
                    cvv = @$el.find( '#card-cvv' ).val()

                    clientToken = @model.get 'braintree_client_token'
                    client = new braintree.api.Client clientToken : clientToken
                    client.tokenizeCard number : cardNumber, cvv : cvv, cardholderName : nameOnCard, expiration_month : expMonth, expiration_year : expYear, ( err, nonce )=>
                        @trigger "new:credit:card:payment", nonce

                'click #btn-assisted-setup-pay' : ( e ) ->
                    e.preventDefault()
                    @$el.find( '#pay_loader' ).show()

                    cardNumber = @$el.find( '#card_number' ).val()
                    nameOnCard = @$el.find( '#card_name' ).val()
                    expMonth = @$el.find( '#exp_month' ).val()
                    expYear = @$el.find( '#exp_year' ).val()
                    cvv = @$el.find( '#card-cvv' ).val()

                    clientToken = @model.get 'braintree_client_token'
                    client = new braintree.api.Client clientToken : clientToken
                    client.tokenizeCard number : cardNumber, cvv : cvv, cardholderName : nameOnCard, expiration_month : expMonth, expiration_year : expYear, ( err, nonce )=>
                        @trigger "new:credit:card:assistedsetup:payment", nonce

            onPaymentSuccess : ->
                @$el.find( '#billingsave_status' ).empty()
                @$el.find( '#pay_loader' ).hide()
                html = '<div class="alert alert-success">
                            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+_.polyglot.t("Payment Successful!")+'</div>'
                @$el.find( '#billingsave_status' ).append( html )

            onPaymentError : ( errorMsg )->
                @$el.find( '#billingsave_status' ).empty()
                @$el.find( '#pay_loader' ).hide()
                html = "<div class='alert alert-error'>
                            <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>
                            #{errorMsg}
                        </div>"
                @$el.find( '#billingsave_status' ).append( html )








