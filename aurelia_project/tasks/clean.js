let gulp = require('gulp');
let rimraf = require('rimraf');
import project from '../aurelia.json';

export default function clean(cb) {
  rimraf(project.platform.output, cb);
  rimraf(project.dist.output,cb);
}

