define ['app'], (App)->

    # Row views
    App.module 'SiteBuilderApp.Element.Social.Views', (Views, App, Backbone, Marionette, $, _)->
        class SocialItem extends Marionette.ItemView
            tagName: 'li'
            template: '<a href="{{sociallink}}" target="_BLANK"><span class="name">{{socialname}}</span></a>'
            # add a class to li to allow diferent styles for each social item
            onRender: ->
                @$el.find('a').addClass "icon-#{_.slugify @model.get 'socialname'}"

        # Social element view
        class Views.SocialView extends Marionette.CollectionView
            
            tagName: 'ul'
            
            className: 'social'
            
            itemView: SocialItem
            
            onRender: ()->
                # get the className from options
                style = Marionette.getOption @, 'style'
                className = _.slugify style
                @$el.addClass className


            onShow: ->
                @$el.attr "data-content", "Please visit <a href='#url'>to update social links</a> "
                @$el.popover
                    html : true
                    placement : 'top'
