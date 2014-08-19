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
                'click #btn-add' :(e) ->
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
                        @trigger "create:customer:with:card", nonce

            onCardSuccess : ->
                @$el.find( '#billingsave_status' ).empty()
                @$el.find( '#pay_loader' ).hide()
                html = '<div class="alert alert-success">
                            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button> 
                            '+_.polyglot.t("Card Added Successfuly")+' 
                        </div>'
                @$el.find( '#billingsave_status' ).append html
                @$el.find( '#btn-reset' ).click()

            onCardError : ( errorMsg )->
                @$el.find( '#billingsave_status' ).empty()
                @$el.find( '#pay_loader' ).hide()
                html = "<div class='alert alert-error'>
                            <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>
                            #{errorMsg}
                        </div>"
                @$el.find( '#billingsave_status' ).append( html )

        class SingleCardView extends Marionette.ItemView
            template : '<div class="col-sm-4">
                            <div class="single-card form-horizontal">
                                <div class="ticker">
                                    <span class="glyphicon glyphicon-ok"></span>
                                </div>
                                <h6 class="aj-imp-sub-head-thin">{{card_type}}</h6>
                                <div class="form-group">
                                    <label class="control-label col-sm-5">{{#polyglot}}Name on the Card:{{/polyglot}}</label>
                                    <div class="col-sm-7 col-sm-offset-5">
                                       <span class="form-control">{{customer_name}}</span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-sm-5">{{#polyglot}}Card Number:{{/polyglot}}</label>
                                    <div class="col-sm-7 col-sm-offset-5">
                                        <span class="form-control">{{card_number}}</span>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="control-label col-sm-5">{{#polyglot}}CVV:{{/polyglot}}</label>
                                    <div class="col-sm-7 col-sm-offset-5">
                                        <span class="form-control">***</span>
                                    </div>

                                </div>
                                <div class="form-group">
                                    <label class="control-label col-sm-5">{{#polyglot}}Expires On:{{/polyglot}}</label>
                                    <div class="col-sm-7 col-sm-offset-5">
                                        <span class="form-control">{{expiration_date}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>'


        class CardsView extends Marionette.CompositeView

            template : "<div class='card-list row'></div>"
            itemView : SingleCardView
            itemViewContainer : '.card-list'


        App.commands.setHandler "show:card", ( opts ) ->
            new CardDetails.Controller opts