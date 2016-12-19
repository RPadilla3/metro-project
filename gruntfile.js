'use strict';

module.exports = function(grunt) {
  grunt.initConfig({

    clean: ['build/'],

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        ignores: ['node_modules/**']
      },
      source: {
        files: {
          src: [ 'src/javascript/**/*.js' ]
        }
      }
    },

    copy: {
      html: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: 'index.html',
            dest: 'build/'
          },
        ]
      },

      vendorjs: {
        files: [
          {
            expand: true,
            cwd: 'node_modules/angular/',
            src: ['angular.js'],
            dest: 'build/javascript/'
          },
        ]
      }
    },

    concat: {
      javascript: {
        src: ['src/javascript/**/*.js'],
        dest: 'build/javascript/app.js'
      }
    },

    watch: {
      html: {
        files: ['src/index.html'],
        tasks: ['copy:html']
      },
      js: {
        files: ['src/javascript/**/*.js'],
        tasks: ['test', 'concat']
      },
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['clean','jshint', 'copy', 'concat']);

};
