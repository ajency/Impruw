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
                selectedPlanRegion : '#selected-plan'
                paymentRegion : '#payment-region'


        class SingleCreditCard extends  Marionette.ItemView

            template : cardListTpl

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

        #payment view when using stored credit card
        class View.FirstTimePaymentView extends  Marionette.ItemView

            template : newCustomerPaymentViewTpl

            serializeData : ->
                data = super()
                data.THEMEURL = THEMEURL
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








