define ['app'], (App)->

    App.module 'LanguageApp.LanguagePageContent.TranslatedSlider.Views', (Views, App, Backbone, Marionette, $, _)->

        class TranslatedSlideItemView extends Marionette.ItemView

            template : '
                <div class="form-group legend-group">
                    <div class="col-sm-12"> 
                        <div class="form-group trans-field"> 
                            <div class="col-sm-10"> 
                                <div class="form-control translated-element-content title">
                                    <p>{{captionTitle}}</p>
                                </div>
                            </div> 
                        </div> 
                    </div>
                </div>
                <div class="form-group legend-group">
                    <div class="col-sm-12"> 
                        <div class="form-group trans-field"> 
                            <div class="col-sm-10"> 
                                <div class="form-control translated-element-content text">
                                    <p>{{captionDesc}}</p>
                                </div> 
                                <button id="btn-save-slider-translation-element" class="btn btn-xs trans-action aj-imp-orange-btn"> Save </button> 
                            </div> 
                        </div> 
                    </div>
                </div>'

            mixinTemplateHelpers: (data)->
                data = super data
                data.captionTitle = ->
                    captionHtml = data['layers']['0']['text']
                    captionHtml = '<div>'+captionHtml+'</div>'
                    captionTitle = $(captionHtml).find('.title').html()
                    captionTitle
                data.captionDesc = ->
                    captionHtml = data['layers']['0']['text']
                    captionHtml = '<div>'+captionHtml+'</div>'
                    captionDesc = $(captionHtml).find('.text').html()
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



        class Views.TranslatedSliderView extends Marionette.CompositeView

            template : '<div id="translated-page-slider">
                        </div>'

            itemView : TranslatedSlideView

            itemViewContainer : '#translated-page-slider'
