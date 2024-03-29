define ['app'
        'controllers/base-controller'
        'apps/rooms/facilities/add/addfacilitiesapp'
        'apps/rooms/facilities/list/facilitieslistapp'], (App, AppController)->
    App.module 'FacilitiesApp', (FacilitiesApp, App, Backbone, Marionette, $, _)->
        class FacilitiesApp.FacilitiesController extends AppController

            initialize: (opt)->
                {facilities} = opt

                # get the composite view
                @layout = @_getFacilitiesViewLayout()

                @listenTo @layout, "show", =>
                    App.execute "show:facilities:list",
                        region: @layout.facilitiesRegion
                        facilities: facilities

                    App.execute "show:add:facility",
                        region: @layout.addFacilityRegion

                @listenTo @layout.addFacilityRegion, "new:facility:added", (model)=>
                    Marionette.triggerMethod.call @layout.facilitiesRegion, "new:facility:added", model


                # display the view on the region
                @show @layout


            _getFacilitiesViewLayout: ->
                new FacilitiesViewLayout

        class FacilitiesViewLayout extends Marionette.Layout

            template: '<h4 class="aj-imp-sub-head scroll-ref">
            									{{#polyglot}}Facilities{{/polyglot}}
            								 	<small>{{#polyglot}}List the facilities available in this room.{{/polyglot}}</small>
            								 </h4>
            								 <div class="form-group">
            									<div class="col-sm-12">
            										<div id="facilities-list-region"></div>
            										<div id="add-facility-region"></div>
            									</div>
            								</div>'

            regions:
                facilitiesRegion: '#facilities-list-region'
                addFacilityRegion: '#add-facility-region'


        App.commands.setHandler "show:facilities", (opts) ->
            new FacilitiesApp.FacilitiesController opts
					





