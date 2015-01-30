define ['app', 'controllers/base-controller'
        'apps/emails/user-emails/show/view'], (App, AppController)->
    App.module 'EmailsApp.UserEmails', (UserEmails, App, Backbone, Marionette, $, _)->
        class UserEmails.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                #get email collection
                @userEmailCollection = App.request "get:user:email:collection" 

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
                postURL = SITEURL+'/api/email/'+email_id
                userModel = view.model

                options =
                    method : 'PUT'
                    url : postURL

                $.ajax( options ).done ( response )=>
                    if response.code is 'OK'
                        userModel.set 'has_password': response.data.has_password
                    else
                        @userEmailView.triggerMethod "suspend:email", response.msg

            deleteUserEmail :(view,email_id) ->
                postURL = SITEURL+'/api/email/'+email_id

                options =
                    method : 'DELETE'
                    url : postURL

                $.ajax( options ).done ( response )=>
                    if response.code is 'OK'
                        @userEmailCollection.remove view.model
                        siteid = SITEID['id']
                        update_feature_count = App.request "update:site:feature:count",siteid,'email_account','minus'
                    else
                        @userEmailView.triggerMethod "delete:email", response.msg

        App.commands.setHandler "show:user:emails:app", (opts) ->
            new UserEmails.Controller opts
