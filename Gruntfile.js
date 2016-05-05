module.exports = function(grunt) {
    grunt.initConfig({
    	pkg: grunt.file.readJSON('package.json'),
    	
//    	ngAnnotate: {
//    	    dist: {
//    	        files: [{
//    	                expand: true,
//    	                src: ['**/*.js', '!**/*.annotated.js'],
//    	                ext: '.annotated.js',
//    	                extDot: 'last'
//    	            }],
//    	    }
//    	},
    	
    	ngAnnotate: {
    	    js: {
    	        files: [
    	                {
	    	                expand: true,
	//    	                src: ['app/modules/**/*.js', '!**/*.annotated.js'],
	//    	                src: ['app/modules/parent/parentController.js'],
	//    	                ext: '.annotated.js'
	//    	                dest: '.annotated.js'
	//    	                extDot: 'last'
	    	                'app/min-safe/*.js': ['app/modules/**/*.js']
    	            }
    	        ]
    	    }
    	},
    	concat: {
    		options: {
    			separator: "\n\n"
    		},
    		js: {
    			src: ['app/app.module.js', 'app/app.routes.js', 'app/app.text.js', 'app/app.constant.js', 'app/modules/**/*.js'],
    			dest: 'app/portail-famille.js'
    		}
    	},
    	uglify: {
    		options: {
    			mangle: false
    		},
    	    js: { 
    	        src: ['app/portail-famille.js'],
    	        dest: 'app/portail-famille.min.js'
    	    }
    	},
    	compass: {
    		dist: {
    			options: {
    				sassDir: 'app/ressources/css/compass/sass',
    		        cssDir: 'app/ressources/css',
    				config: 'app/ressources/css/compass/config.rb'
    			}
    		}
    	},
    	watch: {
    		  js: {
    		    files: ['app/modules/**/*.js'],
    		    tasks: ['concat'],
    		  },
    		  
    		  css: {
    			  
    		  }
    		}
    });
    
    // TÂCHES
    grunt.loadNpmTasks('grunt-contrib-concat'); // concatenation des fichiers
    grunt.loadNpmTasks('grunt-ng-annotate');  // format de la bonne manière avant minification (à étudier)
    grunt.loadNpmTasks('grunt-contrib-uglify'); // minifie
    grunt.loadNpmTasks('grunt-contrib-compass'); //lance compass pour utilisation du watch
    grunt.loadNpmTasks('grunt-contrib-watch'); // Met à jour automatiquement

    // Par defaut
//    grunt.registerTask('default', ['ngAnnotate', 'concat', 'uglify']);
    grunt.registerTask('default', ['concat', 'uglify']);
	

    
}