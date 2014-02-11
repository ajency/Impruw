define ["app", 'backbone'], (App, Backbone) ->

        # App state entity
        App.module "Entities.AppState", (AppState, App, Backbone, Marionette, $, _)->

            # class AppState to maintain the app state. 
            class AppState extends Backbone.Model

                #Appstate defaults
                defaults:
                    userId      : 0
                    accessToken : _.unique 'access-token'
                    loginStatus : true

                #check if app is in logged in state or not
                isLoggedIn : ()->
                    
                    @get 'loginStatus'
                    
            APPSTATE = {} ? APPSTATE

            appState = new AppState APPSTATE

            appState.on "change:loginStatus", ->
                App.commands.execute "app:loginstatus:changed", appState.toJSON()

            # API start
            API =
                getAppState: ->
                    appState

            # ge the current app status
            App.reqres.setHandler "get:current:appstate", ->
                API.getAppState()

            # get app access token
            App.reqres.setHandler "get:current:token", ->
                appState.get "accessToken"

            # get current login status
            App.reqres.setHandler "get:current:loginstatus", ->
                appState.get "loginStatus"

            # get the user id if the logged in user
            App.reqres.setHandler "get:current:userid", ->
                appState.get "userId"