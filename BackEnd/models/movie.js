const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(
    path.dirname(require.main.filename),
    "data",
    "movieList.json"
);
// const getMoviesFromFile = (cb) => {
//     fs.readFileSync(DATA_PATH, (err, fileContent) => {
//         if (err) {
//             cb([]);
//         }else {
//             cb(JSON.parse(fileContent));
//         }
//     });
// };

// module.exports = class Movies {
//     static fetchAll(cb) {
//         getMoviesFromFile(cb);
//     }
    
// }

const Movies = {
    all:function () {
        return JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
    },
}
module.exports = Movies;