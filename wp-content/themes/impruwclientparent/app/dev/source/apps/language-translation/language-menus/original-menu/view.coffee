define ['app'
        'text!apps//language-translation/language-menus/original-menu/templates/originalmenuview.html'], (App, originalmenuviewTpl)->

    App.module 'LanguageApp.LanguageMenuContent.OriginalMenu.Views', (Views, App, Backbone, Marionette, $, _)->

        class OriginalMenuItemView extends Marionette.ItemView

            tagName : 'div'

            className : 'form-group legend-group'

            template : '<div class="col-sm-12">
                            <div class="form-group">
                                <label class="col-sm-3 control-label" for="">{{#polyglot}}Menu item{{/polyglot}}</label>
                                <div class="col-sm-9 col-sm-offset-3">
                                    <div class="original title" tabindex="1">
                                        {{title}}
                                    </div>
                                </div>
                            </div>
                        </div>'

            mixinTemplateHelpers: (data)->
                data = super data
                data.element_in_language = ->
                    element_in_language = _.polyglot.t(data.element)
                    return element_in_language
                data

        class EmptyMenuItemView extends Marionette.ItemView
            template: '<br/><div class="empty-info">{{#polyglot}}No custom menu items to translate{{/polyglot}}</div><br/>'

        class OriginalNavMenuView extends Marionette.CompositeView

            template : '<h6 class="aj-imp-sub-head-thin"><small>{{#polyglot}}Menu Name: {{/polyglot}}{{name}}</small></h6>
                        <div class="original-menu-items">
                        </div>
                        <hr>'

            itemView : OriginalMenuItemView

            itemViewContainer : '.original-menu-items'

            emptyView : EmptyMenuItemView


            initialize :->
                collection = new Backbone.Collection @model.get('custom_menu_items')
                @collection = collection


        class EmptyNavMenuView extends Marionette.ItemView
            template: '<br/><div class="empty-info">{{#polyglot}}No menus to translate{{/polyglot}}</div><br/>'


        class Views.OriginalMenuView extends Marionette.CompositeView

            template : originalmenuviewTpl

            itemView : OriginalNavMenuView

            itemViewContainer : '#translatable-menu-elements'

            emptyView : EmptyNavMenuView

            mixinTemplateHelpers: (data)->
                data = super data 
                data.language = ->
                    return WPML_DEFAULT_LANGUAGE_NAME  
                data
