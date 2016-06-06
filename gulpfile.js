var gulp = require('gulp');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css')

// Where do you store your Less files?
var lessDir = 'less';

// Which directory should LESS compile to?
var targetCSSDir = 'css';

// Which directory should CoffeeScript compile to?
var targetJSDir = 'js';

// Compile Sass, autoprefix CSS3,
// and save to target CSS directory
gulp.task('css', function () {
    return gulp.src(lessDir + '/*.less')
        .pipe(less({ style: 'compressed' }).on('error', gutil.log))
        .pipe(gulp.dest(targetCSSDir))
        .pipe(notify('CSS minified'))
});

gulp.task('watch', function () {
    gulp.watch(lessDir + '/*.less', ['css']);
});

// What tasks does running gulp trigger?
gulp.task('default', ['css', 'watch']);
