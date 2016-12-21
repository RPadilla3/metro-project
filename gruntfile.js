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
          {
            expand: true,
            cwd: 'src/',
            src: 'views/**',
            dest: 'build/'
          }
        ]
      },

      images: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: 'images/**',
            dest: 'build/'
          }
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
          {
            expand: true,
            cwd: 'node_modules/angular-ui-router/release/',
            src: ['angular-ui-router.js'],
            dest: 'build/javascript/'
          }
        ]

      }
    },

    concat: {
      javascript: {
        src: ['src/javascript/transport.module.js','src/javascript/**/*.js'],
        dest: 'build/javascript/app.js'
      }
    },

    sass: {
      allStyles: {
        files: {
          'build/css/styles.css': 'src/sass/main.scss'
        }
      }
    },

    watch: {
      html: {
        files: ['src/**/*.html'],
        tasks: ['copy:html']
      },
      js: {
        files: ['src/javascript/**/*.js'],
        tasks: ['concat']
      },
      sass: {
        files: ['src/sass/**/*.scss'],
        tasks: ['sass']
      },
      images: {
        files: ['src/images/**'],
        tasks: ['copy:images']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('default', ['clean', 'sass',  'copy', 'concat']);

};
