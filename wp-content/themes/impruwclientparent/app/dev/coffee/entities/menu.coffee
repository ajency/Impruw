define ["app", 'backbone'], (App, Backbone) ->

        App.module "Entities.Menus", (Menus, App, Backbone, Marionette, $, _)->

        	class Menus.MenuModel extends Backbone.Model


        	class Menus.MenuCollection extends Backbone.Collection

                        model : Menus.MenuModel


        	API = 
        		getMenus:(param = {})->

        			menus = new Menus.MenuCollection

        			menus.url = AJAXURL + '?action=get-menus'

        			menus.fetch
        					reset : true
        					data  : param

        			menus


        	App.reqres.setHandler "get:site:menus", ->

        		API.getMenus()		


        App.Entities.Menus