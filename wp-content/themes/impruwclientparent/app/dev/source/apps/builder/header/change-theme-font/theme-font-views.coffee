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

			template : '<select>
							{{#fonts}}
								<option value="{{family}}">{{family}}</option>
							{{/fonts}}
						</select>

						<button class="btn btn-alert change-font-cancel">cancel</button>
						<button class="btn btn-primary change-font-apply">apply</button>'

			mixinTemplateHelpers : (data)->
				data = super data
				console.log @collection

				data.fonts = @collection.toJSON()

				data

			events : 
				'change select' : 'changeFont'

				'click .change-font-cancel' : ->
					if $('style#theme-font-preview').length
						$('style#theme-font-preview').remove()

					@trigger 'dialog:close'

				'click .change-font-apply' : ->
					if $('style#theme-font-preview').length
						$('style#theme-font-preview').remove()

					if $('style#theme-font-style').length
						$('style#theme-font-style').remove()

					selectedModel = @collection.findWhere 
								family : @$el.find('select').val()

					@model.set selectedModel.toJSON()
					@model.save()

					html = "<style id='theme-font-style'> @font-face {
											font-family: '#{selectedModel.get('family')}';
										src: url('"
					html += if selectedModel.get('files').regular? then selectedModel.get('files').regular else selectedModel.get('files')[0]
					html += "'); }
									.site-style-container{
										font-family : '#{selectedModel.get('family')}'
									}</style>"

					$('head').append(html)

					@trigger 'dialog:close'




					


			initialize : ->
				@collection = Marionette.getOption @, 'collection'

			onShow : ->
				@$el.find('select').selectpicker()
				if @model.get 'family'
					@$el.find('select').selectpicker('val',@model.get 'family').selectpicker 'refresh'

			changeFont : (e)->
				if $('style#theme-font-preview').length
					$('style#theme-font-preview').remove()

				selectedModel = @collection.findWhere  
						family : $(e.target).val()

				html = "<style id='theme-font-preview'> @font-face {
										font-family: '#{selectedModel.get('family')}';
									src: url('"
				html += if selectedModel.get('files').regular? then selectedModel.get('files').regular else selectedModel.get('files')[0]
				html += "'); }
								.site-style-container{
									font-family : '#{selectedModel.get('family')}'
								}</style>"

				$('head').append(html)

			onClose :->
				if $('style#theme-font-preview').length
					$('style#theme-font-preview').remove()