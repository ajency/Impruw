define ['app'],(App)->

	# Row views
	App.module 'SiteBuilderApp.Element.Social.Views', (Views, App, Backbone, Marionette, $, _)->

		class SocialItem extends Marionette.ItemView
			tagName  : 'li' 
			template : '<a href="{{sociallink}}" target="_BLANK"><span class="name">{{socialname}}</span></a>'
			# add a class to li to allow diferent styles for each social item
			onRender:->
				@$el.addClass "social-#{_.slugify @model.get 'socialname'}"

		# Social element view
		class Views.SocialView extends Marionette.CollectionView
			tagName : 'ul'
			className : 'social'
			itemView : SocialItem
			onRender:()->	
				# get the className from options
				style = Marionette.getOption @,'style'
				className = _.slugify style
				@$el.addClass className