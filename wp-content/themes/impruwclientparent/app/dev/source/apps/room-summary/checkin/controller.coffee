define ['app', 'controllers/base-controller'
        'apps/room-summary/checkin/views'], (App, AppController)->
    App.module 'RoomSummaryApp.Checkin', (Checkin, App, Backbone, Marionette, $, _)->
        class Checkin.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                @sitemodel = sitemodel = opts.model

                @view = @getCheckinFormView sitemodel

                @listenTo @view, "update:checkin:time:click", @updateCheckinTime

                @show @view,
                    loading: true


            getCheckinFormView: (model) ->
                new Checkin.View.CheckinForm
                    model: model

            updateCheckinTime: (data)=>
                @sitemodel.set data
                @sitemodel.save null,
                    wait: true
                    onlyChanged: true
                    success: @checkinTimeUpdated

            checkinTimeUpdated: =>
                @view.triggerMethod "checkin:time:updated"


        App.commands.setHandler "show:checkin:time:form", (opts) ->
            new Checkin.Controller opts

			