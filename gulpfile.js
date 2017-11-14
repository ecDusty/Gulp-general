//The Projects object. A place to keep all your projects stored for use.
var Projects = {
    Conrad: '../../Users/mulli/OneDrive/GitHub/lianatech-CMS/Conrad-landing/'
}

/*=============================

        DEPENDENCIES

===============================*/

var gulp = require('gulp');

var srcMaps = require('gulp-sourcemaps');

//STYLE Dependencies
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');




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
    $JS = 'js/',
    $CSS = 'css/',
    $IMG = 'images/';

//Sources File Variables
var $srcHTML = 'src/{*.html,**/*.html}',
    $srcSCSS = 'src/**/*.scss',
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
gulp.task('default',['start'], /*function() {}*/);

//START
gulp.task('start', function () {
    //Set the currently live project
    $active = Projects.Conrad;
    talk('That active projects source: '+$active);
    
    //add task to delete dev and live files
});

//SET THE PARAMATERS
gulp.task('set-live', function () {
    $set = $liv;
    console.log('Now the active directory: '+$active);
});
gulp.task('set-dev', function () {
    $set = $test;
    console.log('Now the active directory: '+$active);
});


/*==============
    STYLES TASKS
    ============*/


gulp.task('sass', function () {
    talk('SASS styles going to "'+$set+'"',true);

    if ($set === $test) {
      return gulp.src($active+$srcSCSS)
          .pipe(srcMaps.init())
          .pipe(sass({sourceComments: true})
                .on('error', sass.logError))
          .pipe(autoprefixer())
          .pipe(srcMaps.write())
          .pipe(gulp.dest($active+$set+$CSS));
        
    } else {
        return gulp.src($active+$srcSCSS)
            .pipe(sass({
                  outputStyle: 'compressed'})
                  .on('error', sass.logError))
            .pipe(autoprefixer())
            .pipe(gulp.dest($active+$set+$CSS));
    }
});




          