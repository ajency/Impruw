define ['app'], (App)->

    App.module 'LanguageApp.LanguagePageContent.OriginalSmartTable.Views', (Views, App, Backbone, Marionette, $, _)->

        class OriginalSmartTableItemView extends Marionette.ItemView

            className : 'smart-cell'

            template : '<div class="form-group legend-group">
                            <div class="col-sm-12"> 
                                <div class="form-group"> 
                                    <label for="" class="col-sm-3 control-label">Heading</label> 
                                    <div class="col-sm-9 col-sm-offset-3"> 
                                        <div tabindex="1" class="original title"> {{#dtExist}}{{{dt}}}{{/dtExist}} </div> 
                                    </div> 
                                </div> 
                            </div>
                        </div>
                        <div class="form-group legend-group">
                            <div class="col-sm-12"> 
                                <div class="form-group"> 
                                    <label for="" class="col-sm-3 control-label">Description</label> 
                                    <div class="col-sm-9 col-sm-offset-3"> 
                                        <div tabindex="1" class="original title"> {{#ddExist}}{{{dd}}}{{/ddExist}} </div> 
                                    </div> 
                                </div> 
                            </div>
                        </div>
                        <div class="form-group legend-group">
                            <div class="col-sm-12"> 
                                <div class="form-group"> 
                                    <label for="" class="col-sm-3 control-label">Attribute</label> 
                                    <div class="col-sm-9 col-sm-offset-3"> 
                                        <div tabindex="1" class="original title"> {{#emExist}}{{{em}}}{{/emExist}} </div> 
                                    </div> 
                                </div> 
                            </div>
                        </div>'

            events:
                'click a': (e)->
                    e.preventDefault()

            mixinTemplateHelpers :(data)->
                data = super data
                data.dtExist = true if data.dt? and data.dt isnt ''
                data.ddExist = true if data.dd? and data.dd isnt ''
                data.emExist = true if data.em? and data.em isnt ''
                data.dt = _.stripslashes data.dt
                data.dd = _.stripslashes data.dd
                data.em = _.stripslashes data.em
                data                    

        class OriginalSmartTableView extends Marionette.CompositeView

            template : '<h6 class="aj-imp-sub-head-thin"><small>{{style}} {{element}}</small><a data-toggle="collapse" data-target=".dashboard-smarttable-{{meta_id}}" class="smart-collapse hide">Expand</a></h6>
                        <div class="original-smart-table dashboard-smarttable-{{meta_id}} collapse">
                        </div>
                        <hr class="dark">'

            itemView : OriginalSmartTableItemView

            itemViewContainer : '.original-smart-table'

            events:
                'click a.smart-collapse': (e)->
                    e.preventDefault()
                    expandOrContact = $(e.target).html()

                    if expandOrContact is 'Expand'
                        $(e.target).html('Contract')
                    else if expandOrContact is 'Contract'
                        $(e.target).html('Expand')



            initialize :->
                completeContent = @model.get('contents')
                collection = new Backbone.Collection completeContent[WPML_DEFAULT_LANG]
                @collection = collection

                smartTableMetaId = @model.get 'meta_id'
                
                @listenTo App.vent, "translated:smartable:loaded:"+smartTableMetaId, ->
                    @$el.find('.smart-collapse').removeClass('hide')


        class EmptySmartTableView extends Marionette.ItemView

            template: '<br/><div class="empty-info">{{#polyglot}}You have no smart tables to translate{{/polyglot}}</div><br/>'

        class Views.OriginalSmartTablesView extends Marionette.CompositeView

            template : '<div id="original-smart-page-table"></div>'

            itemView : OriginalSmartTableView

            emptyView : EmptySmartTableView

            itemViewContainer : '#original-smart-page-table'
