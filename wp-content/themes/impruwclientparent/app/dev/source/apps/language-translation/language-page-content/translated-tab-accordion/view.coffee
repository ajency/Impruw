define ['app'], (App)->

    App.module 'LanguageApp.LanguagePageContent.TranslatedTabAccordion.Views', (Views, App, Backbone, Marionette, $, _)->

        class TranslatedTabPaneItemView extends Marionette.ItemView

            className : 'smart-cell'

            template : '<div class="form-group legend-group">
                            <div class="col-sm-12"> 
                                <div class="form-group">  
                                    <div class="col-sm-10"> 
                                        <input type="text" class="form-control translated-element-content title"  value="{{tabName}}">
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
                data
               

        class TranslatedTabPanesView extends Marionette.CompositeView

            template : '<h6 class="aj-imp-sub-head-thin"><small>&nbsp;</small></h6>
                        <div class="dashboard-tabaccordion-{{ID}}">
                            <div class = "translated-tab-accordion" ></div>
                            <button class="btn btn-default aj-imp-orange-btn btn-xs btn-save-tabaccordion-translation-element">Save</button>
                        </div>
                        <hr class="dark">'

            itemView : TranslatedTabPaneItemView

            itemViewContainer : '.translated-tab-accordion'

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


