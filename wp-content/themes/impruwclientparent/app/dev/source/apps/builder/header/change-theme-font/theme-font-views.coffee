define ['app'
],(App)->
	App.module 'ChangeThemeFontApp.Views',(Views,App)->

		class Views.ChangeThemeFontLayout extends Marionette.Layout

			template: '<div id="theme-font-set"></div>
					   '

			className: 'font-picker-container'

			dialogOptions:
				modal_title: _.polyglot.t 'Choose Theme Font'
				modal_size: 'medium-modal'

			regions:
				themefontsetRegion: '#theme-font-set'
				# themecolorEditRegion : '#theme-color-edit'

		class Views.ThemeFontSetView extends Marionette.ItemView

			template : '<select id="theme-font-dropdown">
							{{#fonts}}
								<option value="{{family}}">{{family}}</option>
							{{/fonts}}
						</select>
						{{#secFontsAllowed}}
						<select id="theme-sec-font-dropdown">
							{{#fonts}}
								<option value="{{family}}">{{family}}</option>
							{{/fonts}}
						</select>
						{{/secFontsAllowed}}

						<button class="btn btn-alert change-font-cancel">cancel</button>
						<button class="btn btn-primary change-font-apply">apply</button>'

			mixinTemplateHelpers : (data)->
				data = super data
				console.log @collection

				data.fonts = @collection.toJSON()
				data.secFontsAllowed = @isSecFontAllowed

				data

			events : 
				'change select#theme-font-dropdown' : 'changeMainFonts'
				'change select#theme-sec-font-dropdown' : 'changeSecFonts'

				'click .change-font-cancel' : ->
					if $('style#theme-font-preview').length
						$('style#theme-font-preview').remove()
					if $('style#theme-sec-font-preview').length
						$('style#theme-sec-font-preview').remove()

					@trigger 'dialog:close'

				'click .change-font-apply' : 'applyFonts'


			initialize : ->
				@collection = Marionette.getOption @, 'collection'
				@secModel = Marionette.getOption @,'secModel'
				@isSecFontAllowed = _.toBoolean ISSECFONTALLOWED
				@secClasses = '.menu-collapser, .page-title, .action-title, .room-title-container .room-title h1 ,
						.roomsummary .room-title, .booking-title, .room-facilities-container .room-facilities-title h4'

			onShow : ->
				@$el.find('select').selectpicker()
				if @model.get 'family'
					@$el.find('select#theme-font-dropdown').selectpicker('val',@model.get 'family').selectpicker 'refresh'
				if @secModel.get 'family'		
					@$el.find('select#theme-sec-font-dropdown').selectpicker('val',@secModel.get 'family').selectpicker 'refresh'

			changeMainFonts : (e)->
				if $('style#theme-font-preview').length
					$('style#theme-font-preview').remove()

				# if the selected theme is default then remove the css for font preview
				if $(e.target).val() is 'Default'
					$('head').append "<style id='theme-font-preview'>.site-style-container{
										font-family : 'Lato', sans-serif;
									}</style>"			

				else
					selectedModel = @collection.findWhere  
							family : $(e.target).val()

					@addStyleMarkup selectedModel, 'theme-font-preview', '.site-style-container'						

			changeSecFonts : (e)->
				if $('style#theme-sec-font-preview').length
					$('style#theme-sec-font-preview').remove()

				# if the selected theme is default then remove the css for font preview
				if $(e.target).val() is 'Default'
					$('head').append "<style id='theme-sec-font-preview'>
								#{@secClasses}{
									font-family : 'Satisfy', cursive;
								}
							</style>"

				else
					selectedSecModel = @collection.findWhere  
							family : $(e.target).val()

					@addStyleMarkup selectedSecModel, 'theme-sec-font-preview', @secClasses						

			applyFonts : ->
					if $('style#theme-font-preview').length
						$('style#theme-font-preview').remove()

					if $('style#theme-font-style').length
						$('style#theme-font-style').remove()

					selectedModel = @collection.findWhere 
								family : @$el.find('select#theme-font-dropdown').val()

					@model.set selectedModel.toJSON()
					@model.save()

					# if the selected theme is default then remove the css for font preview
					if selectedModel.get('family') isnt 'Default'	

						@addStyleMarkup selectedModel, 'theme-font-style', '.site-style-container'						
			
						
					if @isSecFontAllowed
						if $('style#theme-sec-font-preview').length
							$('style#theme-sec-font-preview').remove()

						if $('style#theme-sec-font-style').length
							$('style#theme-sec-font-style').remove()

						selectedSecModel = @collection.findWhere 
									family : @$el.find('select#theme-sec-font-dropdown').val()

						@secModel.set selectedSecModel.toJSON()
						@secModel.save()

						# if the selected theme is default then remove the css for font preview
						if selectedSecModel.get('family') isnt 'Default'
							@addStyleMarkup selectedSecModel, 'theme-sec-font-style', @secClasses						
							

					@trigger 'dialog:close'

			onClose :->
				if $('style#theme-font-preview').length
					$('style#theme-font-preview').remove()

			addStyleMarkup : ( model, id, classes )->
				html = "<style id='#{id}'> @font-face {
								font-family: '#{model.get('family')}';
							src: url('"
				html += if model.get('files').regular? then model.get('files').regular else model.get('files')[0]
				html += "'); }
						#{classes}{
							font-family : '#{model.get('family')}',#{model.get('category')}
						}</style>"

				$('head').append(html)