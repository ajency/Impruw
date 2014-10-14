define ['app', 'controllers/base-controller'
        'apps/emails/show/view'], (App, AppController)->
    
        App.module 'EmailsApp.Show', (Show, App, Backbone, Marionette, $, _)->
            
            class Show.Controller extends AppController
    
                initialize: (options)->

                    @emailLayout = @_getEmailLayout()

                    App.vent.trigger "set:active:menu", 'emails'

                    @show @emailLayout,
                        loading : true

                    @listenTo @emailLayout, 'show', =>
                        App.execute 'show:emails:nav:app',
                            region: @emailLayout.emailsNav

                    @listenTo @emailLayout.emailsNav, "load:user:email:list", @_loadUserEmails

                _getEmailLayout :->
                    new Show.Views.EmailView

                _loadUserEmails:=>
                    App.execute "show:user:emails:app",
                        region: @emailLayout.emailsDisplay







    
    
