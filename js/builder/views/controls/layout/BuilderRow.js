define(['builder/views/controls/BuilderControl', 'text!builder/templates/controls/layout/BuilderRow.hbs', 'global'], 
		function(BuilderControl, template, global){

			var BuilderRow = BuilderControl.extend({

				className : 'row',

				//define template for control
				template 	: template,

				//set name for row. Will be used to generate unique ID for each control
				name 		: 'row'

			});

			return BuilderRow;

		});