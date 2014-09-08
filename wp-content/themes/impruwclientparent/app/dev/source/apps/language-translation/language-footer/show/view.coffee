define ['app'
        'text!apps/language-translation/language-footer/show/templates/languagepagefooterview.html'], (App, pagefooterviewTpl)->

            App.module 'LanguageApp.LanguageFooterContent.Views', (Views, App, Backbone, Marionette, $, _)->


                class Views.LanguageFooterContentLayout extends Marionette.Layout

                    template : pagefooterviewTpl

                    className : 'tab-content'

                    regions:
                        originalFooterContent: ".original-page-footer-content",
                        translatedFooterContent: ".translated-page-footer-content"