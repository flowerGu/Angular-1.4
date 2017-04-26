'use strict';
var path = require('path');
var gulp = require('gulp');
var browserSync = require('browser-sync');
//var del = require('del');
var $ = require('gulp-load-plugins')({ lazy: true });//按需加载package.json里面的插件
var runSequence = require('run-sequence');
var stripDebug = require('gulp-strip-debug');//构建时删除js中的console.log
var proxy = require('http-proxy-middleware');//解决跨域问题

var reload = browserSync.reload;
var paths='./';
var jsonPlaceholderProxy = proxy('/me-front',{//路径匹配
                                target:'http://10.18.82.91:8080/',//url
                                changeOrigin:true,
                                logLevel:'warn'
                          })
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
        port:3000,
        injectChanges: true,
        middleware:[jsonPlaceholderProxy],
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
        [ 'css/**/*.less'],
        ['styles']);
    options.server = {
      baseDir:[
          paths,
          paths+'dev',
          // paths+'ui-grid-master/misc'
      ]
    };
    options.files = [
       '!'+ './css/**/*.less',
        './**/*',
      './dev/css/*'
    ];
    browserSync(options);
  }
  serveApp();
});
gulp.task('styles',function(){
    return gulp.src(['css/*.less'],{base:'css/'})
        .pipe($.plumber({ errorHandler: swallowError }))
        .pipe($.less({
            paths: [path.join(__dirname, 'css')]
        }))
        .pipe($.autoprefixer())
        .pipe($.cssnano({zindex:false}))//禁止重写z-index
        .pipe(gulp.dest('dev/css'))

})
gulp.task('js',function(){
    return gulp.src([
        '!./src/js/plugins/**',
        '!./src/js/config/**',
        './src/js/**'
    ])
    .pipe($.rev())
    .pipe($.uglify())
    .pipe(stripDebug())//删除console.log信息
    .pipe($.rename({suffix:'.min'})
    .pipe(gulp.dest('./dist/js');
})


