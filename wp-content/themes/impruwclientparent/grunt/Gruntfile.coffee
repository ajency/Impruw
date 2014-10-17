# Generated on 2014-08-22 using generator-angular 0.9.5
"use strict"

# # Globbing
module.exports = (grunt) ->

	# Load grunt tasks automatically
	require("load-grunt-tasks") grunt

	# Time how long tasks take. Can help when optimizing build times
	# require("time-grunt") grunt

	cssFiles =
		frontEnd : [
			'../bower_components/bootstrap/dist/css/bootstrap.min.css'
			'../bower_components/flat-ui/dist/css/flat-ui.min.css'
			'../js/jquery-ui/jquery-ui.min.css'
			'../../../plugins/revelution/rs-plugin/css/settings.css'
			'../../../plugins/revelution/rs-plugin/css/dynamic-captions.css'
			'../../../plugins/sitepress-multilingual-cms/res/css/language-selector.css'
			'../css/slimmenu.min.css'
			'../bower_components/lightbox2/css/lightbox.min.css'
			'../css/custom.css'
			'../css/style.css'
		]
		builder : [
			'../bower_components/bootstrap/dist/css/bootstrap.min.css'
			'../bower_components/flat-ui/dist/css/flat-ui.min.css'
			'../js/jquery-ui/jquery-ui.min.css'
			'../bower_components/pace/themes/orange/pace-theme-minimal.css'
			'../bower_components/jquery-minicolors/jquery.minicolors.css'
			'../../../plugins/sitepress-multilingual-cms/res/css/language-selector.css'
			'../css/toggle-switch.css'
			'../css/slimmenu.min.css'
			'../../../../wp-includes/css/dashicons.min.css'
			'../../../../wp-includes/js/imgareaselect/imgareaselect.css'
			'../../../../wp-admin/css/media-rtl.css'
			'../../../../wp-admin/css/media.css'
			'../css/main.css'
			'../css/custom.css'
			'../css/builder-icon-fonts.css'
			'../css/builder.css'
			'../css/style.css'
		]
		dashboard : [
			'../bower_components/bootstrap/dist/css/bootstrap.min.css'
			'../bower_components/flat-ui/dist/css/flat-ui.min.css'
			'../js/jquery-ui/jquery-ui.min.css'
			'../bower_components/pace/themes/orange/pace-theme-minimal.css'
			'../bower_components/jquery-minicolors/jquery.minicolors.css'
			'../../../plugins/sitepress-multilingual-cms/res/css/language-selector.css'
			'../css/toggle-switch.css'
			'../css/slimmenu.min.css'
			'../../../../wp-includes/css/dashicons.min.css'
			'../../../../wp-includes/js/imgareaselect/imgareaselect.css'
			'../../../../wp-admin/css/media-rtl.css'
			'../../../../wp-admin/css/media.css'
			'../css/main.css'
			'../css/custom.css'
			'../css/dashboard-icon-fonts.css'
			'../css/dashboard.css'
		]


	# Define the configuration for all the tasks
	grunt.initConfig

		cssmin: 
			options: 
				banner: '/* Impruw.com */'
				report : 'gzip'
			buildAll: 
				files:
					'../production/css/front-styles.min.css': cssFiles['frontEnd']
					'../production/css/builder-styles.min.css': cssFiles['builder']
					'../production/css/dashboard-styles.min.css': cssFiles['dashboard']

		copy :
			buildAll :
				files : [
					(
						src : '../bower_components/lightbox2/img/**'
						dest : '../production/img'
					)
					(
						src : '../bower_components/flat-ui/dist/fonts/**'
						dest : '../production/fonts/'
					)
					(
						src : '../bower_components/bootstrap/dist/fonts/**'
						dest : '../production/fonts/'
					)
					(
						src : '../images/empty-drag-bg.svg'
						dest : '../production/images/empty-drag-bg.svg'
					)
				]

		uglify : 
			buildFront : 
				files : 
					'../production/js/front-script.min.js' : [
						'../bower_components/bootstrap/dist/js/bootstrap.min.js'
						'../bower_components/lightbox2/js/lightbox.min.js'
						'../js/jquery-ui/jquery-ui.min.js'
						'../js/moment/moment.min.js'
						'../js/moment/moment.range.min.js'
						'../js/polyglot/polyglot.min.js'
						'../bower_components/slimmenu/jquery.slimmenu.min.js'
						'../bower_components/jquery-validation/dist/jquery.validate.min.js'
						'../../../plugins/revslider/rs-plugin/js/jquery.themepunch.plugins.min.js'
						'../../../plugins/revslider/rs-plugin/js/jquery.themepunch.revolution.min.js'
						'../app/dev/js/plugins/isotope.js'
						'../js/jquery.cookie.js'
						'../app/dev/js/plugins/jquery.tabSlideOut.v1.3.js'
						'../js/script.js'
					]



	grunt.registerTask "build", "Build production resources", (target)->
		grunt.task.run [
			"cssmin:buildAll"
			"uglify:buildFront"
			#"copy:buildAll"
		]
