define ['app'
        'text!apps/seo/templates/seo-page-view.html'], (App, seoPageTpl )->

            App.module 'SeoApp.SeoPageContent.Views', (Views, App, Backbone, Marionette, $, _)->


                class Views.SeoPageContentView extends Marionette.ItemView

                    template: seoPageTpl

                    className : 'tab-content'

                    events:
                        "click #btn-save-seo-details" : 'saveSeoPageDetails'

                    saveSeoPageDetails: (e) ->
                        e.preventDefault()
                        newSeoTitle = $("#seo_title").val()
                        newSeoDesc = $("#seo_meta_description").val()
                        newSeoKeywords = $("#seo_meta_keywords").val()
                        includeSiteMapCheckbox = @$el.find("input[type='checkbox']")

                        if includeSiteMapCheckbox.is(":checked")
                            includeSiteMap = true
                        else
                            includeSiteMap = false

                        @trigger "page:seo:save", newSeoTitle , newSeoDesc, newSeoKeywords, includeSiteMap

                    onPageSeoUpdated :->
                        @$el.find('.alert').remove()
                        @$el.append('<div class="alert alert-success">'+_.polyglot.t("Page Seo Details updated")+'</div>')
                        @$el.find('.alert').fadeOut 5000






