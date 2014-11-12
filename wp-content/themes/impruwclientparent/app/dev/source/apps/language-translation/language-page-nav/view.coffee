define ['app'], (App)->

            App.module 'LanguageApp.LanguagePageNav.Views', (Views, App, Backbone, Marionette, $, _)->


                class LanguagePageNavItemView extends Marionette.ItemView

                    tagName: "li"

                    template : '{{#isChildSitePage}}<a href="#page" id="page" data-toggle="tab" data-pageid = {{pageId}}>{{pageTitle}}</a>{{/isChildSitePage}}'

                    events:
                    	'click a#page' : 'loadPageContent'

                    loadPageContent: (e) ->
                        pageId = $(e.currentTarget).attr('data-pageid')
                        @trigger "page:content", pageId


                class Views.LanguagePageNavView extends Marionette.CompositeView  
                   
                    template : '<ul class="nav nav-pills" id="js-page-nav-bar">
                                    <li>
                                        <a href="#site" id="site" data-toggle="tab">
                                        {{#polyglot}}Site Profile{{/polyglot}}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#page-header" id="page-header" data-toggle="tab">
                                        {{#polyglot}}Page Header{{/polyglot}}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#page-footer" id="page-footer" data-toggle="tab">
                                        {{#polyglot}}Page Footer{{/polyglot}}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#rooms" id="rooms" data-toggle="tab">
                                        {{#polyglot}}All Rooms{{/polyglot}}
                                        </a>
                                    </li>                                    

                                </ul>'

                    childView :  LanguagePageNavItemView 

                    childViewContainer : '#js-page-nav-bar' 

                    events:
                        'click a#site' : 'loadSiteContent'
                        'click a#page-header' : 'loadHeaderContent'
                        'click a#page-footer' : 'loadFooterContent'
                        'click a#rooms' : 'loadRoomContent'

                    loadSiteContent: (e) ->
                        @trigger "site:translate:content"

                    loadHeaderContent: (e) ->
                        @trigger "header:translate:content"

                    loadFooterContent: (e) ->
                        @trigger "footer:translate:content"

                    loadRoomContent: (e) ->
                        @trigger "page:room:content"

