define ['app'], (App)->

    # Row views
    App.module 'SiteBuilderApp.Element.Link.Views', (Views, App, Backbone, Marionette, $, _)->

        # Menu item view
        class Views.LinkView extends Marionette.ItemView

            tagName: 'span'

            template: '<a href="{{link}}" target="{{target}}">{{textContent}}</a>'

            className: 'link'

            mixinTemplateHelpers: (data)->
                data = super data

                data.textContent = ->
                    textContent = data.text[WPML_DEFAULT_LANG]
                    textContent = _.stripslashes textContent
                    return textContent
                data

            onRender: ()->
                className = _.slugify @model.get 'style'
                @$el.addClass className

            # avoid and anchor tag click events
            events:
                'click a': (e)->
                    e.preventDefault()
						

