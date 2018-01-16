const gulp = require("gulp");
const browserSync = require("browser-sync");
const sass = require("gulp-sass");

gulp.task("sass", function(){
	return gulp.src(["node_modules/bootstrap/scss/bootstrap.scss", "source/scss/*.scss"])
	.pipe(sass())
	.pipe(gulp.dest("source/css"))
	.pipe(browserSync.stream());
});

gulp.task("js", function(){
	return gulp.src(["node_modules/bootstrap/dist/js/bootstrap.min.js", "node_modules/jquery/dist/jquery.min.js", "node_modules/popper.js/dist/umd/popper.min.js"])
	.pipe(gulp.dest("source/js"))
	.pipe(browserSync.stream());
});

gulp.task("serve", ["sass"], function(){
	browserSync.init({
		server: "./source"
	});

	gulp.watch(["node_modules/bootstrap/scss/bootstrap.scss", "source/scss/*.scss"], ["sass"]);
	gulp.watch("source/*.html").on("change", browserSync.reload);
});

gulp.task("fonts", function(){
	return gulp.src("node_modules/font-awesome/fonts/fontawesome-webfont.eot", "node_modules/font-awesome/fonts/fontawesome-webfont.svg", "node_modules/font-awesome/fonts/fontawesome-webfont.ttf", "node_modules/font-awesome/fonts/fontawesome-webfont.woff","node_modules/font-awesome/fonts/fontawesome-webfont.woff2", "node_modules/font-awesome/fonts/fontawesome-webfont.otf")
	.pipe(gulp.dest("source/fonts"));
});

gulp.task("fa", function(){
	return gulp.src("node_modules/font-awesome/css/font-awesome.min.css")
	.pipe(gulp.dest("source/css"));
});

gulp.task("default", ["js", "serve", "fa", "fonts"]);