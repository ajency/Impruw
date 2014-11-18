define [ 'app', 'controllers/base-controller', 'bootbox' ], ( App, AppController, bootbox )->

	#Login App module
	App.module "MenuManager.Show", ( Show, App )->

		#Show Controller
		class Show.Controller extends AppController

			# initialize
			initialize : ( opts )->
			
				{@menuId, @menuElementModel, @region} = opts

				@layout = layout = @getLayout @menuId

				@listenTo layout, 'add:new:menu', @addNewMenu
				@listenTo layout, 'delete:menu:clicked', @deleteMenu
				@listenTo @region, 'before:close', @saveMenuElementModel

				@show @layout

			saveMenuElementModel : =>
				@menuElementModel.save()

			addNewMenu : (menuName)=>
				data = 
					action : 'builder-add-new-menu'
					menu_name : menuName
				$.post AJAXURL, data ,@addMenuResponseHandler, 'json'

			deleteMenu : (menuId)->
				menuId = parseInt menuId
				if menuId is 0 then return
				ajaxData = 
					action : 'builder-delete-menu'
					menu_id : menuId
				$.post AJAXURL, ajaxData, @deleteMenuResponseHandler, 'json'

			deleteMenuResponseHandler : (response)=>
				# TODO: delete menu functionality
				@menuElementModel.set 'menu_id', 0
				menuModel = window.menusCollection.get response.menu_id
				window.menusCollection.remove menuModel
				@layout.triggerMethod 'menu:delete:success'

			addMenuResponseHandler : (response)=>
				if response.success isnt true
					@layout.triggerMethod "add:menu:failed", response.message
				else
					model = new App.Entities.Menus.MenuModel response.data
					window.menusCollection.add model
					@layout.triggerMethod "add:menu:success", model.get 'term_id'


			getLayout : (menuId )->
				globalMenusCollection = window.menusCollection
				new MediaMangerLayout 
						collection : globalMenusCollection
						menuId : menuId
						menuElementModel : @menuElementModel

		class MenuOption extends Marionette.ItemView
			tagName : 'option'
			template : '{{name}}'
			onRender : ->
				@$el.attr 'value', @model.get 'term_id'

		class DropdownListView extends Marionette.CollectionView
			tagName : 'select'
			className : 'global-menus-list'
			itemView : MenuOption
			emptyView : Marionette.ItemView.extend tagName : 'option', template : 'Add Menu'
			events : 
				'change' : 'menuChanged'
			
			menuChanged : =>
				menuId = @$el.selectpicker 'val'
				@trigger 'menu:changed', menuId if menuId isnt ''

			onRender : ->
				@$el.prepend '<option value="">Choose Menu</option>'

			onShow : ->
				menuId = Marionette.getOption @, 'menuId'
				menuId = if parseInt(menuId) is 0 then '' else menuId
				@$el.selectpicker()
				@$el.selectpicker('val', menuId)
				@trigger 'menu:changed', menuId if menuId isnt ''

			onMenuDeleted : ->
				@$el.selectpicker 'refresh'
				@$el.selectpicker 'val', ''


		class MenuStyleItemView extends Marionette.ItemView
			
			className : 'col-sm-6 single-item'

			template : '<a href="#" class="thumbnail">
							 <div class="ticker ui-selectee" style=""><span class="glyphicon glyphicon-ok ui-selectee"></span><span class="glyphicon glyphicon-minus ui-selectee" style=""></span></div>
							 <div class="imgthumb">
								<img alt="{{name}}" class="img-responsive" src="{{imagePath}}" />
							 </div>
						  </a>'

			onRender : ->
				@$el.attr 'data-menu-style', @model.get 'name'


		class MenuStylesView extends Marionette.CollectionView
			itemView : MenuStyleItemView

			onShow : ->
				currentStyle  = Marionette.getOption @, 'currentStyle'
				@$el.selectable
						selected: @menuStyleSelected

				@$el.find "div[data-menu-style='#{currentStyle}']"
					.addClass 'ui-selected'

			menuStyleSelected : ( event, ui )=>
				@trigger "menu:style:selected", $(ui.selected).attr 'data-menu-style'

		# Rooms tariff layout
		class MediaMangerLayout extends Marionette.Layout

			className : 'menu-manager-container row'

			events : 
				'click a.delete-menu' : ->
					message = _.polyglot.t 'Deleting this menu will remove all occurrences of this menu from your site. Are you sure you want to continue?'
					bootbox.confirm message, ( answer )=>
							if answer is yes
								@trigger "delete:menu:clicked", @menuId


				'click #new-menu-name button' : ->
					@$el.find('#new-menu-name form-group').removeClass 'has-error'
					@$el.find('#new-menu-name p.help-block').remove()
					@trigger "add:new:menu", @$el.find('#new-menu-name input[type="text"]').val()

			template : '<div class="col-md-12">
						<div class="modal-help-text">
						   <span class="glyphicon glyphicon-info-sign"></span>&nbsp;
						   {{#polyglot}}If you wanted to go to a particular page you can do that by selecting the page in Current Page: drop down on the site builder right below the header.{{/polyglot}}
						</div>

						<p class="desc">
						   {{#polyglot}}You can either edit a previously added menu or create a new menu. To edit a previously added menu, select it from the dropdown{{/polyglot}}
						   <small>{{#polyglot}}Note: Editing a menu will update all occurrences of this menu.{{/polyglot}}</small>
						</p>
					 </div>
							   <div class="col-md-8">
						<div class="create-menu-container">
						   <div class="choose-menu">
							  <label class="control-label">{{#polyglot}}Select a Menu to Edit{{/polyglot}}</label>
							  <div class="btn-group bootstrap-select">
								<div id="global-menus-list-view"></div>
							  </div>
							  <span class="option-or">{{#polyglot}}Or{{/polyglot}}</span>
							  <a href="#new-menu-name" data-toggle="collapse" class="create-new-menu">{{#polyglot}}Create a Menu{{/polyglot}}</a>
						   </div>
						   <form id="new-menu-name" class="form-inline collapse">
							  <div class="form-group">
								 <input class="form-control" placeholder="{{#polyglot}}Enter a name for your menu{{/polyglot}}" type="text">
							  </div>
							  <button class="btn btn-default aj-imp-orange-btn" type="button">{{#polyglot}}Create{{/polyglot}}</button>
						   </form>
						</div>
						<div id="add-menu-items"></div>
						<div id="list-menu-items"></div>
						<div class="menu-actions clearfix hidden">
						   <a class="delete-menu red-link"><span class="glyphicon glyphicon-trash"></span>&nbsp;{{#polyglot}}Delete Menu{{/polyglot}}</a>
						</div>
					 </div>
							   <div class="col-md-4">
						<div class="styles-container">
						  <h4>{{#polyglot}}Choose a Menu Style{{/polyglot}}</h4>
						  <div id="menu-style-list-region" class="row thumbnails overflow-view">
						  </div>
					  </div>
					 </div>'

			initialize : (options)->
				{ @collection, @menuId, @menuElementModel } = options
				@listenTo @, 'show', =>
					@menuListView = new DropdownListView 
										collection : @collection
										menuId : @menuId
					@listenTo @menuListView, "menu:changed", @menuChanged
					@gloablMenusList.show @menuListView

				@listenTo @, 'show', @showMenuStyles

			showMenuStyles : =>
				model = App.request "get:element:settings:options", 'Menu'
				styles = model.get 'styles'
				styles = if _.isArray(styles) then styles else []
				stylesCollection = new Backbone.Collection styles
				menuStylesView = new MenuStylesView
										collection : stylesCollection
										currentStyle : @menuElementModel.get 'style'

				@listenTo menuStylesView, "menu:style:selected", @updateSelectedMenu
				@menuStylesRegion.show menuStylesView

			updateSelectedMenu : (menuStyle)=>
				console.log menuStyle
				@menuElementModel.set 'style', menuStyle

			menuChanged : (menuId) =>
				@menuId = menuId
				@menuElementModel.set 'menu_id', @menuId
				@$el.find('a.delete-menu').parent().removeClass 'hidden'
				App.execute "add:menu:items:app",
									region : @addMenuRegion
									menuId : @menuId

				App.execute "list:menu:items:app",
									region : @listMenuRegion
									menuId : @menuId
									menuElementModel : @menuElementModel


			onMenuDeleteSuccess : ->
				@listMenuRegion.close()
				@addMenuRegion.close()
				@$el.find('a.delete-menu').addClass 'hidden'
				@menuListView.triggerMethod 'menu:deleted'


			onAddMenuFailed : (message)->
				message = '<p class="help-block">' + _.polyglot.t message + '</p>'
				@$el.find('#new-menu-name .form-group').addClass('has-error')
				@$el.find('#new-menu-name input[type="text"]').after message

			onAddMenuSuccess : (menuId)->
				@$el.find('#new-menu-name input').val ''
				@$el.find('#new-menu-name .form-group').removeClass('has-error')
				@$el.find('select.global-menus-list').selectpicker('refresh')
				@$el.find('select.global-menus-list').selectpicker 'val', menuId

			dialogOptions :
				modal_title : _.polyglot.t 'Menu Manager'

			regions :
				addMenuRegion : '#add-menu-items'
				listMenuRegion : '#list-menu-items'
				gloablMenusList : '#global-menus-list-view'
				menuStylesRegion : '#menu-style-list-region'

		
			
		App.commands.setHandler "menu-manager", ( menuElementModel, menuId ) ->
			opts =
				region : App.dialogRegion
				menuId : menuId
				menuElementModel : menuElementModel

			new Show.Controller opts
