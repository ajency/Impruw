define ['app'],
(App)->

    # Headerapp views
    App.module 'SiteBuilderApp.Element.Menu.Views', (Views, App, Backbone, Marionette, $, _)->

        # Menu item view
        class Views.MenuItemView extends Marionette.ItemView

            template: '<a href="#">{{title}}</a>'

            initialize: (opt = {})->
                @listenTo @model, "change", @render
                super(opt)

            tagName: 'li'


        # Submenu view
        class Views.SubMenuView extends Marionette.CompositeView
            itemView: Views.MenuItemView
            itemViewContainer: 'ul.submenu'

        class EmptyView extends Marionette.ItemView
            tagsName: 'ul'

            template: '<div class="empty-view"><span class="bicon icon-uniF14E"></span>{{#polyglot}}No menu found. Click to Edit or Create a Menu.{{/polyglot}}</div>'


        # Menu view
        class Views.MenuView extends Marionette.CompositeView
            tagName: 'ul'
            className: 'nav'
            itemView: Views.MenuItemView
            emptyView: EmptyView
            events:
                'click': (e)->
                    e.preventDefault()
                    @trigger "menu:element:clicked"
                'click a': (evt)->
                    evt.preventDefault()

            # on render set the class name
            onRender: ->
                @$el.removeClass()
                @$el.addClass @className
                @$el.addClass _.slugify @options.templateClass
                @onSetJustified @options.prop.justified

            # before rendering the view sort the collection
            # this helps to reorder the menu items before
            # the collection is rendered with item views
            onBeforeRender: ->
                @collection.sort()

            # set alignment
            setAlignment: (align)=>
                @$el.removeClass 'navbar-left navbar-center navbar-right'
                @$el.addClass "navbar-#{align}"

            # set justified
            onSetJustified: (val)->
                if val is true
                    @$el.addClass "nav-justified"
                else
                    @$el.removeClass "nav-justified"

    App.SiteBuilderApp.Element.Menu.Views