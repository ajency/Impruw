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
					   <form class="form-inline">
						 <div class="form-group">
							<label class="control-label">{{#polyglot}}Custom Menu Name{{/polyglot}}</label>
							<input value="{{title}}" parsley-required="true" type="text" name="menu_item_title"
							  class="form-control menuname" />
						 </div>
						 <div class="form-group">
							<label class="control-label">{{#polyglot}}Custom Menu URL{{/polyglot}}</label>
							<input value="{{url}}" parsley-type="url" parsley-required="true" type="text"
								name="menu_item_url" class="form-control menutitle" />
						 </div>
						 <div class="form-group form-actions">
							<label class="control-label">&nbsp;</label>
							 <!--<input type="hidden" value="{{menu_id}}" name="menu_id"/> -->
							 <button type="button" class="update-menu-item btn btn-default aj-imp-orange-btn"><span>{{#polyglot}}Update Menu Item{{/polyglot}}</span></button>
							 <a href="#" class="blue-link cancel-menu-item"><span>{{#polyglot}}Cancel{{/polyglot}}</span></a>
						 </div>
					   </form>
					 </div>{{/isCustom}}'

			tagName : 'li'

			className : 'list-group-item'

			modelEvents :
				'change' : 'render'

			mixinTemplateHelpers : (data)->
				data = super data
				data.isCustom = data.object is 'custom'
				data

			onRender : ->
				@$el.attr 'id', 'item-' + @model.get 'ID'

			events :
				'click .update-menu-item' : ->
					formdata = Backbone.Syphon.serialize @
					@trigger "update:menu:item:clicked", formdata, @model

				'click .delete-menu-item' : ->
					bootbox.confirm  _.polyglot.t('Delete menu item?'), ( answer )=>
							if answer is yes
								@trigger "delete:menu:item:clicked", @model
						

				'click .cancel-menu-item' : ->
					menu_id = @model.get 'menu_id'
					menu_item_id = @model.get 'ID'
					@$el.find( '.menuname' ).val( @model.get 'menu_item_title' )
					@$el.find( '.menutitle' ).val( @model.get 'menu_item_url' )
					@$el.find( "#menuitem-#{menu_id}-#{menu_item_id}" ).click()
					return false

		class EmptyView extends Marionette.ItemView

			template : '<span class="bicon icon-uniF151"></span> {{#polyglot}}No Menu Items found{{/polyglot}}'

			tagName : 'div'

			className : 'empty-view menu-empty'

		# main menu manager view
		class Views.MenuCollectionView extends Marionette.CompositeView

			template : '<div class="panel panel-default">
							<ol class="list-group sortable-menu-items ui-sortable"></ol>
						</div>'

			itemView : MenuItemView

			emptyView : EmptyView

			itemViewContainer : 'ol.sortable-menu-items'

			className : 'aj-imp-menu-item-list'

			appendHtml : (collectionView, childView, index)->

				if @collection.length is 0
					Marionette.CollectionView::appendHtml.apply @,arguments
					return

				if childView.model.get('menu_item_parent') is '0'
					collectionView.$(@itemViewContainer).append childView.el
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

			onShow : ->
				@$el.find( '.sortable-menu-items' ).nestedSortable
					handle : 'div.menu-dragger'
					items : 'li.list-group-item'
					tolerance : 'intersect'
					maxLevels : 2
					stop : ( e, ui )=>
						order = @$el.find( '.sortable-menu-items' ).nestedSortable 'toArray'
						newOrder = []
						_.each order, (item, index)->
							return if not item['item_id']
							itemData = {}
							itemData['menu_item_id'] = item['item_id']
							if item['parent_id']
								itemData['menu_item_parent'] = item['parent_id']
							newOrder.push itemData

						console.log newOrder

