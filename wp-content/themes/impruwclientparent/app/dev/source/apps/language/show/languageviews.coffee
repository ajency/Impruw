define ['app'
        'text!apps/language/show/templates/languageview.html'], (App, languageviewTpl)->

            App.module 'LanguageApp.Show.Views', (Views, App, Backbone, Marionette, $, _)->


                class Views.LanguageView extends Marionette.ItemView

                    template : languageviewTpl
