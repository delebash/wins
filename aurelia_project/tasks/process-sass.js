import gulp from 'gulp';
import postcss from 'gulp-postcss';
import sass from 'gulp-sass';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import sourcemaps from 'gulp-sourcemaps';
import postcssflexbugsfixes from 'postcss-flexbugs-fixes'
import project from '../aurelia.json';
import {build} from 'aurelia-cli';

let processors = [
  autoprefixer({ browsers: ['last 2 version'] }),
  cssnano,
  postcssflexbugsfixes
];

export default function processSASS() {
  return gulp.src(project.sassProcessor.source)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(build.bundle());
}
