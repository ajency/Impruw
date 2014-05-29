define ['app'
        'text!apps/leftnav/show/templates/leftNav.html'
        'text!apps/leftnav/show/templates/menuitem.html'],
(App, leftNavTpl, menuitemTpl)->
    App.module 'LeftNav.Show.View', (View, App, Backbone, Marionette, $, _)->
        class MenuItem extends Marionette.ItemView

            template : menuitemTpl

            serializeData : ()->
                data = @model.toJSON()

                data.slug = ->
                    _.slugify @title

                data

            onShow : ->
                submenu = @model.get 'submenu'

                if not _.isUndefined(submenu)

                    submenuTpl = @getSubmenuTpl submenu

                    @$el.find('.aj-imp-nav-create').append('<ul class="sub-menu">' + submenuTpl + '</ul>')

            getSubmenuTpl : (submenu) ->
                @submenuTpl = " "

                _.each submenu, (submenuData, index) =>
                    submenuLink = submenuData.url
                    submenuTitle = submenuData.title
                    submenuIcon = submenuData.icon
                    @submenuTpl += "<li>
                    												<a href='#{submenuLink}' data-route='##{submenuLink}'>#{submenuTitle}</a>
                    											</li>"
                @submenuTpl

        class View.LeftNav extends Marionette.CompositeView

            template : leftNavTpl

            itemViewContainer : '#aj-imp-dash-menu'

            itemView : MenuItem

            serializeData : ->
                data = super()

                data.SITEURL = SITEURL

                data

            onShow : ->
                # set the initial active menu depending on current hash
                hash = location.hash
                hash = hash.replace '#', ''
                @onSetActiveMenu hash

                jPM = $.jPanelMenu({
                    menu : '.aj-imp-dash-nav',
                    trigger : '#nav-trigger'
                })

                jPM.on()


            onSetActiveMenu : (link)=>
                @$el.find "li"
                .removeClass 'active'

                link = '#' + link

                @$el.find "a[data-route='#{link}']"
                .parent()
                .addClass 'active'

                jPM = $.jPanelMenu()

                jPM.close()