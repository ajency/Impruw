define ['app'],(App)->
	App.module 'RightBlock.Views', (Views,App)->
		
		class Views.RightBlockLayout extends Marionette.Layout

			className: 'right-toolbox'

			template : '<div class="handle-right"><span class="bicon icon-uniF164"></span></div>
						<a href="#choose-theme" class="btn btn-sm btn-block choose-theme"><span class="bicon icon-uniF185"></span>{{#polyglot}}Switch Theme{{/polyglot}}</a>
						<div id="aj-imp-color-sel"> 
						  <a class="btn btn-xs btn-block">{{#polyglot}}Change Theme Colors{{/polyglot}}</a>
						</div> 
						<div id="revision-history" class="revision-history">
							
						</div>
						<div id="unused-elements"></div>'

			regions:
				unusedElementsRegion : '#unused-elements'
				revisionHistoryRegion : '#revision-history'

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

