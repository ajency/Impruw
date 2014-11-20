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
                                    <input id="custom-menu-url" value="http://" name="custom-menu-url" required class="form-control url" placeholder="{{#polyglot}}Custom Menu URL{{/polyglot}}" type="url">
                                </div>
                                <div class="form-group">
                                    <label class="control-label">&nbsp;</label>
                                    <button type="button" class="add-menu-item btn btn-default aj-imp-orange-btn"><span>{{#polyglot}}Add{{/polyglot}}</span></button>
                                    <input type="reset" id="btn_resetmenu" class="hidden"/>
                                </div>
                            </form>
                        </div>
                    </div>'

            className: 'aj-imp-menu-edit'

            ui:
                'menuName' : 'input[name="custom-menu-name"]'
                'menuUrl' : 'input[name="custom-menu-url"]'
                'pageId' : '#page_id'
                'resetButton' : '#btn_resetmenu'
                'form' : 'form.form-inline'
                'customUrlField' : 'input[name="custom-menu-url"]'

            events:
                'change select[name="page_id"]' : ->
                    if @$el.find('#page_id').selectpicker('val') isnt ''  
                        @$el.find('input[name="custom-menu-name"],input[name="custom-menu-url"]').val ''
                        @$el.find('input[name="custom-menu-url"]').next('.field-error').remove()

                'keypress input[name="custom-menu-name"],input[name="custom-menu-url"]' : ->
                    @$el.find('#page_id').selectpicker 'val', ''

                'click .add-menu-item': 'addMenuItem'

            addMenuItem : ->
                @$el.find('.alert').remove()
                data = {}
                if @ui.menuName.val() isnt ''
                    if not @ui.customUrlField.valid() then return
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
                pages = pages.toJSON()
                pages = _.reject pages, (page)-> 
                            title = page['post_title']
                            title is 'Single Room' or title is 'Enkeltrom'
                data.pages = pages
                data

            onAddMenuitemSuccess : =>
                @ui.resetButton.click()

            onNewMenuCreated: ->
                @$el.find('.alert').remove()
                @$el.find('.add-menu-form').prepend '<div class="alert alert-success">New menu added</div>'
                @$el.find('#btn_resetmenu').click()

            onShow: ->
               @$el.find('select[name="page_id"]').selectpicker()
               @ui.form.validate
                            rules : 
                                "custom-menu-url" : 
                                            url2 : true