module.exports = function(grunt) {
	
	grunt.initConfig({

		watch: {
			options: {
				livereload: true
			},
			css: {
				files: ['css/**/*.css'],
				tasks: ['concat:css', 'autoprefixer', 'cssmin'],
			},
			js: {
				files: ['js/**/*.js'],
				tasks: ['jshint', 'concat:js', 'uglify'],
			},
			html: {
				files: ['*.html'],
				tasks: ['htmlmin'],
			},
			img: {
				files: ['img/*.{png,jpg,git}'],
				tasks: ['imagemin']
			}
		},
		jshint: {
			options: {
				globals: {
					jQuery: true
				}
			},
			all: ['js/**/*.js']
		},
		concat: {
			options: {
				separator: ''
			},
			css: {
				src: ['css/Base/reset.css', 'css/Base/*.css', 'css/Components/*.css', 'css/Modules/*.css'],
				dest: 'css/styles.css'
			},
			js: {
				src: ['js/**/*.js'],
				dest: 'js/scripts.cjs'
			}
		},
		uglify: {
			options: {
				mangle: false
			},
			target: {
				files: {
					'dist/assets/js/scripts.js': ['js/scripts.cjs'],
				}
			}
		},
		autoprefixer: {
			options: {
				browsers: ['> 1%', 'ie 8', 'ie 9'],
				diff: true,
				safe: true
			},
			target: {
				src: ['css/styles.css'],
				dest: 'css/styles.pref.css'
			}
		},
		cssmin: {
		  target: {
			 files: [{
				expand: true,
				cwd: '.',
				src: ['css/styles.pref.css'],
				dest: 'dist/assets',
				ext: '.css'
			 }]
		  }
		},
		htmlmin:{
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: [{
					expand: true,
					cwd: '.',
					src: ['./*.html'],
					dest: 'dist',
					ext: '.html'
				}]
			}
		},
		imagemin: {
			dynamic: {
				files: [{
				expand: true,                  // Enable dynamic expansion 
				cwd: 'img',                   // Src matches are relative to this path 
				src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match 
				dest: 'dist/assets/img'                  // Destination path prefix 
				}]
			}
		},
		connect: {
			server: {
				options: {
					port: 9001,
					base: 'dist/',
					livereload: true
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-autoprefixer');

	grunt.registerTask('default', ['imagemin', 'jshint', 'concat', 'uglify', 'autoprefixer', 'cssmin', 'htmlmin', 'connect', 'watch']);
};
