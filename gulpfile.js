var browserify = require('browserify');
var gulp       = require('gulp');
var source     = require("vinyl-source-stream");
var reactify   = require('reactify');
var sass       = require('gulp-sass');
var webserver  = require('gulp-webserver');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');

gulp.task('webserver', ['browserify', 'scss'], function() {
  gulp.src('dist')
    .pipe(webserver({
      livereload: false
    }));
});

gulp.task('browserify', function(){
  var b = browserify();
  b.transform(reactify); // use the reactify transform
  b.add('./app/main.js');
  return b.bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('uglify', ['browserify'], function () {
  gulp.src('./dist/main.js')
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(livereload());
})

gulp.task('scss', function () {
  return gulp.src('./app/scss/screen.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./dist'))
    .pipe(livereload());
});

gulp.task('watch', function () {
  livereload.listen();

  gulp.watch(['./app/**/*.jsx', './app/**/*.js'], ['browserify', 'uglify']);
  gulp.watch(['./app/scss/**/*.scss'], ['scss']);
  gulp.watch(['./app/**/*.html'], ['copy']);
})

gulp.task('copy', function () {
  gulp.src([
    './app/*.html',
    './bower_components/fontawesome/fonts/*'
    ])
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['webserver', 'browserify', 'uglify', 'scss', 'copy', 'watch']);