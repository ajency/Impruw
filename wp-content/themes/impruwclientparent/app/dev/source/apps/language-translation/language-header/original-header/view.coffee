define ['app'
        'text!apps//language-translation/language-header/original-header/templates/originalheaderview.html'], (App, originalheaderviewTpl)->

    App.module 'LanguageApp.LanguageHeaderContent.OriginalHeader.Views', (Views, App, Backbone, Marionette, $, _)->

        class OriginalHeaderItemView extends Marionette.ItemView

            tagName : 'div'

            className : 'form-group legend-group'

            template : '<div class="col-sm-12">
                            <div class="form-group">
                                <label class="col-sm-3 control-label" for="">{{element_in_language}}</label>
                                <div class="col-sm-9 col-sm-offset-3">
                                    <p class="original {{TypeOfElementClass}}" tabindex="1">
                                        {{{originalContent}}}
                                    </p>
                                </div>
                            </div>
                        </div>'

            mixinTemplateHelpers: (data)->
                data = super data
                data.TypeOfElementClass = ->
                    if (data.element is "Title") or (data.element is "Link") 
                        return "title"
                    else
                        return "text"

                data.originalContent = ->
                    if (data.element is "Link")
                        originalContent = data.text[WPML_DEFAULT_LANG]
                        return originalContent
                    else
                        originalContent = data.content[WPML_DEFAULT_LANG]
                        return originalContent
                data.element_in_language = ->
                    element_in_language = _.polyglot.t(data.element)
                    return element_in_language
                data


        class Views.OriginalHeaderView extends Marionette.CompositeView

            template : originalheaderviewTpl

            itemView : OriginalHeaderItemView

            itemViewContainer : '#translatable-header-elements'

            mixinTemplateHelpers: (data)->
                data = super data 
                data.language = ->
                    return WPML_DEFAULT_LANGUAGE_NAME  
                data
