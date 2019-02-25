const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const minifyCss = require('gulp-minify-css');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();

/////////DEVELOP/////////

gulp.task('es6', () => {
	return gulp.src('src/js/main.js')
		.pipe(plumber())
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('build/js'))
});

gulp.task('sass', () => {
	return gulp.src('src/sass/*.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(gulp.dest('build/css'));
});

gulp.task('hotReload', ['es6', 'sass'], function() {
	browserSync.init({
		server: './'
	});

	gulp.watch('./src/js/*.js', ['es6']).on('change', browserSync.reload);;
	gulp.watch('./src/sass/*.scss', ['sass']).on('change', browserSync.reload);;
	gulp.watch('./*.html').on('change', browserSync.reload);
})

gulp.task('default', ['hotReload'])

/////////BUILD/////////

gulp.task('uglify', () => {
	return gulp.src('src/js/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglify())
		.pipe(gulp.dest('build/js/minjs'))
});

gulp.task('minifyCss', () => {
	return gulp.src('src/sass/*.scss')
		.pipe(sass())
		.pipe(minifyCss())
		.pipe(gulp.dest('build/css/mincss'))
});

gulp.task('build', ['es6', 'uglify', 'sass', 'minifyCss']);