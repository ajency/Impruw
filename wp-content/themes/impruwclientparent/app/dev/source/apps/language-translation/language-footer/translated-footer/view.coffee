define ['app'
        'text!apps//language-translation/language-footer/translated-footer/templates/translatedfooterview.html'], (App, translatedfooterviewTpl)->

    App.module 'LanguageApp.LanguageFooterContent.TranslatedFooter.Views', (Views, App, Backbone, Marionette, $, _)->

        class TranslatedFooterItemView extends Marionette.ItemView

            tagName : 'div'

            className : 'form-group legend-group'

            template : '<div class="col-sm-12">
                            <div class="form-group trans-field">
                                <div class="col-sm-10">
                                    <p class="form-control translated-footer-content {{TypeOfElementClass}}">{{contentText}}</p>
                                    <button class="btn btn-xs trans-action aj-imp-orange-btn"  id="save-translated-footer-element">
                                        {{#polyglot}}Save{{/polyglot}}
                                    </button>
                                </div>
                            </div>
                         </div>'

            mixinTemplateHelpers: (data)->
                data = super data
                editingLanguage = Marionette.getOption @, 'editingLanguage'
                data.contentText = ->
                    if (data.element is "Link")
                        translated_text = data.text[editingLanguage]
                        return translated_text
                    else
                        translated_text = data.content[editingLanguage]
                        return translated_text
                        

                data.TypeOfElementClass = ->
                    if (data.element is "Title") or (data.element is "Link") 
                        return "title"
                    else
                        return "text"
                data

            events:
                "click #save-translated-footer-element" : "updateFooterElement"

            updateFooterElement:(e) ->
                e.preventDefault()
                newElementContent = @$el.find('.translated-footer-content').html()
                @trigger "footer:element:updated", newElementContent

            # initialize the CKEditor for the text element on show
            # used setData instead of showing in template. this works well
            # using template to load content add the html tags in content
            # hold the editor instance as the element property so that
            # we can destroy it on close of element
            onShow: ->
                editingLanguage = Marionette.getOption @, 'editingLanguage'

                if  @model.get('element') is "Title"
                  @$el.find('.translated-footer-content').attr('contenteditable', 'true').attr 'id', _.uniqueId 'title-'
                else
                  @$el.find('.translated-footer-content').attr('contenteditable', 'true').attr 'id', _.uniqueId 'text-'

                @editor = CKEDITOR.inline document.getElementById @$el.find('.translated-footer-content').attr 'id'

                if (@model.get('element') is 'Link')
                    content_text = 'text'
                else
                    content_text = 'content'

                if @model.get(content_text)[editingLanguage] is undefined
                  @editor.setData ""
                else
                  @editor.setData _.stripslashes @model.get(content_text)[editingLanguage]

            # destroy the Ckeditor instance to avoiid memory leaks on close of element
            # this.editor will hold the reference to the editor instance
            # Ckeditor has a destroy method to remove a editor instance
            onClose: ->
                @editor.destroy(true)


        class Views.TranslatedFooterView extends Marionette.CompositeView

            template : translatedfooterviewTpl

            itemView : TranslatedFooterItemView

            itemViewContainer : '#translated-footer-elements'

            serializeData: ()->
                data = super()
                data.translation_language = _.polyglot.t(data.translation_language)
                data

            itemViewOptions : ->
                language = Marionette.getOption @, 'language'
                editingLanguage : language


