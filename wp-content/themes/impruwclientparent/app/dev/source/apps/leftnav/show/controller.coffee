define ['app', 'controllers/base-controller'
        'apps/leftnav/show/views', 'entities/leftnav'], (App, AppController)->
    App.module 'LeftNav.Show', (Show, App, Backbone, Marionette, $, _)->
        class Show.Controller extends AppController

            initialize : ()->
                @links = App.request "leftnav:entities"

                @view = new Show.View.LeftNav
                    collection : @links

                @listenTo App.vent, "set:active:menu", @setActiveMenu

                @listenTo @view ,"itemview:logout:clicked", @siteLogoutAjax

                @show @view,
                    loading : true

            setActiveMenu : (link)->
                @view.triggerMethod "set:active:menu", link

            siteLogoutAjax :->
                options =
                    url: AJAXURL,
                    method: 'POST',
                    data:
                        action: 'site-logout'

                $.ajax(options).done (response)->
                    window.location.href = response.redirect_url
                .fail (resp)->
                        console.log 'error'

				
	