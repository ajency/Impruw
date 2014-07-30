define [ 'app'
         'text!apps/billing/payment-page/templates/view.html' ], ( App, viewTpl )->
    App.module 'BillingApp.Payment.View', ( View, App, Backbone, Marionette, $, _ )->
        class View.Layout extends Marionette.Layout

            template : viewTpl

            regions :
                selectedPlanRegion : '#selected-plan'
                activeSubscriptionRegion : '#active-sub-region'


            onShow : ->
                @$el.find( 'input[type="checkbox"]' ).checkbox()
                @$el.find( 'select' ).selectpicker()

            serializeData : ->
                data = super()
                data.THEMEURL = THEMEURL
                data

            events :
                'click #btn-pay' : ->
                    @$el.find( '#pay_loader' ).show()
                    cardNumber = @$el.find( '#card_number' ).val()
                    nameOnCard = @$el.find( '#card_name' ).val()
                    expMonth = @$el.find( '#exp_month' ).val()
                    expYear = @$el.find( '#exp_year' ).val()

                    clientToken = @model.get 'braintree_client_token'
                    client = new braintree.api.Client clientToken : clientToken
                    client.tokenizeCard number : cardNumber, expiration_month : expMonth, expiration_year : expYear, ( err, nonce )=>
                        @trigger "credit:card:payment", nonce

            onPaymentSuccess : ->
                @$el.find( '#billingsave_status' ).empty()
                @$el.find( '#pay_loader' ).hide()
                html = '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">
                        &times;
                        </button>
                        Payment Processed'
                @$el.find( '#billingsave_status' ).append(html)

            onPaymentError : ( errorMsg )->
                @$el.find( '#billingsave_status' ).empty()
                @$el.find( '#pay_loader' ).hide()
                html = "<button type='button' class='close' data-dismiss='alert'
                        aria-hidden='true'>&times;</button>
                        #{errorMsg}"
                @$el.find( '#billingsave_status' ).append(html)



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


