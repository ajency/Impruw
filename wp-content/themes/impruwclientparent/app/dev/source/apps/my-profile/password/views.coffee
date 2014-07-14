define [ 'app', 'text!apps/my-profile/password/templates/passwordform.html' ], ( App, passwordformTpl )->
    App.module 'MyProfileApp.Password.View', ( View, App, Backbone, Marionette, $, _ )->

        # Password form
        class View.PasswordForm extends Marionette.ItemView

            tagName : 'form'

            template : passwordformTpl

            className : 'form-horizontal password-form'

            events :
                'click #btn-update-password' : ( e )->
                    if @$el.valid()
                        data = Backbone.Syphon.serialize @
                        @trigger "update:password:clicked", data

            onShow : ->
                @$el.validate
                    rules :
                        newPassword : "required"
                        confirmNewPassword :
                            equalTo : "#newPassword"


            onPasswordAjaxResponse : ( response )=>
                if response == '0'
                    @passwordErrorResponse()
                else
                    @passwordSuccessResponse()

            onPasswordErrorResponse : ( errorMsg )->
                @$el.find( '.alert' ).remove()
                errorMsg = _.polyglot.t errorMsg
                @$el.prepend( "<div class='alert alert-success'>#{errorMsg}</div>" )

            onPasswordSuccessResponse : ( redirectUrl ) ->
                successMsg = _.polyglot.t("Password change success")
                @$el.find( '.alert' ).remove()
                @$el.prepend( "<div class='alert alert-success'>#{successMsg}</div>" )
                _.delay =>
                    @redirectPage redirectUrl
                ,40

            redirectPage : ( redirectUrl ) ->
                window.location.href = redirectUrl
