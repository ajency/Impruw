define ['app'],(App)->
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
									Version by Admin, 5 minutes ago 
									<span class="time">15th Oct 2014 @ 13:41:21</span>
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
					if @currentRevisionId
						@trigger 'restore:revision', @currentRevisionId

			initialize : ->
				@collection.comparator = 'ID'
				@collection.sort()
				@currentRevisionId = 0

			onShow : ->
				@$el.attr 'id', 'revision-region'
				@$el.show()
				$('body').addClass('no-scroll')
				 # Range Slider for Revisions
				$slider = @$el.find('#slider')
				# console.log $slider.slider("option")
				if $slider.length > 0
					$slider.slider
						min: 1
						max: @collection.size()
						value: @collection.size()
						orientation: 'horizontal'
						range: false
						change :(event,ui)=>
							model =  @collection.at ui.value - 1
							@currentRevisionId = model.id
							@$el.find('iframe').attr 'src', "#{SITEURL}/?revision=#{@currentRevisionId}"
					# .addSliderSegments $slider.slider("option").max

				@$el.find('.ui-slider-segment').tooltip()

				lastRevision = _.last @collection.toArray()
				@currentRevisionId = lastRevision.id

				@$el.find('iframe').attr 'src', "#{SITEURL}/?revision=#{@currentRevisionId}"
				
