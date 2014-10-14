define ['app', 'controllers/base-controller'
        'apps/emails/show/view'
        'apps/emails/user-emails/add-user-email/controller'], (App, AppController)->
    
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
                    @listenTo @emailLayout.emailsDisplay, "show:add:user:email", @_showAddUserEmail

                _getEmailLayout :->
                    new Show.Views.EmailView

                _loadUserEmails:=>
                    App.execute "show:user:emails:app",
                        region: @emailLayout.emailsDisplay

                _showAddUserEmail:=>
                    console.log "Add user"
                    App.execute "show:add:user:email",
                        region : App.dialogRegion







    
    
