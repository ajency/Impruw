define ['app'
        'text!apps/seo/templates/seo-page-view.html'], (App, seoPageTpl )->

            App.module 'SeoApp.SeoPageContent.Views', (Views, App, Backbone, Marionette, $, _)->


                class Views.SeoPageContentView extends Marionette.ItemView

                    template: seoPageTpl

                    className : 'tab-content'

                    events:
                    	"click #btn-save-seo-details": (e) ->
                    		e.preventDefault()
                    		newSeoTitle = $("#seo_title").val()
                    		newSeoDesc = $("#seo_meta_description").val()
                    		newSeoKeywords = $("#seo_meta_keywords").val()
                    		@trigger "page:seo:save", newSeoTitle , newSeoDesc, newSeoKeywords

                    onPageSeoUpdated :->
                    	console.log "success"






