define ['app'], (App)->
    App.module "ChooseTheme.Views", (Views, App)->

        # single theme template
        class ThemeView extends Marionette.ItemView

            template: '<img src="{{image_url}}">
                        <h6 class="desc">{{post_title}}</h6>
                        <div class="aj-imp-choose-btn">
                            {{^currentTheme}}<a href="#" class="btn choose-theme"><span class="glyphicon glyphicon-ok"></span>&nbsp;Choose</a>{{/currentTheme}}
                            <a href="{{preview_link}}" target="_BLANK" class="btn"><span class="glyphicon glyphicon-eye-open"></span>&nbsp;Preview</a>
                        </div>
                        {{#currentTheme}}<div class="current-wrapper"><div class="current">Current Theme</div></div>{{/currentTheme}}'

            className: 'block'

            tagName: 'li'

            serializeData:->
                data = super()
                data.currentTheme = CURRENTTHEME is data.post_name
                data

            events:
                'click a.choose-theme': (e)->
                    e.stopPropagation()
                    e.preventDefault()
                    @$el.find('.choose-theme').text 'Applying...'
                    @trigger "choose:theme:clicked", @model



        # choose theme view
        class Views.ChooseThemeView extends Marionette.CompositeView

            template: '<h2 class="page-title">Choose a Theme for your Site</h2>\n<p class="desc">You can choose a theme to be applied across the pages of your site,\n    you will be able to customise your theme logo, colours, layout, and components\n    to suit your Site and preferences.</p>\n{{#ISTHEMESELECTED}}\n<button class="btn btn-danger cancel-theme-switch" type="button">Cancel</button>\n{{/ISTHEMESELECTED}}\n<div class="aj-imp-block-list">\n    <ul></ul>\n</div>'

            events:
                'click button.cancel-theme-switch' : ->
                    @trigger "cancel:theme:switch"

            className: 'aj-imp-theme-area'

            itemView: ThemeView

            itemViewContainer: '.aj-imp-block-list ul'

            serializeData:->
                data = super()
                data.ISTHEMESELECTED = ISTHEMESELECTED is 1
                data

            onShow: ->
                # add class to body
                $('body').addClass 'choose-theme-page'

            onClose: ->
                # remove body class
                $('body').removeClass 'choose-theme-page'

