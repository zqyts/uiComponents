// 获取 gulp
var gulp = require('gulp');
// 获取 uglify 模块（用于压缩 JS）
var uglify = require('gulp-uglify');
// 压缩后的文件加min
var rename = require('gulp-rename');
//js语法检查
var jshint = require('gulp-jshint');

//语法检查
gulp.task('jshint', function() {
  return gulp.src('./Tools.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// 压缩 js 文件
// 在命令行使用 gulp script 启动此任务
gulp.task('script', function() {
  // 1. 找到文件
  gulp.src('./Tools.js')
    //2. rename压缩后的文件名
    .pipe(rename({
      suffix: '.min'
    }))
    // 3. 压缩文件
    .pipe(uglify())
    // 4. 另存压缩后的文件
    .pipe(gulp.dest('dist/js'))
});
// 使用 gulp.task('default') 定义默认任务
// 在命令行使用 gulp 启动 script 任务和 auto 任务
gulp.task('default', ['jshint'], function() {
  gulp.start('script');　　
});
