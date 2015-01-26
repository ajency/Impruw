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

            onRender :->
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


        class EmptyView extends Marionette.ItemView
            template: '<br/><div class="empty-info">{{#polyglot}}No Credit cards present{{/polyglot}}</div><br/>'


        class SingleCreditCard extends  Marionette.ItemView

            template : singleCardTpl

            serializeData :->
                data = super()
                creditCardIndex = Marionette.getOption @, 'creditCardIndex'
                data.creditCardIndex = creditCardIndex+1
                data

            onShow:->
                activePaymentToken = Marionette.getOption @, 'paymentMethodToken'
                if @model.get('token') is activePaymentToken
                    @$el.find('.single-card').addClass('active').parents('div').siblings().find('.single-card').removeClass "active"          

            events:
                'click' :->
                    @$el.find('.single-card').addClass('selected').parents('div').siblings().find('.single-card').removeClass "selected" 


        #card listing view
        class View.CreditCardListView extends  Marionette.CompositeView

            template : creditCardListTpl

            itemView : SingleCreditCard

            emptyView : EmptyView

            itemViewContainer : '.credit-cards'

            itemViewOptions :(model,index) ->
                paymentMethodToken : Marionette.getOption @, 'paymentMethodToken'
                braintreeClientToken : Marionette.getOption @, 'braintreeClientToken'
                creditCardIndex : index

            serializeData : ->
                data = super()
                if @collection.length is 0
                    data.creditcardsExist = 0
                else
                    data.creditcardsExist = 1
                
                data.THEMEURL = THEMEURL
                data

            onRender :->
                $( '.spinner-markup' ).spin false
                @$el.find( '#exp_month' ).selectpicker()
                @$el.find( '#exp_year' ).selectpicker()


            events:
                'click #btn-add-new-card':(e)->
                    braintreeClientToken = Marionette.getOption @, 'braintreeClientToken'
                    e.preventDefault()
                    if @$el.find('.add-card-form').valid()
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

                'click #btn-forget-card': 'deleteCard'

            setActiveCard : (e) ->
                e.preventDefault()
                currentSubscriptionId = @model.get('id')
                currentSubscriptionStatus = @model.get('subscription_status')
                currentPaymentmethodToken = @model.get('paymentMethodToken')
                selectedCardToken = @$el.find('.selected .token').val()
                console.log "selected token "+selectedCardToken
                if _.isUndefined selectedCardToken
                    @$el.find( '.activeforget_card_status' ).html('')
                    html = '<div class="alert alert-error">
                                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+_.polyglot.t("Please select a card or add a new card")+'</div>'
                    @$el.find( '.activeforget_card_status' ).append html

                else if currentSubscriptionId is 'DefaultFree'
                    @$el.find( '.activeforget_card_status' ).empty()
                    html = '<div class="alert alert-error">
                                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+_.polyglot.t("You are currently subscribed to a free plan. Please change to a paid plan to set an active credit card.")+'</div>'
                    @$el.find( '.activeforget_card_status' ).append html                    
                else
                    @$el.find( '.active_card_loader' ).show()
                    @trigger "set:active:credit:card",currentSubscriptionId, selectedCardToken

            deleteCard : (e) ->
                e.preventDefault()
                currentSubscriptionId = @model.get('id')
                selectedCardToken = @$el.find('.selected .token').val()
                if _.isUndefined selectedCardToken
                    @$el.find( '.activeforget_card_status' ).html('')
                    html = '<div class="alert alert-error">
                                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+_.polyglot.t("Please select a card")+'</div>'
                    @$el.find( '.activeforget_card_status' ).append html
                else
                    @$el.find( '.forget_card_loader' ).show()
                    @trigger "delete:credit:card",currentSubscriptionId, selectedCardToken


                    

            onAddCreditCardSuccess : ->
                currentSubscriptionId = @model.get('id')
                # When active card does not exist
                if currentSubscriptionId is 'DefaultFree' or _.isUndefined @model.get('paymentMethodToken')
                    successMsg =  _.polyglot.t("Card Added Successfully.")
                else
                    successMsg = _.polyglot.t("Card Added Successfully. However this card will not be used for billing. If you want this card to be used for billing simply change your active card by selecting a card and clicking on 'Set as Active'.")
                
                
                @$el.find('#add-new-credit-card input').val ''
                @$el.find( '.addcard_status' ).empty()
                @$el.find( '.addcard_loader' ).hide()
                html = '<div class="alert alert-success">
                            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+successMsg+'</div>'
                @$el.find( '.addcard_status' ).append( html )

            onAddCreditCardError : ( errorMsg )->
                @$el.find( '.addcard_status' ).empty()
                @$el.find( '.addcard_loader' ).hide()
                html = "<div class='alert alert-error'>
                            <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>
                            #{errorMsg}
                        </div>"
                @$el.find( '.addcard_status' ).append( html )

            onSetActiveCreditCardSuccess :(token)->
                activeCardClass = ".singlecard-#{token}"
                @$el.find('.single-card').removeClass('active')
                @$el.find(activeCardClass).addClass('active').parents('div').siblings().find('.single-card').removeClass "active"
                @$el.find( '.activeforget_card_status' ).empty()
                @$el.find( '.active_card_loader' ).hide()
                html = '<div class="alert alert-success">
                            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+_.polyglot.t("Card successfully set as the active credit card")+'</div>'
                @$el.find( '.activeforget_card_status' ).append( html )

            onSetActiveCreditCardError : ( errorMsg ) ->
                @$el.find( '.activeforget_card_status' ).empty()
                @$el.find( '.active_card_loader' ).hide()
                html = '<div class="alert alert-success">
                            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+_.polyglot.t(errorMsg)+'</div>'
                @$el.find( '.activeforget_card_status' ).append( html )

            onDeleteCreditCardSuccess : ->
                @$el.find( '.activeforget_card_status' ).empty()
                @$el.find( '.forget_card_loader' ).hide()
                html = '<div class="alert alert-success">
                            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+_.polyglot.t("Card successfully deleted")+'</div>'

                @$el.find( '.activeforget_card_status' ).append( html )

            onDeleteCreditCardError : ( errorMsg ) ->
                @$el.find( '.activeforget_card_status' ).empty()
                @$el.find( '.forget_card_loader' ).hide()
                html = '<div class="alert alert-success">
                            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+_.polyglot.t(errorMsg)+'</div>'
                @$el.find( '.activeforget_card_status' ).append( html )










