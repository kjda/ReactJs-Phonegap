'use strict'

# Constants
MODULES_DIR      = 'src'
BUILD_DIR        = 'build'
DIST_DIR         = 'dist'
GRUNTFILE        = 'Gruntfile.coffee'
TMP_DIR          = 'tmp'

module.exports = (grunt) ->

  grunt.initConfig
    bower:
      install:
        cleanup: yes
        copy: no

    clean:
      build: [BUILD_DIR]
      dist: [DIST_DIR]
      tmp: TMP_DIR
      lib: 'lib'

    coffee:
      dist:
        options:
          sourceMap: yes
          join: yes
        src: '<%= coffeelint.src.files.src %>'
        dest: "#{DIST_DIR}/iscroll-sticky.js"

    coffeelint:
      options:
        newlines_after_classes:
          level: 'error'
        no_empty_param_list:
          level: 'error'
        no_stand_alone_at:
          level: 'error'
      src:
        files: src: ["#{MODULES_DIR}/iscroll-sticky.coffee"]
        max_line_length:
          value: 79
          level: 'error'
      gruntfile:
        files: src: [GRUNTFILE]

    shell:
      options:
        stderr : true
        stdout : true
        failOnError : true
      semver:
        command: './node_modules/semver-sync/bin/semver-sync -v'
      hooks:
        command: 'cp -R ./hooks ./.git/'

    watch:
      lib:
        files: ['<%= coffeelint.gruntfile.files.src %>', "#{MODULES_DIR}/**"]
        tasks: ['build']

  # Load grunt-* plugins
  require('matchdep').filterDev('grunt-*').forEach grunt.loadNpmTasks

  grunt.registerTask 'build', [
    'clean:build'
    'coffee']

  grunt.registerTask 'dist', [
    'clean:dist'
    'coffee']

  grunt.registerTask 'default',   ['build']

  grunt.registerTask 'dev', [
    'bower:install'
    'clean:lib'
    'shell:hooks'
    'build'
    'watch']

  grunt.registerTask 'precommit', ['shell:semver', 'coffeelint', 'dist']
