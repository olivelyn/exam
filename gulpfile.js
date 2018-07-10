var server = require('gulp-webserver');
var gulp = require('gulp');
var sass = require('gulp-sass')
var url = require('url')
var fs = require('fs');
var path = require('path')
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8080,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                pathname = pathname === '/' ? '/index.html' : pathname

                res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
            }
        }))
})
gulp.task('sass', function() {
    gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
})