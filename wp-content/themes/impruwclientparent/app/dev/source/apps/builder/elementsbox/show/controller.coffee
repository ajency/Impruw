define ['app', 'controllers/base-controller'
        'apps/builder/elementsbox/show/views'], (App, AppController)->
    App.module 'ElementsBoxApp.Show', (Show, App, Backbone, Marionette, $, _)->

        # show actual view
        class Show.Controller extends AppController

            initialize: (opt = {})->
                @elements = App.request "get:elementbox:elements"

                view = @getView @elements

                @listenTo App.vent,"change:page:check:single:room",()->
                    new Show.Controller
                            region: App.elementsBoxRegion

                @show view,
                    loading: true

            isSingleRoomPage: ->
                pageName = App.request "get:current:editable:page:name"
                pageName is 'Single Room'

            getView :(elements)->
                #check if page is single room
                @singleroom = @isSingleRoomPage()
                new Show.Views.MainView
                    collection: elements
                    singleroom : @singleroom

        # show error
        class Show.ErrorController extends AppController

            initialize: (opt = {})->
                view = new Show.Views.ErrorView

                @show view
	