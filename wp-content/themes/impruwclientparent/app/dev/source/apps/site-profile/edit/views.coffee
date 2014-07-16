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

            'click .fileinput-new' : ->
               @trigger "show:media:manager"

         # show the image
         serializeData : ->
            data = super()
            data.site_domain = data.site_domain.split( '.' ).shift()
            data.logo_url = "http://placehold.it/100&text=" + _.polyglot.t( 'Logo' ) if data.logo_url is ""
            data

         onShow : ->
            #@$el.scrollSections()
            @$el.find( 'select' ).selectpicker()

            # set affix
            @$el.find( '*[data-spy="affix"]' ).affix()

            # affix width
            w = $( '.aj-imp-right' ).width()
            @$el.find( '*[data-spy="affix"]' ).width( w )

            m = $( '.aj-imp-left' ).width()
            @$el.find( '*[data-spy="affix"]' ).css( 'margin-left', m )


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