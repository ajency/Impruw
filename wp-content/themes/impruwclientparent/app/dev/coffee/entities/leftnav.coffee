#
#
#
define ["app", 'backbone'], (App, Backbone) ->

    class LeftNavItems extends Backbone.Collection

    ##PUBLIC API FOR ENitity
    API =
        getLeftNavEntities: (action, param ={})->

            menuItems = new LeftNavItems
            
            menuItems.url = AJAXURL + '?action=get-menu-items'
            
            menuItems.fetch
                        reset : true
                        data  : param
                        
            menuItems


    #REQUEST HANDLERS
    App.reqres.setHandler "leftnav:entities", ->
        API.getLeftNavEntities()
