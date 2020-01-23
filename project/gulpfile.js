const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer')
// gulp.task('task-to-be-done', function() {
//   // stuff here
// });

gulp.task('greetings', function() {
  console.log('hello');
});

gulp.task('sass', function() {
  // first find the source files for compiling
  return gulp.src('app/scss/**/*.scss')
  // next if there's an error getting the source files, print to the console the error
    .pipe(customPlumber('Error Running Sass'))
  // next how precise do you want decimals to be?
    .pipe(sass({precision: 2}))
  // next it should autoprefix the compiled files for the varying vendors
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'] 
    }))
  // next, where should it put the compiled files?
    .pipe(gulp.dest('app/css'))
  // next, tell browserSync to reload the files after the last task is done. 
    .pipe(browserSync.reload({
      stream: true,
    }))
});
// enables watch anytime that a task is fired. technically what you want, but not the best way to do it.
// gulp.watch('app/scss/**/*.scss', gulp.series('sass'));
// this is a better way
gulp.task('browser', function() {
  browserSync({
    server: {
      baseDir: 'app',
    },
    open: false,
    notify: false,
    // NOTE: hella options exist inside of browser sync, 
    // browser, allows you to specify which browsers to use in the development phase
    // tunnel, allows you to specify a url for people who are not on your network to see what your working on
    // open, allows you to specify which url you want to have browserSync load on.
    // you can also disable browsers opening on default by passing false as an option.
    // notify, will allow you to disable the default notification of browserSync on init.
    // browser: ['google chrome', 'firefox']
  })
});

gulp.task('watch', ['browser','sass'],function() {
  gulp.watch('app/scss/**/*.scss', ['sass'])
});

// TODO figure out how to make the watch task start sass at the same time

// NOTE changed back to Node 10 and Gulp 3.9 to alleviate Gulp 4 issues, will need to refactor at some point



// function errorHandler(err) {
//   console.log(err.toString());
//   this.emit('end');
// }

function customPlumber(errTitle) {
  return plumber({
    errorHandler: notify.onError({
      title: errTitle || "Error running Gulp",
      message: "Error: <%= error.message %>",
      sound: "Funk"
    })
  });
}