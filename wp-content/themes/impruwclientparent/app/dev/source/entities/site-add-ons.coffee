define ["app", 'backbone'], (App, Backbone) ->
    App.module "Entities.SiteAddOns", (SiteAddOns, App, Backbone, Marionette, $, _)->

       # Language model
        class SiteAddOns.SiteAddOnModel extends Backbone.Model
            name: 'siteaddons'
            idAttribute: 'element' 

		#Languages Collection class
        class SiteAddOns.SiteAddOnsCollection extends Backbone.Collection

            model: SiteAddOns.SiteAddOnModel

            url: ->
                AJAXURL + '?action=get-site-addons'

        

        #Public API
        API =
            getSiteAddOns: ()->
                siteAddOns = new SiteAddOns.SiteAddOnsCollection
                siteAddOns.fetch()
                siteAddOns

            getSelectedSiteAddOns: ()->
                siteaddons = this.getSiteAddOns()
                selectedSiteAddOns = new SiteAddOns.SiteAddOnsCollection 
                selectedSiteAddOns.set (siteaddons.where 'selectStatus': true )
                selectedSiteAddOns


        #App request handlers
        App.reqres.setHandler "get:all:site:addons", ->
            API.getSiteAddOns()  

        App.reqres.setHandler "get:selected:site:addons", ->
            API.getSelectedSiteAddOns()                                                  