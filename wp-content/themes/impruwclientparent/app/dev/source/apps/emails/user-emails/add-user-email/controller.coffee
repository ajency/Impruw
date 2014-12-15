define ['app', 'controllers/base-controller'
        'apps/emails/user-emails/add-user-email/view'], (App, AppController)->
    App.module 'EmailsApp.UserEmails.AddUserEmail', (AddUserEmail, App, Backbone, Marionette, $, _)->
        class AddUserEmail.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->

                #get site model
                @siteModel =  App.request "get:site:model"
                # console.log @siteModel

                @addUserEmailView = @_getaddUserEmailView()
                
                @listenTo @addUserEmailView, "add:user:email", @addNewUserEmail
               
                #function to load view
                @show @addUserEmailView,
                    loading: true

            _getaddUserEmailView :->
                new AddUserEmail.Views.AddUserEmailView
                    model: @siteModel

            addNewUserEmail :(data)->
                # console.log "Adding new user email"
                userEmail = App.request "create:user:email:model", data
                userEmail.save null,
                    wait: true
                    success: @userEmailSaved

            userEmailSaved: (userEmail, response)=>
                # console.log "user email added"
                # console.log response
                @userEmailCollection = App.request "get:user:email:collection"
                @userEmailCollection.add userEmail
                siteid = SITEID['id']
                if response.code is 'OK'
                    update_feature_count = App.request "update:site:feature:count",siteid,'email_account','plus'
                    @addUserEmailView.triggerMethod "saved:user:email", response

        App.commands.setHandler "show:add:user:email", (opts) ->
            new AddUserEmail.Controller opts
