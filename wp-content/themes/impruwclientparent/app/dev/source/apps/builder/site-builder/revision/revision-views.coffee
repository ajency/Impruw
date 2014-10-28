define ['app', 'bootbox'],(App,bootbox)->
	App.module "SiteBuilderApp.Revision.Views",(Views,App)->


		class RevisionSingleView extends Marionette.ItemView
			template  : '<div class="ui-slider-segment {{backup_type}}-backup {{theme_slug}}" {{#notFirst}}style="margin-left: {{segmentGap}};"{{/notFirst}} data-toggle="tooltip" title="{{author}} - {{post_modified}}   Theme : {{page_theme}}"></div>'

			mixinTemplateHelpers : (data)->
				data = super data
				data.notFirst  = Marionette.getOption @, 'notFirst'
				data.segmentGap = Marionette.getOption @, 'segmentGap'
				data.theme_slug =  _.slugify data.page_theme
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
								<div id="slider" class="ui-slider">
									</div>
								<a class="slider-button prev"><span class="bicon icon-uniF19C"></span></a>
								<a class="slider-button next"><span class="bicon icon-uniF19B"></span></a>
							</div>
							<div class="row timeline-actions">
								<div class="col-sm-6 revision-info">
									<div class="revision-by">Published virsion</div> 
									<span class="time"></span>
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
					if @currentRevisionId is 0
						return false
					currentRevisionModel =  @collection.get(@currentRevisionId)
					index = _.indexOf @collection.toArray(), currentRevisionModel

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

						if siteRestoreModel.id is @currentRevisionId
							@currentRevisionId = 0

					if @currentRevisionId or siteBackupId
						@trigger 'restore:revision', 
							revId : @currentRevisionId
							siteBackupId : siteBackupId

				'click .slider-button.next' : ->
					if @sliderValue is 0
						sliderValue = @collection.size()
					else if @sliderValue is @collection.size()
						return
					else
						sliderValue += 1
					@$slider.slider( "value", sliderValue );

				'click .slider-button.prev' : ->
					if @sliderValue is 0
						sliderValue = @collection.size()
					else if @sliderValue is 1
						return
					else
						sliderValue -= 1
					@$slider.slider( "value", sliderValue );

			initialize : ->
				@collection.comparator = 'ID'
				@collection.sort()
				@currentRevisionId = 0
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
							
							model =  @collection.at ui.value - 1
							@currentRevisionId = model.id
							if @_checkIfThemeChange(@currentRevisionId)
								bootbox.confirm "This backup uses a different theme. The page is viewed using the current theme.
								 If restored to this point will cause the site to be restored to the nearest theme change",(result)=>
									if result
										@changeIframe @currentRevisionId
										@sliderValue = ui.value
									else 
										if @sliderValue
											@$slider.slider( "value", @sliderValue );

							else
								@sliderValue = ui.value
								@changeIframe @currentRevisionId


							@$el.find('.ui-slider-segment').removeClass 'active'
							childView = @children.findByModel model
							childView.$el.addClass 'active'
					# .addSliderSegments $slider.slider("option").max

				@$el.find('.ui-slider-segment').tooltip
					placement: "top"
					container: ".revision-container"

				@$el.find('iframe').load ()->
				    @style.height = @contentWindow.document.body.offsetHeight + 10 + 'px'
				    $("#iframeBlocker").height @style.height

				# lastRevision = _.last @collection.toArray()
				# @currentRevisionId = lastRevision.id



			_checkIfThemeChange : (revisionId)->

				if CURRENTTHEME isnt _.slugify @collection.get(revisionId).get('page_theme') 
					return true

				else 
					return false


			changeIframe : (revisionId)->
				@$el.find('iframe').attr 'src', "#{SITEURL}/?revision=#{revisionId}"
				currentRevisionModel = @collection.get revisionId
				@$el.find('.revision-info .time').text currentRevisionModel.get 'post_date'

				timeElapsed = moment(new Date(currentRevisionModel.get('post_date'))).fromNow();


				@$el.find('.revision-info .revision-by').text "Version by #{currentRevisionModel.get('author')}, #{timeElapsed}"


				
