define ['app', 'controllers/base-controller'
        'apps/emails/user-emails/edit-user-email/view'], (App, AppController)->
    App.module 'EmailsApp.UserEmails.EditUserEmail', (EditUserEmail, App, Backbone, Marionette, $, _)->
        class EditUserEmail.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                {model} = opts

                @userEmailModel =  model

                @editUserEmailView = @_geteditUserEmailView()
                
                @listenTo @editUserEmailView, "edit:user:email", @editUserEmail
               
                #function to load view
                @show @editUserEmailView,
                    loading: true

            _geteditUserEmailView :->
                new EditUserEmail.Views.EditUserEmailView
                    model: @userEmailModel

            editUserEmail :(data)->
                # console.log "Editing new user email"

                email_id = data.email_id
                new_password = data.password
                name = data.firstName+' '+data.lastName
                # console.log name
                @userEmailModel.set 'firstName', data.firstName
                @userEmailModel.set 'lastName', data.firstName
                @userEmailModel.set 'name', name
                
                # console.log data.email_id
                
                postURL = SITEURL+'/api/email/'+email_id

                # console.log postURL

                options =
                    method : 'POST'
                    url : postURL
                    data :
                        'password' : new_password
                        'firstName' : data.firstName
                        'lastName' : data.lastName

                $.ajax( options ).done ( response )=>
                    if response.code is 'OK'
                        @userEmailModel.set 'name': response.data.name
                        successMsg = "Email account details updated"
                        @editUserEmailView.triggerMethod "saved:user:email",successMsg
                    else
                        @editUserEmailView.triggerMethod "saved:user:email",response.msg

        App.commands.setHandler "show:edit:user:email", (opts) ->
            opts =
                region: App.dialogRegion
                model: opts.model
            new EditUserEmail.Controller opts