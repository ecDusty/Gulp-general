alert('WHAT HAPPENS WITH AN ALERT IN GIT??')

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

//JAVASCRIPT Dependencies
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');

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
    $srcSCSS = 'src/{sass,**/sass}/*.scss',
    $srcJS = 'src/{libs,**/libs}/*.js'

/*====================
    Custom Functions
=====================*/

function $t (a,t) {
    if (t) { console.log(strt+a+cls); }
    else { console.log(a); }  
}


/*========================
       TASKS
=========================*/

//Default Run Task
gulp.task('default',['start'], function() {
    gulp.watch($active+$srcSCSS,['set-dev','sass','set-live','sass-live']) 
    gulp.watch($active+$srcJS,['set-dev','js','set-live','js-live'])
});

//START
gulp.task('start',function () {
    //Set the currently live project
    $active = Projects.SNSProp;
    $t('That active projects source: '+$active);
    
    //add task to delete dev and live files
});

gulp.task('live', ['set-live','default']);

//SET THE PARAMATERS
gulp.task('set-live', function () {
    $set = $liv;
    $t('Now the active directory: '+$set);
});
gulp.task('set-dev', function () {
    $set = $test;
    $t('Now the active directory: '+$set);
});


/*=================
    STYLES TASKS
    =============*/


gulp.task('sass', function () {
    $t('SASS styles going to "'+$set+'" at "'+$active+'"',true);
    return gulp.src($active+$srcSCSS)
        .pipe(srcMaps.init())
        .pipe(sass.sync({
                    sourceComments: true,
                    includePaths: ['node_modules/'],
                })
                .on('error', function errorHandler (err) {
                    gutil.log(gutil.colors.red('ERROR:', err.message));
                    notifier.notify({
                        title: 'Compile Error',
                        message: err.message,
                        sound: true,
                    });
                    this.emit('end');
                }),)
        .pipe(autoprefixer({
                browsers: ['last 30 version']
            })
        )
        .pipe(srcMaps.write())
        .pipe(gulp.dest($active+$set));
});

gulp.task('sass-live', function () {
    $t('SASS styles going to "'+$set+'" at "'+$active+'"',true);

        return gulp.src($active+$srcSCSS)
            .pipe(sass({
                  outputStyle: 'compressed'})
                  .on('error', sass.logError))
            .pipe(autoprefixer())
            .pipe(gulp.dest($active+$set));
});


/*===================
    JAVASCRIPT TASKS
    ===============*/

//LINT you JS FOOL!
gulp.task('lint', function () {
    $t(strt + 'Linting' + end);
    return gulp.src(SCRIPTS_PATH)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
  })


    gulp.task('js',['lint'], function () {
        $t('JAVASCRIPT styles going to "'+$set+'" at "'+$active+'"',true);
        return gulp.src($active+$srcJS)
            .pipe(srcMaps.init())
            .pipe(srcMaps.write())
            .pipe(gulp.dest($active+$set));
    });
    
    gulp.task('js-live', function () {
        $t('JAVASCRIPT styles going to "'+$set+'" at "'+$active+'"',true);
    
            return gulp.src($active+$srJS)
                .pipe(gulp.dest($active+$set));
    });



          