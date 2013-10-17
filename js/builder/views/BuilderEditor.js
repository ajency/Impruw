/**
 * The Builder Editor View. 
 * This is the editor view for the builder
 * Most imp file
 */
 
define(['underscore', 'jquery', 'backbone', 'global'],
		function( _ , $, Backbone, global){

			var BuilderEditorView = Backbone.View.extend({

				el : '#client-site-container',

				initialize : function(){


				},

				render : function(){

					//setup select picker
					this.$el.find('.aj-imp-builder-top-nav select').selectpicker({style: 'btn-mini btn-default', menuStyle: 'dropdown'});

					return this;
				}

			});	


			return BuilderEditorView;

		});