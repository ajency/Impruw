module.exports = (grunt) ->

    #require('time-grunt')(grunt)

    grunt.initConfig

        pkg : grunt.file.readJSON "package.json"

        exec :
            optimizeBuilderJS :
                command : 'r.js -o ../wp-content/themes/impruwclientparent/app/dev/build.js'
            optimizeDashboardJS :
                command : 'r.js -o ../wp-content/themes/impruwclientparent/app/dev/build.js'
            gitAdd :
                command: 'git add .'
            gitCommit:
                command: 'git commit -m "Production build"'
            gitPush:
                command: 'git push origin app'




    # Load NPM's via matchdep
    require("matchdep").filterDev("grunt-*").forEach grunt.loadNpmTasks

    grunt.registerTask "deploy", ['exec']

