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

            modelEvents : 
                'change:justify' : (model,justify)->
                    @$el.css 'text-align', justify
                    @trigger "title:element:blur", @$el.html()


            initialize:->
                @$el.on 'focus', _.once @setUpCKEditor

            setUpCKEditor : =>
                CKEDITOR.on 'instanceCreated', @configureEditor
                @editor = CKEDITOR.inline document.getElementById @$el.attr 'id'
                html = @$el.html()
                @editor.setData html

                @editor.on 'changedTitleStyle',(evt)=>
                    @model.set 'style', evt.data.style

                @editor.on 'titleStylesInitDone',=>
                    @editor.fire 'initStylesList',
                        style : @model.get 'style'
                        styles : @settingsModel.get 'styles'

                @editor.on 'titleJustifyInitDone',=>
                    @editor.fire 'getCurrentJustify',
                        justify : @model.get 'justify'

                @editor.on 'setCurrentJustify',(evt)=>
                    @model.set 'justify', evt.data.justify
                
                @editor.config.placeholder = 'Click here to enter Title'

            # initialize the CKEditor for the text element on show
            # used setData instead of showing in template. this works well
            # using template to load content add the html tags in content
            # hold the editor instance as the element property so that
            # we can destroy it on close of element
            onShow: ->
                @$el.css 'text-align', @model.get 'justify'
                @settingsModel = Marionette.getOption @,'settingsModel'

                @$el.attr('contenteditable', 'true').attr 'id', _.uniqueId 'title-'
                content = @model.get('content')[WPML_DEFAULT_LANG] ? @model.get('content')
                html = _.stripslashes content
                # if not _.str.include(html, "<h3>")
                #     html = '<h3>'+html+'</h3>'
                @$el.html html ? ''
                

            # destroy the Ckeditor instance to avoiid memory leaks on close of element
            # this.editor will hold the reference to the editor instance
            # Ckeditor has a destroy method to remove a editor instance
            onClose: ->
                if @editor
                    @editor.destroy()

            # set configuration for the Ckeditor
            configureEditor: (event) =>
                editor = event.editor
                element = editor.element
                # Customize the editor configurations on "configLoaded" event,
                # which is fired after the configuration file loading and
                # execution. This makes it possible to change the
                # configurations before the editor initialization takes place.

                if element.getAttribute('id') is @$el.attr 'id'
                    editor.on 'configLoaded', ->

                        
                        editor.config.extraPlugins = 'titlejustify,titlestyles'



                        # editor.config.stylesSet = "#{CURRENTTHEME}_title_styles"
                

                    # Rearrange the layout of the toolbar.
                    # editor.config.toolbar = [
                    #     ['Source','-','Cut','Copy','Paste','PasteText','PasteFromWord'],['Undo','Redo','Find','Replace','-','SelectAll','RemoveFormat'],
                    #     '/',
                    #     ['Bold','Italic','Underline','Strike','-','JustifyLeft','JustifyCenter','JustifyRight'],['Link','Unlink'],
                    #     ['InsertImage']
                    # ]

                    # editor.config.extraPlugins = 'confighelper'
                    # editor.config.extraPlugins = 'justify'
               