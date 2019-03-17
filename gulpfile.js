var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    browserSync     = require('browser-sync').create();

gulp.task('sass', function(){
    return gulp.src('src/**/*.+(scss|sass)')
        .pipe(sass())
        .pipe(gulp.dest('src/'))
        .pipe(browserSync.stream());;
});

gulp.task('browser-sync',function(){
    browserSync.init({
        server: {
            baseDir: 'src',
        },
        single:true,
        cors:true,
        notify:false,
        files:'*'
    });
});

gulp.task('watch', function(){
    gulp.watch('src/**/*.+(scss|sass)',gulp.series('sass'));
    gulp.watch("src/**/*.html").on('change', browserSync.reload);
    gulp.watch("src/**/*.js").on('change', browserSync.reload);
});


gulp.task('clean', function () {  
  return gulp.src('dist', {read: false})
    .pipe(clean());
});

gulp.task('build',function(){

});


gulp.task('default', gulp.parallel('browser-sync', 'watch', 'sass'));
