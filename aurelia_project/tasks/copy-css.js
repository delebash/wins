import gulp from 'gulp';
import cleanCSS  from 'gulp-clean-css';
import concat  from 'gulp-concat';
import project from '../aurelia.json';

export default function copyCss() {
  return gulp.src(project.copyCss.sources)
    .pipe(cleanCSS())
    .pipe(gulp.dest(project.copyCss.output));
}

