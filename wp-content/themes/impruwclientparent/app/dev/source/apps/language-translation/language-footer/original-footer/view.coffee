define ['app'
        'text!apps//language-translation/language-footer/original-footer/templates/originalfooterview.html'], (App, originalfooterviewTpl)->

    App.module 'LanguageApp.LanguageFooterContent.OriginalFooter.Views', (Views, App, Backbone, Marionette, $, _)->

        class OriginalFooterItemView extends Marionette.ItemView

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


        class Views.OriginalFooterView extends Marionette.CompositeView

            template : originalfooterviewTpl

            itemView : OriginalFooterItemView

            itemViewContainer : '#translatable-footer-elements'

            mixinTemplateHelpers: (data)->
                data = super data 
                data.language = ->
                    return WPML_DEFAULT_LANGUAGE_NAME  
                data
