define ['app'
        'text!apps/menu-manager/add/templates/addmenu.html'], (App, addmenuTpl)->
    App.module 'MenuManager.Add.Views', (Views, App)->
        class Views.MenuItemView extends Marionette.ItemView

            template: addmenuTpl

            className: 'aj-imp-menu-edit'


            events:
                'click .add-menu-item': ->
                    formdata = Backbone.Syphon.serialize @
                    @trigger "add:menu:item:clicked", formdata


            onNewMenuCreated: ->
                @$el.find('.alert').remove()
                @$el.find('.add-menu-form').prepend '<div class="alert alert-success">New menu added </div>'
                @$el.find('#btn_resetmenu').click()

            onShow: ->
                pages = App.request "get:editable:pages"
                _.each pages.models, (model, index) ->
                    page_name = model.get 'post_title'
                    page_url = model.get 'guid'
                    html = "<li rel='#{index}'>
                    										<a style='' class='' href='#' link='#{page_url}' >
                    											<span class='text'>#{page_name}</span>
                    											<i class='glyphicon glyphicon-ok icon-ok check-mark'></i>
                    										</a>
                    									</li>"
                    $('#menu-item-page-url').append(html)


                @$el.find('select#aj-imp-page-sel-item').selectpicker
                    style: 'btn-xs btn-default'
                    menuStyle: 'dropdown'

                @$el.find('#menu-item-page-url li a ').click ->
                    menu_url = $(this).attr 'link'
                    $('#menu_item_url').val menu_url
						
