#
#
#
define ["dashboard-app", 'backbone'], (App, Backbone) ->

    class LeftNavItems extends Backbone.Collection

    ##PUBLIC API FOR ENitity
    API =
        getLeftNavEntities: (action, param ={})->

            menuItems = new LeftNavItems
            
            menuItems.url = AJAXURL + '?action=get-menu-items'
            
            _.delay ()->
                menuItems.fetch
                        reset : true
                        data  : param
            , 20000

            menuItems


    #REQUEST HANDLERS
    App.reqres.setHandler "leftnav:entities", ->
        API.getLeftNavEntities()
