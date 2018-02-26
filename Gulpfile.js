
var gulp = require('gulp');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var cleanCSS = require('gulp-clean-css');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var connect = require('gulp-connect');

var dir_css = "src/";
var dir_js = "src/";

gulp.task('cssmin', function () {
    gulp.src(dir_css + '*.css')
        .pipe(plumber(function(error) {
            console.log(error.message);
            this.emit('end');
        }))
        .pipe(autoprefixer({browsers: ['last 100 versions', 'safari 6', 'ie >= 9', 'opera 12.1', 'ios 6', 'android 4', 'Firefox 14'], cascade: false}))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream())
        .pipe(connect.reload())
        .pipe(notify('<%= file.relative %> minificado com sucesso'));
});

gulp.task('jsmin', function () {
    gulp.src(dir_js + '*.js')
        .pipe(plumber(function(error) {
            console.log(error.message);
            this.emit('end');
        }))
        .pipe(babel())
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream())
        .pipe(connect.reload())
        .pipe(notify('<%= file.relative %> minificado com sucesso'));
});

gulp.task('server', function() {
    browserSync.init({
        startPath: 'specs',
        port: 8080,
        server: {
            baseDir: './'
        }
    });
});

gulp.task('watch', function() {
    gulp.watch(dir_css + '*.css', ['cssmin']);
    gulp.watch(dir_js + '*.js', ['jsmin']);
    gulp.watch('./specs/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['cssmin', 'jsmin', 'watch', 'server']);