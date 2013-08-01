var Iconizer = {
  iconize: function(input_file, output_directory){
    //console.log("input_file: " + input_file);
    //console.log("output_directory: " + output_directory);

    var fs = require('fs');
    var im = require('imagemagick');
    var config = require('./config.json');

    // check if input file exists
    fs.exists(input_file, function(exists) {
      if(exists){
        // create output directory
        fs.mkdir(output_directory, 0755, function() {
          // create output images 
          for(var i=0;i<config.length;i++){
            var entry = config[i];
            im.convert([input_file, '-resize', entry.size, output_directory+entry.name], 
              function(err, stdout){
                  if (err) throw err;     
              }
            );
            console.log('created file ' + output_directory+entry.name);
            if(i === (config.length-1)){
              console.log('done!');
              console.log('');  
            }
          }
        });
      } else{
        console.log('error: unable to find file');
        console.log('');
      }
    });

  },
}
module.exports = Iconizer