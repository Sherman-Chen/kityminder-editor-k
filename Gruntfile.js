/* global require, module */

module.exports = function (grunt) {
  'use strict';

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  var pkg = grunt.file.readJSON('package.json');

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: pkg,

    ngtemplates: {
      kityminderEditor: {
        src: ['ui/directive/**/*.html', 'ui/dialog/**/*.html'],
        dest: 'ui/templates.js',
        options: {
          htmlmin: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeComments: true,
          },
        },
      },
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [
          {
            expand: true,
            cwd: 'ui/',
            src: '**/*.js',
            ext: '.annotated.js',
            extDot: 'last',
            dest: '.tmp/scripts/',
          },
        ],
      },
    },

    // concat
    concat: {
      closure: {
        options: {
          banner: 'const angular = require("angular");\n(function () {\n',
          footer: '})();',
        },
        files: {
          'ui/bundle.js': [
            '.tmp/scripts/kityminder.app.annotated.js',
            '.tmp/scripts/templates.annotated.js',
            '.tmp/scripts/service/*.js',
            '.tmp/scripts/filter/*.js',
            '.tmp/scripts/dialog/**/*.js',
            '.tmp/scripts/directive/**/*.js',
          ],
        },
      },
    },

    clean: {
      clstmp: ['.tmp', 'ui/templates.js'],
    },
  });

  // Build task(s).
  grunt.registerTask('build', ['clean:clstmp', 'ngtemplates', 'ngAnnotate', 'concat', 'clean:clstmp']);
};
