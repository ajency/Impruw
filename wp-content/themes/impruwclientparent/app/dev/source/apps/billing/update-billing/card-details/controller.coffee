define [ 'app', 'controllers/base-controller'
         'text!apps/billing/update-billing/templates/cardView.html' ], ( App, AppController,viewTpl )->
    App.module 'BillingApp.CardDetails', ( CardDetails, App, Backbone, Marionette, $, _ )->

        class CardDetails.Controller extends AppController

            initialize : ( opts )->

                brainTreeCustomerId =  opts.customerId

                creditCardModel = App.request "get:card:info", brainTreeCustomerId

                App.execute "when:fetched",creditCardModel,=>

                    cardExists =  creditCardModel.get 'card_exists'

                    if cardExists is true
                        @view = @getCardView creditCardModel


                    @show @view


            getCardView :(creditCardModel) ->
                new CardView
                    model : creditCardModel

        class CardView extends Marionette.ItemView

            template: '
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

                        </div>
                        <a href="javascript:void(0)" id="forget-card">Forget Card</a>'

            onShow :->
                @$el.find('select').selectpicker()


        App.commands.setHandler "show:card", ( opts ) ->
            new CardDetails.Controller opts