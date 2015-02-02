define ['app'], (App)->

    App.module 'LanguageApp.LanguagePageContent.OriginalListTable.Views', (Views, App, Backbone, Marionette, $, _)->

        class OriginalListTableItemView extends Marionette.ItemView

            className : 'smart-cell'

            template : '<div class="form-group legend-group">
                            <div class="col-sm-12"> 
                                <div class="form-group"> 
                                    <div class="col-sm-9 col-sm-offset-3"> 
                                        <div tabindex="1" class="original title"> {{{data}}} </div> 
                                    </div> 
                                </div> 
                            </div>
                        </div>'

            events:
                'click a': (e)->
                    e.preventDefault()
               
        class OriginalListTableView extends Marionette.CompositeView

            template : '<h6 class="aj-imp-sub-head-thin"><small>{{style}} {{element}}</small></h6>
                        <div class="original-list-table dashboard-listtable-{{meta_id}}">
                        </div>
                        <hr class="dark">'

            itemView : OriginalListTableItemView

            itemViewContainer : '.original-list-table'

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

                listTableMetaId = @model.get 'meta_id'
                
                @listenTo App.vent, "translated:listtable:loaded:"+listTableMetaId, ->
                    @$el.find('.smart-collapse').removeClass('hide')


        class EmptyListTableView extends Marionette.ItemView

            template: '<br/><div class="empty-info">{{#polyglot}}You have no lists to translate{{/polyglot}}</div><br/>'

        class Views.OriginalListTablesView extends Marionette.CompositeView

            template : '<div id="original-list-page-table"></div>'

            itemView : OriginalListTableView

            emptyView : EmptyListTableView

            itemViewContainer : '#original-list-page-table'
