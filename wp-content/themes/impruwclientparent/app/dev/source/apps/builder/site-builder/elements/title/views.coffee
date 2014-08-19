define ['app'], (App)->

    # Row views
    App.module 'SiteBuilderApp.Element.Title.Views', (Views, App, Backbone, Marionette, $, _)->

        # Menu item view
        class Views.TitleView extends Marionette.ItemView

            tagName: 'h3'

            template: ''

            className: 'title'

            # avoid and anchor tag click events
            # listen to blur event for the text element so that we can save the new edited markup
            # to server. The element will triggger a title:element:blur event on blur and pass the
            # current markupup as argument
            events:
                'click a': (e)->
                    e.preventDefault()
                'blur': ->
                    @trigger "title:element:blur", @$el.html()


            # initialize the CKEditor for the text element on show
            # used setData instead of showing in template. this works well
            # using template to load content add the html tags in content
            # hold the editor instance as the element property so that
            # we can destroy it on close of element
            onShow: ->
                @$el.attr('contenteditable', 'true').attr 'id', _.uniqueId 'title-'

                # CKEDITOR.on 'instanceCreated', @configureEditor
                @editor = CKEDITOR.inline document.getElementById @$el.attr 'id'
                content = @model.get('content')[WPML_DEFAULT_LANG] ? @model.get('content')
                @editor.setData _.stripslashes content ? ''
                @editor.config.placeholder = 'Click here to enter Title'


            # destroy the Ckeditor instance to avoiid memory leaks on close of element
            # this.editor will hold the reference to the editor instance
            # Ckeditor has a destroy method to remove a editor instance
            onClose: ->
                @editor.destroy()

            # set configuration for the Ckeditor
            configureEditor: (event) =>
                editor = event.editor
                element = editor.element
                # Customize the editor configurations on "configLoaded" event,
                # which is fired after the configuration file loading and
                # execution. This makes it possible to change the
                # configurations before the editor initialization takes place.
                editor.on "configLoaded", ->

                    # Rearrange the layout of the toolbar.
                    # editor.config.toolbar = [
                    #     ['Source','-','Cut','Copy','Paste','PasteText','PasteFromWord'],['Undo','Redo','Find','Replace','-','SelectAll','RemoveFormat'],
                    #     '/',
                    #     ['Bold','Italic','Underline','Strike','-','JustifyLeft','JustifyCenter','JustifyRight'],['Link','Unlink'],
                    #     ['InsertImage']
                    # ]

                    editor.config.extraPlugins = 'confighelper'
                    editor.config.extraPlugins = 'justify'
