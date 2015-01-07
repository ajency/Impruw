define [ 'app'
         'text!apps/billing/site-credit-cards/templates/credit-cards-layout.html'
         'text!apps/billing/site-credit-cards/templates/credit-card-listing.html'
         'text!apps/billing/site-credit-cards/templates/single-credit-card.html'
         'bootbox'], ( App, creditCardLayoutViewTpl,creditCardListTpl,singleCardTpl,bootbox)->

    App.module 'BillingApp.SiteCreditCards.View', ( View, App, Backbone, Marionette, $, _ )->
        
        # Main payment page layout
        class View.Layout extends Marionette.Layout

            template : creditCardLayoutViewTpl

            regions :
                cardListingRegion : '#credit-card-listing'


        class EmptyView extends Marionette.ItemView
            template: '<br/><div class="empty-info">{{#polyglot}}No Credit cards present{{/polyglot}}</div><br/>'


        class SingleCreditCard extends  Marionette.ItemView

            template : singleCardTpl

            onShow:->
                activePaymentToken = Marionette.getOption @, 'paymentMethodToken'
                if @model.get('token') is activePaymentToken
                    @$el.find('.single-card').addClass('selected').parents('div').siblings().find('.single-card').removeClass "selected"

            events:
                'click' :->
                    @$el.find('.single-card').addClass('selected').parents('div').siblings().find('.single-card').removeClass "selected"        


        #card listing view
        class View.CreditCardListView extends  Marionette.CompositeView

            template : creditCardListTpl

            itemView : SingleCreditCard

            emptyView : EmptyView

            itemViewContainer : '.credit-cards'

            modelEvents:
                'change': 'render'

            itemViewOptions : ->
                paymentMethodToken : Marionette.getOption @, 'paymentMethodToken'
                braintreeClientToken : Marionette.getOption @, 'braintreeClientToken'

            serializeData : ->
                data = super()
                if @collection.length is 0
                    data.creditcardsExist = 0
                else
                    data.creditcardsExist = 1
                
                data.THEMEURL = THEMEURL
                data

            events:
                'click #btn-add-new-card':(e)->
                    braintreeClientToken = Marionette.getOption @, 'braintreeClientToken'
                    e.preventDefault()

                    @$el.find( '.addcard_loader' ).show()
                    cardNumber = @$el.find( '#card_number' ).val()
                    nameOnCard = @$el.find( '#card_name' ).val()
                    expMonth = @$el.find( '#exp_month' ).val()
                    expYear = @$el.find( '#exp_year' ).val()
                    cvv = @$el.find( '#card-cvv' ).val()

                    client = new braintree.api.Client clientToken : braintreeClientToken
                    client.tokenizeCard number : cardNumber, cvv : cvv, cardholderName : nameOnCard, expiration_month : expMonth, expiration_year : expYear, ( err, nonce )=>
                        @trigger "add:new:credit:card", nonce

                'click #btn-set-as-active': 'setActiveCard'

            setActiveCard : (e) ->
                    e.preventDefault()
                    currentSubscriptionId = @model.get('id')
                    currentSubscriptionStatus = @model.get('subscription_status')
                    currentPaymentmethodToken = @model.get('paymentMethodToken')
                    selectedCardToken = @$el.find('.selected .token').val()
                    if currentPaymentmethodToken is selectedCardToken
                        @$el.find( '.activeforget_card_status' ).empty()
                        html = '<div class="alert alert-error">
                            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+_.polyglot.t("This card is already set as active")+'</div>'
                        @$el.find( '.activeforget_card_status' ).append( html )
                    else
                        @$el.find( '.active_card_loader' ).show()
                        @trigger "set:active:credit:card",currentSubscriptionId, selectedCardToken, currentSubscriptionStatus,currentPaymentmethodToken

                    

            onAddCreditCardSuccess : ->
                @$el.find( '.addcard_status' ).empty()
                @$el.find( '.addcard_loader' ).hide()
                html = '<div class="alert alert-success">
                            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+_.polyglot.t("Card Added Successfully!")+'</div>'
                @$el.find( '.addcard_status' ).append( html )

            onAddCreditCardError : ( errorMsg )->
                @$el.find( '.addcard_status' ).empty()
                @$el.find( '.addcard_loader' ).hide()
                html = "<div class='alert alert-error'>
                            <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>
                            #{errorMsg}
                        </div>"
                @$el.find( '.addcard_status' ).append( html )

            onSetActiveCreditCardSuccess : ->
                @$el.find( '.activeforget_card_status' ).empty()
                @$el.find( '.active_card_loader' ).hide()
                html = '<div class="alert alert-success">
                            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+_.polyglot.t("Card successfully set as the active credit card")+'</div>'
                @$el.find( '.activeforget_card_status' ).append( html )

            onSetActiveCreditCardSuccessError : ( errorMsg ) ->
                @$el.find( '.activeforget_card_status' ).empty()
                @$el.find( '.active_card_loader' ).hide()
                html = '<div class="alert alert-success">
                            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+_.polyglot.t(errorMsg)+'</div>'
                @$el.find( '.activeforget_card_status' ).append( html )










