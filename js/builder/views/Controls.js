define([
		'builder/views/controls/BuilderControl',
		'builder/views/controls/layout/BuilderRow'	
		], 
		function(BuilderControl, BuilderRow){

			var Controls = {};

			//attach controls
			Controls.BuilderControl = BuilderControl;
			Controls.BuilderRow		= BuilderRow;

			return Controls;

		});