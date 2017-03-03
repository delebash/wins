import gulp from 'gulp';
import cleanCSS  from 'gulp-clean-css';
import project from '../aurelia.json';

//Not currently using this task
export default function copyCss() {
  return gulp.src(project.copyCss.sources)
    .pipe(cleanCSS())
    .pipe(gulp.dest(project.copyCss.output));
}

