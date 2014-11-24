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

                App.execute "when:fetched", sitemodel, =>

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

            tariffSaved : (model)=>
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

            mixinTemplateHelpers : (data)->
                data = super data
                data.currency = Marionette.getOption @, "currency"
                data

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

            initialize : ->
                weekday = @model.get 'weekday'
                if not weekday.enable?
                    weekday.enable = true
                    @model.set 'weekday', weekday

                weekend = @model.get 'weekend'
                if not weekend.enable?
                    weekend.enable = true
                    @model.set 'weekend', weekend

            onSavedTariff : ->
                @$el.find('.alert').remove()
                @$el.parent().prepend "<div class=\"alert alert-success\">" + _.polyglot.t( "Tariff updated successfully" ) + "</div>"

            onDeletedTariff : ->
                @trigger "dialog:close"

            # show checkbox
            onShow : ->
                @$el.find( 'input[type="checkbox"]' ).radiocheck()

                weekday = @model.get 'weekday'
                if not weekday.enable?
                    weekday.enable = true
                    @model.set 'weekday', weekday
                if _.toBoolean weekday.enable
                    @$el.find( 'input[type="checkbox"][name="weekday[enable]"]' ).radiocheck('check')


                weekend = @model.get 'weekend'
                if not weekend.enable?
                    weekend.enable = true
                    @model.set 'weekend', weekend
                if _.toBoolean weekend.enable
                    @$el.find( 'input[type="checkbox"][name="weekend[enable]"]' ).radiocheck('check')

                # @$el.find('.currency' ).text Marionette.getOption @, 'currency'
                #validate the form with rules
                @$el.validate()

        # handler
        App.commands.setHandler "show:edit:tariff", ( opt )->
            opts =
                region : App.dialogRegion
                model : opt.model

            new EditTariffController opts