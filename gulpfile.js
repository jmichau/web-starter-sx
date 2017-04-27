var babel = require('gulp-babel');
var browserSync = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var fs = require("fs");
var gulp = require("gulp");
var url = require("url");
var path = require('path');
var requireUncached = require('require-uncached');
var stylus = require('gulp-stylus');

gulp.task('reload_broswer', (done) => {
    browserSync.reload();
    done();
});

gulp.task('html', (done) => {
    gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));

    done();
});

gulp.task('jsx', (done) => {
    var files = requireUncached('./src/app/concat.json');
    for (var i = 0; i < files.length; ++i)
        files[i] = path.join('src/app', files[i]);

    gulp.src(files)
        .pipe(babel({
            plugins: [
                ["transform-react-jsx", { "pragma": "m" }]
            ]
        }))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist'));

    done();
});

gulp.task('stylus', (done) => {
    if (env == 'dev')
        gulp.src('src/style/main.styl')
            .pipe(stylus())
            .pipe(gulp.dest('dist'))
            .pipe(browserSync.stream());
    else
        gulp.src('src/style/main.styl')
            .pipe(stylus())
            .pipe(cleanCSS())
            .pipe(gulp.dest('dist'));

    done();
});

/* ----------------------------------------------------------------------------
 * Main tasks called from npm scripts
 * ------------------------------------------------------------------------- */

var env;

gulp.task('dev', () => {
    process.env.NODE_ENV = 'development';
    env = 'dev';

    browserSync.init({
        port: 3000,
        server: {
            baseDir: "./dist",
            middleware: [
                (req, res, next) => {
                    res.setHeader('cache-control', 'public, max-age=0');
                    next();
                },
                (req, res, next) => {
                    var fileName = url.parse(req.url);
                    fileName = fileName.href.split(fileName.search).join("");
                    var fileExists = fs.existsSync(path.join('./dist', fileName));
                    if (!fileExists && fileName.indexOf("browser-sync-client") < 0) {
                        req.url = "/" + 'index.html';
                    }
                    next();
                }
            ]
        }
    });

    gulp.watch('src/style/**/*.styl', gulp.series('stylus'));
    gulp.watch(['src/app/**/*.jsx', 'src/app/concat.json'], gulp.series('jsx', 'reload_broswer'));
    gulp.watch('src/index.html', gulp.series('html', 'reload_broswer'));
});

gulp.task('build', (done) => {
    process.env.NODE_ENV = 'production';
    env = 'prod';

    done();
});
