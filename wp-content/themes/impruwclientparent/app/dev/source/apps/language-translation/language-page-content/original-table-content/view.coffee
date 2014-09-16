define ['app'], (App)->

    App.module 'LanguageApp.LanguagePageContent.OriginalTable.Views', (Views, App, Backbone, Marionette, $, _)->

        class OriginalTableItemView extends Marionette.ItemView

            tagName : 'div'

            className : 'form-group legend-group'

            template : '<div class="col-sm-12">
                            <div class="form-group table-elements">
                                <label class="col-sm-3 control-label" for="">{{element_name}}</label>
                                <div class="col-sm-9 col-sm-offset-3">
                                    <div class="original {{element}}" tabindex="1">
                                        {{{contentText}}}
                                    </div>
                                </div>
                            </div>
                        </div>'

            mixinTemplateHelpers: (data)->
                data = super data
                data.element_name = ->
                    element_name = _.polyglot.t data.element
                    element_name
                data.contentText = ->
                    translated_text = data.content[WPML_DEFAULT_LANG] ? data.content
                    translated_text = _.stripslashes translated_text 
                    translated_text
                data

        class Views.OriginalTableView extends Marionette.CompositeView

            template : '<div id="original-page-table"></div>'

            itemView : OriginalTableItemView

            itemViewContainer : '#original-page-table'
