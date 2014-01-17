/**
 * The LeftColumn View. 
 * 
 */
 
define(['underscore', 'jquery', 'backbone', 'jpanelmenu' ],
		function( _ , $, Backbone){

			
			var LeftColumnView = Backbone.View.extend({

				el :".aj-imp-left",

				events      : { 
                	
				},


				initialize : function(){

                    //jPanel Menu
	               	var jPM = $.jPanelMenu({
					    menu: '.aj-imp-dash-nav',
					    trigger: '#nav-trigger',
					});
					jPM.on();
                  	
                  	$('#jPanelMenu-menu a').click(function(){

                  		if ( jPM.isOpen() ) {
							jPM.close();
						}

                  	})
				},

				render : function(){

					var self = this;

				},
               	

			});	


			return LeftColumnView;

		});