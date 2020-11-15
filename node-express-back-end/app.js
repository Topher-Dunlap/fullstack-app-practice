const express = require('express');
const storeData = require('./play-data.js');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(morgan('common')); // let's see what 'common' format looks like
app.use(cors());

let apps = app.get('/apps', (req, res) => {
    const {search = "", sort, genre} = req.query;
    if (sort) {
        if (!['rating', 'app'].includes(sort)) {
            return res
                .status(400)
                .send('Sort must be one of rating or app');
        }
    }
    if (genre) {
        if (!["action", "puzzle", "strategy", "casual", "arcade", "card"].includes(genre)) {
            return res
                .status(400)
                .send('genres must be one of [Action, Puzzle, Strategy, Casual, Arcade, Card]');
        }
    }

    let results = storeData.filter(obj =>
        obj
            .App
            .toLowerCase()
            .includes(search.toLowerCase()));

    if (genre) {
        return res.json(results.filter(app =>
            app.Genres.toLowerCase().includes(genre)));
    }

    if (sort === "rating") {
        return res.json(results.sort((a, b) =>
            b.Rating - a.Rating
        ));
    }

    if (sort === "app") {
        return res.json(results.sort((a, b) =>
            a.App.localeCompare(b.App)
        ));
    }

});


app.listen(8000, () => {
    console.log('Server started on PORT 8000');
});