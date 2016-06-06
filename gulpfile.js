var gulp = require('gulp');
var pug = require('gulp-pug');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var connect = require('gulp-connect');

var viewsDir = 'views';
var lessDir = 'less';
var targetCSSDir = 'css';
var targetHtmlDir = '';
var targetJSDir = 'js';

gulp.task('webserver', function() {
    connect.server({
        livereload: true,
    });
});

gulp.task('css', function () {
    return gulp.src(lessDir + '/*.less')
        .pipe(less({ style: 'compressed' }).on('error', gutil.log))
        .pipe(gulp.dest(targetCSSDir))
        .pipe(notify('CSS minified'))
        .pipe(connect.reload());
});

gulp.task('views', function () {
    return gulp.src(viewsDir + '/*.pug')
        .pipe(pug()).on('error', gutil.log)
        .pipe(gulp.dest(targetHtmlDir))
        .pipe(notify('Pugs compiled'))
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(lessDir + '/*.less', ['css']);
    gulp.watch('**/*.pug', ['views']);
});

gulp.task('default', ['webserver', 'css', 'views', 'watch']);
