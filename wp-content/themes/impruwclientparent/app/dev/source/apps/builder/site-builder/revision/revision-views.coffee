define ['app', 'bootbox'],(App,bootbox)->
	App.module "SiteBuilderApp.Revision.Views",(Views,App)->


		class RevisionSingleView extends Marionette.ItemView
			template  : '<div class="ui-slider-segment {{backup_type}}-backup {{theme_slug}}" 
				{{#notFirst}}style="padding-left: {{segmentGap}};"{{/notFirst}}><span class="marker" data-toggle="tooltip" 
				title="{{author}} - {{date}} ,   Theme : {{page_theme}}"></span></div>'

			mixinTemplateHelpers : (data)->
				data = super data
				data.notFirst  = Marionette.getOption @, 'notFirst'
				data.segmentGap = Marionette.getOption @, 'segmentGap'
				data.theme_slug =  _.slugify data.page_theme
				data.post_date = data.post_date.replace /-/g,'/'
				dateGMT = new Date(data.post_date+' UTC ')
				data.date = dateGMT.toLocaleString()
				data

			onRender: ()->
				@$el = @$el.children()
				@$el.unwrap()
				@setElement @$el

			
		

		class Views.RevisionView extends Marionette.CompositeView


			template : '<div class="revision-container">
							<h2 class="page-title">View Your Site History</h2>
							<p class="rev-desc">View the saved points in your site, and restore your page or entire site to that point from here.</p>
							<div class="revision-timeline">
								<div id="slider" class="ui-slider"></div>
							</div>
							<div class="row timeline-actions">
								<div class="col-sm-6 revision-info">
									<div class="revision-by">Published Version</div> 
									<span class="time"></span>
									<div class="revision-theme"></div>
								</div>
								<div class="col-sm-6 revision-actions">
									<button class="btn btn-default btn-sm cancel-view-history">Cancel</button>
									<button class="btn btn-default btn-sm aj-imp-orange-btn restore-revision-btn">Restore to this Version</button>
								</div>
							</div>
							<div class="revision-view">
								<div id="IframeWrapper" style="position: relative;">
								<div id="iframeBlocker" style="position: absolute; top: 0; left: 0; width:100% "></div>
								<iframe src="{{SITEURL}}/{{site}}" style="width : 100%; height: 400px;" scrolling="no" seamless="seamless"></iframe>
								</div>
							</div>
						</div>' 

			itemViewContainer : '#slider'

			itemView : RevisionSingleView

			itemViewOptions : (model,index)->
				size = @collection.size()
				gap = 100 / (size - 1) + "%"
				notFirst = if index then  true else  false
				notFirst : notFirst
				segmentGap : gap

			mixinTemplateHelpers : (data)->
				data = super data
				data.SITEURL = SITEURL
				data.site = _.slugify @collection.at(0).get 'post_title'
				data

			events : 
				'click .cancel-view-history': ->
					@trigger "close:revision"
					$('body').removeClass('no-scroll')

				'click .restore-revision-btn': ->
					if not @currentRevisionModel 
						return false
					
					index = _.indexOf @collection.toArray(), @currentRevisionModel

					siteRestoreModel = @collection.find (model)=>
						if _.indexOf( @collection.toArray(), model ) < index
							return false
						else
							if model.get('backup_type') is 'site'
								return true
						return false

					siteBackupId = 0

					if siteRestoreModel
						siteBackupId = siteRestoreModel.get 'site_backup_id'

						if siteRestoreModel.id is @currentRevisionModel.id
							@currentRevisionModel.id = 0

					if @currentRevisionModel.id or siteBackupId
						@trigger 'restore:revision', 
							revId : @currentRevisionModel.id
							siteBackupId : siteBackupId

			initialize : ->
				@collection.comparator = 'ID'
				@collection.sort()
				# @currentRevisionId = 0
				@sliderValue = 0

			onShow : ->
				@$el.attr 'id', 'revision-region'
				@$el.show()
				$('body').addClass('no-scroll')
				 # Range Slider for Revisions
				@$slider = @$el.find('#slider')
				# console.log $slider.slider("option")
				if @$slider.length > 0
					@$slider.slider
						min: 1
						max: @collection.size()
						value: @collection.size()
						orientation: 'horizontal'
						range: false
						change :(event,ui)=>
							
							@currentRevisionModel =  @collection.at ui.value - 1
							
							if @_checkIfThemeChange()
								bootbox.confirm "This backup uses a different theme. The page is viewed using the current theme.
								 If restored to this point will cause the site to be restored to the nearest theme change",(result)=>
									if result
										@changeIframe()
										@sliderValue = ui.value
									else 
										if @sliderValue
											@$slider.slider( "value", @sliderValue );

							else
								@sliderValue = ui.value
								@changeIframe()


							@$el.find('.ui-slider-segment').removeClass 'active'
							childView = @children.findByModel @currentRevisionModel
							childView.$el.addClass 'active'

				
				_.delay =>
					@$el.find('#slider .marker').tooltip
						placement: "top"
						container: ".revision-container"
				,1000

				@$el.find('iframe').load ()->
					@style.height = @contentWindow.document.body.offsetHeight + 10 + 'px'
					$("#iframeBlocker").height @style.height

				# lastRevision = _.last @collection.toArray()
				# @currentRevisionId = lastRevision.id



			_checkIfThemeChange : ->

				if CURRENTTHEME isnt _.slugify @currentRevisionModel.get('page_theme') 
					return true

				else 
					return false


			changeIframe : ->
				@$el.find('iframe').attr 'src', "#{SITEURL}/?revision=#{@currentRevisionModel.id}"
								
				dateGMT = new Date(@currentRevisionModel.get('post_date').replace(/-/g,'/')+' UTC ')

				@$el.find('.revision-info .time').text dateGMT.toLocaleString()

				timeElapsed = moment(dateGMT).fromNow();

				@$el.find('.revision-info .revision-by').text "Version by #{@currentRevisionModel.get('author')}, #{timeElapsed}"

				@$el.find('.revision-info .revision-theme').text "Theme : #{@currentRevisionModel.get('page_theme')}"


				
