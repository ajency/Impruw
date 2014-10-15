define ['app', 'controllers/base-controller'
        'apps/emails/user-emails/show/view'], (App, AppController)->
    App.module 'EmailsApp.UserEmails', (UserEmails, App, Backbone, Marionette, $, _)->
        class UserEmails.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                console.log "Initialize view"

                #get email collection
                @userEmailCollection = App.request "get:user:email:collection" 

                console.log @userEmailCollection


                @userEmailView = @_getuserEmailView()

                @listenTo @userEmailView, "add:new:user:email", @addNewUserEmail
                @listenTo @userEmailView, "itemview:disable:user:email", @disableUserEmail
                @listenTo @userEmailView, "itemview:delete:user:email", @deleteUserEmail
               
                #function to load view
                @show @userEmailView,
                    loading: true

            _getuserEmailView :->
                new UserEmails.Views.UserEmailView
                    collection: @userEmailCollection

            addNewUserEmail : ->
                Marionette.triggerMethod.call @region, "show:add:user:email"

            disableUserEmail :(view,email_id) ->
                console.log email_id
                
                postURL = SITEURL+'/api/email/'+email_id

                console.log postURL

                options =
                    method : 'PUT'
                    url : postURL

                $.ajax( options ).done ( response )=>
                    console.log "Suspend email success"
                    console.log @userEmailView
                    @userEmailView.triggerMethod "suspend:email"

            deleteUserEmail :(view,email_id) ->
                @userEmailCollection.remove view.model

        App.commands.setHandler "show:user:emails:app", (opts) ->
            new UserEmails.Controller opts
