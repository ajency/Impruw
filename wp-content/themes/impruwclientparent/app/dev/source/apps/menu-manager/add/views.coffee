define ['app'], (App)->
    
    App.module 'MenuManager.Add.Views', (Views, App)->
        
        class Views.MenuItemView extends Marionette.ItemView

            template: '<a class="add-menu-toggle" data-toggle="collapse" href="#add-menu-container"><span class="glyphicon glyphicon-plus"></span></a>
                    <div id="add-menu-container" class="aj-imp-add-menu-item collapse">
                        <div id="{{menu_slug}}-add-menu" class="add-menu-form">
                            <h4>{{#polyglot}}Add Menu Item{{/polyglot}}</h4>
                            <form class="form-inline">
                                <div class="form-group">
                                    <label class="control-label">{{#polyglot}}Page Item{{/polyglot}}</label>
                                    <div class="bootstrap-select">
                                        <select name="page_id" id="page_id">
                                            <option value="">{{#polyglot}}Choose Page{{/polyglot}}</option>
                                            {{#pages}}
                                            <option value="{{ID}}">{{post_title}}</option>
                                            {{/pages}}
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group option-or">
                                    <label class="control-label">&nbsp;</label>
                                    {{#polyglot}}Or{{/polyglot}}
                                </div>
                                <div class="form-group">
                                    <label class="control-label">{{#polyglot}}Custom Menu Name{{/polyglot}}</label>
                                    <input name="custom-menu-name" class="form-control" placeholder="{{#polyglot}}Custom Menu Name{{/polyglot}}" type="text">
                                </div>
                                <div class="form-group">
                                    <label class="control-label">{{#polyglot}}URL{{/polyglot}}</label>
                                    <input name="custom-menu-url" class="form-control url" placeholder="{{#polyglot}}Custom Menu URL{{/polyglot}}" type="text">
                                </div>
                                <div class="form-group">
                                    <label class="control-label">&nbsp;</label>
                                    <button type="button" class="add-menu-item btn btn-default aj-imp-orange-btn"><span>{{#polyglot}}Add{{/polyglot}}</span></button>
                                    <input type="reset" id="btn_resetmenu" style="display:none">
                                </div>
                            </form>
                        </div>
                    </div>'

            className: 'aj-imp-menu-edit'

            ui:
                'menuName' : 'input[name="custom-menu-name"]'
                'menuUrl' : 'input[name="custom-menu-url"]'
                'pageId' : '#page_id'

            events:
                'change select[name="page_id"]' : ->
                    if @$el.find('#page_id').selectpicker('val') isnt ''  
                        @$el.find('input[name="custom-menu-name"],input[name="custom-menu-url"]').val ''

                'keypress input[name="custom-menu-name"],input[name="custom-menu-url"]' : ->
                    @$el.find('#page_id').selectpicker 'val', ''

                'click .add-menu-item': 'addMenuItem'

            addMenuItem : ->
                @$el.find('.alert').remove()
                data = {}
                if @ui.menuName.val() isnt ''
                    data['menu-item-title'] = @ui.menuName.val()
                    data['menu-item-type'] = 'custom'
                    data['menu-item-url'] = @ui.menuUrl.val()
                else
                    pageId = @ui.pageId.selectpicker 'val'
                    if pageId is ''
                        @showMissingFieldMessage()
                        return
                    data['menu-item-object-id'] =  pageId
                    data['menu-item-db-id'] = 0
                    data['menu-item-object'] = 'page'
                    data['menu-item-parent-id'] = 0
                    data['menu-item-type'] = 'post_type'
                    data['menu-item-title'] = @ui.pageId.find('option:selected').text()
                    
                data['menu-settings-column-nonce'] = window._MENUNONCE
                
                @trigger "add:menu:item:clicked", data

            showMissingFieldMessage : =>
                message = _.polyglot.t 'Sorry, you need to add the menu name and link for custom menus or you could simply select a page from page item drop down'
                @$el.find 'form.form-inline'
                    .prepend "<div class='alert alert-danger'>#{message}</div>"

            serializeData :->
                data = super()
                pages = App.request "get:editable:pages"
                data.pages = pages.toJSON()
                data


            onNewMenuCreated: ->
                @$el.find('.alert').remove()
                @$el.find('.add-menu-form').prepend '<div class="alert alert-success">New menu added</div>'
                @$el.find('#btn_resetmenu').click()

            onShow: ->
               @$el.find('select[name="page_id"]').selectpicker()
						
