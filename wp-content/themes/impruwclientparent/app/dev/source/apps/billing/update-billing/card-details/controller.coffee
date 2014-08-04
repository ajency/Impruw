define [ 'app', 'controllers/base-controller'
         'text!apps/billing/update-billing/templates/noCardView.html' ], ( App, AppController, noCardViewTpl )->
    App.module 'BillingApp.CardDetails', ( CardDetails, App, Backbone, Marionette, $, _ )->
        class CardDetails.Controller extends AppController

            initialize : ( opts )->
                brainTreeCustomerId = opts.customerId

                creditCardCollection = App.request "get:credit:cards", brainTreeCustomerId

                App.execute "when:fetched", creditCardCollection, =>
                    creditCardFirstModel = creditCardCollection.at 0

                    cardExists = creditCardFirstModel.get 'card_exists'

                    if cardExists is true
                        @view = @getCardsView creditCardCollection
                    else
                        @view = @getNoCardView creditCardFirstModel

                    @listenTo @view, "create:customer:with:card", @createCustomerWithCard


                    @show @view


            getCardsView : ( creditCardCollection ) ->
                new CardsView
                    collection : creditCardCollection

            getNoCardView : ( creditCardModel )->
                new NoCardView
                    model : creditCardModel

            createCustomerWithCard : ( paymentMethodNonce )->
                options =
                    method : 'POST'
                    url : AJAXURL
                    data :
                        'paymentMethodNonce' : paymentMethodNonce
                        'action' : 'create-customer-with-card'

                $.ajax( options ).done ( response )=>
                    if response.code == "OK"
                        @view.triggerMethod "card:success"
                    else
                        @view.triggerMethod "card:error", response.msg


        class NoCardView extends Marionette.ItemView

            template : noCardViewTpl

            onShow : ->
                @$el.find( 'select' ).selectpicker()

            serializeData : ->
                data = super()
                data.THEMEURL = THEMEURL
                data


            events :
                'click #btn-add' : ->
                    @$el.find( '#pay_loader' ).show()
                    cardNumber = @$el.find( '#card_number' ).val()
                    nameOnCard = @$el.find( '#card_name' ).val()
                    expMonth = @$el.find( '#exp_month' ).val()
                    expYear = @$el.find( '#exp_year' ).val()
                    cvv = @$el.find( '#card-cvv' ).val()

                    clientToken = @model.get 'braintree_client_token'
                    client = new braintree.api.Client clientToken : clientToken
                    client.tokenizeCard number : cardNumber, cvv : cvv, cardholderName : nameOnCard, expiration_month : expMonth, expiration_year : expYear, ( err, nonce )=>
                        @trigger "create:customer:with:card", nonce

            onCardSuccess : ->
                @$el.find( '#billingsave_status' ).empty()
                @$el.find( '#pay_loader' ).hide()
                html = '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">
                                                                                    &times;
                                                                                    </button>
                                                                                    Payment Processed'
                @$el.find( '#billingsave_status' ).append( html )
                @$el.find( '#btn-reset' ).click()

            onCardError : ( errorMsg )->
                @$el.find( '#billingsave_status' ).empty()
                @$el.find( '#pay_loader' ).hide()
                html = "<button type='button' class='close' data-dismiss='alert'
                                            aria-hidden='true'>&times;</button>
                                            #{errorMsg}"
                @$el.find( '#billingsave_status' ).append( html )

        class SingleCardView extends Marionette.ItemView
            template : '
                                    <h4>{{card_type}}</h4>
                                    <div class="">
                                        <label class="">Name on the Card</label>

                                        <div class="">
                                           <span>{{customer_name}}</span>
                                        </div>
                                    </div>
                                    <div class="">
                                        <label class="">Card Number</label>

                                        <div class="">
                                         <span>{{card_number}}</span>
                                        </div>
                                    </div>

                                    <div class="">
                                        <label class="">CVV</label>

                                        <div class="">
                                         <span>***</span>

                                        </div>

                                    </div>
                                    <div class="">
                                        <label class="">Expires On</label>
                                        <div class="">
                                            <span>{{expiration_date}}</span>

                                        </div>

                                    </div>'


        class CardsView extends Marionette.CompositeView

            template : "<div><div class='card-list'></div></div>"
            itemView : SingleCardView
            itemViewContainer : '.card-list'


        App.commands.setHandler "show:card", ( opts ) ->
            new CardDetails.Controller opts