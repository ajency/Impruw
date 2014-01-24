#
#
#
define ["dashboard-app", 'backbone'], (App, Backbone) ->

    class Site extends Backbone.Model

    #PUBLIC API FOR ENitity
    API =
        getSiteProfile: ()->

            site = new Site
            
            site.url = AJAXURL + '?action=get-site-profile'
            
            site.fetch()
                        
            site


    #REQUEST HANDLERS
    App.reqres.setHandler "get:site:profile", ->

        API.getSiteProfile()
