define ['app'], (App)->
    App.module 'SeoApp.SeoLanguage.Views', (Views, App, Backbone, Marionette, $, _)->
        class Views.SeoLanguageView extends Marionette.ItemView

            template: '<h6 class="aj-imp-sub-head-thin">
                            {{#polyglot}}Select Language{{/polyglot}} &nbsp;
                            <select class="selectpicker js-seo-languages" id="select_seo_language">
                            </select>
                        </h6> '

            events:
                "click div.js-seo-languages ul.selectpicker li": "loadLanguagePageNav"

            
            onShow:->
                _.each @collection.models, (model,index)=>
                    language_select_status = model.get 'selectStatus'
                    language_code = model.get 'code'
                    language_name = model.get 'languageName'

                    if language_select_status is true 
                        html = "<option value='"+language_code+"' >"+language_name+"</option>"
                        @$el.find('#select_seo_language').append html

                @$el.find('#select_seo_language').selectpicker()

            loadLanguagePageNav: (e)->
                selectedLangVal = langName = @$el.find( '#select_seo_language' ).val()
                @trigger 'load:seo:page:nav', selectedLangVal


