define ['app'
        'text!apps/language-translation/language-site-details/original-address-content/templates/originaladdressview.html'], (App, originaladdressviewTpl)->

            App.module 'LanguageApp.LanguageSiteContent.OriginalAddress.Views', (Views, App, Backbone, Marionette, $, _)->

                class Views.OriginalAddressItemView extends Marionette.ItemView

                    template : originaladdressviewTpl

                    serializeData: ()->
                        data = super()
                        data.default_language = _.polyglot.t(data.default_language)
                        data