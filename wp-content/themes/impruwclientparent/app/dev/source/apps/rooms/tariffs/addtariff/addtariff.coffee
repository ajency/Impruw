define ['app', 'controllers/base-controller',
        'text!apps/rooms/tariffs/addtariff/templates/addtariff.html'], ( App, AppController, addTariffTpl )->
   App.module "RoomsApp.RoomsTariff.Add", ( Add, App )->
      class AddTariffController extends AppController

         initialize : ( opt )->

            if not opt.model
               tariff = App.request "get:tariff", opt.tariffId
            else
               tariff = opt.model

            #get the currency
            sitemodel = App.request "get:site:model"
            
            App.execute "when:fetched", sitemodel, =>
               currentCurrency = sitemodel.get 'currency'
               console.log sitemodel

               @tariffView = tariffView = @_getAddTariffView tariff, currentCurrency

               @listenTo tariffView, "add:tariff", ( data )=>
                  tariff.set data
                  tariff.save null,
                     wait : true
                     success : @tariffSaved

               @show tariffView,
                  loading : true

         tariffSaved : ( tariffModel )=>
            tariffs = App.request "get:current:tariffs:collection"
            tariffs.add tariffModel
            @tariffView.triggerMethod "saved:tariff"

         # get the packages view
         _getAddTariffView : ( tariff, currentCurrency )->
            new AddTariffView
               currency : currentCurrency

      # Edti tariff view
      class AddTariffView extends Marionette.ItemView

         tagName : 'form'

         className : 'form-horizontal'

         template : addTariffTpl

         mixinTemplateHelpers : (data)->
            data = super data
            data.currency = Marionette.getOption @, "currency"
            data

         dialogOptions :
            modal_title : _.polyglot.t 'Add Tariff'
            modal_size : 'medium-modal'

         events :
            'click .update-tariff' : ->
               if @$el.valid()
                  data = Backbone.Syphon.serialize @
                  @trigger "add:tariff", data

         onSavedTariff : ->
            @$el.parent().find( '.alert' ).remove()
            @$el.parent().prepend "<div class=\"alert alert-success\">" + _.polyglot.t( "Tariff added succesfully for the plan" ) + "</div>"
         # show checkbox
         onShow : ->
            @$el.find( 'input[type="checkbox"]' ).radiocheck()
            # @$el.find( '.currency' ).text Marionette.getOption @, "currency"
            #validate the form with rules
            @$el.validate()


      # handler
      App.commands.setHandler "show:add:tariff", ( opt )->
         opts =
            region : App.dialogRegion
            model : opt.model

         new AddTariffController opts