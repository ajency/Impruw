define ['app'], (App)->

            App.module 'SeoApp.SeoPageNav.Views', (Views, App, Backbone, Marionette, $, _)->


                class SeoPageNavItemView extends Marionette.ItemView

                    tagName: "li"

                    template : '{{#isSeoPage}}<a {{#isRoomPage}}href="#rooms"{{/isRoomPage}} {{^isRoomPage}}href="#page"{{/isRoomPage}} {{#isRoomPage}}id="rooms"{{/isRoomPage}} {{^isRoomPage}}id="page"{{/isRoomPage}} data-toggle="tab" data-pageid = {{pageId}}>{{pageTitle}}</a>{{/isSeoPage}}'

                    events:
                    	# 'click a#rooms' : 'loadRoomContent'
                    	'click a#page' : 'loadPageContent'

                    # loadRoomContent: (e) ->
                    #     @trigger "page:room:content"

                    mixinTemplateHelpers: (data)->
                        data = super data
                        data.isSeoPage =->
                            skipPages = new Array()
                            skipPages = ['single-room','habitacion-individual','einzelzimmer','chambre-simple','enkeltrom','dashboard','site-builder','sample-page','sign-in','support','reset-password','coming-soon','logg-in','kommer-snart','resett-passord']
                            foundPage = $.inArray data.pageHref, skipPages
                            if foundPage isnt -1
                                isSeoPage = false
                            else
                                isSeoPage = true
                            isSeoPage
                            
                        data

                    loadPageContent: (e) ->
                        pageId = $(e.currentTarget).attr('data-pageid')
                        @trigger "page:content", pageId


                class Views.SeoPageNavView extends Marionette.CompositeView  
                   
                    template : '<ul class="nav nav-pills" id="js-seo-nav-bar">
                                    <!--li>
                                        <a href="#site" id="site" data-toggle="tab">
                                        {{#polyglot}}Site{{/polyglot}}
                                        </a>
                                    </li-->
                                    <li>
                                        <a href="#seo-rooms" id="seo-rooms" data-toggle="tab">
                                        {{#polyglot}}All Rooms{{/polyglot}}
                                        </a>
                                    </li> 
                                </ul>'

                    onShow:->
                        @loadSeoRoomContent()
                        @$el.find( "li" ).first().addClass( 'active' )

                    childView :  SeoPageNavItemView 

                    itemViewContainer : '#js-seo-nav-bar' 

                    events:
                        'click a#seo-rooms' : 'loadSeoRoomContent'
                        # 'click a#site' : 'loadSiteContent'

                    loadSeoRoomContent: (e) ->
                        @trigger "seo:room:content"

                    # loadSiteContent: (e) ->
                    #     @trigger "site:translate:content"

