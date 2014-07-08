define [ 'app'
         'text!apps/room-summary/currency/templates/currencyForm.html' ], ( App, currencyformTpl )->
    App.module 'RoomSummaryApp.Currency.View', ( View, App, Backbone, Marionette, $, _ )->

        # Genral form
        class View.CurrencyForm extends Marionette.ItemView

            tagName : 'form'

            template : currencyformTpl

            className : 'form-horizontal clearfix'

            onShow : ->
                currentCurrency =  @model.get 'currency'

                #highlight the selected currency
                @$el.find( "#user_currency option[value = '#{currentCurrency}']").attr 'selected','selected'

                # set the selectpicker
                @$el.find( '#user_currency' ).selectpicker()


            events :
                'click #btn_update_currency' :->
                    updatedCurrency =
                        'currency' : @$el.find( '#user_currency' ).val()

                    @trigger "update:currency:clicked" , updatedCurrency

            onCurrencyUpdated : ->
                @$el.find( '.alert' ).remove()
                @$el.prepend( '<div class="alert alert-success alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + _.polyglot.t( 'Currency updated' ) + '</div>' )


