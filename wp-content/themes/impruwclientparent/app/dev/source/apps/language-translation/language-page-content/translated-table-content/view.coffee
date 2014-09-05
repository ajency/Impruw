define ['app'], (App)->

    App.module 'LanguageApp.LanguagePageContent.TranslatedTable.Views', (Views, App, Backbone, Marionette, $, _)->

        class Views.TranslatedTableView extends Marionette.ItemView

            tagName : 'div'

            className : 'form-group legend-group'

            template : '<div class="col-sm-12">
                            <div class="form-group trans-field" id="translated-table-elements">
                             
                            </div>
                         </div>'

            onShow :->
                _.each @collection.models, (model,index)=>
                    element = model.get 'element'
                    content = _.stripslashes model.get 'content'
                    save_label = _.polyglot.t 'Save'
                    html = '<div class="col-sm-10">
                                    <div class="form-control translated-element-content '+element+' tabindex="1" id = "translated-table-content">
                                        '+content+'
                                    </div>
                                    <button class="btn btn-xs trans-action aj-imp-orange-btn"  id="btn-save-translated-table">
                                        '+save_label+'
                                    </button>
                                </div>'
                    @$el.find('#translated-table-elements').append html

            events:
                "click #btn-save-translated-table" : "updatePageTable"
                "click table td" : "showEditor"
                "click table th" : "showEditor"

            updatePageTable:(e) ->
                e.preventDefault()
                newElementContent = @$el.find('#translated-table-content').html()
                console.log newElementContent
                # @trigger "page:element:updated", newElementContent

            showEditor :(evt)->
                evt.stopPropagation()
                if @editor
                    @editor.destroy()
                    @$el.find('td div, th div').removeAttr('contenteditable').removeAttr('style').removeAttr 'id'

                    @saveTableMarkup()  
                
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

            destroyEditor :(evt)=>
                evt.stopPropagation()

                if @editor
                    @editor.destroy()
                    @editor = null
                    console.log 'editor destroyed'
                    @$el.find('td div, th div').removeAttr('contenteditable').removeAttr('style').removeAttr 'id'
                    # $(evt.target).closest('div').attr('contenteditable', 'false').removeAttr 'id'
                    @$el.find('table').resizableColumns('destroy')
                    @$el.find('table').resizableColumns()
                    @saveTableMarkup()              

            saveTableMarkup:->
                console.log 'save table'
                @trigger 'save:table',@$el.find('.table-holder')
