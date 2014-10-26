define ['app'], (App)->

    App.module 'LanguageApp.LanguagePageContent.OriginalSlider.Views', (Views, App, Backbone, Marionette, $, _)->

        class OriginalSlideItemView extends Marionette.ItemView

            template : '<div class="form-group legend-group">
                            <div class="col-sm-12"> 
                                <div class="form-group"> 
                                    <label for="" class="col-sm-3 control-label">Caption</label> 
                                    <div class="col-sm-9 col-sm-offset-3"> 
                                        <div tabindex="1" class="original title"> {{{captionTitle}}} </div> 
                                    </div> 
                                </div> 
                            </div>
                        </div>
                        <div class="form-group legend-group">
                            <div class="col-sm-12"> 
                                <div class="form-group"> 
                                    <label for="" class="col-sm-3 control-label">Description</label> 
                                    <div class="col-sm-9 col-sm-offset-3"> 
                                        <div tabindex="1" class="original text"> {{captionDesc}} </div> 
                                    </div> 
                                </div> 
                            </div>
                        </div>'

            mixinTemplateHelpers: (data)->
                data = super data
                console.log data
                data.captionTitle = ->
                    if data[WPML_DEFAULT_LANG]['layers']['0'] isnt undefined
                        captionHtml = data[WPML_DEFAULT_LANG]['layers']['0']['text']
                        captionHtml = '<div>'+captionHtml+'</div>'
                        captionTitle = $(captionHtml).find('.title').html()
                    else
                        captionTitle = "No caption title added"
                    captionTitle
                    
                    
                data.captionDesc = ->
                    if data[WPML_DEFAULT_LANG]['layers']['0'] isnt undefined
                        captionHtml = data[WPML_DEFAULT_LANG]['layers']['0']['text']
                        captionHtml = '<div>'+captionHtml+'</div>'
                        captionDesc = $(captionHtml).find('.text').html()
                    else
                        captionDesc = "No caption description added"
                    captionDesc
                data

        class OriginalSlideView extends Marionette.CompositeView

            template : '<h6 class="aj-imp-sub-head-thin"><small>{{element}}</small></h6>
                        <div id="original-page-slide">
                        </div>
                        <hr>'

            itemView : OriginalSlideItemView

            itemViewContainer : '#original-page-slide'


            initialize :->
                collection = new Backbone.Collection @model.get('slides')
                console.log collection
                @collection = collection



        class Views.OriginalSliderView extends Marionette.CompositeView

            template : '<div id="original-page-slider">
                        </div>
                        '

            itemView : OriginalSlideView

            itemViewContainer : '#original-page-slider'
