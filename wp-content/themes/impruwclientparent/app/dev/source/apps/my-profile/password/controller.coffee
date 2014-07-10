define ['app', 'controllers/base-controller'
        'apps/my-profile/password/views'], (App, AppController)->
    App.module 'MyProfileApp.Password', (Password, App, Backbone, Marionette, $, _)->
        class Password.Controller extends AppController

            initialize: (opts)->
                {model} = opts

                @model = model

                @view = @getPasswordView()

                @listenTo @view, "update:password:clicked", @updatePassword

                @show @view,
                    loading: true


            getPasswordView: ->
                new Password.View.PasswordForm

            updatePassword: (data) =>
                @model.set data
                @model.save null,
                    onlyChanged : true
                    wait: true
                    success : @passwordUpdated

            passwordUpdated: (model , response)=>
                if response.code == "ERROR"
                    @view.triggerMethod "password:error:response", response.msg
                else if response.code == "OK"
                    @view.triggerMethod "password:success:response",response.redirect_url


        App.commands.setHandler "show:password:form", (opts) ->
            new Password.Controller opts


		

			
	