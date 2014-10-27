define [ 'app', 'controllers/base-controller',
         'text!apps/rooms/tariffs/edittariff/templates/edittariff.html'], ( App, AppController, editTariffTpl )->
    App.module "RoomsApp.RoomsTariff.Edit", ( Edit, App )->
        class EditTariffController extends AppController

            initialize : ( opt )->
                if not opt.model
                    tariff = App.request "get:tariff", opt.tariffId
                else
                    tariff = opt.model

                #get the currency
                sitemodel = App.request "get:site:model"
                currentCurrency = sitemodel.get 'currency'

                @tariffView = tariffView = @_getEditTariffView tariff, currentCurrency

                @listenTo tariffView, "update:tariff:details", ( data )=>
                    tariff.set data
                    tariff.save null,
                        wait : true
                        success : @tariffSaved

                @listenTo tariffView, "delete:tariff", ( model ) =>
                    model.destroy
                        allData : false
                        wait : true
                        success : @tariffDeleted


                @show tariffView,
                    loading : true

            tariffSaved : =>
                @tariffView.triggerMethod "saved:tariff"

            tariffDeleted : =>
                @tariffView.triggerMethod "deleted:tariff"

            # get the packages view
            _getEditTariffView : ( tariff, currentCurrency )->
                new EditTariffView
                    model : tariff
                    currency : currentCurrency

        # Edti tariff view
        class EditTariffView extends Marionette.ItemView

            tagName : 'form'

            className : 'form-horizontal'

            template : editTariffTpl

            dialogOptions :
                modal_title : _.polyglot.t 'Edit Tariff'
                modal_size : 'medium-modal'

            events :
                'click .update-tariff' : ->
                    if @$el.valid()
                        data = Backbone.Syphon.serialize @
                        @trigger "update:tariff:details", data

                'click .delete-tariff-btn' : ( e ) ->
                    e.preventDefault()
                    if confirm _.polyglot.t 'Confirm tarrif delete'

                        @trigger "delete:tariff", @model

            onSavedTariff : ->
                @$el.find('.alert').remove()
                @$el.parent().prepend "<div class=\"alert alert-success\">" + _.polyglot.t( "Tariff updated successfully" ) + "</div>"

            onDeletedTariff : ->
                @trigger "dialog:close"

            # show checkbox
            onShow : ->
                @$el.find( 'input[type="checkbox"]' ).radiocheck()
                @$el.find('.currency' ).text Marionette.getOption @, 'currency'
                #validate the form with rules
                @$el.validate()

        # handler
        App.commands.setHandler "show:edit:tariff", ( opt )->
            opts =
                region : App.dialogRegion
                model : opt.model

            new EditTariffController opts