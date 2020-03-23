const fs = require('fs');

try {
    // read contents of the file
    const data = fs.readFileSync('sudokuLog.txt', 'UTF-8');

    // split the contents by new line
    const lines = data.split(/\r?\n/);

    // print all lines
    var thatTime = 0
    
        lines.forEach((line, index) => {
            setTimeout(function() {console.log(line);}, 2*thatTime);
            thatTime ++
        });
      
} catch (err) {
    console.error(err);
    console.error("Did you produce the log file ?");
    console.error("Get it with:");
    console.error("node ./src/engine.js --no-color > sudokuLog.txt");
}
