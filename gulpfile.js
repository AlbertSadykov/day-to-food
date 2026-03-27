const { src, dest, watch, series, parallel } = require('gulp');
const browserSync = require('browser-sync').create();
const fileInclude = require('gulp-file-include');
const del = require('del');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');

const paths = {
  src: 'src',
  dist: 'dist',
  html: 'src/*.html',      // Берем только файлы в корне src (например, index.html)
  htmlWatch: 'src/**/*.html', // Следим за всеми изменениями во всех папках
  styles: 'src/scss/**/*.scss',
  scripts: 'src/js/**/*.js',
  images: 'src/images/**/*.{png,jpg,jpeg,gif,svg,webp,ico}',
  fonts: 'src/fonts/**/*'
};

const clean = () => del([paths.dist]);

const html = () => {
  return src(paths.html) // Берет только файлы из корня src
    .pipe(plumber())
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(dest(paths.dist))
    .pipe(browserSync.stream());
};

const styles = () => {
  return src('src/scss/style.scss', { allowEmpty: true })
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(dest(paths.dist + '/css'))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.dist + '/css'))
    .pipe(browserSync.stream());
};

const scripts = () => {
  return src(['src/js/**/*.js', '!src/js/**/*.min.js'], { allowEmpty: true })
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(dest(paths.dist + '/js'))
    .pipe(terser())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.dist + '/js'))
    .pipe(browserSync.stream());
};

const images = () => {
  return src(paths.images, { allowEmpty: true })
    .pipe(imagemin())
    .pipe(dest(paths.dist + '/images'))
    .pipe(browserSync.stream());
};

const fonts = () => {
  return src(paths.fonts, { allowEmpty: true })
    .pipe(dest(paths.dist + '/fonts'));
};

const serve = (done) => {
  browserSync.init({
    server: {
      baseDir: paths.dist
    },
    notify: false,
    open: false
  });
  done();
};

const watcher = () => {
  watch(paths.htmlWatch, html);
  watch(paths.html, html);
  watch(paths.styles, styles);
  watch(paths.scripts, scripts);
  watch(paths.images, images);
  watch(paths.fonts, fonts);
};

const build = series(clean, parallel(html, styles, scripts, images, fonts));
const dev = series(build, parallel(serve, watcher));

exports.clean = clean;
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.fonts = fonts;
exports.build = build;
exports.default = dev;
