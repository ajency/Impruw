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
                                    <input class="form-control" placeholder="{{#polyglot}}Custom Menu Name{{/polyglot}}" type="text">
                                </div>
                                <div class="form-group">
                                    <label class="control-label">{{#polyglot}}URL{{/polyglot}}</label>
                                    <input class="form-control url" placeholder="{{#polyglot}}Custom Menu URL{{/polyglot}}" type="text">
                                </div>
                                <div class="form-group">
                                    <label class="control-label">&nbsp;</label>
                                    <!--<input type="hidden" value="{{id}}" name="menu_id"/> -->
                                    <button type="button" class="add-menu-item btn btn-default aj-imp-orange-btn"><span>{{#polyglot}}Add{{/polyglot}}</span></button>
                                    <input type="reset" id="btn_resetmenu" style="display:none">
                                </div>
                            </form>
                        </div>
                    </div>'

            className: 'aj-imp-menu-edit'


            events:
                'click .add-menu-item': ->
                    pageId = @$el.find('#page_id').val()
                    pageName = @$el.find('#page_id option:selected').text()

                    data =
                        'page_id' : pageId
                        'menu_item_title' : pageName

                    @trigger "add:menu:item:clicked", data

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
						
