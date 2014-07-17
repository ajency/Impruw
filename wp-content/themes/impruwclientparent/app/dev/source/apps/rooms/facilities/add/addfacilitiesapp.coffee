define ['app'
        'controllers/base-controller'], (App, AppController)->
    App.module 'FacilitiesApp.Add', (Add, App, Backbone, Marionette, $, _)->
        class AddFacilityController extends AppController

            initialize: (opt)->

                # get the composite view
                @view = @_getAddFacilityView()

                # delete:facility:clicked
                @listenTo @view, "add:new:facility", @addFacility

                # display the view on the region
                @show @view

            # delete:facility:clicked
            addFacility: (data)->
                facility = App.request "create:new:facility:model", data
                facility.save null,
                    wait: true
                    success: @facilityAdded

            facilityAdded: (model)=>
                Marionette.triggerMethod.call @region, "new:facility:added", model
                @view.triggerMethod "facility:added"

            _getAddFacilityView: ()->
                new AddFacilityView


        class AddFacilityView extends Marionette.ItemView

            #tagName : 'form'

            className: 'facility add'

            template: '<form id="facilites-form">
                            <div class="input-group">
                                <input type="text" name="name" data-rule-required="true" class="form-control"
                                 placeholder="{{#polyglot}}Add a Facility{{/polyglot}}"
                                 data-msg-required="Facility name required">
                                <span class="input-group-btn add-facility input-group-addon">
                                    <span class="icon icon-plus"></span>{{#polyglot}}Add{{/polyglot}}
                                </span>
                            </div>
                       </form>'

            events:
                'click .add-facility': ->
                    if @$el.find('#facilites-form').valid()
                        @trigger "add:new:facility", name: @$el.find('input[name="name"]').val()

            onFacilityAdded: ->
                @$el.find('input').val ''


        App.commands.setHandler "show:add:facility", (opts) ->
            new AddFacilityController
                region: opts.region
					





