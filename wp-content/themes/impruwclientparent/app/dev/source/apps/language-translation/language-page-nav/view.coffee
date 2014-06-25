define ['app'], (App)->

            App.module 'LanguageApp.LanguagePageNav.Views', (Views, App, Backbone, Marionette, $, _)->


                class LanguagePageNavItemView extends Marionette.ItemView

                    tagName: "li"

                    template : '{{#isChildSitePage}}<a {{#isRoomPage}}href="#rooms"{{/isRoomPage}} {{^isRoomPage}}href=""{{/isRoomPage}} {{#isRoomPage}}id="rooms"{{/isRoomPage}} data-toggle="tab">{{pageTitle}}</a>{{/isChildSitePage}}'

                    events:
                    	'click a#rooms' : 'loadPageContent'

                    loadPageContent: (e) ->
                        @trigger "page:room:content"

                class Views.LanguagePageNavView extends Marionette.CollectionView  
                    
                    tagName : 'ul'

                    className : 'nav nav-pills'

                    itemView :  LanguagePageNavItemView  

