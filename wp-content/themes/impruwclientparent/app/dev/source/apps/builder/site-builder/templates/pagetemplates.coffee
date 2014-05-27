define ['app', 'controllers/base-controller'], (App, AppController)->
    App.module "PageTemplates", (PageTemplates, App)->
        class PageTemplatesController extends AppController

            initialize: (opt = {}) ->

                # get the page templates collection
                @collection = collection = App.request "get:pages:collection"

                # fetch the data
                @collection.fetch
                    data:
                        'meta_key': 'page_templates'

                view = @_getPageTemplatesGrid @collection

                @listenTo view, "itemview:template:clicked", (iv, model)=>
                    # pass on this model with region trigger event
                    Marionette.triggerMethod.call @region, "template:selected", model

                @show view, loading: true

            _getPageTemplatesGrid: (collection)->
                new PageTemplatesGrid
                    collection: collection

        # template view for single template
        class TemplateView extends Marionette.ItemView

            tagName: 'li'

            template: '{{post_title}}'

            events:
                'click': ->
                    @$el.addClass('selected')
                    @trigger "template:clicked", @model

        class EmptyView extends Marionette.ItemView

            template: '<div class="empty-view">No Templates Found.</div>'


        class PageTemplatesGrid extends Marionette.CompositeView

            template: '<h4>Choose a page Template</h4>
            		   <ul class="templates"></ul>'

            itemView: TemplateView

            itemViewContainer : '.templates'

            emptyView: EmptyView

        App.commands.setHandler "show:templates:grid", (opt)->
            new PageTemplatesController opt

