define ['app', 'controllers/base-controller'
        'apps/emails/user-emails/view'], (App, AppController)->
    App.module 'EmailsApp.UserEmails', (UserEmails, App, Backbone, Marionette, $, _)->
        class UserEmails.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                @userEmailView = @_getuserEmailView()

                # @listenTo @userEmailView, "user:email:list", @loadEmailList
               
                #function to load view
                @show @userEmailView,
                    loading: true

            _getuserEmailView :->
                new UserEmails.Views.UserEmailView

            loadEmailList : ->
                Marionette.triggerMethod.call @region, "load:user:email:list"

        App.commands.setHandler "show:emails:nav:app", (opts) ->
            new UserEmails.Controller opts
