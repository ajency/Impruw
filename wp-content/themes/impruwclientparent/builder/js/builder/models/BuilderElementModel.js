/**
 * The Builder Editor View. 
 * This is the editor view for the builder
 * Most imp file
 */
 
define(['underscore', 'jquery', 'backbone', 'global'],
		function( _ , $, Backbone, global){

			var BuilderElementModel = Backbone.Model.extend({

				defaults : function(){
					return {

					};
				},
				
				validate : function(){
					
				}

			});

			return BuilderElementModel;

		});