import gulp         from 'gulp';
import plumber      from 'gulp-plumber';
import gutil        from 'gulp-util';
import gulpif       from 'gulp-if';
import rupture      from 'rupture';
import stylus       from 'gulp-stylus';
import autoprefixer from 'gulp-autoprefixer';
import postcss      from 'gulp-postcss';
import svg          from 'postcss-svg';
import flexfixes    from 'postcss-flexbugs-fixes';
import cmq          from 'gulp-combine-media-queries';
import minifyCss    from 'gulp-minify-css';
import rename       from 'gulp-rename';
import errorHandler from '../utils/errorHandler';
import paths        from '../paths';
import { browsers } from '../../package.json';

gulp.task('styles', () => (
  gulp.src('*.styl', {
      cwd: 'app/styles',
      nonull: true
    })
    .pipe(plumber({errorHandler: errorHandler}))
    .pipe(stylus({
      errors: true,
      use: rupture(),
      sourcemap: gutil.env.debug ? {
        comment: false,
        inline: true
      } : false
    }))
    .pipe(autoprefixer(
      'Android >= ' + browsers.android,
      'Chrome >= ' + browsers.chrome,
      'Firefox >= ' + browsers.firefox,
      'Explorer >= ' + browsers.ie,
      'iOS >= ' + browsers.ios,
      'Opera >= ' + browsers.opera,
      'Safari >= ' + browsers.safari
    ))
    .pipe(postcss([
      svg({
        paths: ['./app/icons'],
        defaults: "[fill]: #000000" 
      }),
      flexfixes()
    ]))
    .pipe(cmq())
    .pipe(minifyCss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.styles))
));