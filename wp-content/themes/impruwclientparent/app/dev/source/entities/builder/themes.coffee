define ["app", 'backbone'], (App, Backbone) ->

        App.module "Entities.Themes", (Themes, App, Backbone, Marionette, $, _)->

        	# Theme Model
            class Themes.ThemeModel extends Backbone.Model

            	defaults :->



            # Theme collection
            class Themes.ThemeCollection extends Backbone.Collection

                # model
                model : Themes.ThemeModel

                url : ->
                	"#{AJAXURL}?action=get-themes"


                
            # PUBLIC API FOR ENitity
            API =
                getThemes: (param = {})->

                    themes = new Themes.ThemeCollection

                    themes.fetch
                                reset : true
                                data  : param
                                
                    themes


            # REQUEST HANDLERS
            App.reqres.setHandler "get:themes", ->
                API.getThemes()