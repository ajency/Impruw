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

            # initialize the CKEditor for the text element on show
            # used setData instead of showing in template. this works well
            # using template to load content add the html tags in content
            # hold the editor instance as the element property so that
            # we can destroy it on close of element
            onShow: ->
                @editor = CKEDITOR.inline document.getElementById 'translated-element-content'
                @editor.setData _.stripslashes @model.get('content')[WPML_DEFAULT_LANG]

            # destroy the Ckeditor instance to avoiid memory leaks on close of element
            # this.editor will hold the reference to the editor instance
            # Ckeditor has a destroy method to remove a editor instance
            onClose: ->
                @editor.destroy()


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
