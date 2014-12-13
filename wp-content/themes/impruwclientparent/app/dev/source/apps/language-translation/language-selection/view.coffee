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
                @$el.find('input[type="checkbox"]').radiocheck()


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

                'click .cancel-hide-more-langs': (e)->
                    e.preventDefault()

                "click div.js-enabled-languages ul.selectpicker li": "loadLanguagePageNav"
                "click #btn_update-hidden-languages": "hideLanguage"


            onShow: ->
                
                @selectedLang = selectedLang = App.request "get:selected:languages"

                @loadLanguageDropdown()

                @viewEnabledLanguages()

                @viewHiddenLanguageList()

                @$el.find('input[type="checkbox"]').radiocheck()

            serializeData: ->
                data = super()
                data.default_language = _.polyglot.t data.default_language
                data

            viewHiddenLanguageList:->
                html =''

                @selectedLang.each (m) ->
                    languageCode = m.get("code")
                    languageName = _.polyglot.t(m.get("languageName"))
                    isLanguageDefault = m.get("isDefaultLanguage")
                    isLanguageHidden =  m.get("isHidden")


                    if isLanguageHidden
                        checkedStatus = 'checked'
                    else
                        checkedStatus = ''

                    if (languageCode is WPML_DEFAULT_LANG) or (languageCode is 'en')
                        disabledStatus = 'disabled'
                        hideClass = 'hide'
                    else
                       disabledStatus = '' 
                       hideClass = ''

                    html += '<li><div class="form-group '+hideClass+'">
                            <label for="checkbox2" class="checkbox">
                                <input type="checkbox" data-toggle="checkbox" value="'+languageCode+'" '+checkedStatus+' '+disabledStatus+'>'+languageName+'
                            </label>
                        </div></li>'

                @$el.find("#hide-langs").html(html)

            hideLanguage:(e) ->
                e.preventDefault()

                arr = @$el.find("ul#hide-langs input[type='checkbox']")
                hiddenlanguages = new Array()
                jQuery.each arr, ->
                    hiddenlanguages.push @value  if @checked
                    return
                @trigger 'update:hidden:language', hiddenlanguages

            onHiddenLanguages: (msg, hiddenlanguages)->
                len = hiddenlanguages.length
                currentlanguages = new Array()
                $("div.single-language").each ->
                        divLangCode = $(this).attr("data-language-code")
                        currentlanguages.push divLangCode
                # console.log currentlanguages

                if len is 0
                    $("div.single-language").each ->
                        divLangCode = $(this).attr("data-language-code")
                        single_language_element = '#language-'+divLangCode+' span'
                        $(single_language_element).removeClass()
                        $(single_language_element).addClass('icon')
                        $(single_language_element).addClass('icon-checkmark')

                else
                    i = 0
                    while i < currentlanguages.length
                        currenLang = currentlanguages[i]
                        single_language_element = '#language-'+currenLang+' span' 
                        isLangHidden = $.inArray currenLang, hiddenlanguages
                        # console.log isLangHidden
                        if isLangHidden isnt -1
                            # console.log 'found in hidden so show'
                            $(single_language_element).removeClass()
                            $(single_language_element).addClass('icon')
                            $(single_language_element).addClass('icon-cancel')
                        else
                            # console.log 'not found so hidden'
                            $(single_language_element).removeClass()
                            $(single_language_element).addClass('icon')
                            $(single_language_element).addClass('icon-checkmark')

                        i++

                @$el.find('.error-msg span').remove()
                @$el.find('.error-msg').append('<span class="help-block alert alert-success">'+(msg)+'</span>')
                @$el.find('.error-msg span').fadeOut 5000


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
                htmlforHiddenLangView = ""

                $('select.js-enabled-languages').empty()
                $("select.js-enabled-languages").append("<option value = ''>" + _.polyglot.t('Select a Language') + "</option>")
                collection.each (m) ->
                    languageCode = m.get("code")
                    islanguageHidden = m.get("isHidden")
                    languageName = _.polyglot.t(m.get("languageName"))
                    isLanguageDefault = m.get("isDefaultLanguage")

                    unless languageCode is WPML_DEFAULT_LANG
                        $("select.js-enabled-languages").append("<option value = " + languageCode + ">" + languageName + "</option>")

                    if islanguageHidden
                        # console.log "ishidden"
                        spanClass = 'icon-cancel'
                        checkedStatus = 'checked'
                    else    
                        spanClass = 'icon-checkmark'
                        checkedStatus = ''

                    if (languageCode is WPML_DEFAULT_LANG) or (languageCode is 'en')
                        disabledStatus = 'disabled'
                        hideClass = 'hide'
                    else
                        disabledStatus = ''
                        hideClass = '' 

                    htmlforHiddenLangView += '<li><div class="form-group '+hideClass+'">
                            <label for="checkbox2" class="checkbox">
                                <input type="checkbox" data-toggle="checkbox" value="'+languageCode+'" '+checkedStatus+' '+disabledStatus+'>'+languageName+'
                            </label>
                        </div></li>'
                    
                    htmlString += '<div class="single-language" id="language-'+languageCode+'" data-language-code="'+languageCode+'"> <span class="icon '+spanClass+'"></span> ' + languageName + ' </div>'
                    return

                @$el.find(".selected-languages").html(htmlString)
                @$el.find('select').selectpicker('refresh')

                @$el.find("#hide-langs").html(htmlforHiddenLangView)
                @$el.find('input[type="checkbox"]').radiocheck()


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

            
            loadLanguageDropdown: ->
                $("select.js-enabled-languages").append("<option value = ''>" + _.polyglot.t('Select a Language') + "</option>")
                @selectedLang.each (m) ->
                    languageCode = m.get("code")
                    languageName = _.polyglot.t(m.get("languageName"))

                    unless languageCode is WPML_DEFAULT_LANG
                        $("select.js-enabled-languages").append("<option value = " + languageCode + ">" + languageName + "</option>")
                    
                    return

                @$el.find('select').selectpicker()
                            
                              



                            
                                
                                
                  
                    
