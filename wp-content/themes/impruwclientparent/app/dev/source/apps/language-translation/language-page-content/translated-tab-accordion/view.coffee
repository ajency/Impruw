define ['app'], (App)->

    App.module 'LanguageApp.LanguagePageContent.TranslatedTabAccordion.Views', (Views, App, Backbone, Marionette, $, _)->

        class TranslatedTabPaneItemView extends Marionette.ItemView

            className : 'smart-cell'

            template : '<div class="form-group legend-group">
                            <div class="col-sm-12"> 
                                <div class="form-group">  
                                    <div class="col-sm-10"> 
                                        <input type="text" class="form-control translated-element-content title"  value="{{tabNameLang}}" name="{{tabInputName}}">
                                    </div> 

                                </div> 
                            </div>
                        </div>'

            events:
                'click a': (e)->
                    e.preventDefault()


            serializeData: ()->
                data = super()
                data


            mixinTemplateHelpers: (data)->
                data = super data
                editingLanguage = Marionette.getOption @, 'editingLanguage'
                tabIndex =  Marionette.getOption @, 'tabIndex'

                data.tabInputName = ->
                    tabInputName = "tabName["+tabIndex+"]"
                    tabInputName.toString()
                    return tabInputName

                data.tabElementID = ->
                    tabElementID =  "tabElements["+tabIndex+"][element_id]"
                    tabElementID.toString()
                    return tabElementID

                data.tabPosition = ->
                    tabPosition =  "tabElements["+tabIndex+"][position]"
                    tabPosition.toString()
                    return tabPosition
                
                data.tabNameLang = ->
                    tabname = data.tabName
                    tabname[editingLanguage]
                data
               

        class TranslatedTabPanesView extends Marionette.CompositeView

            tagName: 'form'

            template : '<h6 class="aj-imp-sub-head-thin"><small>&nbsp;</small></h6>
                        <div class="dashboard-tabaccordion-{{ID}}">
                            <div class = "translated-tab-accordion" ></div>
                            <button class="btn btn-default aj-imp-orange-btn btn-xs btn-save-tabaccordion-translation-element">Save</button>
                        </div>
                        <hr class="dark">'

            itemView : TranslatedTabPaneItemView

            itemViewContainer : '.translated-tab-accordion'

            events:
                'click .btn-save-tabaccordion-translation-element': (e)->
                    e.preventDefault()
                    data = Backbone.Syphon.serialize @
                    @trigger "page:tabaccordion:updated" ,data

            itemViewOptions :(model,index)->
                editingLanguage = Marionette.getOption @, 'editingLanguage'
                editingLanguage : editingLanguage
                tabIndex : index

            initialize :->
                editingLanguage = Marionette.getOption @, 'editingLanguage'
                completeContent = @model.get('tabElements')
                collection = new Backbone.Collection completeContent
                # if collection.length==0
                #     collection = new Backbone.Collection completeContent
                @collection = collection

            onShow :->
                tabAccordionId = @model.get 'ID'
                App.vent.trigger "translated:tabs:accordions:loaded:"+tabAccordionId


        class Views.TranslatedTabAccordionView extends Marionette.CompositeView

            template : '<div id="translated-tab-accordions"></div>'

            itemView : TranslatedTabPanesView

            itemViewContainer : '#translated-tab-accordions'

            itemViewOptions : ->
                language = Marionette.getOption @, 'language'
                editingLanguage : language

            onTranslateTabAccordionsUpdated :->
                console.log "Succes"
                # TranslatedSmartTableView.triggerMethod 'translate:smartable:updated'

