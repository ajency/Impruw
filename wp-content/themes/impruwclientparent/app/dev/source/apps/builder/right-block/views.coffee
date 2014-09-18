define ['app'],(App)->
	App.module 'RightBlock.Views', (Views,App)->
		
		class Views.RightBlockLayout extends Marionette.Layout

			className: 'right-toolbox'

			template : '<div class="handle-right"><span class="bicon icon-uniF164"></span></div>
						
						<div class="aj-imp-builder-top-options "> 
							<a href="#" class="builder-help">{{#polyglot}}Need Help{{/polyglot}}&nbsp;<span class="bicon icon-uniF13B"></span></a>
						</div>

						<a href="#choose-theme" class="btn btn-xs choose-theme"><span class="bicon icon-uniF185"></span>{{#polyglot}}Switch Theme{{/polyglot}}</a>
						<div id="aj-imp-color-sel"> 
						 <!-- <a class="btn btn-default" data-toggle="modal" href="#theme-color-pop">Change Theme Colors</a> -->
						  <a class="btn btn-default">{{#polyglot}}Change Theme Colors{{/polyglot}}</a>
						</div> 
						<div id="unused-elements"></div>'

			regions:
				unusedElementsRegion : '#unused-elements'

			events : 
                'click #aj-imp-color-sel' :-> @trigger "show:theme:color:clicked" 

			onShow :->
				@$el.tabSlideOut
					tabHandle: '.handle-right'                   
					tabLocation: 'right'                     
					speed: 300                              
					action: 'click'                          
					topPos: '30px'                          
					fixedPosition: true

