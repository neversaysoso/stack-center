var gulp = require('gulp');

var less = require('gulp-less'),
    htmlmin = require('gulp-htmlmin'), //html压缩
    imagemin = require('gulp-imagemin'),//图片压缩
    pngcrush = require('imagemin-pngcrush'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    minifycss = require('gulp-minify-css'),//css压缩
    uglify = require('gulp-uglify'),//js压缩
    concat = require('gulp-concat'),//文件合并
    rename = require('gulp-rename'),//文件更名
    notify = require('gulp-notify'),//提示信息
    gulpCopy = require('gulp-file-copy'),
    rev = require('gulp-rev-append'),
    livereload = require('gulp-livereload'),
    htmlreplace = require('gulp-html-replace'),
    babel = require("gulp-babel");


gulp.task('default', ['less', 'js', 'imgmin', 'rev'], function () {
    console.log('excute default task')
});

gulp.task('less', function () {
    gulp.src('src/less/style.less')
        .pipe(less())
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload());
});

gulp.task('js', function () {
    gulp.src(['src/js/main.js', 'src/js/*.js'])
        .pipe(babel())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({ message: 'js task ok' }))
        .pipe(livereload());
    gulp.src('src/js/lib/**')
        .pipe(gulp.dest('dist/js/lib'))
});

gulp.task('imgmin', function () {
    gulp.src('src/images/*.{png,jpg,gif,ico}')
        .pipe(cache(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('rev', function () {
    gulp.src('src/view/**/*.html')
        .pipe(htmlreplace({
            'css': '../css/style.min.css',
            'js': '../js/all.min.js'
        }))
        .pipe(gulp.dest('dist/view'))
        .pipe(livereload());
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('src/**/*.{less,js,html}', ['default'])
});