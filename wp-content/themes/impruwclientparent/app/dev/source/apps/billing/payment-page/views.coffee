define [ 'app'
         'text!apps/billing/payment-page/templates/view.html'
         'text!apps/billing/payment-page/templates/newpaymentView.html'
         'text!apps/billing/payment-page/templates/paymentView.html'
         'text!apps/billing/payment-page/templates/cardList.html' ], ( App, viewTpl, newpaymentViewTpl, paymentViewTpl, cardListTpl )->
    App.module 'BillingApp.Payment.View', ( View, App, Backbone, Marionette, $, _ )->
        class View.Layout extends Marionette.Layout

            template : viewTpl

            regions :
                selectedPlanRegion : '#selected-plan'
                activeSubscriptionRegion : '#active-sub-region'
                paymentRegion : '#payment-region'

        #selected plan view
        class View.SelectedPlanView extends Marionette.ItemView

            template : '<div class="panel-heading">
                                                        <h3>{{plan_name}}</h3>
                                                    </div>
                                                    <div class="panel-body">
                                                        <h3 class="panel-title price">${{price}}</h3>
                                                    </div>
                                                    <ul class="list-group">
                                                        <li class="list-group-item"><span class="ribbon">Chosen Plan</span></li>
                                                    </ul>'

            className : 'panel panel-default text-center active'

        #active subscription view
        class View.ActiveSubscriptionView extends Marionette.ItemView

            template : '<div class="col-sm-6 left">
                                            <h6 class="aj-imp-sub-head">
                                                <small>{{#polyglot}}Active Plan: {{/polyglot}}</small>
                                                {{plan_name}}
                                            </h6>
                                        </div>
                                        <div class="col-sm-6 right">
                                            <h6 class="aj-imp-sub-head">
                                                <small>{{#polyglot}}Active Since: {{/polyglot}}</small>
                                                {{start_date}}
                                            </h6>
                                        </div>'

            className : 'aj-imp-widget-head row'

        #payment page view when new credit card used
        class View.FirstTimePaymentView extends  Marionette.ItemView

            template : newpaymentViewTpl

            className : 'col-sm-8'

            serializeData : ->
                data = super()
                data.THEMEURL = THEMEURL
                data

            onShow :->
                @$el.find( 'select' ).selectpicker()


            events :
                'click #btn-pay' : ( e ) ->
                    e.preventDefault()
                    @$el.find( '#loader' ).show()
                    cardNumber = @$el.find( '#card_number' ).val()
                    nameOnCard = @$el.find( '#card_name' ).val()
                    expMonth = @$el.find( '#exp_month' ).val()
                    expYear = @$el.find( '#exp_year' ).val()
                    cvv = @$el.find( '#card-cvv' ).val()

                    clientToken = @model.get 'braintree_client_token'
                    client = new braintree.api.Client clientToken : clientToken
                    client.tokenizeCard number : cardNumber, cvv : cvv, cardholderName : nameOnCard, expiration_month : expMonth, expiration_year : expYear, ( err, nonce )=>
                        @trigger "new:credit:card:payment", nonce,'active'

            onPaymentSuccess : ->
                @$el.find( '#billingsave_status' ).empty()
                @$el.find( '#loader' ).hide()
                html = '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">
                                                        &times;
                                                        </button>
                                                        Payment Succesfull'
                @$el.find( '#billingsave_status' ).append( html )

            onPaymentError : ( errorMsg )->
                @$el.find( '#billingsave_status' ).empty()
                @$el.find( '#loader' ).hide()
                html = "<button type='button' class='close' data-dismiss='alert'
                                                        aria-hidden='true'>&times;</button>
                                                        #{errorMsg}"
                @$el.find( '#billingsave_status' ).append( html )

#        #payment page view when credit card info available
#        class View.PaymentView extends  Marionette.ItemView
#
#            template : paymentViewTpl
#
#            className : 'col-sm-8'
#
#            serializeData : ->
#                data = super()
#                data.THEMEURL = THEMEURL
#                data
#
#            onShow : ->
#                @$el.find( 'select' ).selectpicker()
#
#
#            events :
#                'click #btn-pay' : ->
#                    @$el.find( '#loader' ).show()
#                    cardNumber = @$el.find( '#card_number' ).val()
#                    nameOnCard = @$el.find( '#card_name' ).val()
#                    expdate = @$el.find( '#expiration-date' ).val()
#                    cvv = @$el.find( '#card-cvv' ).val()
#
#                    clientToken = @model.get 'braintree_client_token'
#                    client = new braintree.api.Client clientToken : clientToken
#                    client.tokenizeCard number : cardNumber, cardholderName : nameOnCard, cvv : cvv, expiration_date : expdate, ( err, nonce )=>
#                        data =
#                            action : "payment-with-stored-card"
#                            nonce : nonce
#                            token : @model.get 'token'
#                        @trigger "make:payment:with:stored:card", data
#
#                'click #btn-change-card' : ->
#                    @trigger "change:card"
#
#
#            onPaymentSuccess : ->
#                @$el.find( '#billingsave_status' ).empty()
#                @$el.find( '#loader' ).hide()
#                html = '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">
#                                                        &times;
#                                                        </button>
#                                                        Payment Processed'
#                @$el.find( '#billingsave_status' ).append( html )
#
#            onPaymentError : ( errorMsg )->
#                @$el.find( '#billingsave_status' ).empty()
#                @$el.find( '#loader' ).hide()
#                html = "<button type='button' class='close' data-dismiss='alert'
#                                                        aria-hidden='true'>&times;</button>
#                                                        #{errorMsg}"
#                @$el.find( '#billingsave_status' ).append( html )


        class SingleCreditCard extends  Marionette.ItemView

            template : cardListTpl

            events :
                'click' :->
                    @$el.find('.single-card').addClass('selected').parents('div').siblings().find('.single-card').removeClass "selected"



        #payment view when using stored credit card info
        class View.PaymentPageView extends  Marionette.CompositeView

            template : paymentViewTpl

            itemView : SingleCreditCard

            itemViewContainer : '.card-list'

            className : 'col-sm-8'

            serializeData :->
                data = super()
                data.THEMEURL = THEMEURL
                data

            onShow : ->
                @$el.find( 'select' ).selectpicker()

            events :
                'click #btn-pay':(e)->
                    e.preventDefault()
                    @$el.find( '#loader' ).show()
                    cardNumber = @$el.find( '#card_number' ).val()
                    nameOnCard = @$el.find( '#card_name' ).val()
                    expMonth = @$el.find( '#exp_month' ).val()
                    expYear = @$el.find( '#exp_year' ).val()
                    cvv = @$el.find( '#card-cvv' ).val()

                    clientToken =  @collection.models[0].get 'braintree_client_token'
                    client = new braintree.api.Client clientToken : clientToken
                    client.tokenizeCard number : cardNumber, cvv : cvv, cardholderName : nameOnCard, expiration_month : expMonth, expiration_year : expYear, ( err, nonce )=>
                        @trigger "new:credit:card:payment", nonce , 'pending'

                'click #btn-stored-pay' :(e)->
                    e.preventDefault()
                    cardToken = @$el.find('.selected .token').val()

                    if _.isUndefined cardToken
                        html = '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">
                                &times;
                                </button>
                                Please select a card'
                        @$el.find( '#billingsave_status' ).append html
                    else
                        @$el.find( '#loader' ).show()
                        @$el.find( '#billingsave_status' ).empty()
                        @trigger "make:payment:with:stored:card", cardToken

            onPaymentSuccess : ->
                @$el.find( '#billingsave_status' ).empty()
                @$el.find( '#loader' ).hide()
                html = '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">
                                                                        &times;
                                                                        </button>
                                                                        Payment Succesfull'
                @$el.find( '#billingsave_status' ).append( html )
                @$el.find( '#btn-stored-pay' ).hide()
                @$el.find( '#btn-pay' ).hide()


            onPaymentError : ( errorMsg )->
                @$el.find( '#billingsave_status' ).empty()
                @$el.find( '#loader' ).hide()
                html = "<button type='button' class='close' data-dismiss='alert'
                                                                        aria-hidden='true'>&times;</button>
                                                                        #{errorMsg}"
                @$el.find( '#billingsave_status' ).append( html )






