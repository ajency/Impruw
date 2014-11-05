define ['app'], (App)->

    App.module 'LanguageApp.LanguagePageContent.TranslatedSlider.Views', (Views, App, Backbone, Marionette, $, _)->

        class TranslatedSlideItemView extends Marionette.ItemView

            template : '
                <div class="form-group legend-group">
                    <div class="col-sm-12"> 
                        <div class="form-group trans-field"> 
                            <div class="col-sm-10"> 
                                    {{#captionAdded}}<input type="text" class="form-control translated-element-content title" id="translated-slidercaption-title" value="{{captionTitle}}">
                                        <button id="btn-save-slider-translation-element" class="btn btn-xs trans-action aj-imp-orange-btn"> Save </button>{{/captionAdded}}
                                    {{^captionAdded}}<div class="form-control translated-element-content title">
                                        <p>{{captionTitle}}</p>
                                    </div> {{/captionAdded}}
                               
                            </div> 
                        </div> 
                    </div>
                </div>
                <div class="form-group legend-group">
                    <div class="col-sm-12"> 
                        <div class="form-group trans-field"> 
                            <div class="col-sm-10">
                                {{#captionAdded}}<textarea class="form-control translated-element-content text" id="translated-slidercaption-desc">{{captionDesc}}</textarea>
                                    <input type="hidden" id="translated-slideparent-id" value="{{slideParentId}}">
                                    <input type="hidden" id="translated-slider-id" value="{{sliderId}}">
                                    <button id="btn-save-slider-translation-element" class="btn btn-xs trans-action aj-imp-orange-btn"> Save </button> {{/captionAdded}}
                                {{^captionAdded}}<div class="form-control translated-element-content text">
                                    <p>{{captionDesc}}</p>
                                </div> {{/captionAdded}}
                            </div> 
                        </div> 
                    </div>
                </div>'

            events:
                "click #btn-save-slider-translation-element" : "updatePageSlide"

            mixinTemplateHelpers: (data)->
                data = super data

                editingLanguage = Marionette.getOption @, 'editingLanguage'


                data.captionAdded = ->
                    captionAdded = true
                    if data[editingLanguage] isnt undefined
                        if data[editingLanguage]['layers']['0'] isnt undefined
                            captionAdded = true
                        else
                            captionAdded = false
                    captionAdded

                data.captionTitle = ->
                    if data[editingLanguage] isnt undefined
                        if data[editingLanguage]['layers']['0'] isnt undefined
                            captionHtml = data[editingLanguage]['layers']['0']['text']
                            captionHtml = '<div>'+captionHtml+'</div>'
                            captionTitle = $(captionHtml).find('.title').text()
                        else
                            captionTitle = "No caption title added"
                    else
                        captionTitle = ""
                    captionTitle = _.stripslashes captionTitle
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
                    captionDesc = _.stripslashes captionDesc
                    captionDesc

                data.slideParentId = ->
                    parentId = data['all']['id']
                    parentId

                data.sliderId = ->
                    sliderId = data['all']['slider_id']
                    sliderId
                data

            updatePageSlide:(e) ->
                e.preventDefault()
                
                newCaptionTitle  = @$el.find('#translated-slidercaption-title').val()
                newCaptionDesc = @$el.find('#translated-slidercaption-desc').val()
                slideParentId = @$el.find('#translated-slideparent-id').val()
                sliderId = @$el.find('#translated-slider-id').val()
                
                @trigger "page:slide:updated", newCaptionTitle, newCaptionDesc, slideParentId,sliderId

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
