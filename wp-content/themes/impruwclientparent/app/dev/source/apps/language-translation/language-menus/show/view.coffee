define ['app'
        'text!apps/language-translation/language-menus/show/templates/languagepagemenuview.html'], (App, pagemenuviewTpl)->

            App.module 'LanguageApp.LanguageMenuContent.Views', (Views, App, Backbone, Marionette, $, _)->


                class Views.LanguageMenuContentLayout extends Marionette.Layout

                    template : pagemenuviewTpl

                    className : 'tab-content'

                    regions:
                        originalMenuContent: ".original-page-menu-content",
                        translatedMenuContent: ".translated-page-menu-content"