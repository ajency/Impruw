define ['app'], (App)->

    App.module 'LanguageApp.LanguagePageContent.OriginalTabAccordion.Views', (Views, App, Backbone, Marionette, $, _)->

        class OriginalTabPaneItemView extends Marionette.ItemView

            template : '<div class="form-group legend-group">
                            <div class="col-sm-12"> 
                                <div class="form-group"> 
                                    <label for="" class="col-sm-3 control-label">{{#polyglot}}Name{{/polyglot}}</label> 
                                    <div class="col-sm-9 col-sm-offset-3"> 
                                        <div tabindex="1" class="original title"> {{tabName}} </div> 
                                    </div> 
                                </div> 
                            </div>
                        </div>'

            events:
                'click a': (e)->
                    e.preventDefault()

            mixinTemplateHelpers :(data)->
                data = super data
                data                    

        class OriginalTabPanesView extends Marionette.CompositeView

            template : '<h6 class="aj-imp-sub-head-thin"><small>{{tabType}}</small></h6>
                        <div class="original-tab-pane">
                        </div>
                        <hr class="dark">'

            itemView : OriginalTabPaneItemView

            itemViewContainer : '.original-tab-pane'

            events:
                'click a.smart-collapse': (e)->
                    e.preventDefault()
                    expandOrContact = $(e.target).html()

                    if expandOrContact is 'Expand'
                        $(e.target).html('Contract')
                    else if expandOrContact is 'Contract'
                        $(e.target).html('Expand')



            initialize :->
                completeContent = @model.get('tabElements')
                console.log @model.get('tabElements')
                collection = new Backbone.Collection completeContent
                @collection = collection
                console.log @collection

                tabAccordionId = @model.get 'ID'
                
                @listenTo App.vent, "translated:tabs:accordions:loaded:"+tabAccordionId, ->
                    @$el.find('.smart-collapse').removeClass('hide')


        class EmptyOriginalTabAccordionView extends Marionette.ItemView

            template: '<br/><div class="empty-info">{{#polyglot}}You have no tabs or accordion headings to translate{{/polyglot}}</div><br/>'

        class Views.OriginalTabAccordionView extends Marionette.CompositeView

            template : '<div id="original-tab-accordions"></div>'

            itemView : OriginalTabPanesView

            emptyView : EmptyOriginalTabAccordionView

            itemViewContainer : '#original-tab-accordions'
