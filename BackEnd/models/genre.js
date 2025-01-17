const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(
        path.dirname(require.main.filename),
        "data",
        "genreList.json"
)

const Genre = {
    all:function() {
        return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
    },
}

module.exports = Genre;