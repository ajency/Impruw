define ['app', 'controllers/base-controller'
        'apps/emails/user-emails/add-user-email/view'], (App, AppController)->
    App.module 'EmailsApp.UserEmails.AddUserEmail', (AddUserEmail, App, Backbone, Marionette, $, _)->
        class AddUserEmail.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                @addUserEmailView = @_getaddUserEmailView()
                
                @listenTo @addUserEmailView, "add:user:email", @addNewUserEmail
               
                #function to load view
                @show @addUserEmailView,
                    loading: true

            _getaddUserEmailView :->
                new AddUserEmail.Views.AddUserEmailView

            addNewUserEmail :(data)->
                console.log "Adding new user email"
                userEmail = App.request "create:user:email:model", data
                userEmail.save null,
                    wait: true
                    success: @userEmailSaved

            # userEmailSaved: (userEmail)=>
            #     userEmailCollection = App.request "get:user:email:collection"
            #     userEmailCollection.add userEmail
            #     @planView.triggerMethod "saved:user:email"

        App.commands.setHandler "show:add:user:email", (opts) ->
            new AddUserEmail.Controller opts
