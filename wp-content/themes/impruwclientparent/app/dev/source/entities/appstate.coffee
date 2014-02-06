define ["app", 'backbone'], (App, Backbone) ->

        App.module "Entities.AppState", (AppState, App, Backbone, Marionette, $, _)->

            class AppState extends Backbone.Model

                #Appstate defaults
                defaults:
                    userId      : 0
                    accessToken : _.unique 'access-token'
                    loginStatus : true

                #check if app is in logged in state or not
                isLoggedIn : ()->
                    
                    @get 'loginStatus'
                    
            APPSTATE = {} unless APPSTATE

            appState = new AppState APPSTATE

            appState.on "change:loginStatus", ->
                App.commands.execute "app:loginstatus:changed", appState.toJSON()

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