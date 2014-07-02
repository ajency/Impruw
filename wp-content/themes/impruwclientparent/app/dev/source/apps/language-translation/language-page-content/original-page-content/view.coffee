define ['app'
        'text!apps//language-translation/language-page-content/original-page-content/templates/originalpageview.html'], (App, originalpageviewTpl)->

    App.module 'LanguageApp.LanguagePageContent.OriginalPage.Views', (Views, App, Backbone, Marionette, $, _)->

        class Views.OriginalPageItemView extends Marionette.ItemView

            template : originalpageviewTpl