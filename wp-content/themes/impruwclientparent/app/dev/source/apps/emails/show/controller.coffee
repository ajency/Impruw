define ['app', 'controllers/base-controller'
        'apps/emails/show/view'], (App, AppController)->
    
        App.module 'EmailsApp.Show', (Show, App, Backbone, Marionette, $, _)->
            
            class Show.Controller extends AppController
    
                initialize: (options)->

                    @emailView = @_getEmailView()

                    App.vent.trigger "set:active:menu", 'emails'

                    @show @emailView,
                        loading : true

                _getEmailView :->
                    new Show.Views.EmailView

    
    
