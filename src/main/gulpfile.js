'use strict'
// npm install gulp gulp-sass gulp-tmod gulp-minify-html gulp-minify-css gulp-autoprefixer gulp-jshint gulp-uglify gulp-imagemin imagemin-pngquant gulp-rename gulp-clean gulp-rev gulp-concat gulp-cache gulp-notify gulp-util gulp-plumber url gulp-browserify browser-sync proxy-middleware yargs gulp-if gulp-rev-collector gulp-sourcemaps jquery director --save-dev
var gulp = require('gulp'),
    sass = require('gulp-sass'),                // css预处理器 —— sass
    tmodjs = require('gulp-tmod'),              // 前端html模板预处理器
                                                // 语法为artTemplate
    minifyhtml = require('gulp-minify-html'),   // html压缩
    minifycss = require('gulp-minify-css'),     // css压缩
    autoprefixer = require('gulp-autoprefixer'),// css兼容前缀处理
    jshint = require('gulp-jshint'),            // js代码质量检测
    uglify = require('gulp-uglify'),            // js压缩混淆工具
    imagemin = require('gulp-imagemin'),        // 图片压缩工具
    pngquant = require('imagemin-pngquant'),    // png图片无损压缩工具
    cache = require('gulp-cache'),              // 缓存工具，用于图片
    rename = require('gulp-rename'),            // 重命名工具
    clean = require('gulp-clean'),              // 目录清理工具
    merge = require('merge2'),                  //
    postcss = require('gulp-postcss'),          //
    csswring = require('csswring'),             // 压缩css而不压缩sourcemap
    concat = require('gulp-concat'),            // 多文件合并工具
    sourcemaps = require('gulp-sourcemaps'),    // sourcemap工具
    rev = require('gulp-rev'),                  // 对资源文件添加MD5后缀
    revCollect = require('gulp-rev-collector'), // MD5路径引用替换工具
    notify = require('gulp-notify'),            // 文字提醒工具
    util = require('gulp-util'),                // gulp插件工具包
    plumber = require('gulp-plumber'),          // 处理报错，让任务继续进行
    url = require('url'),                       // url处理插件
    browserify = require('gulp-browserify'),    // browserify - js打包工具，
                                                // 让浏览器用上CommonJS规范
    browsersync = require('browser-sync'),      // Live CSS Reload &
                                                // 浏览器同步
    proxy = require('proxy-middleware'),        // http(s) proxy as connect middleware
                                                // 后端接口代理
                                                // 实现前后端分离开发
                                                // 前端action接口路径前需要加/api
    gulpif = require('gulp-if'),                // 有条件的运行任务
    argv = require('yargs').argv;               //

console.log(argv);

function errrHandler(e) {
    util.beep();                // 控制台发声,错误时beep一下
    util.log(e);                // 打印获取的错误
}

var proxyOpts = url.parse('http://192.168.0.124'); // Take a URL string, and return an object.
proxyOpts.route = '/api';
var proxyOptsImg = url.parse('http://192.168.0.124/uploads');
proxyOptsImg.route = '/uploads';

var debug = true;               // 开发模式

var src = 'src/',               // 开发路径
    dist = 'webapp/',           // 服务根目录
    assets = dist + 'assets/';  // js, css, img资源输出目录
var config = {
    tpl: {
        src: src + 'tpl/**/*.html',
        base: src + 'tpl',
        output: src + 'js'
    },
    sass: {
        src: src + 'css/sass/**/*.scss',
        dest: src + 'css'
    },
    html: {
        src: src + 'html/**/*.html',
        dest: dist
    },
    rev: {
        src: 'rev/**/*.json',
    },
    css: {
        src: src + 'css/**/*.css',
        dest: assets + 'css'
    },
    js: {
        src: src + 'js/**/*.js',
        dest: assets + 'js'
    },
    imgs: {
        src: src + 'imgs/*',
        dest: assets + 'imgs'
    },
    fonts: {
        src: src + 'fonts/**/*',
        dest: assets + 'fonts'
    },
    favicon: {
        src: src + 'favicon/*.ico',
        dest: dist
    }
}
var adminSrc = 'src/admin/',
    adminAssets = dist + 'assets/admin/';
var admin = {
    tpl: {
        src: adminSrc + 'tpl/**/*.html',
        base: adminSrc + 'tpl',
        output: adminSrc + 'js'
    },
    sass: {
        src: adminSrc + 'css/sass/**/*.scss',
        dest: adminSrc + 'css'
    },
    css: {
        src: adminSrc + 'css/**/*.css',
        dest: adminAssets + 'css'
    },
    js: {
        indexjs: adminSrc + 'js/index.js',
        src: adminSrc + 'js/**/*.js',
        dest: adminAssets + 'js'
    },
    imgs: {
        src: adminSrc + 'imgs/*',
        dest: adminAssets + 'imgs'
    },
    fonts: {
        src: adminSrc + 'fonts/**/*',
        dest: adminAssets + 'fonts'
    }
};

gulp.task('a-tmodjs', function() {
    return gulp.src(admin.tpl.src)
        .pipe(plumber({
            errorHandler: errrHandler
        }))
        .pipe(tmodjs({
            base: admin.tpl.base,
            combo: true,
            minify: false,
            output: admin.tpl.output
        }));
});
gulp.task('a-sass', function() {
    return gulp.src(admin.sass.src)
        .pipe(plumber({
            errorHandler: errrHandler
        }))
        .pipe(sass.sync())
        .pipe(gulp.dest(admin.sass.dest));
});
gulp.task('a-css', function() {
    return gulp.src(admin.css.src)
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'ios 6', 'android 2.3.4'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest(admin.css.dest))
        // .pipe(rev())
        // .pipe(gulp.dest(admin.css.dest))
        .pipe(notify({
            message: 'css 压缩成功!'
        }));
});
gulp.task('a-css4rev', ['sass'], function() {
    return gulp.src(admin.css.src)
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'ios 6', 'android 2.3.4'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest(admin.css.dest));
});
gulp.task('a-js', function() {
    return gulp.src(admin.js.indexjs)
        .pipe(plumber({
            errorHandler: errrHandler
        }))
        .pipe(browserify({
            insertGlobals: true,
            debug: debug
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulpif(debug === false, uglify()))
        .pipe(gulp.dest(admin.js.dest))
        .pipe(notify({
            message: 'js 压缩成功!'
        }));
});

gulp.task('a-imgs', function() {
    return gulp.src(admin.imgs.src)
        .pipe(cache(imagemin({
            svgoPlugins: [{
                removeViewBox: false
            }],
            optimizationLevel: 3,
            progressive: true,
            interlaced: true,
            use: [pngquant()]
        })))
        .pipe(gulp.dest(admin.imgs.dest));
});

gulp.task('a-fonts', function() {
    return gulp.src(admin.fonts.src)
        .pipe(gulp.dest(admin.fonts.dest));
});

// ----------------------------------------------------

gulp.task('tmodjs', function() {
    return gulp.src(config.tpl.src)
        .pipe(plumber({
            errorHandler: errrHandler
        }))
        .pipe(tmodjs({
            base: config.tpl.base,      // html模板路径
            escape: false,              // 是否过滤 XSS。如果后台给出的
                                        // 数据已经进行了 XSS 过滤，
                                        // 就可以关闭模板的过滤以提升模板渲染效率
            compress: true,             // 是否压缩 HTML 多余空白字符
            type: "default",           // 输出的模块类型，可选：default、cmd、amd、commonjs
            combo: true,                // 是否合并模板（仅针对于 default 类型的模块）
            runtime: "template.js",     // 合并后的js文件名
            minify: false,              // js代码混淆 - 否
            output: config.tpl.output   // 输出template.js路径
        }));
});

gulp.task('html', function() {
    return gulp.src(config.html.src)
        .pipe(minifyhtml())
        .pipe(gulp.dest(config.html.dest))
        .pipe(notify({
            message: 'html 压缩成功!'
        }));
});

gulp.task('sass', function() {
    return gulp.src(config.sass.src)
        .pipe(plumber({
            errorHandler: errrHandler
        }))
        .pipe(sourcemaps.init())
        .pipe(sass.sync())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.sass.dest));
});

/*gulp.task('css', function() {
    return gulp.src(config.css.src)
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'ios 6', 'android 2.3.4'))             // 添加兼容前缀
        .pipe(sourcemaps.init())            // 初始化sourcemap
        .pipe(concat('style.min.css'))      // css合并为style.min.css
        //.pipe(minifycss())                  // 压缩处理成一行
        .pipe(sourcemaps.write())           // 将sourcemap写入文件
        .pipe(gulp.dest(config.css.dest))   // 输出文件到dest目录
        .pipe(notify({
            message: 'css 压缩成功!'
        }));
});*/

gulp.task('css', function() {
    return merge(
            gulp.src(config.css.src)
                .pipe(sourcemaps.init()),
            gulp.src(config.sass.src)
                .pipe(sourcemaps.init())
                .pipe(sass.sync())
                .pipe(sourcemaps.write())
        )
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'ios 6', 'android 2.3.4'))             // 添加兼容前缀
        .pipe(postcss([csswring]))
        .pipe(concat('style.min.css'))      // css合并为style.min.css
        //.pipe(minifycss())                  // 压缩处理成一行
        .pipe(sourcemaps.write())           // 将sourcemap写入文件
        .pipe(gulp.dest(config.css.dest))   // 输出文件到dest目录
        .pipe(notify({
            message: 'css 压缩成功!'
        }));
});

gulp.task('css4rev', ['sass'], function() {
    return gulp.src(config.css.src)
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'ios 6', 'android 2.3.4'))             // 添加兼容前缀
        .pipe(concat('style.min.css'))      // css合并为style.min.css
        .pipe(minifycss())                  // 压缩处理成一行
        .pipe(gulp.dest(config.css.dest))   // 输出文件到dest目录
        .pipe(rev())                        // 文件名加MD5后缀
        .pipe(gulp.dest(config.css.dest))   // 输出文件到dest目录
        .pipe(rev.manifest())               // 生成一个rev-manifest.json
        .pipe(gulp.dest('rev/css'))         // 将 rev-manifest.json保存到rev目录内
        .pipe(notify({
            message: 'css 压缩成功!'
        }));
});

gulp.task('js', function() {
    return gulp.src('src/js/index.js')          // 获取src/js/index.js的文件流
        .pipe(plumber({
            errorHandler: errrHandler
        }))
        // .pipe(jshint('.jshintrc'))
        // .pipe(jshint.reporter('default'))
        .pipe(browserify({
            insertGlobals: true,
            debug: debug
        }))                                     // 将js文件打包为commonjs模块
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulpif(debug === false, uglify()))// 将js混淆并压缩
        .pipe(gulp.dest(config.js.dest))        // 输出文件到dest目录
        .pipe(notify({
            message: 'js 压缩成功!'
        }));
});

gulp.task('js4rev', function() {
    return gulp.src('src/js/index.js')          // 获取src/js/index.js的文件流
        .pipe(plumber({
            errorHandler: errrHandler
        }))
        // .pipe(jshint('.jshintrc'))
        // .pipe(jshint.reporter('default'))
        .pipe(browserify({
            insertGlobals: true,
            debug: debug
        }))                                     // 将js文件打包为commonjs模块
        .pipe(concat('index.min.js'))           // js合并为index.min.js
        .pipe(gulpif(debug === false, uglify()))// 将js混淆并压缩
        .pipe(gulp.dest(config.js.dest))        // 输出文件到dest目录
        .pipe(rev())                            // 文件名加MD5后缀
        .pipe(gulp.dest(config.js.dest))        // 输出文件到dest目录
        .pipe(rev.manifest())                   // 生成一个rev-manifest.json
        .pipe(gulp.dest('rev/js'))              // 将 rev-manifest.json保存到rev目录内
        .pipe(notify({
            message: 'js 压缩成功!'
        }));
});

gulp.task('rev', ['css4rev', 'js4rev'], function() {
    return gulp.src([config.rev.src, config.html.src])  // 读取 rev-manifest.json 文件
                                                        // 和需要进行资源名替换的文件
        .pipe(revCollect({
            replaceReved: true
        }))                                             // 执行文件内css,js名的替换
        .pipe(minifyhtml())
        .pipe(gulp.dest(config.html.dest));             // 替换后的文件输出的目录
});

gulp.task('imgs', function() {
    return gulp.src(config.imgs.src)
        .pipe(cache(imagemin({
            svgoPlugins: [{
                removeViewBox: false
            }],
            optimizationLevel: 3,
            progressive: true,
            interlaced: true,
            use: [pngquant()]
        })))
        .pipe(gulp.dest(config.imgs.dest));
});

gulp.task('fonts', function() {
    return gulp.src(config.fonts.src)
        .pipe(gulp.dest(config.fonts.dest));
});

gulp.task('favicon', function() {
    return gulp.src(config.favicon.src)
        .pipe(cache(imagemin({
            svgoPlugins: [{
                removeViewBox: false
            }],
            optimizationLevel: 3,
            progressive: true,
            interlaced: true,
            use: [pngquant()]
        })))
        .pipe(gulp.dest(config.favicon.dest));
});

gulp.task('bs', function() {
    browsersync({
        files: dist,
        open: true,
        server: {
            baseDir: dist,
            middleware: [proxy(proxyOpts), proxy(proxyOptsImg)]
        }
    });
});

gulp.task('browser-sync', ['rev', 'imgs', 'favicon', 'fonts', 'a-css4rev', 'a-js', 'a-imgs', 'a-fonts'], function() {
    gulp.start('bs');
});

gulp.task('clean', function() {
    cache.clearAll();
    return gulp.src(dist, {
            read: false
        })
        .pipe(clean())
        .pipe(notify({
            message: 'clean 执行完毕!'
        }));
});

gulp.task('watch', ['html'], function() {
    gulp.watch(config.tpl.src, ['tmodjs']);
    gulp.watch(config.html.src, ['html']);
    gulp.watch(config.sass.src, ['sass']);
    gulp.watch(config.css.src, ['css']);
    gulp.watch(config.js.src, ['js']);
    gulp.watch(config.imgs.src, ['imgs']);

/*    gulp.watch(admin.tpl.src, ['a-tmodjs']);
    gulp.watch(admin.sass.src, ['a-sass']);
    gulp.watch(admin.css.src, ['a-css']);
    gulp.watch(admin.js.src, ['a-js']);
    gulp.watch(admin.imgs.src, ['a-imgs']);*/
    gulp.start('bs');
});

gulp.task('default', ['clean'], function() {
    gulp.start('tmodjs', 'a-tmodjs');
    gulp.start('browser-sync');
});
