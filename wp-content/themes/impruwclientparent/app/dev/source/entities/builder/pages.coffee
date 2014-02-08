define ["app", 'backbone'], (App, Backbone) ->

        App.module "Entities.Pages", (Pages, App, Backbone, Marionette, $, _)->

        	# Page Model
            class Pages.PageModel extends Backbone.Model

            	# defaults for 
            	defaults :->
            		post_title 	: ''
            		post_content: ''


            # Page collection
            class Pages.PageCollection extends Backbone.Collection

                # model
                model : Pages.PageModel

                url : ->
                	"#{AJAXURL}?action=get-pages"

                parse: (resp)->

                    return resp.data if resp.code is 'OK'


                
            # PUBLIC API FOR ENitity
            API =
                getPages: (param = {})->

                    pages = new Pages.PageCollection

                    pages.fetch
                                reset : true
                                data  : param
                                
                    pages


            # REQUEST HANDLERS
            App.reqres.setHandler "get:editable:pages", ->
                API.getPages()