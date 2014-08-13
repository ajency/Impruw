define ['app'], (App)->

            App.module 'LanguageApp.LanguagePageNav.Views', (Views, App, Backbone, Marionette, $, _)->


                class LanguagePageNavItemView extends Marionette.ItemView

                    tagName: "li"

                    template : '{{#isChildSitePage}}<a {{#isRoomPage}}href="#rooms"{{/isRoomPage}} {{^isRoomPage}}href="#page"{{/isRoomPage}} {{#isRoomPage}}id="rooms"{{/isRoomPage}} {{^isRoomPage}}id="page"{{/isRoomPage}} data-toggle="tab" data-pageid = {{pageId}}>{{pageTitle}}</a>{{/isChildSitePage}}'

                    events:
                    	'click a#rooms' : 'loadRoomContent'
                    	'click a#page' : 'loadPageContent'

                    loadRoomContent: (e) ->
                        @trigger "page:room:content"

                    loadPageContent: (e) ->
                        pageId = $(e.currentTarget).attr('data-pageid')
                        @trigger "page:content", pageId


                class Views.LanguagePageNavView extends Marionette.CompositeView  
                   
                    template : '<ul class="nav nav-pills" id="js-page-nav-bar">
                                    <li>
                                        <a href="#site" id="site" data-toggle="tab">
                                        Site Profile
                                        </a>
                                    </li>
                                </ul>'

                    itemView :  LanguagePageNavItemView 

                    itemViewContainer : '#js-page-nav-bar' 

                    events:
                        'click a#site' : 'loadSiteContent'

                    loadSiteContent: (e) ->
                        @trigger "site:translate:content"

