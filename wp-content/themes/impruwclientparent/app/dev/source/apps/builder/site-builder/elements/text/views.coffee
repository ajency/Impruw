define ['app'], (App)->

    # Row views
    App.module 'SiteBuilderApp.Element.Text.Views', (Views, App, Backbone, Marionette, $, _)->

        # Menu item view
        class Views.TextView extends Marionette.ItemView

            tagName: 'div'

            template: ''

            className: 'text'

            # avoid and anchor tag click events
            # listen to blur event for the text element so that we can save the new edited markup
            # to server. The element will triggger a text:element:blur event on blur and pass the
            # current markupup as argument
            events:
                'click a': (e)->
                    e.preventDefault()
                'blur': ->
                    # console.log 'blur'
                    @trigger "text:element:blur", @$el.html()


            # initialize the CKEditor for the text element on show
            # used setData instead of showing in template. this works well
            # using template to load content add the html tags in content
            # hold the editor instance as the element property so that
            # we can destroy it on close of element
            onShow: ->
                @$el.attr('contenteditable', 'true').attr 'id', _.uniqueId 'text-'
                @editor = CKEDITOR.inline document.getElementById @$el.attr 'id'
                content = @model.get('content')[WPML_DEFAULT_LANG] ? @model.get('content')
                @editor.setData _.stripslashes content ? ''
                @editor.config.placeholder = 'Click here to enter your text...'

            # destroy the Ckeditor instance to avoiid memory leaks on close of element
            # this.editor will hold the reference to the editor instance
            # Ckeditor has a destroy method to remove a editor instance
            onClose: ->
                @editor.destroy()