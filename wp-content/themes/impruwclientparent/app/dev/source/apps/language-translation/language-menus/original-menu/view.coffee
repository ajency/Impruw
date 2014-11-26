define ['app'
        'text!apps//language-translation/language-menus/original-menu/templates/originalmenuview.html'], (App, originalmenuviewTpl)->

    App.module 'LanguageApp.LanguageMenuContent.OriginalMenu.Views', (Views, App, Backbone, Marionette, $, _)->

        class OriginalMenuItemView extends Marionette.ItemView

            tagName : 'div'

            className : 'form-group legend-group'

            template : '<div class="col-sm-12">
                            <div class="form-group">
                                <label class="col-sm-3 control-label" for="">{{element_in_language}}</label>
                                <div class="col-sm-9 col-sm-offset-3">
                                    <div class="original {{TypeOfElementClass}}" tabindex="1">
                                        {{{originalContent}}}
                                    </div>
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


        class Views.OriginalMenuView extends Marionette.CompositeView

            template : originalmenuviewTpl

            itemView : OriginalMenuItemView

            itemViewContainer : '#translatable-menu-elements'

            mixinTemplateHelpers: (data)->
                data = super data 
                data.language = ->
                    return WPML_DEFAULT_LANGUAGE_NAME  
                data
