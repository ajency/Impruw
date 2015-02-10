define ['app'], (App)->

    App.module 'LanguageApp.LanguagePageContent.TranslatedListTable.Views', (Views, App, Backbone, Marionette, $, _)->

        class TranslatedListTableItemView extends Marionette.ItemView

            className : 'smart-cell'

            template : '<div class="form-group legend-group">
                            <div class="col-sm-12"> 
                                <div class="form-group">  
                                    <div class="col-sm-10"> 
                                        <input type="text" class="form-control translated-element-content title translated-listtable-data" value="{{data}}" name="{{dataInputName}}">
                                    </div> 
                                </div> 
                            </div>
                        </div>'

            events:
                'click a': (e)->
                    e.preventDefault()


            serializeData: ()->
                data = super()
                data.data = _.stripslashes(data.data)
                data


            mixinTemplateHelpers: (data)->
                data = super data
                editingLanguage = Marionette.getOption @, 'editingLanguage'
                listtableIndex =  Marionette.getOption @, 'listtableIndex'
                data.dataInputName = ->
                    dataInputName = editingLanguage+"["+listtableIndex+"][data]"
                    dataInputName.toString()
                    return dataInputName
                data
               

        class TranslatedListTableView extends Marionette.CompositeView

            tagName : 'form'
            template : '<h6 class="aj-imp-sub-head-thin"><small>&nbsp;</small></h6>
                        <div class="dashboard-listtable-{{meta_id}} collapse">
                            <div class = "translated-list-table" ></div>
                            <button class="btn btn-default aj-imp-orange-btn btn-xs btn-save-listtable-translation-element">Save List</button>
                        </div>

                        <hr class="dark">'

            itemView : TranslatedListTableItemView

            itemViewContainer : '.translated-list-table'

            events:
                'click .btn-save-listtable-translation-element': (e)->
                    e.preventDefault()
                    data = Backbone.Syphon.serialize @
                    @trigger "page:listtable:updated" ,data

            itemViewOptions :(model,index)->
                editingLanguage = Marionette.getOption @, 'editingLanguage'
                editingLanguage : editingLanguage
                listtableIndex : index

            initialize :->
                editingLanguage = Marionette.getOption @, 'editingLanguage'
                completeContent = @model.get('contents')
                collection = new Backbone.Collection completeContent[editingLanguage]
                if collection.length==0
                    collection = new Backbone.Collection completeContent[WPML_DEFAULT_LANG]
                @collection = collection

            onShow :->
                listTableMetaId = @model.get 'meta_id'
                App.vent.trigger "translated:listtable:loaded:"+listTableMetaId


        class Views.TranslatedListTablesView extends Marionette.CompositeView

            template : '<div id="translated-list-page-table"></div>'

            itemView : TranslatedListTableView

            itemViewContainer : '#translated-list-page-table'

            itemViewOptions : ->
                language = Marionette.getOption @, 'language'
                editingLanguage : language

            onTranslateListtableUpdated :->
                console.log "Succes"
                # TranslatedSmartTableView.triggerMethod 'translate:smartable:updated'


