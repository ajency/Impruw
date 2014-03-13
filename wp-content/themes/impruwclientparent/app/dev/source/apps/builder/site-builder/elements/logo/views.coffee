define ['app'],(App)->

	# Row views
	App.module 'SiteBuilderApp.Element.Logo.Views', (Views, App, Backbone, Marionette, $, _)->

		# Menu item view
		class Views.LogoView extends Marionette.ItemView

			className : 'logo'

			template : '{{#image}}
							<img src="{{imageurl}}" alt="{{title}}" class="{{alignclass}} img-responsive"/>
							<div class="clearfix"></div>
						{{/image}}
						{{#placeholder}}
							<div class="image-placeholder"><span class="bicon icon-uniF10E"></span>Upload Image</div>
						{{/placeholder}}'

			mixinTemplateHelpers:(data)->
				data = super data

				if @model.isNew()
					data.placeholder = true
				else
					data.image = true
					data.imageurl = ->
						@sizes['full'].url

				data

			events:
				'click'		: (e)->
								e.stopPropagation()
			
				'click a'	: (e)-> e.preventDefault()


