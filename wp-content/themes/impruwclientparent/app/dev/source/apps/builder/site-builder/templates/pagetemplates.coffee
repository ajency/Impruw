define ['app', 'controllers/base-controller'], (App, AppController)->
    App.module "PageTemplates", (PageTemplates, App)->
        class PageTemplatesController extends AppController

            initialize: (opt = {}) ->

                # get the page templates collection
                @collection = App.request "get:pages:collection"
                # fetch the data
                @collection.fetch()

                @templates = App.request "get:pages:collection"
                @templates.fetch
                    data:
                        'meta_key': 'page_templates'

                @layout = @_getTemplateLayout()

                @listenTo @layout, 'show', @_showTemplateViews 

                @show @layout,
                    loading: true

            _getTemplateLayout : ->
                new TemplatesLayout
                    collection : @collection
                    templateCollection : @templates

            _showTemplateViews: ->
                @PageTemplateView = @_getPageTemplatesGrid @collection
                @listenTo @PageTemplateView, "itemview:template:clicked", (iv, model)=>
                    # pass on this model with region trigger event
                    Marionette.triggerMethod.call @region, "template:selected", model

                @layout.pageTemplatesRegion.show @PageTemplateView

                @ThemeTemplateView = @_getThemeTemplatesGrid @templates
                @listenTo @ThemeTemplateView, "itemview:template:clicked", (iv, model)=>
                    # pass on this model with region trigger event
                    Marionette.triggerMethod.call @region, "template:selected", model

                @layout.themeTemplatesRegion.show @ThemeTemplateView

            _getThemeTemplatesGrid : (collection)->
                new ThemeTemplatesGrid
                    collection : collection

            _getPageTemplatesGrid: (collection)->
                new PageTemplatesGrid
                    collection: collection

        # template view for single template
        class TemplateView extends Marionette.ItemView

            tagName: 'li'

            template: '{{post_title}}'

            events:
                'click': ->
                    @$el.closest('.template-layout').find('.templates li').removeClass 'selected'
                    @$el.addClass('selected')
                    @trigger "template:clicked", @model

        class EmptyView extends Marionette.ItemView

            template: '<div class="empty-view">{{#polyglot}}No Templates Found{{/polyglot}}</div>'


        class PageTemplatesGrid extends Marionette.CompositeView

            template: '<h4>{{#polyglot}}Choose page Template{{/polyglot}}</h4>
            		   <ul class="templates"></ul>
            		   <input type="text" style="display: none" name="menu_order" id="menu-order">'

            itemView: TemplateView

            itemViewContainer : '.templates'

            emptyView: EmptyView

            onShow :->
                lastPageModel =  @collection.last()
                @$el.find('#menu-order' ).val lastPageModel.get 'menu_order'


        class ThemeTemplatesGrid extends Marionette.CompositeView

            template: '<h4>{{#polyglot}}Choose Theme Template{{/polyglot}}</h4>
                       <ul class="templates"></ul>'

            itemView: TemplateView

            itemViewContainer : '.templates'

            emptyView: EmptyView

        class TemplatesLayout extends Marionette.Layout 
            template : '<div class="page-templates"></div>
                        <div class="theme-templates"></div>'

            className : 'template-layout'

            regions : 
                pageTemplatesRegion : '.page-templates'
                themeTemplatesRegion : '.theme-templates'

        App.commands.setHandler "show:templates:grid", (opt)->
            new PageTemplatesController opt

