define ['app'], (App)->

    App.module 'LanguageApp.LanguagePageContent.TranslatedTable.Views', (Views, App, Backbone, Marionette, $, _)->

        class TranslatedTableItemView extends Marionette.ItemView

            tagName : 'div'

            className : 'form-group legend-group'

            template : '<div class="col-sm-12">
                            <div class="form-group trans-field" id="translated-table-elements">
                                <div class="col-sm-10">
                                    <div class="form-control translated-element-content {{element}} tabindex="1" id = "translated-table-content">
                                        {{{content}}}
                                    </div>
                                    <button class="btn btn-xs trans-action aj-imp-orange-btn"  id="btn-save-translated-table">
                                        {{#polyglot}}Save{{/polyglot}}
                                    </button>
                                </div>
                             
                            </div>
                         </div>'

            events:
                "click #btn-save-translated-table" : "updatePageTable"
                "click table td" : "showEditor"
                "click table th" : "showEditor"

            serializeData: ()->
                data = super()
                data.content = _.stripslashes data.content
                data

            updatePageTable:(e) ->
                e.preventDefault()
                newHtmlContent  = $('#translated-table-content').clone()
                $(newHtmlContent).find('td div, th div').removeAllAttr()
                newElementContent =  "#{$(newHtmlContent).html()}"
                console.log newElementContent
                @trigger "page:table:updated", newElementContent

            showEditor :(evt)->
                evt.stopPropagation()
                if @editor
                    @editor.destroy()
                    @$el.find('td div, th div').removeAttr('contenteditable').removeAttr('style').removeAttr 'id'
                
                console.log 'showEditor'
                id = _.uniqueId 'text-'
                $(evt.target).closest('td,th').find('div').attr('contenteditable', 'true').attr 'id', id
                CKEDITOR.on 'instanceCreated', @configureEditor
                @editor = CKEDITOR.inline document.getElementById id
                @editor.config.placeholder = 'Click to enter text.'

            configureEditor : (event) =>
                editor = event.editor
                element = editor.element

                if element.getAttribute('id') is @$el.attr 'id'
                    editor.on 'configLoaded', ->
                        editor.config.placeholder = 'Enter Data'

            destroyEditor :->
                if @editor
                    @editor.destroy()
                    @editor = null
                    console.log 'editor destroyed'
                    @$el.find('td div, th div').removeAttr('contenteditable').removeAttr('style').removeAttr 'id'
                    @$el.find('table').resizableColumns('destroy')
                    @$el.find('table').resizableColumns()

        
        class Views.TranslatedTableView extends Marionette.CompositeView

            template : '<div id="translatable-page-table"></div>'

            itemView : TranslatedTableItemView

            itemViewContainer : '#translatable-page-table'

            itemViewOptions : ->
                language = Marionette.getOption @, 'language'
                editingLanguage : language

