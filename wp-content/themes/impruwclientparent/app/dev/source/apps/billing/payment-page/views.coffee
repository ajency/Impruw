define ['app'
        'text!apps/billing/payment-page/templates/view.html'], (App, viewTpl)->

    App.module 'BillingApp.Payment.View', (View, App, Backbone, Marionette, $, _)->

        class View.Layout extends Marionette.Layout

            template: viewTpl

            regions :
                selectedPlanRegion : '#selected-plan'

            # set the flatui checkbox radio and bootstrap select ui
            onShow: ->
                @$el.find('input[type="checkbox"]').checkbox()
                @$el.find('select').selectpicker()


            events :
                'click #btn-pay':->
                    clientToken = @model.get 'braintree_client_token'
                    client = new braintree.api.Client clientToken: clientToken
                    client.tokenizeCard number: "4111111111111111", expirationDate: "10/20" , (err, nonce)=>
                        @trigger "credit:card:payment", nonce




        class View.SelectedPlanView extends Marionette.ItemView

            template : '<div class="panel-heading">
                                <h3>{{plan_name}}</h3>
                            </div>
                            <div class="panel-body">
                                <h3 class="panel-title price">${{price}}</h3>
                            </div>
                            <ul class="list-group">
                                <li class="list-group-item">{{description}}</li>

                                <li class="list-group-item"><span class="ribbon">Chosen Plan</span></li>
                            </ul>'

            className : 'panel panel-default text-center active'


