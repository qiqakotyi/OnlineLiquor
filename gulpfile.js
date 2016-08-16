var gulp = require('gulp'),
    sass = require('gulp-sass'),
    path = require('path'),
    _ = require('lodash'),
    watch = require('gulp-watch'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    fs = require('fs'),
    jshint = require('gulp-jshint'),
    ngAnnotate = require('gulp-ng-annotate'),
    imageop = require('gulp-image-optimization');

gulp.task('watch', function () {
    gulp.watch('./assets/css/**/*.scss', ['sass']);
    gulp.watch('./assets/js/**/*.js', ['scripts']);
});

gulp.task('scripts', function () {
    gulp.src([
            './assets/vendor/jquery/dist/jquery.min.js',
            './assets/vendor/angular/angular.min.js',
            './assets/vendor/lodash/lodash.js',
            './assets/vendor/gsap/src/minified/TweenMax.min.js',
            './assets/js/app.js',
            './assets/js/controllers/app-controller.js'])
        .pipe(ngAnnotate())
        .pipe(concat('combined.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./assets/dist/js/'));

    gulp.src(['./assets/js/**/*.js'])
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('./assets/dist/js/'));
});

gulp.task('lint', function () {
    return gulp.src(['./assets/js/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter("fail"));
});

gulp.task('sass', function(done) {
    gulp.src('./assets/css/site.scss')
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(gulp.dest('./assets/css/'))
        .pipe(minifycss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./assets/css/'))
        .on('end', done);
});

gulp.task('images', function(cb) {
    gulp.src(['src/**/*.png','src/**/*.jpg','src/**/*.gif','src/**/*.jpeg']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('public/images')).on('end', cb).on('error', cb);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);