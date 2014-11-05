define ['app'
        'text!apps/my-profile/show/templates/mainview.html'], (App, mainviewTpl)->
    App.module 'MyProfileApp.Show.View', (View, App, Backbone, Marionette, $, _)->
        class View.Layout extends Marionette.Layout

            initialize: ->


                # Main edit profile template
            template: mainviewTpl

            # Layout regions
            regions:
                generalFormRegion: '#user-general-form'
                passwordFormRegion: '#form-userpass'
                languageFormRegion: '#form-lang'


            # set the flatui checkbox radio and bootstrap select ui
            onShow: ->
                @$el.find('input[type="checkbox"]').radiocheck()
                @$el.find('select').selectpicker()

	