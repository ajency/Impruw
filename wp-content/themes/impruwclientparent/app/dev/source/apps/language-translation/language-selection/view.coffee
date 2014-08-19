define ['app'
        'text!apps/language-translation/language-selection/templates/languageselectionview.html'], (App, languageselectionviewTpl)->
    App.module 'LanguageApp.LanguageSelection.Views', (Views, App, Backbone, Marionette, $, _)->
        class LanguageItemView extends Marionette.ItemView

            tagName: "li"

            template: '<div class="form-group">
                                                <label for="checkbox2" class="checkbox {{#isDefaultLanguage}}disabled checked{{/isDefaultLanguage}} ">
                                                    <input type="checkbox" data-toggle="checkbox" {{#selectStatus}}checked{{/selectStatus}} value="{{code}}" {{#isDefaultLanguage}}disabled{{/isDefaultLanguage}}>{{languageName}}
                                                </label>
                                            </div> '

            events:
                "change input[type='checkbox']": "saveLanguage"

            serializeData: ->
                data = super()
                data.languageName = _.polyglot.t data.languageName
                data

            mixinTemplateHelpers:(data)->
                data = super data

                if (data.code is 'en') or (data.code is WPML_DEFAULT_LANG)
                    data.isDefaultLanguage = true
                else
                    data.isDefaultLanguage = false
                data


            onShow: ->
                @$el.find('input[type="checkbox"]').checkbox()


            saveLanguage: (evt)->
                @trigger "language:updated", $(evt.target)

        class Views.LanguageSelectionView extends Marionette.CompositeView

            template: languageselectionviewTpl

            itemView: LanguageItemView

            itemViewContainer: '.languages.clearfix'

            events:
                'click #btn_update-enabled-languages': 'setEnabledLanguages'
                "click div.js-enabled-languages ul.selectpicker li": "loadLanguagePageNav"


            onShow: ->
                @selectedLang = selectedLang = App.request "get:selected:languages"

                @loadLanguageDropdown()

                @viewEnabledLanguages()

            serializeData: ->
                data = super()
                data.default_language = _.polyglot.t data.default_language
                data

            setEnabledLanguages: (e)->
                e.preventDefault()

                arr = @$el.find("ul.languages input[type='checkbox']")
                selectedlanguage = new Array()
                jQuery.each arr, ->
                    selectedlanguage.push @value  if @checked
                    return

                selectedlanguage = selectedlanguage.join(",")

                @trigger 'update:enabled:languages', selectedlanguage

            loadLanguagePageNav: (e)->

                #hide the page content div when the editing lanhuage is changed
                $('.aj-imp-widget-content').hide()

                #get the selectedIndex from the li element
                selectedIndex = $(e.currentTarget).attr('rel')

                #The the option's value based on the selectedIndex
                selectedLangVal = $('select#select_editing_language option:eq(' + selectedIndex + ')').attr('value')

                @trigger 'load:language:page:nav', selectedLangVal  unless selectedLangVal is ""


            onSelectedLanguagesEnabled: (collection)->
                htmlString = ""

                $('select.js-enabled-languages').empty()
                $("select.js-enabled-languages").append("<option value = ''>" + _.polyglot.t('Select a Language') + "</option>")
                collection.each (m) ->
                    languageCode = m.get("code")
                    languageName = _.polyglot.t(m.get("languageName"))

                    unless languageCode is WPML_DEFAULT_LANG
                        $("select.js-enabled-languages").append("<option value = " + languageCode + ">" + languageName + "</option>")
                    
                    htmlString += '<div class="single-language"> <span class="icon icon-checkmark"></span> ' + languageName + ' </div>'
                    return
                @$el.find(".selected-languages").html(htmlString)
                @$el.find('select').selectpicker('refresh')


                @$el.find('.alert').remove()
                @$el.prepend('<div class="alert alert-success">' + _.polyglot.t("Available languages updated") + '</div>')
            # @$el.find('.alert').fadeOut 5000

            viewEnabledLanguages: ->
                htmlString = ""
                @selectedLang.each (m) ->
                    languageCode = m.get("code")
                    languageName = _.polyglot.t(m.get("languageName"))
                    htmlString += '<div class="single-language"> <span class="icon icon-checkmark"></span> ' + languageName + ' </div>'
                @$el.find(".selected-languages").html(htmlString)

            loadLanguageDropdown: ->
                $("select.js-enabled-languages").append("<option value = ''>" + _.polyglot.t('Select a Language') + "</option>")
                @selectedLang.each (m) ->
                    languageCode = m.get("code")
                    languageName = _.polyglot.t(m.get("languageName"))

                    unless languageCode is WPML_DEFAULT_LANG
                        $("select.js-enabled-languages").append("<option value = " + languageCode + ">" + languageName + "</option>")
                    
                    return

                @$el.find('select').selectpicker()
                            
                              



                            
                                
                                
                  
                    
