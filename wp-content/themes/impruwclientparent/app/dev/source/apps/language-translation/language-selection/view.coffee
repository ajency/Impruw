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
                'click .cancel-more-langs': (e)->
                    e.preventDefault()

                "click div.js-enabled-languages ul.selectpicker li": "loadLanguagePageNav"
                "mouseover div.single-language": ->
                     @$el.find("div.single-language span").css('cursor','pointer')
                "click div.single-language": "hideLanguages"


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
                    islanguageHidden = m.get("isHidden")
                    languageName = _.polyglot.t(m.get("languageName"))

                    unless languageCode is WPML_DEFAULT_LANG
                        $("select.js-enabled-languages").append("<option value = " + languageCode + ">" + languageName + "</option>")

                    if islanguageHidden
                        console.log "ishidden"
                        spanClass = 'icon-cancel'
                    else    
                        spanClass = 'icon-checkmark'
                    
                    htmlString += '<div class="single-language" id="language-'+languageCode+'" data-language-code="'+languageCode+'"> <span class="icon '+spanClass+'"></span> ' + languageName + ' </div>'
                    return
                @$el.find(".selected-languages").html(htmlString)
                @$el.find('select').selectpicker('refresh')


                @$el.find('.alert').remove()
                @$el.prepend('<div class="alert alert-success">' + _.polyglot.t("Available languages updated") + '</div>')
                @$el.find('.alert').fadeOut 5000

            viewEnabledLanguages: ->
                htmlString = ""
                @selectedLang.each (m) ->
                    languageCode = m.get("code")
                    islanguageHidden = m.get("isHidden")
                    languageName = _.polyglot.t(m.get("languageName"))

                    if islanguageHidden
                        spanClass = 'icon-cancel'
                    else    
                        spanClass = 'icon-checkmark'
                         
                    htmlString += '<div class="single-language" id="language-'+languageCode+'" data-language-code="'+languageCode+'"> <span class="icon '+spanClass+'"></span>' + languageName + ' </div>'
                @$el.find(".selected-languages").html(htmlString)

            hideLanguages:(e)->
                language_code = $(e.currentTarget).attr("data-language-code")
                single_language_element = '#language-'+language_code+' span'

                if language_code is WPML_DEFAULT_LANG and @$el.find(single_language_element).hasClass('icon-checkmark')
                    @$el.find('.error-msg span').remove()
                    @$el.find('.error-msg').append('<span class="help-block alert alert-error">'+_.polyglot.t("Cannot hide default language from live site")+'</span>')
                    @$el.find('.error-msg span').fadeOut 5000

                else if language_code is 'en' and @$el.find(single_language_element).hasClass('icon-checkmark')
                    @$el.find('.error-msg span').remove()
                    @$el.find('.error-msg').append('<span class="help-block alert alert-error">'+_.polyglot.t("Cannot hide English language from live site")+'</span>')
                    @$el.find('.error-msg span').fadeOut 5000
                
                else        
                    # if not hidden
                    if @$el.find(single_language_element).hasClass('icon-checkmark')
                        @$el.find(single_language_element).removeClass('icon-checkmark')
                        showHideClass =  'icon-cancel'
                        hideLanguageValue = 1
                        @model.set 'isHidden', true
                    else if @$el.find(single_language_element).hasClass('icon-cancel')
                        @$el.find(single_language_element).removeClass('icon-cancel')
                        showHideClass =  'icon-checkmark'
                        hideLanguageValue = 0 
                        @model.set 'isHidden', false               

                    @trigger 'update:hidden:languages', language_code , hideLanguageValue

                    @$el.find(single_language_element).addClass(showHideClass)

            onHiddenLanguages: (msg)->
                @$el.find('.error-msg span').remove()
                @$el.find('.error-msg').append('<span class="help-block alert alert-success">'+(msg)+'</span>')
                @$el.find('.error-msg span').fadeOut 5000

            loadLanguageDropdown: ->
                $("select.js-enabled-languages").append("<option value = ''>" + _.polyglot.t('Select a Language') + "</option>")
                @selectedLang.each (m) ->
                    languageCode = m.get("code")
                    languageName = _.polyglot.t(m.get("languageName"))

                    unless languageCode is WPML_DEFAULT_LANG
                        $("select.js-enabled-languages").append("<option value = " + languageCode + ">" + languageName + "</option>")
                    
                    return

                @$el.find('select').selectpicker()
                            
                              



                            
                                
                                
                  
                    
