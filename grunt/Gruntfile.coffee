module.exports = (grunt) ->

    #require('time-grunt')(grunt)

    grunt.initConfig

        pkg : grunt.file.readJSON "package.json"

        exec :
            optimizeBuilderJS :
                command : 'r.js -o ../wp-content/themes/impruwclientparent/app/dev/build.js'
            optimizeDashboardJS :
                command : 'r.js -o ../wp-content/themes/impruwclientparent/app/dev/dbuild.js'
            gitAdd :
                command: 'git add -u'
            gitCommit:
                command: 'git commit -m "Production build"'
            gitPush:
                command: 'git push origin app'

        coffee : 
            options : 
                expand : true 
                flattern : true
            themeCompile :
                cwd : '<%= pkg.themePath %>/app/dev/source'
                src : ['*.coffee']
                dest : '<%= pkg.themePath %>/app/dev/js'
                ext : '.js'



    # Load NPM's via matchdep
    require("matchdep").filterDev("grunt-*").forEach grunt.loadNpmTasks

    grunt.registerTask "optimize", ['exec:optimizeBuilderJS','exec:optimizeDashboardJS']
    grunt.registerTask "subversion", ['exec:gitAdd','exec:gitCommit']
    grunt.registerTask "deploy", ['optimize','subversion','exec:gitPush']

