define ['app'], (App)->

	# Headerapp views
	App.module 'SiteBuilderApp.Element.Menu.Views', (Views, App, Backbone, Marionette, $, _)->

		# Menu item view
		class Views.MenuItemView extends Marionette.ItemView

			template: '<a href="#">{{title}}</a>'

			initialize: (opt = {})->
				@listenTo @model, "change", @render
				super(opt)

			tagName: 'li'

			onRender : ->
				@$el.attr 'id', 'item-' + @model.get 'ID'



		# Submenu view
		class Views.SubMenuView extends Marionette.CompositeView
			childView: Views.MenuItemView
			childViewContainer: 'ul.submenu'

		class EmptyView extends Marionette.ItemView
			tagsName: 'ul'

			template: '<div class="empty-view"><span class="bicon icon-uniF14E"></span>{{#polyglot}}No menu found. Click to Edit or Create a Menu.{{/polyglot}}</div>'


		# Menu view
		class Views.MenuView extends Marionette.CompositeView
			tagName: 'ul'
			className: 'nav slimmenu'
			childView: Views.MenuItemView
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

			attachHtml : (collectionView, childView, index)->

				if @collection.length is 0
					Marionette.CollectionView::attachHtml.apply @,arguments
					return

				if childView.model.get('menu_item_parent') is '0'
					collectionView.$el.append childView.el
				else
					@createSubMenuAndAppend collectionView, childView
					
				collectionView._bufferedChildren.push childView
			
			createSubMenuAndAppend : (collectionView, childView)->
				menuItemModel = childView.model
				$ul = collectionView.$el.find("#item-#{menuItemModel.get 'menu_item_parent'} ul")

				if $ul.length is 0
					$ul = collectionView.$el.find("#item-#{menuItemModel.get 'menu_item_parent'}").append '<ul></ul>'
					
				$ul = collectionView.$el.find("#item-#{menuItemModel.get 'menu_item_parent'} ul")
				$ul.append childView.el

			removeMenuSettingsIcon : =>
				@$el.closest '.element-wrapper'
					.find '.element-controls .aj-imp-settings-btn'
					.remove()

			onShow : ->
				@$el.slimmenu()

			# before rendering the view sort the collection
			# this helps to reorder the menu items before
			# the collection is rendered with item views
			onBeforeRender: ->
				#@collection.sort()

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
