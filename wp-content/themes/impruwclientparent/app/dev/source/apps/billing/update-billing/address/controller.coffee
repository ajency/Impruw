define [ 'app', 'controllers/base-controller'
         'text!apps/billing/update-billing/templates/addressView.html' ], ( App, AppController, viewTpl )->
    App.module 'BillingApp.BillingAddress', ( BillingAddress, App, Backbone, Marionette, $, _ )->
        class BillingAddress.Controller extends AppController

            initialize : ( opts )->
                brainTreeCustomerId = opts.customerId

                @billingAddressModel = App.request "get:billing:address", brainTreeCustomerId

                @view = @getAddressView @billingAddressModel

                @listenTo @view, "add:address", @addAddress
                @listenTo @view, "update:address", @updateAddress

                @show @view,
                    loading : true


            getAddressView : ( billingAddressModel ) ->
                new BillingAddressView
                    model : billingAddressModel

            addAddress : ( addressData )=>
                @billingAddressModel.set addressData
                @billingAddressModel.save null,
                    wait : true
                    success : @addressAdded

            updateAddress : ( addressData )=>
                @billingAddressModel.set addressData
                @billingAddressModel.save null,
                    wait : true
                    success : @addressUpdated

            addressAdded : ( addressModel, response )=>
                if response.code == "OK"
                    @view.triggerMethod "address:added"
                else
                    @view.triggerMethod "address:not:added", response.msg

            addressUpdated : ( addressModel, response )=>
                if response.code == "OK"
                    @view.triggerMethod "address:updated"
                else
                    @view.triggerMethod "address:not:updated", response.msg


        class BillingAddressView extends Marionette.ItemView

            template : viewTpl

            onShow : ->
                addressExists = @model.get 'address_exists'
                if addressExists is false
                    @$el.find( '.btn-add' ).show()
                    @$el.find( '.btn-update' ).hide()
                else
                    @$el.find( '.btn-add' ).hide()
                    @$el.find( '.btn-update' ).show()

                @$el.find( 'select' ).selectpicker()

            events :
                'click .btn-add' : ( e )->
                    e.preventDefault()
                    @$el.find('#pay_loader' ).show()
                    addressData = Backbone.Syphon.serialize @
                    @trigger "add:address", addressData

                'click .btn-update': ( e )->
                    e.preventDefault()
                    @$el.find('#pay_loader' ).show()
                    addressUpdateData = Backbone.Syphon.serialize @
                    @trigger "update:address", addressUpdateData


            onAddresssAdded : ->
                @$el.find( '#msg' ).empty()
                @$el.find( '#display-msg' ).show()
                @$el.find( '#pay_loader' ).hide()
                @$el.find( '#msg' ).text _.polyglot.t('Address added successfully')
                @$el.find( '.btn-add' ).hide()
                @$el.find( '.btn-update' ).show()

            onAddresssUpdated : ->
                @$el.find( '#msg' ).empty()
                @$el.find( '#display-msg' ).show()
                @$el.find( '#pay_loader' ).hide()
                @$el.find( '#msg' ).text _.polyglot.t('Address updated successfully')
                @$el.find( '.btn-add' ).hide()
                @$el.find( '.btn-update' ).show()

            onAddresssNotAdded : ( errorMsg )->
                @$el.find( '#msg' ).empty()
                @$el.find( '#display-msg' ).show()
                @$el.find( '#pay_loader' ).hide()
                @$el.find( '#msg' ).text errorMsg

            onAddresssNotUpdated : ( errorMsg )->
                @$el.find( '#msg' ).empty()
                @$el.find( '#display-msg' ).show()
                @$el.find( '#pay_loader' ).hide()
                @$el.find( '#msg' ).text errorMsg

            serializeData : ->
                data = super()
                data.THEMEURL = THEMEURL
                data

        App.commands.setHandler "show:address", ( opts ) ->
            new BillingAddress.Controller opts