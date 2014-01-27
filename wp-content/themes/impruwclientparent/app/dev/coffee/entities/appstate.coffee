define ["app", 'backbone'], (App, Backbone) ->

        App.module "Entities.AppState", (AppState, App, Backbone, Marionette, $, _)->

            class AppState extends Backbone.Model

                #Appstate defaults
                defaults:
                    userId      : 0
                    accessToken : _.unique 'access-token'
                    loginStatus : null

                #check if app is in logged in state or not
                isLoggedIn : ()->

                    return true if @get 'loginstatus' is true

                    false


            appState = new AppState APPSTATE

            appState.on "loginStatus:change", App.command.execute "app:loginstatus:changed"

            API =
                getAppState: ->
                    appState

            App.reqres.setHandler "get:current:appstate", ->
                API.getAppState()

            App.reqres.setHandler "get:current:token", ->
                appState.get "accessToken"

            App.reqres.setHandler "get:current:loginstatus", ->
                appState.get "loginStatus"

            App.reqres.setHandler "get:current:userid", ->
                appState.get "userId"