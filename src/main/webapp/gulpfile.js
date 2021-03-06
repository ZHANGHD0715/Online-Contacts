'use strict';

var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
        uglify = require('gulp-uglify'), 
    livereload = require('gulp-livereload'),
    csso = require('gulp-csso'),
    cleanhtml = require("gulp-cleanhtml"),
    coffee = require('gulp-coffee');

gulp.task('default', function () {
    gulp.start('build');
});

gulp.task('test', function () {

});


gulp.task('scripts', function () {
    gulp.src(['app/js/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
    gulp.src(['app/coffee/*.coffee'])
        .pipe(coffee({bare: true}))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('styles', function () {
    gulp.src(['app/sass/**/*.scss'])
        .pipe(sass({
            style: 'expanded'
        }))
        .pipe(gulp.dest('app/css'));
    gulp.src('app/css/**/*.css')
        .pipe(gulp.dest('dist/css'))
        .pipe(csso())
        .pipe(gulp.dest('dist/css/min'));
});

gulp.task('pages', function () {
    gulp.src('app/*.html')
        .pipe(cleanhtml())
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['scripts', 'styles', 'pages']);

gulp.task('server', function () {
//    var connect = require('connect'),
//        server = connect();
//    server.use(connect.static('dist')).listen(process.env.PORT || 8081);
//    require('opn')('http://localhost:' + (process.env.PORT || 8081) + '/Online-Contacts');
});

gulp.task('watch', function () {
    gulp.start('build');

    gulp.watch('app/sass/**/*.scss', ['styles']);
    gulp.watch(['app/js/**/*.js','app/coffee/*.coffee'], ['scripts']);
    gulp.watch('app/*.html', ['pages']);

    var server = livereload();
    gulp.watch('app/**').on('change', function (file) {
        server.changed(file.path);
    });
});