define ['app'
        'text!apps//language-translation/language-menus/translated-menu/templates/translatedmenuview.html'], (App, translatedmenuviewTpl)->

    App.module 'LanguageApp.LanguageMenuContent.TranslatedMenu.Views', (Views, App, Backbone, Marionette, $, _)->

       class TranslatedMenuItemView extends Marionette.ItemView

            tagName : 'div'

            className : 'form-group legend-group'

            template : '<div class="col-sm-12">
                            <div class="form-group trans-field">
                                <div class="col-sm-10">
                                    <input type="text" class="form-control title translated-menu-item-title" data-menu-item-id = {{ID}} value="{{title}}">
                                        <button class="btn btn-xs trans-action aj-imp-orange-btn btn-save-menu-item-translation">{{#polyglot}} Save {{/polyglot}}</button>
                                </div>
                            </div>
                        </div>'

            events:
                "click .btn-save-menu-item-translation" : "updateMenuItems"

            updateMenuItems:(e) ->
                e.preventDefault()
                
                translatedMenuItemTitle  = @$el.find('.translated-menu-item-title').val()
                menuItemId = @$el.find('.translated-menu-item-title').attr('data-menu-item-id')

                @trigger "menuitem:updated", translatedMenuItemTitle, menuItemId

        class EmptyMenuItemView extends Marionette.ItemView
            template: '<br/><div class="empty-info">&nbsp;</div><br/>'


        class TranslatedNavMenuView extends Marionette.CompositeView

            template : '<h6 class="aj-imp-sub-head-thin"><small>&nbsp;</h6>
                        <div class="translated-menu-items">
                        </div>
                        <hr>'

            itemView : TranslatedMenuItemView

            itemViewContainer : '.translated-menu-items'

            emptyView : EmptyMenuItemView


            initialize :->
                collection = new Backbone.Collection @model.get('custom_menu_items')
                @collection = collection


        class Views.TranslatedMenuView extends Marionette.CompositeView

            template : translatedmenuviewTpl

            itemView : TranslatedNavMenuView

            itemViewContainer : '#translated-menu-elements'


            serializeData: ()->
                data = super()
                data.translation_language = _.polyglot.t(data.translation_language)
                data

            itemViewOptions : ->
                language = Marionette.getOption @, 'language'
                editingLanguage : language



