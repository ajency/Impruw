define ['app'
        'text!apps//language-translation/language-page-content/translated-page-content/templates/translatedpageview.html'], (App, translatedpageviewTpl)->

    App.module 'LanguageApp.LanguagePageContent.TranslatedPage.Views', (Views, App, Backbone, Marionette, $, _)->

        class TranslatedPageItemView extends Marionette.ItemView

            tagName : 'div'

            className : 'form-group legend-group'

            template : '<div class="col-sm-12">
                            <div class="form-group trans-field">
                                <div class="col-sm-10">
                                    <textarea type="text" class="form-control" id="translated-element-content">{{contentText}}</textarea>
                                    <button class="btn btn-xs trans-action aj-imp-orange-btn"  id="btn-save-translated-element">
                                        Save
                                    </button>
                                </div>
                            </div>
                         </div>'

            mixinTemplateHelpers: (data)->
                data = super data
                editingLanguage = Marionette.getOption @, 'editingLanguage'
                data.contentText = ->
                    translated_text = data.content
                    return translated_text[editingLanguage]
                data

            events:
                "click #btn-save-translated-element" : "updatePageElement"

            updatePageElement:(e) ->
                e.preventDefault()
                newElementContent = @$el.find('#translated-element-content').val()
                @trigger "page:element:updated", newElementContent


        class Views.TranslatedPageView extends Marionette.CompositeView

            template : translatedpageviewTpl

            itemView : TranslatedPageItemView

            itemViewContainer : '#translated-page-elements'

            events:
                "click #btn-save-translated-page-title" : "updatePageTitle"

            itemViewOptions : ->
                language = Marionette.getOption @, 'language'
                editingLanguage : language


            updatePageTitle:(e)->
                e.preventDefault()
                newPageTitle = @$el.find('#translated-page-title').val()
                pageId = @$el.find('#translated-page-id').val()
                @trigger "translated:page:title:updated", newPageTitle, pageId
