define ['app', 'controllers/base-controller'
        'apps/emails/user-emails/edit-user-email/view'], (App, AppController)->
    App.module 'EmailsApp.UserEmails.EditUserEmail', (EditUserEmail, App, Backbone, Marionette, $, _)->
        class EditUserEmail.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->


                @userEmailModel =  opts.model

                @editUserEmailView = @_geteditUserEmailView()
                
                # @listenTo @addUserEmailView, "add:user:email", @addNewUserEmail
               
                #function to load view
                @show @editUserEmailView,
                    loading: true

            _geteditUserEmailView :->
                new EditUserEmail.Views.EditUserEmailView
                    model: @userEmailModel

            # addNewUserEmail :(data)->
            #     console.log "Adding new user email"
            #     userEmail = App.request "create:user:email:model", data
            #     userEmail.save null,
            #         wait: true
            #         success: @userEmailSaved

            # userEmailSaved: (userEmail)=>
            #     userEmailCollection = App.request "get:user:email:collection"
            #     userEmailCollection.add userEmail
            #     @addUserEmailView.triggerMethod "saved:user:email"

        App.commands.setHandler "show:edit:user:email", (opts) ->
            opts =
                region: App.dialogRegion
                model: opts.model
            new EditUserEmail.Controller opts