define ['app'
        'text!apps//language-translation/language-page-content/original-page-content/templates/originalpageview.html'], (App, originalpageviewTpl)->

    App.module 'LanguageApp.LanguagePageContent.OriginalPage.Views', (Views, App, Backbone, Marionette, $, _)->

        class OriginalPageItemView extends Marionette.ItemView

            tagName : 'div'

            className : 'form-group legend-group'

            template : '<div class="col-sm-12">
                            <div class="form-group">
                                <label class="col-sm-3 control-label" for="">{{element}}</label>
                                <div class="col-sm-9 col-sm-offset-3">
                                    <p class="original {{TypeOfElementClass}}" tabindex="1">
                                        {{{content.en}}}
                                    </p>
                                </div>
                            </div>
                        </div>'

            mixinTemplateHelpers: (data)->
                data = super data
                originalLanguage = Marionette.getOption @, 'originalLanguage'
                data.TypeOfElementClass = ->
                    if data.element is "Title"
                        return "title-class"
                    else
                        return "text-class"
                data


        class Views.OriginalPageView extends Marionette.CompositeView

            template : originalpageviewTpl

            itemView : OriginalPageItemView

            itemViewContainer : '#translatable-page-elements'

            itemViewOptions : ->
                language = Marionette.getOption @, 'language'
                originalLanguage : language
