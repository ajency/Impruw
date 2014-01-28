module.exports = (grunt)->

	# Project configuration.
	grunt.initConfig
		pkg: grunt.file.readJSON 'package.json'
		uglify:
			options: 
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'

	  	build:
			src: '<%= pkg.THEMESPATH %>/impruwclientparent/builder/js/init.js',
			dest: '<%= pkg.THEMESPATH %>/impruwclientparent/builder/js/init.min.js'
	
	# Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks 'grunt-contrib-uglify'

	# Default task(s).
	grunt.registerTask('default', ['uglify'])