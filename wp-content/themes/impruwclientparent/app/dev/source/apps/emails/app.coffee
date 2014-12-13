define ['app', 
        'apps/emails/show/controller'
        'apps/emails/email-nav/controller'
        'apps/emails/user-emails/show/controller'
        ], (App)->

    App.module 'EmailsApp', (EmailsApp, App, Backbone, Marionette, $, _)->

        #@startWithParent = false
        class EmailsApp.Router extends Marionette.AppRouter

            appRoutes:
                'emails': 'show'

        #public API
        API =
            show: ()->
                new EmailsApp.Show.Controller
                        region : App.rightRegion


        EmailsApp.on 'start': ->
            new EmailsApp.Router
                        controller: API