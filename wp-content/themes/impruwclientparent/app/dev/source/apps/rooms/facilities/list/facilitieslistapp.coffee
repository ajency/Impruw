define ['app'
        'controllers/base-controller'
        'apps/rooms/facilities/list/views'], (App, AppController)->
    App.module 'FacilitiesApp.List', (List, App, Backbone, Marionette, $, _)->
        class FacilityListController extends AppController

            initialize: (opt)->
                {facilities} = opt

                # get the facilities collection
                @collection = collection = App.request "get:all:facilities"

                @cview = cview = @_getFacilitiesView collection, facilities

                # delete:facility:clicked
                @listenTo cview, "itemview:delete:facility:clicked", @deleteFacility

                # update facility : clicked
                @listenTo cview, "itemview:update:facility:clicked", @updateFacility

                # new facility
                @listenTo @region, "new:facility:added", (model)->
                    @collection.add model

                # new:facility:clicked
                @listenTo cview, "add:new:facility", @addFacility

                # display the view on the region
                @show cview,
                    loading: true

            # delete:facility:clicked
            deleteFacility: (iv, model)->
                model.destroy
                    allData: false
                    wait: true

            # update facility: clicked
            updateFacility: (iv, data) =>
                iv.model.set data
                iv.model.save null,
                    wait: true
                    success: @updateView

            updateView: (model)=>
                @cview.triggerMethod "update:view", model



            _getFacilitiesView: (collection, facilities)->
                new List.Views.FacilitiesView
                    collection: collection
                    prefacilities: facilities




        class AddFacilityView extends Marionette.ItemView

            tagName: 'form'

            className: 'facility add'

            template: '<input type="text" name="name" class="form-control input-sm ">
            								<span class="input-group-btn add-facility">{{#polyglot}}Add{{/polyglot}}</span>'

            events:
                'click .add-facility': ->
                    if @$el.valid()
                        @trigger "add:new:facility", Backbone.Syphon.serialize @

            onFacilityAdded: ->
                @$el.find('input').val ''


        App.commands.setHandler "show:facilities:list", (opts) ->
            new FacilityListController opts
					





