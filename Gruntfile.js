'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    babel: {
      options: {
        sourceMap: true,
        presets: [["env", {
          "targets": {
            "node": "4"
          }
        }]],
        plugins: []
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'lib',
          src: ['**/*.js'],
          dest: 'dist',
          ext: '.js'
        }]
      }
    },
    eslint: {
      lib: {
        src: ['lib/**/*.js']
      }
    },
    watch: {
      lib: {
        files: '<%= eslint.src %>',
        tasks: ['eslint', 'babel']
      }
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('gruntify-eslint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-babel');

  // Default task.
  grunt.registerTask('default', ['eslint', 'babel']);

};
