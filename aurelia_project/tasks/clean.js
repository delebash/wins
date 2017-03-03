let gulp = require('gulp');
let del = require('del');
import project from '../aurelia.json';

export default function clean(done) {
  console.log("Cleaning dist and scripts folders");
  del([project.dist.output +'/**/*', project.platform.output + '/**/*'], done());
}

// del([project.dist.output +'/**/*', project.platform.output + '/app-bundle.*' ], done());
// return gulp.src(project.dist.output + "/*", {read: false}).pipe(clean());
