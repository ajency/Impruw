define ["app", 'backbone'], (App, Backbone) ->

        App.module "Entities.Themes", (Themes, App, Backbone, Marionette, $, _)->

        	# Theme Model
            class Themes.ThemeModel extends Backbone.Model

                idAttribute : 'ID'

            	defaults :->
                    post_title  : ''
                    image_url   : ''
                    preview_link: '#'

                name : 'theme'



            # Theme collection
            class Themes.ThemeCollection extends Backbone.Collection

                # model
                model : Themes.ThemeModel

                url : ->
                	"#{AJAXURL}?action=get-themes"


                
            # PUBLIC API FOR ENitity
            API =
                getThemesCollection: (param = {})->
                    themes = new Themes.ThemeCollection
                    themes


            # REQUEST HANDLERS
            App.reqres.setHandler "get:themes:collection", ->
                API.getThemesCollection()