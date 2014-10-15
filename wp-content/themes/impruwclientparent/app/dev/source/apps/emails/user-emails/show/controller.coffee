define ['app', 'controllers/base-controller'
        'apps/emails/user-emails/show/view'], (App, AppController)->
    App.module 'EmailsApp.UserEmails', (UserEmails, App, Backbone, Marionette, $, _)->
        class UserEmails.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->

                #get email collection
                @userEmailCollection = App.request "get:user:email:collection" 

                console.log @userEmailCollection

                @userEmailView = @_getuserEmailView()

                @listenTo @userEmailView, "add:new:user:email", @addNewUserEmail
               
                #function to load view
                @show @userEmailView,
                    loading: true

            _getuserEmailView :->
                new UserEmails.Views.UserEmailView
                    collection: @userEmailCollection

            addNewUserEmail : ->
                Marionette.triggerMethod.call @region, "show:add:user:email"

        App.commands.setHandler "show:user:emails:app", (opts) ->
            new UserEmails.Controller opts
