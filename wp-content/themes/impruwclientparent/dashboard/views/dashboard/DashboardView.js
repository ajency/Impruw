/**
 * The DashDefaultView.
 * 
 */

define([ 'underscore', 'jquery', 'backbone', 
		'text!templates/siteprofile/DashboardViewTpl.tpl',
		 ,'bootstrap' ], 
		function(_, $, Backbone, DashboardDefaultViewTpl,bootstrap) {

	var DashboardDefaultView = Backbone.View.extend({

		id : 'dashboard-default',

		render : function() {

			var self = this;

			//g = this.site;
			var template = _.template(DashboardDefaultViewTpl);

			var html = template({
				site : this.site
			});

			this.$el.html(html);


			// Equal Heights
			equalheight = function(container){

			var currentTallest = 0,
			     currentRowStart = 0,
			     rowDivs = new Array(),
			     $el,
			     topPosition = 0;

			 $(container).each(function() {

			   $el = $(this);
			   $($el).height('auto')
			   topPostion = $el.position().top;

			   if (currentRowStart != topPostion) {
			     for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
			       rowDivs[currentDiv].height(currentTallest);
			     }
			     rowDivs.length = 0; // empty the array
			     currentRowStart = topPostion;
			     currentTallest = $el.height();
			     rowDivs.push($el);
			   } else {
			     rowDivs.push($el);
			     currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
			  }
			   for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
			     rowDivs[currentDiv].height(currentTallest);
			   }
			 });
			}

			$(window).resize(function(){
			  equalheight('.aj-imp-widget-container');
			});

			$(document).ready(function() {
			  setTimeout(function() {
			  		equalheight('.aj-imp-widget-container');
			  	}, 100);
			});


			return this;
		} 
		 

	});

	return DashboardDefaultView;

});