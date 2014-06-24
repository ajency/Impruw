define ['app'], (App)->

            App.module 'LanguageApp.LanguagePageNav.Views', (Views, App, Backbone, Marionette, $, _)->


                class LanguagePageNavItemView extends Marionette.ItemView

                    tagName: "li"

                    template : '{{#isChildSitePage}}<a href="#rooms" data-toggle="tab">{{pageTitle}}</a>{{/isChildSitePage}}'

                    onRender : ->
                    
                    onShow: ->

                class Views.LanguagePageNavView extends Marionette.CollectionView  
                    
                    tagName : 'ul'

                    className : 'nav nav-pills'

                    itemView :  LanguagePageNavItemView     

                    onShow: ->