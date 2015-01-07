define [ 'app', 'controllers/base-controller'
         'apps/billing/site-credit-cards/views' ], ( App, AppController )->
    App.module 'BillingApp.SiteCreditCards', ( SiteCreditCards, App, Backbone, Marionette, $, _ )->
        class SiteCreditCards.Controller extends AppController

            # initiliaze controller
            initialize : ( opts )->
                @siteModel = App.request "get:site:model"

                @layout = @getLayout()

                App.vent.trigger "set:active:menu", 'billing'

                @listenTo @layout, "show", =>
                    @activeSubscriptionModel = App.request "get:active:subscription", SITEID['id']

                    App.execute "when:fetched", @activeSubscriptionModel, =>
                        @paymentMethodToken = @activeSubscriptionModel.get('paymentMethodToken') 
                        @creditCardCollection = App.request "get:credit:cards"
                        App.execute "when:fetched", @creditCardCollection, =>
                            @braintreeClientToken = @creditCardCollection.models[0].get 'braintree_client_token'
                            existingCreditCards =@creditCardCollection.where(card_exists: true)
                            @existingCreditCardsCollection = new Backbone.Collection(existingCreditCards)
                            @view = @getCardListingView()
                            
                            @listenTo @view , "add:new:credit:card", ( paymentMethodNonce )=>
                                @addCard paymentMethodNonce 

                            @listenTo @view , "set:active:credit:card", ( currentSubscriptionId, selectedCardToken, currentSubscriptionStatus,currentPaymentmethodToken )=>
                                @setActiveCard currentSubscriptionId, selectedCardToken, currentSubscriptionStatus,currentPaymentmethodToken
                            @layout.cardListingRegion.show @view

                @show @layout,
                    loading : true

           
            getLayout : ->
                new SiteCreditCards.View.Layout

            getCardListingView:->
                new SiteCreditCards.View.CreditCardListView
                    collection : @existingCreditCardsCollection
                    model : @activeSubscriptionModel
                    paymentMethodToken : @paymentMethodToken
                    braintreeClientToken : @braintreeClientToken


            addCard : ( paymentMethodNonce )=>
                
                postURL = "#{SITEURL}/api/ajbilling/creditCard/#{SITEID["id"]}/site"

                options =
                    method : 'POST'
                    url : postURL
                    data :
                        'paymentMethodNonce' : paymentMethodNonce

                $.ajax( options ).done ( response )=>
                    if response.success is true
                        newCreditCard = response.new_credit_card
                        newCreditCardModel = new Backbone.Model newCreditCard
                        @creditCardCollection = App.request "get:credit:cards"
                        @creditCardCollection.add(newCreditCardModel)
                        @existingCreditCardsCollection.add(newCreditCardModel)
                        @view.triggerMethod "add:credit:card:success"
                    else
                        @view.triggerMethod "add:credit:card:error", response.msg

            setActiveCard :(currentSubscriptionId, selectedCardToken, currentSubscriptionStatus,currentPaymentmethodToken ) =>
                postURL = "#{SITEURL}/api/ajbilling/setActiveCard/#{currentSubscriptionId}/#{selectedCardToken}"

                options =
                    method : 'POST'
                    url : postURL

                $.ajax( options ).done ( response )=>
                    if response.change_card_success is true
                        @view.triggerMethod "set:active:credit:card:success"
                    else
                        @view.triggerMethod "set:active:credit:card:error", response.msg

        App.commands.setHandler "show:site:credit:cards:app", ( opts ) ->
            new SiteCreditCards.Controller opts