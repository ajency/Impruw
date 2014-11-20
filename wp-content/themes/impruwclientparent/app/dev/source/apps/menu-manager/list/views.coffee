define [ 'app', 'bootbox'], ( App, bootbox )->

	App.module 'MenuManager.List.Views', ( Views, App )->
		
		class MenuItemView extends Marionette.ItemView

			template : '<div class="row menu-item">
					   <div class="col-sm-1 menu-dragger"><span class="bicon icon-uniF160"></span></div>
					   <div class="col-sm-8 menu-name">{{title}}</div>
					   <div class="col-sm-3 menu-edit">
						{{#isCustom}}
						 <a href="#menu-item-{{menu_id}}-{{ID}}" data-toggle="collapse" id="menuitem-{{menu_id}}-{{ID}}" class="blue-link">
						   <span class="glyphicon glyphicon-edit"></span> {{#polyglot}}Edit Link{{/polyglot}}
						 </a>
						 {{/isCustom}}
						<a class="delete-menu-item red-link"><span class="glyphicon glyphicon-trash"></span>&nbsp;{{#polyglot}}Delete{{/polyglot}}</a>
					   </div>
					 </div>
					 {{#isCustom}}
					 <div id="menu-item-{{menu_id}}-{{ID}}" class="collapse menu-item-edit">
					   <form class="form-inline custom-menu-item-update-form">
						 <div class="form-group">
							<label class="control-label">{{#polyglot}}Custom Menu Name{{/polyglot}}</label>
							<input value="{{title}}" required type="text" name="menu-item-title"
							  class="form-control menuname" />
						 </div>
						 <div class="form-group">
							<label class="control-label">{{#polyglot}}Custom Menu URL{{/polyglot}}</label>
							<input value="{{url}}" required type="url" 
								name="menu-item-url" id="menu-item-url-{{ID}}" class="form-control menuname" />
						 </div>
						 <div class="form-group form-actions">
							<label class="control-label">&nbsp;</label>
								<input type="hidden" value="{{ID}}" name="ID">
								<input type="hidden" value="custom" name="menu-item-type">
							 <button type="button" class="update-menu-item btn btn-default aj-imp-orange-btn"><span>{{#polyglot}}Update Menu Item{{/polyglot}}</span></button>
							 <a href="#" class="blue-link cancel-menu-item"><span>{{#polyglot}}Cancel{{/polyglot}}</span></a>
						 </div>
					   </form>
					 </div>{{/isCustom}}'

			tagName : 'li'

			className : 'list-group-item'

			modelEvents :
				'change' : 'render'

			ui :
				customMeuUpdateForm : '.custom-menu-item-update-form'

			mixinTemplateHelpers : (data)->
				data = super data
				data.isCustom = data.object is 'custom'
				data

			onRender : ->
				@$el.attr 'id', 'item-' + @model.get 'ID'

			events :
				'click .update-menu-item' : ->
					return if not @ui.customMeuUpdateForm.valid()
					formdata = Backbone.Syphon.serialize @
					@trigger "update:menu:item:clicked", formdata, @model

				'click .delete-menu-item' : ->
					message = _.polyglot.t 'This menu item will be removed from all the occurrences of the menu. Are you sure you want to delete the menu item?'
					bootbox.confirm  message, ( answer )=>
							if answer is yes
								@trigger "delete:menu:item:clicked", @model
						

				'click .cancel-menu-item' : ->
					@$el.closest '.list-group-item'
						.find '[data-toggle]'
						.click()

			onShow : ->
				urlField = "menu-item-url-#{@model.get 'ID'}"
				options = 
					rules : {}
				options['rules'][urlField] = url2 : true
				@ui.customMeuUpdateForm.validate options	
										

		class EmptyView extends Marionette.ItemView

			template : '<span class="bicon icon-uniF151"></span> {{#polyglot}}No Menu Items found{{/polyglot}}'

			tagName : 'div'

			className : 'empty-view menu-empty'

		# main menu manager view
		class Views.MenuCollectionView extends Marionette.CompositeView

			template : '<div class="panel panel-default">
							<ol class="list-group sortable-menu-items ui-sortable"></ol>
						</div>'

			childView : MenuItemView

			emptyView : EmptyView

			childViewContainer : 'ol.sortable-menu-items'

			className : 'aj-imp-menu-item-list'

			ui : 
				sortableList : '.sortable-menu-items'

			attachHtml : (collectionView, childView, index)->

				if @collection.length is 0
					Marionette.CollectionView::attachHtml.apply @,arguments
					return

				if childView.model.get('menu_item_parent') is '0'
					collectionView.$(@childViewContainer).append childView.el
				else
					@createSubMenuAndAppend collectionView, childView
					
				collectionView._bufferedChildren.push childView
				
			createSubMenuAndAppend : (collectionView, childView)->
				menuItemModel = childView.model
				$ul = collectionView.$el.find("#item-#{menuItemModel.get 'menu_item_parent'} ol")

				if $ul.length is 0
					$ul = collectionView.$el.find("#item-#{menuItemModel.get 'menu_item_parent'}").append '<ol></ol>'
					
				$ul = collectionView.$el.find("#item-#{menuItemModel.get 'menu_item_parent'} ol")
				$ul.append childView.el

			onMenuOrderUpdated : ->
				@ui.sortableList.parents('.panel').before "<div class='alert alert-success alert-dismissible' role='alert'>
                                  <button type='button' class='close' data-dismiss='alert'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button>
                                    #{_.polyglot.t 'Order updated successfully'}
                                </div>"
				@ui.sortableList.nestedSortable 'enable'

			onShow : ->
				@ui.sortableList.nestedSortable
					handle : 'div.menu-dragger'
					items : 'li.list-group-item'
					tolerance : 'intersect'
					maxLevels : 2
					stop : ( e, ui )=>
						order = @ui.sortableList.nestedSortable 'toArray'
						newOrder = []
						_.each order, (item, index)->
							return if not item['item_id']
							itemData = {}
							itemData['ID'] = item['item_id']
							itemData['menu_order'] = index
							if item['parent_id']
								itemData['menu_item_parent'] = item['parent_id'] + ''
							else
								itemData['menu_item_parent'] = "0"

							newOrder.push itemData
							
						@$el.find('.alert').remove()
						@trigger "menu:item:order:updated", newOrder
						@ui.sortableList.nestedSortable 'disable'
