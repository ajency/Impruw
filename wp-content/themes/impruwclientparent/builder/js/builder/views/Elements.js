define([
		'builder/views/elements/BuilderElement',
		'builder/views/elements/layout/BuilderRow'	
		], 
		function(BuilderElement, BuilderRow){

			var Controls = {};

			//attach controls
			Controls.BuilderElement = BuilderElement;
			Controls.BuilderRow		= BuilderRow;

			return Controls;

		});