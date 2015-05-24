var gulp              = require('gulp');
var gulpLoadPlugins   = require('gulp-load-plugins');
var plugins           = gulpLoadPlugins();

var browserify        = require('browserify');
var source            = require('vinyl-source-stream');
var reactify          = require('reactify');
var postcss           = require('gulp-postcss');
var autoprefixer      = require('autoprefixer-core');
var mqpacker          = require('css-mqpacker');
var csswring          = require('csswring');
var postcssNested     = require('postcss-nested');
var postcssImport     = require('postcss-import');
var postcssSimpleVars = require('postcss-simple-vars');

gulp.task('webserver', ['browserify', 'css'], function() {
  gulp.src('dist')
    .pipe(plugins.webserver({
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
    .pipe(plugins.uglify())
    .pipe(plugins.rename('main.min.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(plugins.livereload());
})

//
// CSS
// --------------------------------------------------
gulp.task('css', function () {
  var processors = [
    postcssImport({ path: ['./app/css'] }),
    postcssNested,
    autoprefixer({ browsers: ['last 1 version'] }),
    mqpacker,
    csswring,
    postcssSimpleVars
  ];

  return gulp.src('./app/css/screen.css')
    .pipe(plugins.sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'))
    .pipe(plugins.livereload());
});

gulp.task('watch', function () {
  plugins.livereload.listen();

  gulp.watch(['./app/**/*.jsx', './app/**/*.js'], ['browserify', 'uglify']);
  gulp.watch(['./app/css/**/*.css'], ['css']);
  gulp.watch(['./app/**/*.html'], ['copy']);
});

gulp.task('copy', function () {
  gulp.src([
      './app/*.html',
      './bower_components/fontawesome/fonts/*'
    ])
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['webserver', 'browserify', 'uglify', 'css', 'copy', 'watch']);
gulp.task('build', ['browserify', 'uglify', 'css', 'copy']);