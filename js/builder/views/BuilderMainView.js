/**
 * The Main Builder Router. 
 * This is the main router for the builder
 */
 
define(['underscore', 'jquery', 'backbone', 'global'],
		function( _ , $, Backbone, global){

			var BuilderMainView = Backbone.View.extend({

				el : '.aj-imp-builder',

				initialize : function(){
	
				},

				render : function(){

					//setup select picker
					this.$el.find('.aj-imp-builder-top-nav select').selectpicker({style: 'btn-mini btn-default', menuStyle: 'dropdown'});
					
					//enable controls drag
					$( "#controls-drag" ).draggable({
						 handle: "p.desc" 
					});
					

					$('.builder-control .view').hide();
					$('.builder-control').draggable({
										connectToSortable: '#client-site-container',
										handle 	: '.drag',
									 	helper	: 'clone',
										revert 	: true,
										drag: function (e, t) {
								            t.helper.width(82);
								        },
								        stop: function (e, t) {
								        	var f = $(e.target).find('.view');
								        	console.log($(f));
								        	return $(f);	
								        }
									});


					//enable top level container  sorting
					this.$el.find( '#client-site-container, #client-site-container .column').sortable({
																										revert : true,
																										connectWith: ".column",
        																								opacity: .35
        																							});
					this.$el.find( '#client-site-container').disableSelection();

					//border
					this.$el.find( '#client-site-container .column').css('border', '1px dashed #ccc' ).css('min-height',250);
					this.$el.find( '#client-site-container .row').css('margin-bottom',20);

				}

			});	


			return BuilderMainView;

		});