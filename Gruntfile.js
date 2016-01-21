module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
	var alljs = [
		'_bower_components/foundation/js/foundation/vendor/jquery.cookie.js',
		'_bower_components/foundation/js/foundation/vendor/fastclick.js',
		'_bower_components/foundation/js/foundation/vendor/placeholder.js',
		'_bower_components/foundation/js/foundation/foundation.js',
//		'_bower_components/foundation/js/foundation/foundation.abide.js',
		'_bower_components/foundation/js/foundation/foundation.accordion.js',
//		'_bower_components/foundation/js/foundation/foundation.alert.js',
		'_bower_components/foundation/js/foundation/foundation.clearing.js',
		'_bower_components/foundation/js/foundation/foundation.dropdown.js',
//		'_bower_components/foundation/js/foundation/foundation.equalizer.js',
//		'_bower_components/foundation/js/foundation/foundation.interchange.js',
//		'_bower_components/foundation/js/foundation/foundation.joyride.js',
		'_bower_components/foundation/js/foundation/foundation.magellan.js',
//		'_bower_components/foundation/js/foundation/foundation.offcanvas.js',
//		'_bower_components/foundation/js/foundation/foundation.orbit.js',
//		'_bower_components/foundation/js/foundation/foundation.reveal.js',
//		'_bower_components/foundation/js/foundation/foundation.slider.js',
		'_bower_components/foundation/js/foundation/foundation.tab.js',
//		'_bower_components/foundation/js/foundation/foundation.tooltip.js',
		'_bower_components/foundation/js/foundation/foundation.topbar.js',
		'assets/js/src.js'
	];
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		yamllint: {
			all: ['_data/*.yml']
		},
		sass: {
			options: {
				includePaths: ['_bower_components/foundation/scss']
			},
			dev: {
				options: {
					outputStyle: 'expanded',
					sourceMap: false,
				},
				files: {
					'_includes/eyetones.css': '_scss/eyetones.scss'
				}
			},
			dist: {
				options: {
					outputStyle: 'compressed',
					sourceMap: false,
				},
				files: {
					'_includes/eyetones.css': '_scss/eyetones.scss'
				}
			}
		},
		uglify: {
			dev: {
				options: {
					beautify: true
				},
				files: {
					'assets/js/eyetones.js': alljs
				}
			},
			dist: {
				options: {
					compress: true
				},
				files: {
					'assets/js/eyetones.js': alljs
				}
			},
			headjs: {
				options: {
					compress: true
				},
				files: {
					'_includes/eyetones.js': ['_bower_components/foundation/js/vendor/modernizr.js', 'assets/js/head.js']
				}
			}
		},
		copy: {
			vendorjs: {
				files: [
					{src: '_bower_components/foundation/js/vendor/modernizr.js', dest: 'assets/js/vendor/modernizr.js'},
					{src: '_bower_components/foundation/js/vendor/jquery.js', dest: 'assets/js/vendor/jquery.js'}
				]
			}
		},
		jshint: {
			files: ['Gruntfile.js', 'assets/js/src.js']
		},
		shell: {
			jekyllBuild: {
				command: 'jekyll build'
			},
			jekyllServe: {
				command: 'jekyll serve'
			}
		},
		watch: {
			grunt: {
				options: {
					reload: true
				},
				files: ['Gruntfile.js']
			},

			sass: {
				files: '_scss/*.scss',
				tasks: ['css','shell:jekyllBuild']
			},

			js: {
				files: 'assets/js/src.js',
				tasks: ['js','shell:jekyllBuild']
			},

			content: {
				files: ['**/*.md', '_layouts/*.html', '_includes/*.html', '_data/*.yaml'],
				tasks: 'shell:jekyllBuild'
			}
		}
	});

	grunt.registerTask('js', ['copy:vendorjs', 'jshint', 'uglify:dist', 'uglify:headjs']);
	grunt.registerTask('jsdev', ['copy:vendorjs', 'jshint', 'uglify:dev', 'uglify:headjs']);
	grunt.registerTask('css', ['sass:dist']);
	grunt.registerTask('cssdev', ['sass:dev']);
	grunt.registerTask('serve', ['css', 'js', 'shell:jekyllBuild', 'shell:jekyllServe']);
	grunt.registerTask('build', ['css', 'js', 'shell:jekyllBuild']);
	grunt.registerTask('builddev', ['cssdev', 'jsdev', 'shell:jekyllBuild']);
	grunt.registerTask('default', ['watch']);
};
