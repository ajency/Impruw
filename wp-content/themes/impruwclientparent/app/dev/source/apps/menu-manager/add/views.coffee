define ['app'
        'text!apps/menu-manager/add/templates/addmenu.html'], (App, addmenuTpl)->
    App.module 'MenuManager.Add.Views', (Views, App)->
        class Views.MenuItemView extends Marionette.ItemView

            template: addmenuTpl

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
                @$el.find('.add-menu-form').prepend '<div class="alert alert-success">New menu added </div>'
                @$el.find('#btn_resetmenu').click()

            onShow: ->
               @$el.find('select[name="page_id"]').selectpicker()
						
