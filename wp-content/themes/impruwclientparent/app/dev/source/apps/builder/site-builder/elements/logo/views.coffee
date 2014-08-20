define [ 'app' ], ( App )->

	# Row views
	App.module 'SiteBuilderApp.Element.Logo.Views', ( Views, App, Backbone, Marionette, $, _ )->

		# Menu item view
		class Views.LogoView extends App.SiteBuilderApp.Element.Image.Views.ImageView

			className : 'image'

			template : '{{#image}}
								 <img src="{{imageurl}}" alt="{{title}}" class="{{alignclass}} img-responsive"/>
								 <div class="clearfix"></div>
							{{/image}}
							{{#placeholder}}
								 <div class="image-placeholder"><span class="bicon icon-uniF10E"></span>Logo</div>
							{{/placeholder}}'

			# mixinTemplateHelpers : ( data )->
			# 	data = super data

			# 	if @model.isNew()
			# 		data.placeholder = true
			# 	else
			# 		data.image = true
			# 		data.imageurl = ->
			# 			if _.isUndefined @sizes['medium']
			# 				url = @sizes['full'].url
			# 			else
			# 				url = @sizes['medium'].url
			# 			url

			# 	data

			# events :
			# 	'click' : ( e )->
			# 		e.stopPropagation()
			# 	'click a' : ( e )->
			# 		e.preventDefault()

			# onShow : ->
			# 	@$el.attr "data-content", " "+_.polyglot.t('Update logo in your')+" <a href='#{SITEURL}/dashboard/#/site-profile' target='_BLANK'>"+_.polyglot.t('site profile')+"</a>"
			# 	@$el.popover
			# 		html : true
			# 		placement : 'top'