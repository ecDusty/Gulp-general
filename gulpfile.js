//Where is your project located???
var Projects = {
    Conrad: '../../Users/mulli/OneDrive/GitHub/lianatech-CMS/Conrad-landing/'
}

/*=============================

        DEPENDENCIES

===============================*/

var gulp = require('gulp');


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
    $active = '';

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

//START
gulp.task('start', function () {
    $active = Projects.Conrad;
    //add task to delete dev and live files
});

//SET THE PARAMATERS
gulp.task('set-live', function () {
    $active = $liv;
    console.log('Now the active directory: '+$active);
});
       
gulp.task('default',['start','set-live']);
          