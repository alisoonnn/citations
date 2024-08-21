const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const uglify = require('gulp-uglify');
const clean = require('gulp-clean');
const plumber = require('gulp-plumber');


// Tâche pour nettoyer le dossier de destination
function cleanDist() {
  return gulp.src('dist/css', { read: false, allowEmpty: true })
    .pipe(clean());
}



exports.cleanDist = cleanDist;


// Tâche pour compiler Sass en CSS, ajouter les préfixes et minifier
function compileSass() {
  return gulp.src('src/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      tailwindcss(),
      autoprefixer(),
      cssnano()
    ]))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'));
}

// Tâche pour remplacer du texte dans les fichiers HTML
function replaceText() {
  return gulp.src('src/*.html')
    .pipe(replace(/\.css/g, '.min.css'))
    .pipe(replace(/\.(jpg|png|jpeg)/g, '.webp'))
    .pipe(replace(/\.js/g, '.min.js'))
    .pipe(gulp.dest('dist/'));
}

function images() {
    return gulp.src('./src/img/**/*')
      .pipe(gulp.dest('./dist/img'))
  }


// Tâche pour minifier les fichiers JavaScript
function minifyJS() {
  return gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/js'));
}


  function copyWebManifest() {
    return gulp.src('src/**/*.webmanifest')
    .pipe(gulp.dest('dist'));
}
  
// Tâche de surveillance des fichiers Sass
function watchFiles() {
  gulp.watch('src/scss/style.scss', compileSass);
  gulp.watch('src/*.html', replaceText);
}




// Tâche par défaut (exécutée en tapant simplement 'gulp' dans le terminal)
exports.default = gulp.series(
    cleanDist,
    compileSass,
    replaceText,
    images,
    minifyJS,
    copyWebManifest,
    watchFiles,
  );