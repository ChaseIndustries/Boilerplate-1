module.exports = function(grunt) {

  // All configuration goes here 
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      dist: {
        files: {
          'js/plugins.js': ['js/plugins/*.js'],
          'js/shims.js': ['js/shims/*.js'],
          'js/theme.min.js': ['js/theme.js']
        },
      }
    }, // End Uglify

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'img/'
        }]
      }
    }, // End Imagemin

    compass: {
      dist: {
        options: {
          sassDir: 'sass',
          cssDir: 'css'
        }
      }
    }, // End Compass

    jshint: {
      files: ['gruntfile.js', 'js/theme.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    }, // End JsHint

    db_dump: {
      "local": {
        "options": {
          "title": "Local DBs",
        
          // default config for VLAD stack
          "database": "dbName",
          "user": "vlad",
          "pass": "vlad",
          "host": "192.168.100.100",
          
          
          "backup_to": "db/backups/local.sql"
        }
      }
    },

    uncss: {
      dist: {
        files: {
          'css/theme.clean.css': ['*.html']
        }
      }
    },

    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint'],
      options: {
        livereload: true,
      }, 
      compass: {
        files: ['sass/{,*/}*.{scss,sass}'],
        tasks: ['compass']
      },
      html: {
        files: ['**/*.html','**/*.css'],
        options: {
            livereload: true
        },
      },
      php: {
        files: ['**/*.php'],
        options: {
          livereload: true
        },
      }
    }, // End Watch

  }); // End Configuration

  // Plugin references
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mysql-dump');
  grunt.loadNpmTasks('grunt-uncss');


  // Task registration
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['uglify', 'imagemin', 'jshint']);
  grunt.registerTask('backup',['db_dump']);
  grunt.registerTask('tidy',['uncss', 'uglify', 'imagemin']);

};
