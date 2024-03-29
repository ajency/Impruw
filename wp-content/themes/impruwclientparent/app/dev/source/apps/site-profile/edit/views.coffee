define [ 'app'
         'text!apps/site-profile/edit/templates/mainview.html'
         'text!apps/site-profile/edit/templates/siteprofile.html' ],
( App, mainviewTpl, siteprofileTpl )->
    App.module 'SiteProfileApp.Edit.View', ( View, App, Backbone, Marionette, $, _ )->
        class View.MainView extends Marionette.ItemView

            template : mainviewTpl

            events :
                'click #btn_savesitedetails' : ->
                    @trigger "save:site:profile", Backbone.Syphon.serialize @

                'click .fileinput-logo' : ->
                    @trigger "show:media:manager",'logo'

                'click .fileinput-favicon .fileinput-preview' : ->
                    @trigger 'show:media:manager', 'favicon'

                'click .domain-update' : ->
                    domainName = @$el.find( '#domain-name' ).val()
                    @trigger "update:domain:mapping:name", domainName               
                    

                'click .refresh-map-btn' : ->
                    address = ''
                    if @$el.find('input[name="street"]').val() isnt ''
                        address += @$el.find('input[name="street"]').val() + ',' 
                    if @$el.find('input[name="city"]').val() isnt ''
                        address += @$el.find('input[name="city"]').val() + ',' 
                    if @$el.find('input[name="postal_code"]').val() isnt ''
                        address += @$el.find('input[name="postal_code"]').val() + ',' 
                    address += @$el.find( 'select[name="country"]' ).selectpicker 'val'
                    @trigger 'refresh:map:view', address

                'click .remove-favicon' : (e)->
                    e.preventDefault()
                    @$el.find( '#favicon_id' ).attr 'value', 0
                    @$el.find( '.site_favicon_images' ).attr 'src', "http://placehold.it/100&text=" + _.polyglot.t( 'Favicon' )
                    @$el.find('.remove-favicon').addClass 'hide'


            # show the image
            serializeData : ->
                data = super()
                data.site_domain = data.site_domain.split( '.' ).shift()
                data.logo_url = "http://placehold.it/100&text=" + _.polyglot.t( 'Logo' ) if data.logo_url is ""
                data.favicon_url = "http://placehold.it/100&text=" + _.polyglot.t( 'Favicon' ) if data.favicon_url is ""
                data.hideRemove = if data.favicon_id in ['',0,'0'] then "hide"  else ''
                data

            onShow : ->
                # subscriptionId = @model.get 'braintree_subscription'

                # if subscriptionId is "ImpruwFree" or subscriptionId is null
                #     @$el.find( '#domain-name' ).attr 'readonly', 'readonly'
                #     @$el.find( '.upgrade' ).show()
                #     @$el.find( '.domain-update, .update-help' ).hide()

                is_domain_mapping_allowed = @model.get 'domain_mapping_status'

                if is_domain_mapping_allowed is 0
                    @$el.find( '#domain-name' ).attr 'readonly', 'readonly'
                    @$el.find( '.upgrade' ).show()
                    @$el.find( '.domain-update, .update-help' ).hide()


                #@$el.scrollSections()
                @$el.find( 'select' ).selectpicker()
                @$el.find( 'select[name="country"]' ).selectpicker 'val',@model.get 'country'
                .selectpicker 'refresh'

                # set affix
                @$el.find( '*[data-spy="affix"]' ).affix()

                # affix width
                w = $( '.aj-imp-right' ).width()
                @$el.find( '*[data-spy="affix"]' ).width( w )

                m = $( '.aj-imp-left' ).width()
                @$el.find( '*[data-spy="affix"]' ).css( 'margin-left', m )

                address = @$el.find('input[name="street"]').val() + ',' +
                    @$el.find('input[name="city"]').val() + ',' + 
                    @$el.find('input[name="postal_code"]').val() + ',' +
                    @$el.find( 'select[name="country"]' ).selectpicker 'val'
                console.log address
                # if _.trim(address) isnt ''
                @trigger 'show:map:view', address


            onSiteProfileAdded : ->
                @$el.find( '.alert' ).remove()
                @$el.find( '#form-siteprofile' ).prepend '<div class="alert alert-success alert-dismissable">
                                                                            							<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
                _.polyglot.t( "Save successfully" ) + '</div>'
                $( 'html, body' ).animate
                    scrollTop : 0
                , 1000

            onSetLogo : ( media ) ->
                image_id = media.get 'id'
                media_size = media.get 'sizes'
                image_path = media_size.thumbnail.url
                #@$el.find('.fileinput-preview ').append '<img src ="" class="site_profile_images"/>'
                @$el.find( '.site_profile_images' ).attr 'src', image_path
                @$el.find( '#logo_id' ).attr 'value', image_id

            onSetFavicon : ( media ) ->
                image_id = media.get 'id'
                media_size = media.get 'sizes'
                if media_size
                    image_path = media_size.thumbnail.url
                else 
                    image_path = media.get 'url'
                #@$el.find('.fileinput-preview ').append '<img src ="" class="site_profile_images"/>'
                @$el.find( '.site_favicon_images' ).attr 'src', image_path
                @$el.find( '#favicon_id' ).attr 'value', image_id
                @$el.find('.remove-favicon').removeClass 'hide'

            onDomainUpdate : ( Msg )->
                @$el.find( '#msg' ).empty()
                @$el.find( '#msg' ).text Msg

            onShowMap : (mapView)->
                @$el.find( '.map-region' ).html( mapView.render().$el )

                mapView.triggerMethod 'show'
