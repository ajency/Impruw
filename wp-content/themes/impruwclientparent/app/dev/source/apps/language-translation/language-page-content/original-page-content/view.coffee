define ['app'
        'text!apps//language-translation/language-page-content/original-page-content/templates/originalpageview.html'], (App, originalpageviewTpl)->

    App.module 'LanguageApp.LanguagePageContent.OriginalPage.Views', (Views, App, Backbone, Marionette, $, _)->

        class OriginalPageItemView extends Marionette.ItemView

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
                    originalContent = ''
                    if (data.element is "Link")
                        originalContent = data.text[WPML_DEFAULT_LANG]
                    else
                        originalContent = data.content[WPML_DEFAULT_LANG]
                        
                    _.stripslashes originalContent

                data.element_in_language = ->
                    element_in_language = _.polyglot.t(data.element)
                    return element_in_language
                data


        class Views.OriginalPageView extends Marionette.CompositeView

            template : originalpageviewTpl

            childView : OriginalPageItemView

            itemViewContainer : '#translatable-page-elements'

            serializeData: ()->
                data = super()
                data.language = _.polyglot.t(data.language)
                data.SITEURL = window.SITEURL
                data

