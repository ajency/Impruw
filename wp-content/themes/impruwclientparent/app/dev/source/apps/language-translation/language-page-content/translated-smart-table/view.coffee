define ['app'], (App)->

    App.module 'LanguageApp.LanguagePageContent.TranslatedSmartTable.Views', (Views, App, Backbone, Marionette, $, _)->

        class TranslatedSmartTableItemView extends Marionette.ItemView

            className : 'smart-cell'

            template : '<div class="form-group legend-group">
                            <div class="col-sm-12"> 
                                <div class="form-group">  
                                    <div class="col-sm-10"> 
                                        <input type="text" class="form-control translated-element-content title" id="translated-smarttable-dt" value="{{dt}}" name="{{dtInputName}}">
                                    </div> 
                                </div> 
                            </div>
                        </div>
                        <div class="form-group legend-group">
                            <div class="col-sm-12"> 
                                <div class="form-group"> 
                                    <div class="col-sm-10"> 
                                        <input type="text" class="form-control translated-element-content title" id="translated-smarttable-dt" value="{{dd}}"  name="{{ddInputName}}">
                                    </div> 
                                </div> 
                            </div>
                        </div>
                        <div class="form-group legend-group">
                            <div class="col-sm-12"> 
                                <div class="form-group">
                                    <div class="col-sm-10"> 
                                        <input type="text" class="form-control translated-element-content title" id="translated-smarttable-dt" value="{{em}}" name="{{emInputName}}">
                                    </div> 
                                </div> 
                            </div>
                        </div>'

            events:
                'click a': (e)->
                    e.preventDefault()


            serializeData: ()->
                data = super()
                data.dd = _.stripslashes(data.dd)
                data.dt = _.stripslashes(data.dt)
                data.em = _.stripslashes(data.em)
                data


            mixinTemplateHelpers: (data)->
                data = super data
                editingLanguage = Marionette.getOption @, 'editingLanguage'
                smarttableIndex =  Marionette.getOption @, 'smarttableIndex'

                data.ddInputName = ->
                    ddInputName = editingLanguage+"["+smarttableIndex+"][dd]"
                    ddInputName.toString()
                    return ddInputName
                data.dtInputName = ->
                    dtInputName = editingLanguage+"["+smarttableIndex+"][dt]"
                    dtInputName.toString()
                    return dtInputName
                data.emInputName = ->
                    emInputName = editingLanguage+"["+smarttableIndex+"][em]"
                    emInputName.toString()
                    return emInputName

                data
               

        class TranslatedSmartTableView extends Marionette.CompositeView

            tagName : 'form'
            template : '<h6 class="aj-imp-sub-head-thin"><small>&nbsp;</small></h6>
                        <div class="dashboard-smarttable-{{meta_id}} collapse in">
                            <div class = "translated-smart-table" ></div>
                            <button class="btn btn-default aj-imp-orange-btn btn-xs btn-save-smarttable-translation-element">Save Smart Table</button>
                        </div>

                        <hr class="dark">'

            itemView : TranslatedSmartTableItemView

            itemViewContainer : '.translated-smart-table'

            events:
                'click .btn-save-smarttable-translation-element': (e)->
                    e.preventDefault()
                    data = Backbone.Syphon.serialize @
                    @trigger "page:smarttable:updated" ,data

            itemViewOptions :(model,index)->
                editingLanguage = Marionette.getOption @, 'editingLanguage'
                editingLanguage : editingLanguage
                smarttableIndex : index

            initialize :->
                editingLanguage = Marionette.getOption @, 'editingLanguage'
                completeContent = @model.get('contents')
                collection = new Backbone.Collection completeContent[editingLanguage]
                if collection.length==0
                    collection = new Backbone.Collection completeContent[WPML_DEFAULT_LANG]
                @collection = collection


        class Views.TranslatedSmartTablesView extends Marionette.CompositeView

            template : '<div id="translated-smart-page-table"></div>'

            itemView : TranslatedSmartTableView

            itemViewContainer : '#translated-smart-page-table'

            itemViewOptions : ->
                language = Marionette.getOption @, 'language'
                editingLanguage : language
