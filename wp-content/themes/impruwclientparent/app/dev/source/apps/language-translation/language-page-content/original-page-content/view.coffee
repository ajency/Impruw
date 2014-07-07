define ['app'
        'text!apps//language-translation/language-page-content/original-page-content/templates/originalpageview.html'], (App, originalpageviewTpl)->

    App.module 'LanguageApp.LanguagePageContent.OriginalPage.Views', (Views, App, Backbone, Marionette, $, _)->

        class OriginalPageItemView extends Marionette.ItemView

            tagName : 'div'

            className : '.form-group.legend-group'

            template : '<div class="col-sm-12">
                            <div class="form-group">
                                <label class="col-sm-3 control-label" for="">{{element}}</label>
                                <div class="col-sm-9 col-sm-offset-3">
                                    <p class="original">
                                        {{content.en}}
                                    </p>
                                </div>
                            </div>
                        </div>'


        class Views.OriginalPageView extends Marionette.CompositeView

            template : originalpageviewTpl

            itemView : OriginalPageItemView

            itemViewContainer : '#translatable-page-elements'
