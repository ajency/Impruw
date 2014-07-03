define ['app'
        'text!apps//language-translation/language-page-content/translated-page-content/templates/translatedpageview.html'], (App, translatedpageviewTpl)->

    App.module 'LanguageApp.LanguagePageContent.TranslatedPage.Views', (Views, App, Backbone, Marionette, $, _)->

        class TranslatedPageItemView extends Marionette.ItemView

            tagName : 'div'

            className : '.form-group.legend-group'

            template : '<div class="col-sm-12">
                            <div class="form-group">
                                <div class="col-sm-10">
                                    <textarea type="text" class="form-control">{{content}}</textarea>
                                    <button class="btn btn-xs aj-imp-orange-btn"  id="btn-save-translated-element">
                                        Save
                                    </button>
                                </div>
                            </div>
                         </div>'

        class Views.TranslatedPageView extends Marionette.CompositeView

            template : translatedpageviewTpl

            itemView : TranslatedPageItemView

            itemViewContainer : '#translated-page-elements'