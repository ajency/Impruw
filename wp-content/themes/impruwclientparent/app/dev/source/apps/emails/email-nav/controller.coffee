define ['app', 'controllers/base-controller'
        'apps/emails/email-nav/view'], (App, AppController)->
    App.module 'EmailsApp.EmailNav', (EmailNav, App, Backbone, Marionette, $, _)->
        class EmailNav.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                @emailNavView = @_getEmailNavView()

                @listenTo @emailNavView, "user:email:list", @loadEmailList
               
                #function to load view
                @show @emailNavView,
                    loading: true

            _getEmailNavView :->
                new EmailNav.Views.EmailNavView

            loadEmailList : ->
                Marionette.triggerMethod.call @region, "load:user:email:list"

        App.commands.setHandler "show:emails:nav:app", (opts) ->
            new EmailNav.Controller opts

