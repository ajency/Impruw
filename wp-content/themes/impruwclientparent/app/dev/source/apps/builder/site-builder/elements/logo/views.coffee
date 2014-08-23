define [ 'app' ], ( App )->

	# Row views
	App.module 'SiteBuilderApp.Element.Logo.Views', ( Views, App, Backbone, Marionette, $, _ )->

		# Menu item view
		class Views.LogoView extends App.SiteBuilderApp.Element.Image.Views.ImageView

			className : 'logo'

			template : '{{#image}}
							 <img src="{{imageurl}}" alt="{{title}}" class="{{alignclass}} img-responsive"/>
							 <div class="clearfix"></div>
						{{/image}}
						{{#placeholder}}
							 <div class="image-placeholder"><span class="bicon icon-uniF10E"></span>Logo</div>
						{{/placeholder}}'