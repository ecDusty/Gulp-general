//The Projects object. A place to keep all your projects stored for use.
var SourceComputer = '..\\'; /*..\\D:\\*/
var Projects = {
    Conrad: SourceComputer+'Users\\mulli\\OneDrive\\GitHub\\lianatech-CMS\\Conrad-landing\\', /* D:\users\mulli\OneDrive\ */
    SNSProp: SourceComputer+'lianatech-CMS\\SNS Properties v2\\'
}

/*=============================

        DEPENDENCIES

===============================*/

var gulp = require('gulp');
var flatten = require('gulp-flatten')
var srcMaps = require('gulp-sourcemaps');

//STYLE Dependencies
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

//JAVASCRIP Dependencies


/*========================
       VARIABLES
=========================*/


//Text Variables
var strt = '>---Starting ',
    cls = ' Task---<';

//Directory Variables
var $test = 'dev/',
    $liv = 'live/',
    $src = 'src/',
    $active = '',
    $set = $test,
    $JS = 'js',
    $CSS = 'css',
    $IMG = 'images';

//Sources File Variables
var $srcHTML = 'src/{*.html,**/*.html}',
    $srcSCSS = 'src/{sass,**}/*.scss',
    $srcJS = 'src/{libs,**}/*.js'

/*====================
    Custom Functions
=====================*/

function talk (a,t) {
    if (t) 
        console.log(strt+a+cls);
    else   
        console.log(a);
}


/*========================
       TASKS
=========================*/

//Default Run Task
gulp.task('default',['start','sass'], function() {
    gulp.watch($active+$srcSCSS,['sass', 'set-live','sass-live','set-dev'])
});

//START
gulp.task('start',function () {
    //Set the currently live project
    $active = Projects.SNSProp;
    talk('That active projects source: '+$active);
    
    //add task to delete dev and live files
});

gulp.task('live', ['set-live','default']);

//SET THE PARAMATERS
gulp.task('set-live', function () {
    $set = $liv;
    console.log('Now the active directory: '+$set);
});
gulp.task('set-dev', function () {
    $set = $test;
    console.log('Now the active directory: '+$set);
});


/*==============
    STYLES TASKS
    ============*/


gulp.task('sass', function () {
    talk('SASS styles going to "'+$set+'" at "'+$active+'"',true);

    if ($set === $test) {
      return gulp.src($active+$srcSCSS)
          .pipe(srcMaps.init())
          .pipe(sass({sourceComments: true})
                .on('error', sass.logError))
          .pipe(autoprefixer())
          .pipe(srcMaps.write())
          .pipe(gulp.dest($active+$set));
        
    } else {
        return gulp.src($active+$srcSCSS)
            .pipe(sass({
                  outputStyle: 'compressed'})
                  .on('error', sass.logError))
            .pipe(autoprefixer())
            .pipe(gulp.dest($active+$set));
    }
});

gulp.task('sass-live', function () {
    talk('SASS styles going to "'+$set+'" at "'+$active+'"',true);

        return gulp.src($active+$srcSCSS)
            .pipe(sass({
                  outputStyle: 'compressed'})
                  .on('error', sass.logError))
            .pipe(autoprefixer())
            .pipe(gulp.dest($active+$set));
});




          