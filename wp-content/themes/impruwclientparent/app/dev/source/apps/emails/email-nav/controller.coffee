define ['app', 'controllers/base-controller'
        'apps/emails/email-nav/view'], (App, AppController)->
    App.module 'EmailsApp.EmailNav', (EmailNav, App, Backbone, Marionette, $, _)->
        class EmailNav.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                @registered_domain_name = DOMAIN_NAME.search( 'impruw.com' )

                @emailNavView = @_getEmailNavView()

                @listenTo @emailNavView, "user:email:list", @loadEmailList
               
                #function to load view
                @show @emailNavView,
                    loading: true

            _getEmailNavView :->
                # if email feature is disabled or if domain name not registered then do not allow adding of email accounts
                if (@registered_domain_name is -1) and (IS_EMAIL_ALLOWED is 1) and (PLAN_FEATURE_COUNT['email_account'][0]['allowed_count']>0)
                    new EmailNav.Views.EmailNavView
                else
                    new EmailNav.Views.EmailDisabledView

            loadEmailList : ->
                Marionette.triggerMethod.call @region, "load:user:email:list"

        App.commands.setHandler "show:emails:nav:app", (opts) ->
            new EmailNav.Controller opts

