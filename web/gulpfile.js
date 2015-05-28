var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat');

gulp.task('build', function () {
    return gulp.src('es6/**/*.jsx')
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
    gulp.watch('es6/**/*.jsx', ['build']);
});

gulp.task('default', ['build', 'watch']);