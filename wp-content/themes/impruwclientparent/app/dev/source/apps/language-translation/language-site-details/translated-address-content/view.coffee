define ['app'
        'text!apps/language-translation/language-site-details/translated-address-content/templates/translatedaddressview.html'], (App, translatedaddressviewTpl)->

            App.module 'LanguageApp.LanguageSiteContent.TranslatedAddress.Views', (Views, App, Backbone, Marionette, $, _)->

                class Views.TranslatedAddressItemView extends Marionette.ItemView

                    template : translatedaddressviewTpl

                    serializeData: ()->
                        data = super()
                        data.translation_language = _.polyglot.t(data.translation_language)
                        data

                    events:
                        "click #btn-update-translated-siteprofile" : "updateSiteTranslation"

                    updateSiteTranslation: (e) ->
                        e.preventDefault()
                        siteTranslation = []
                        @$el.find("input").each ->
                            siteTranslation.push
                              translated_option: $(this).val()
                              translation_of_option: $(this).attr("data-siteoption")
                            return

                        @trigger 'update:translated:siteprofile', siteTranslation


                    onSiteprofileUpdated :() ->
                      @$el.find('.alert').remove()
                      @$el.append('<div class="alert alert-success">'+_.polyglot.t('Address translation updated successfully')+'</div>')
                      @$el.find('.alert').fadeOut 5000 