define ['app', 'text!apps/my-profile/language/templates/languageView.html'], (App, langformTpl)->
    App.module 'MyProfileApp.Language.View', (View, App, Backbone, Marionette, $, _)->

        # Password form
        class View.LanguageForm extends Marionette.ItemView

            tagName: 'form'

            template: langformTpl

            className: 'form-horizontal clearfix '

            onShow: ->
                defaultLanguage = @model.get 'user_lang'
                @$el.find( "#user_language option[value='#{defaultLanguage}']" ).attr 'selected' : 'selected'
                @$el.find( '#user_language' ).selectpicker()

            events:
                'click #btn_update_language' : ->
                    langName = @$el.find( '#user_language' ).val()
                    data =
                        'user_lang' : langName
                    @trigger "update:user:lang:click", data

            onUserLangUpdated: ->
                @$el.find('.alert').remove()
                @$el.prepend('<div class="alert alert-success">'+_.polyglot.t("User language updated")+'</div>')

							
