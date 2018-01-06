const gulp = require('gulp');
const fs = require('fs');
const path = require('path');
const server = require('gulp-webserver');
const urlT = require('url');
gulp.task('web', function() {
    gulp.src('.')
        .pipe(server({
            port: 8008,
            fallback: './index.html',
            livereload: true
        }))
})
gulp.task('server', function() {
    gulp.src('.')
        .pipe(server({
            port: 8080,
            middleware: function(req, res, next) {
                const url = urlT.parse(req.url);
                const method = req.method;
                const pathname = url.pathname;
                res.setHeader('Access-Control-Allow-Origin', '*');
                if (method === 'GET') {

                } else if (method === 'POST') {
                    let data = '';
                    req.on('data', function(chunk) {
                        data += chunk
                    })
                    req.on('end', function() {
                        switch (pathname) {
                            case '/data':
                                res.writeHead(200, {
                                    'content-type': 'application/json;charset=utf-8'
                                })
                                const paths = pathname.split('/')[1];
                                const pathUrl = path.join(__dirname, 'data', paths + '.json');
                                res.end(fs.readFileSync(pathUrl))
                                break;
                            default:
                                res.end()
                                break;
                        }
                    })
                } else {
                    res.writeHead(200, {
                        'Access-Control-Allow-Origin': '*',
                        'Content-type': 'application/json;charset=utf-8',
                        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE',
                        'Access-Control-Allow-Headers': 'Origin,X-Requested-With,Content-Type,Accept'
                    })
                    res.end();
                }
            }
        }))
});
gulp.task('default', ['web', 'server']);