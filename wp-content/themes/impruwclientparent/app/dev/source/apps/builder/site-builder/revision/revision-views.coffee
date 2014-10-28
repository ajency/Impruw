define ['app', 'bootbox'],(App,bootbox)->
	App.module "SiteBuilderApp.Revision.Views",(Views,App)->


		class RevisionSingleView extends Marionette.ItemView
			template  : '<div class="ui-slider-segment {{backup_type}}-backup" {{#notFirst}}style="margin-left: {{segmentGap}};"{{/notFirst}} data-toggle="tooltip"
				data-container=".revision-container" data-placement="top" title="{{author}} - {{post_modified}}"></div>'

			mixinTemplateHelpers : (data)->
				data = super data
				data.notFirst  = Marionette.getOption @, 'notFirst'
				data.segmentGap = Marionette.getOption @, 'segmentGap'
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
								<iframe src="{{SITEURL}}" style="width : 100%; height: 400px;"></iframe>
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
				data

			events : 
				'click .cancel-view-history': ->
					@trigger "close:revision"
					$('body').removeClass('no-scroll')
				'click .restore-revision-btn': ->
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
						@sliderValue = @collection.size()
					else if @sliderValue is @collection.size()
						return
					else
						@sliderValue += 1
					@$slider.slider( "value", @sliderValue );

				'click .slider-button.prev' : ->
					if @sliderValue is 0
						@sliderValue = @collection.size()
					else if @sliderValue is 1
						return
					else
						@sliderValue -= 1
					@$slider.slider( "value", @sliderValue );

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
							@sliderValue = ui.value
							model =  @collection.at ui.value - 1
							@currentRevisionId = model.id
							if @_checkIfThemeChange(@currentRevisionId)
								bootbox.confirm "This will cause a theme change. Will not show the elements properly",(result)=>
									if result
										@changeIframe @currentRevisionId
							else
								@changeIframe @currentRevisionId
					# .addSliderSegments $slider.slider("option").max

				@$el.find('.ui-slider-segment').tooltip()

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

				milliseconds = new Date() - (new Date(currentRevisionModel.get('post_date')))
				seconds = parseInt (milliseconds / 1000) % 60 
				minutes = parseInt (milliseconds / (1000*60)) % 60
				hours   = parseInt (milliseconds / (1000*60*60)) % 24
				days   = parseInt (milliseconds / (1000*60*60*24)) % 7
				if days > 1
					timeElapsed = "#{days} days ago"
				else if days is 1
					timeElapsed = "1 day ago"
				else if hours > 1
					timeElapsed = "#{hours} hours ago"
				else if hours is 1
					timeElapsed = "1 hour ago"
				else if minutes > 1
					timeElapsed = "#{minutes} minutes ago"
				else if minutes is 1
					timeElapsed = "1 minute ago"
				else if seconds 
					timeElapsed = "#{seconds} seconds ago"


				@$el.find('.revision-info .revision-by').text "Version by #{currentRevisionModel.get('author')}, #{timeElapsed}"


				
