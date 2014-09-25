define [ 'app' ], (App)->

    # Row views
    App.module 'SiteBuilderApp.Element.LanguageSwitcher.Views', (Views, App, Backbone, Marionette, $, _)->
        class LanguageSwitcherItemView extends Marionette.ItemView

            template: '{{^isDefaultLanguage}}
                        <li class="icl-{{code}} {{hideClass}}">
                            <a href="#">
                                <img class="iclflag" src="{{pluginUri}}/sitepress-multilingual-cms/res/flags/{{code}}.png" alt="{{code}}" title="{{languageName}}">
                                &nbsp;{{languageName}}
                            </a>
                        </li>
                        {{/isDefaultLanguage}}'

            mixinTemplateHelpers: (data)->
                data.pluginUri = ->
                    pluginUri = PLUGIN_URI
                    return pluginUri
                data.hideClass = ->
                    if data.isHidden
                        hideClass = 'hide'
                    else
                        hideClass = ''
                    return hideClass
                data


        class Views.LanguageSwitcherView extends Marionette.CompositeView

            className : 'lang-sel'

            template: '{{#placeholder}}
                        <div id="lang_sel">
                            <ul>
                                <li>
                                    <a href="#" class="lang_sel_sel icl-{{defaultLanguageCode}}">
                                        <img class="iclflag" src="{{pluginUri}}/sitepress-multilingual-cms/res/flags/{{defaultLanguageCode}}.png" alt="{{defaultLanguageCode}}" title="{{defaultLanguageName}}">&nbsp;{{defaultLanguageName}}
                                    </a>
                                    <ul id="language-selector-lang">

                                    </ul>

                                </li>
                            </ul>
                        </div>
                       {{/placeholder}}'

            itemView: LanguageSwitcherItemView

            itemViewContainer: '#language-selector-lang'

            onRender: ()->
                # get the className from options
                style = Marionette.getOption @, 'style'
                className = _.slugify style
                @$el.addClass className

            onShow:()->
                if ACTIVE_LANGUAGE_COUNT is 1
                    @$el.find('div#lang_sel').addClass('hide')
                else
                    @$el.find('div#lang_sel').removeClass('hide')

            mixinTemplateHelpers: (data)->
                data = super data
                data.placeholder = true
                data.defaultLanguageCode = ->
                    defaultLanguageCode = WPML_DEFAULT_LANG
                    return defaultLanguageCode
                data.defaultLanguageName = ->
                    defaultLanguageName = WPML_DEFAULT_LANGUAGE_NAME
                    return defaultLanguageName
                data.pluginUri = ->
                    pluginUri = PLUGIN_URI
                    return pluginUri
                data
