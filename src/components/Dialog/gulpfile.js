// 获取 gulp
var gulp = require('gulp');
// 获取 uglify 模块（用于压缩 JS）
var uglify = require('gulp-uglify');
// 压缩后的文件加min
var rename = require('gulp-rename');
//js语法检查
var jshint = require('gulp-jshint');
//压缩css
var minifycss = require('gulp-minify-css');

//语法检查
gulp.task('jshint', function() {
  return gulp.src('./Dialog.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// 压缩 js 文件
// 在命令行使用 gulp script 启动此任务
gulp.task('script', function() {
  // 1. 找到文件
  gulp.src('./Dialog.js')
    //2. rename压缩后的文件名
    .pipe(rename({
      suffix: '.min'
    }))
    // 3. 压缩文件
    .pipe(uglify())
    // 4. 另存压缩后的文件
    .pipe(gulp.dest('dist/js'))
});

//压缩css
gulp.task('minifycss', function() {
  return gulp.src('skin/*.css') //需要操作的文件
    .pipe(rename({
      suffix: '.min'
    })) //rename压缩后的文件名
    .pipe(minifycss()) //执行压缩
    .pipe(gulp.dest('dist/css')); //输出文件夹
});

// 在命令行使用 gulp auto 启动此任务
// gulp.task('auto', function() {
//   // 监听文件修改，当文件被修改则执行 script 任务
//   gulp.watch('./Dialog.js', ['script'])
// });


// 使用 gulp.task('default') 定义默认任务
// 在命令行使用 gulp 启动 script 任务和 auto 任务
gulp.task('default', ['jshint'], function() {
  gulp.start('script', 'minifycss');　　
});
