define [ 'app'], ( App )->

   App.module 'MenuManager.List.Views', ( Views, App )->
      class MenuItemView extends Marionette.ItemView


         template : '<div class="row menu-item">
                       <div class="col-sm-1 menu-dragger"><span class="bicon icon-uniF160"></span></div>
                       <div class="col-sm-8 menu-name">{{menu_item_title}}</div>
                       <div class="col-sm-3 menu-edit">
                         <a href="#menu-item-{{menu_id}}-{{ID}}" data-toggle="collapse" id="menuitem-{{menu_id}}-{{ID}}">
                           <span class="glyphicon glyphicon-edit"></span> {{#polyglot}}View{{/polyglot}}
                         </a>
                       </div>
                     </div>
                     <div id="menu-item-{{menu_id}}-{{ID}}" class="collapse menu-item-edit">
                       <form class="form-horizontal">
                         <div class="form-group">
                           <label class="col-sm-4 control-label">{{#polyglot}}Menu Link Label{{/polyglot}}</label>
                           <div class="col-sm-8">
                             <input value="{{menu_item_title}}" parsley-required="true" type="text" name="menu_item_title"
                              class="form-control menuname" readonly="readonly"/>
                           </div>
                         </div>
                         <div class="form-group">
                           <label class="col-sm-4 control-label">{{#polyglot}}Menu Link{{/polyglot}}</label>
                           <div class="col-sm-8">
                             <input value="{{menu_item_url}}" parsley-type="url" parsley-required="true" type="text"
                                name="menu_item_url" class="form-control menutitle" readonly="readonly"/>
                           </div>
                         </div>
                         <div class="form-group form-actions">
                           <div class="col-sm-offset-4 col-sm-8">
                             <!--<input type="hidden" value="{{menu_id}}" name="menu_id"/> -->
                             <!--<button type="button" class="update-menu-item btn btn-info"><span>{{#polyglot}}Update Menu Item{{/polyglot}}</span></button>-->
                             <button type="button" class="btn cancel-menu-item"><span>{{#polyglot}}Cancel{{/polyglot}}</span></button>
                             <button type="button" class="btn btn-danger delete-menu-item"><span class="glyphicon glyphicon-trash"></span></button>
                           </div>
                         </div>
                       </form>
                     </div>'

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
               menu.menu_item_url = model.get 'menu_item_url'
               menu.menu_name = model.get 'menu_item_title'
               data.menus.push menu
            data

