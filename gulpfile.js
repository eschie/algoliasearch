var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    sass        = require('gulp-sass'),
    csso        = require('gulp-csso'),
    uglify      = require('gulp-uglify'),
    jade        = require('gulp-jade'),
    concat      = require('gulp-concat'),
    path        = require('path'),
    connect     = require('gulp-connect'),
    bower       = require('main-bower-files'),
    gulpignore  = require('gulp-ignore');

// lint
gulp.task('jshint', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// CSS
gulp.task('css', function() {
  return gulp.src('src/scss/main.scss')
    .pipe(
      sass( {
        includePaths: ['src/scss'],
        errLogToConsole: true
      } ) )
    .pipe( csso() )
    .pipe( concat('style.css'))
    .pipe( gulp.dest('dist/css/') )
    .pipe(connect.reload());
});

// JS
gulp.task('js', function() {
  return gulp.src('src/js/*.js')
    .pipe( uglify() )
    .pipe( concat('all.min.js'))
    .pipe( gulp.dest('dist/js/'))
    .pipe(connect.reload());
});

// Templates
gulp.task('templates', function() {
  return gulp.src('src/templates/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload());
});

// Connect
gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

// Watches
gulp.task('watch', function() {

  gulp.watch('src/scss/**/*.scss',['css']);

  gulp.watch('src/js/*.js',['js']);


  gulp.watch('src/templates/*.jade',['templates']);
});


// Default Task
gulp.task('default', ['js','css','templates','connect','watch']);