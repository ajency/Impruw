define [ 'app'
         'text!apps/menu-manager/list/templates/menuitem.html' ], ( App, menuItemTpl )->
   App.module 'MenuManager.List.Views', ( Views, App )->
      class MenuItemView extends Marionette.ItemView


         template : menuItemTpl

         tagName : 'li'

         className : 'list-group-item'

         modelEvents :
            'change' : 'render'

         onRender : ->
            @$el.attr 'id', 'item-' + @model.get 'ID'

         events :
            'click .update-menu-item' : ->
               formdata = Backbone.Syphon.serialize @
               @trigger "update:menu:item:clicked", formdata, @model

            'click .delete-menu-item' : ->
               if confirm _.polyglot.t 'Delete menu item'
                  @trigger "delete:menu:item:clicked", @model

            'click .cancel-menu-item' : ->
               menu_id = @model.get 'menu_id'
               menu_item_id = @model.get 'ID'
               @$el.find( '.menuname' ).val( @model.get 'menu_item_title' )
               @$el.find( '.menutitle' ).val( @model.get 'menu_item_url' )
               @$el.find( "#menuitem-#{menu_id}-#{menu_item_id}" ).click()

      class EmptyView extends Marionette.ItemView

         template : '<span class="bicon icon-uniF151"></span> {{#polyglot}}No Menu Items found{{/polyglot}}'

         tagName : 'div'

         className : 'empty-view menu-empty'

      # main menu manager view
      class Views.MenuCollectionView extends Marionette.CompositeView


         template : '<div class="panel panel-default">
                     									<div class="panel-heading">
                     										<h3 class="panel-title">{{menu_name}}</h3>
                     									</div>
                     									<ol class="list-group sortable-menu-items ui-sortable"></ol>
                     								</div>'

         itemView : MenuItemView

         emptyView : EmptyView

         itemViewContainer : 'ol.sortable-menu-items'

         className : 'aj-imp-menu-item-list'

         onShow : ->
            @$el.find( '.sortable-menu-items' ).sortable
               handle : 'div.menu-dragger'
               items : 'li.list-group-item'
               tolerance : 'intersect'
               stop : ( e, ui )=>
                  order = @$el.find( '.sortable-menu-items' ).sortable 'toArray'
                  @sendData order, @collection
         #@trigger "menu:item:order:changed",order

         sendData : ( order, collection )->
            @trigger "view:menu:order:changed", order, collection

         onMenuItemUpdated : ->
            @$el.find( '.alert' ).remove()
            @$el.prepend '<div class="alert alert-success">' + _.polyglot.t( "Menu item updated" ) + '</div>'

         onTriggerOrderChange : =>
            _.delay =>
               order = @$el.find( '.sortable-menu-items' ).sortable 'toArray'
               @sendData order, @collection
            , 600

         itemViewOptions : ( collection, index ) =>
            itemIndex : index
            collection : @collection

         serializeData : ->
            data =
               menus : []

            @collection.each ( model, index )->
               menu = {}
               menu.menu_slug = model.get( 'menu_slug' )
               menu.menu_name = model.get( 'menu_name' )
               data.menus.push menu

            data

