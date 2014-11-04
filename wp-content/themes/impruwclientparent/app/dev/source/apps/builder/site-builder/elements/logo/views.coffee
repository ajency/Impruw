define [ 'app' 
		'apps/builder/site-builder/elements/image/views'
], ( App )->

	# Row views
	App.module 'SiteBuilderApp.Element.Logo.Views', ( Views, App, Backbone, Marionette, $, _ )->

		# Menu item view
		class Views.LogoView extends App.SiteBuilderApp.Element.Image.Views.ImageView

			className : 'logo'

			template : '{{#image}}
							 <img src="{{imageurl}}" alt="{{title}}" class="{{alignclass}} img-responsive "/>
							 <div class="clearfix"></div>
						{{/image}}
						{{#imageNotFound}}
                            <div class="image-placeholder" style="height:100%;"><span class="bicon icon-uniF10E"></span>{{#polyglot}}Image not found. Upload new image.{{/polyglot}}</div>
                        {{/imageNotFound}}
						{{#placeholder}}
							 <div class="image-placeholder"><span class="bicon icon-uniF10E"></span>Logo</div>
						{{/placeholder}}'