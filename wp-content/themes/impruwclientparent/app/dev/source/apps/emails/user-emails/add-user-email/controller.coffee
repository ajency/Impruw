define ['app', 'controllers/base-controller'
        'apps/emails/user-emails/add-user-email/view'], (App, AppController)->
    App.module 'EmailsApp.UserEmails.AddUserEmail', (AddUserEmail, App, Backbone, Marionette, $, _)->
        class AddUserEmail.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                @addUserEmailView = @_getaddUserEmailView()
                
                # @listenTo @userEmailView, "user:email:list", @loadEmailList
               
                #function to load view
                @show @addUserEmailView,
                    loading: true

            _getaddUserEmailView :->
                new AddUserEmail.Views.AddUserEmailView

        App.commands.setHandler "show:add:user:email", (opts) ->
            new AddUserEmail.Controller opts
