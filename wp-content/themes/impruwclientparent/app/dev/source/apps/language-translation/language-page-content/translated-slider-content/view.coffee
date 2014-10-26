define ['app'], (App)->

    App.module 'LanguageApp.LanguagePageContent.TranslatedSlider.Views', (Views, App, Backbone, Marionette, $, _)->

        class TranslatedSlideItemView extends Marionette.ItemView

            template : '
                <div class="form-group legend-group">
                    <div class="col-sm-12"> 
                        <div class="form-group trans-field"> 
                            <div class="col-sm-10"> 
                                    <input type="text" class="form-control translated-element-content title" id="translated-slidercaption-title" value="{{captionTitle}}">
                               
                            </div> 
                        </div> 
                    </div>
                </div>
                <div class="form-group legend-group">
                    <div class="col-sm-12"> 
                        <div class="form-group trans-field"> 
                            <div class="col-sm-10">
                                <input type="text" class="form-control translated-element-content text" id="translated-slidercaption-desc" value="{{captionDesc}}"><button id="btn-save-slider-translation-element" class="btn btn-xs trans-action aj-imp-orange-btn"> Save </button> 
                            </div> 
                        </div> 
                    </div>
                </div>'

            mixinTemplateHelpers: (data)->
                data = super data

                editingLanguage = Marionette.getOption @, 'editingLanguage'

                console.log editingLanguage+" is the editing language"

                data.captionTitle = ->
                    if data[editingLanguage] isnt undefined
                        if data[editingLanguage]['layers']['0'] isnt undefined
                            captionHtml = data[editingLanguage]['layers']['0']['text']
                            captionHtml = '<div>'+captionHtml+'</div>'
                            captionTitle = $(captionHtml).find('.title').html()
                        else
                            captionTitle = "No caption title added"
                    else
                        captionTitle = ""

                    captionTitle
                    
                    
                data.captionDesc = ->
                    if data[editingLanguage] isnt undefined
                        if data[editingLanguage]['layers']['0'] isnt undefined
                            captionHtml = data[editingLanguage]['layers']['0']['text']
                            captionHtml = '<div>'+captionHtml+'</div>'
                            captionDesc = $(captionHtml).find('.text').html()
                        else
                            captionDesc = "No caption description added"
                    else
                        captionDesc = ""
                    captionDesc
                data

        class TranslatedSlideView extends Marionette.CompositeView

            template : '<h6 class="aj-imp-sub-head-thin"><small>&nbsp;</small></h6>
                        <div id="translated-page-slide">
                        </div>
                        <hr>'

            itemView : TranslatedSlideItemView

            itemViewContainer : '#translated-page-slide'


            initialize :->
                collection = new Backbone.Collection @model.get('slides')
                @collection = collection

            itemViewOptions : ->
                editingLanguage = Marionette.getOption @, 'editingLanguage'
                editingLanguage : editingLanguage



        class Views.TranslatedSliderView extends Marionette.CompositeView

            template : '<div id="translated-page-slider">
                        </div>'

            itemView : TranslatedSlideView

            itemViewContainer : '#translated-page-slider'

            itemViewOptions : ->
                language = Marionette.getOption @, 'language'
                editingLanguage : language
