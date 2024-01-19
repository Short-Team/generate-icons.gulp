const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const iconfont = require('gulp-iconfont');
const iconfontCss = require('gulp-iconfont-css');
const consolidate = require('gulp-consolidate');

gulp.task('genrateIcos', function () {
    return gulp.src('src/svg/*.svg')
    .pipe(iconfont({
        fontName: 'ibo',
        formats: ['svg','ttf', 'eot', 'woff'],
        appendCodepoints: true,
        appendUnicode: false,
        normalize: true,
        fontHeight: 1000,
        centerHorizontally: true
    }))
    .on('glyphs', function (glyphs, options) {
        gulp.src('src/templates/_icons.scss')
            .pipe(consolidate('underscore', {
                glyphs: glyphs,
                fontName: options.fontName,
                fontPath: '../fonts/',
                className: 'ibo',
                cssClass: 'ibo'
            }))
            .pipe(gulp.dest('src/scss/config/'));

        gulp.src('src/templates/index.html')
            .pipe(consolidate('underscore', {
                glyphs: glyphs,
                fontName: options.fontName
            }))
            .pipe(gulp.dest('dist/'));
    })
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('scss', function () {
    return gulp.src('src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css/'))
});
  
gulp.task('build', 
    gulp.series(
    'genrateIcos',
    'scss'
    )
);