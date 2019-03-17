var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    browserSync     = require('browser-sync').create(),
    babel           = require('gulp-babel'),
    uglify          = require('gulp-uglify'),
    cleanCSS        = require('gulp-clean-css');

gulp.task('sass', function(){
    return gulp.src('src/**/*.+(scss|sass)')
        .pipe(sass())
        .pipe(gulp.dest('src/'))
        .pipe(browserSync.stream());
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

gulp.task('build',function(done){
    gulp.series('clean');
    gulp.src('src/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));

    gulp.src('src/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist'));

    gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));

    done();
});




gulp.task('default', gulp.parallel('browser-sync', 'watch', 'sass'));
