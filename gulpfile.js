var gulp = require('gulp');
var pug = require('gulp-pug');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css')

var viewsDir = 'views';
var lessDir = 'less';
var targetCSSDir = 'css';
var targetHtmlDir = '';
var targetJSDir = 'js';

// Compile Sass, autoprefix CSS3,
// and save to target CSS directory
gulp.task('css', function () {
    return gulp.src(lessDir + '/*.less')
        .pipe(less({ style: 'compressed' }).on('error', gutil.log))
        .pipe(gulp.dest(targetCSSDir))
        .pipe(notify('CSS minified'));
});

gulp.task('views', function () {
    return gulp.src(viewsDir + '/*.pug')
        .pipe(pug()).on('error', gutil.log)
        .pipe(gulp.dest(targetHtmlDir))
        .pipe(notify('Pugs compiled'));
});

gulp.task('watch', function () {
    gulp.watch(lessDir + '/*.less', ['css']);
    gulp.watch('**/*.pug', ['views']);
});

// What tasks does running gulp trigger?
gulp.task('default', ['css', 'views', 'watch']);
