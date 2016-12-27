'use strict';
var path = require('path');
var gulp = require('gulp');
var browserSync = require('browser-sync');
//var del = require('del');
var $ = require('gulp-load-plugins')({ lazy: true });
var runSequence = require('run-sequence');


var reload = browserSync.reload;
var paths='./'
function swallowError(error) {
    // If you want details of the error in the console
    console.log(error.toString());
    this.emit('end');
}

//main
gulp.task('default', function () {
    runSequence(
        'styles',
        'browserSync'
    );
});
gulp.task('browserSync', function () {
    var options={
        port:1320,
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'info',
        logPrefix: 'gulp',
        notify: true,
        reloadDelay: 0, // 1000,
        online: false,
        ghostMode: {
            clicks: false,
            location: false,
            forms: false,
            scroll: false
        }
    };
  function serveApp() {
    gulp.watch(
        [paths+'css/*.less',
         paths+'css/**/*.less'
        ],

        ['styles']);
    options.server = {
      baseDir:[
          paths,
          paths+'dev',
          paths+'ui-grid-master/misc'
      ]
    };
    options.files = [
      './**/*',
      '!'+paths + 'css/*.less'

    ];
    browserSync(options);
  }
  serveApp();
});
gulp.task('styles',function(){
    return gulp.src([paths+'css/*.less',paths+'css/**/*'])
        .pipe($.plumber({ errorHandler: swallowError }))
        .pipe($.less())
        .pipe($.autoprefixer())
        .pipe($.cssnano())
        .pipe(gulp.dest(paths+'dev/css'))

})


