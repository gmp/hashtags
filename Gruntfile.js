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
                  "public/javascripts/app/views/loginView.js",
                  "public/javascripts/app/views/errorView.js",
                  "public/javascripts/app/views/lobbyView.js",
                  "public/javascripts/app/views/lobbyInvitesView.js",
                  "public/javascripts/app/views/lobbyPendingGamesView.js",
                  "public/javascripts/app/views/lobbyGamesListView.js",
                  "public/javascripts/app/views/createGameSearchView.js",
                  "public/javascripts/app/views/createGameView.js",
                  "public/javascripts/app/views/playerWaitingView.js",
                  "public/javascripts/app/views/playerImageSelectView.js",
                  "public/javascripts/app/views/gameHeaderView.js",
                  "public/javascripts/app/views/playerHashtagSelectView.js",
                  "public/javascripts/app/views/gameEndView.js",
                  "public/javascripts/app/views/gameView.js",
                  "public/javascripts/app/views/appView.js",
                  "public/javascripts/app/views/judgeView.js",
                  "public/javascripts/app/views/playerView.js"

                                                      ] ,



            dest: 'public/javascripts/app/app.min.js',
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