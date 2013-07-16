module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: [{
            src: ['public/javascripts/app/hashtags.js', 
                  'public/javascripts/app/templates/*.js', 
                  'public/javascripts/app/routes/*.js', 
                  'public/javascripts/app/models/*.js', 
                  'public/javascripts/app/collections/*.js',
                  'public/javascripts/app/views/*.js'] ,

            dest: 'javascripts/app/app.min.js',
          }, 
        ],
      },
    },
  });

// Load the plugin that provides the "uglify" task.
grunt.loadNpmTasks('grunt-contrib-uglify');

// Default task(s).
grunt.registerTask('default', ['uglify']);

};