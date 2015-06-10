module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  var theme_name = 'theme';
  var base_theme_path = '';

  var global_vars = {
    theme_name: theme_name,
    theme_css: 'css',
    theme_scss: 'sass',
    base_theme_path: base_theme_path
  };

  // array of javascript libraries to include.
  var jsLibs = [
    '<%= global_vars.base_theme_path %>/js/vendor/placeholder.js',
    '<%= global_vars.base_theme_path %>/js/vendor/fastclick.js'
  ];

  // array of foundation javascript components to include.
  var jsFoundation = [
    '<%= global_vars.base_theme_path %>/js/foundation/foundation.js',
    '<%= global_vars.base_theme_path %>/js/foundation/foundation.abide.js',
    '<%= global_vars.base_theme_path %>/js/foundation/foundation.accordion.js',
    '<%= global_vars.base_theme_path %>/js/foundation/foundation.alert.js',
    '<%= global_vars.base_theme_path %>/js/foundation/foundation.clearing.js',
    '<%= global_vars.base_theme_path %>/js/foundation/foundation.dropdown.js',
    '<%= global_vars.base_theme_path %>/js/foundation/foundation.equalizer.js',
    '<%= global_vars.base_theme_path %>/js/foundation/foundation.interchange.js',
    '<%= global_vars.base_theme_path %>/js/foundation/foundation.joyride.js',
    '<%= global_vars.base_theme_path %>/js/foundation/foundation.magellan.js',
    '<%= global_vars.base_theme_path %>/js/foundation/foundation.offcanvas.js',
    '<%= global_vars.base_theme_path %>/js/foundation/foundation.orbit.js',
    '<%= global_vars.base_theme_path %>/js/foundation/foundation.reveal.js',
    '<%= global_vars.base_theme_path %>/js/foundation/foundation.slider.js',
    '<%= global_vars.base_theme_path %>/js/foundation/foundation.tab.js',
    '<%= global_vars.base_theme_path %>/js/foundation/foundation.tooltip.js',
    '<%= global_vars.base_theme_path %>/js/foundation/foundation.topbar.js'
  ];

  // array of custom javascript files to include.
  var jsApp = [
    'js/*.js'
  ];

  grunt.initConfig({
    global_vars: global_vars,
    pkg: grunt.file.readJSON('package.json'),
    sass: {
			dist: {
  			files :  {
    			'css/theme.css': 'sass/theme.scss'
    		},
    		tasks : ['notify:sass'],
				options: {
					sassDir: 'sass',
					cssDir: 'css',
					sourcemap : true,
					includePaths: require('node-bourbon').includePaths,
				},
			},
		},
    webfont: {
      icons : {
        src: 'images/icons/*.svg',
        dest: 'fonts/custom-icons',
        destCss : 'sass',
        options : {
          stylesheet : 'scss',
          relativeFontPath : '../fonts/custom-icons',
          htmlDemo : 'false'
        }
      }
    },
    notify : {
      sass : {
        options : {
          title : "CSS Compiled",
          message : "SASS Task Complete"
        }
      }
    },
    watch: {
      grunt: { files: ['Gruntfile.js'] },
      sass: {
        files: ['<%= global_vars.theme_scss %>/*.scss','<%= global_vars.theme_scss %>/*/*.scss'],
        tasks: ['sass', 'notify:sass'],
        options: {
          livereload: true
        }
      },
      svg : {
        files : ['images/icons/source/*.svg'],
        tasks : ['webfont','sass']
      }
    }
  });
  grunt.registerTask('build', ['sass', 'notify', 'grunticon']);
  grunt.registerTask('default', ['build', 'watch']);
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-webfont');
};