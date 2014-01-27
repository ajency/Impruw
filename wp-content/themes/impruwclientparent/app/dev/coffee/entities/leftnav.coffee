define ["app", 'backbone'], (App, Backbone) ->

    App.module "Entities.LeftNavItems", ( LeftNavItems, App, Backbone, Marionette, $, _ )->

        # Menu model
        class LeftNavItems.MenuItem extends Backbone.Model

        # Left Nav Items
        class LeftNavItems.MenuItems extends Backbone.Collection

            model : LeftNavItems.MenuItem


        # PUBLIC API FOR ENitity
        API =
            getLeftNavEntities: (action, param ={})->

                menuItems = new LeftNavItems.MenuItems
                
                menuItems.url = AJAXURL + '?action=get-menu-items'
                
                menuItems.fetch
                            reset : true
                            data  : param
                            
                menuItems


        # REQUEST HANDLERS
        App.reqres.setHandler "leftnav:entities", ->
            API.getLeftNavEntities()
