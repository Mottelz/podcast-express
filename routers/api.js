const express = require('express');
const router = express.Router();
const db = require('../models/index');

router.get('/init', (req, res) => {
    db.initDB();
    res.render('index', { title: 'Setup', message: 'The database has been initialized.' });
});

router.post('/podcast', (req, res) => {
    const title = req.body.title;
    const author = req.body.author;
    const summary = req.body.summary;
    db.addPodcast(title, author, summary);
    res.send({msg: `${title} was added to the database.`});
});

router.post('/episodes', async (req, res) => {
    const episodes = req.body.episodes;
    const podcastId = req.body.id;
    await db.addEpisodesToPodcast(podcastId, episodes);
    res.send({message: 'Episodes added'});
});


router.get('/podcast/:title', async (req, res) => {
    const title = req.params.title;
    const result = await db.getPodcastByTitle(title);
    res.send(result);
});

router.get('/episodes/:pid', async (req, res) => {
    const pid = req.params.pid;
    const result = await db.getEpisodesByPid(pid);
    res.send(result);
});

module.exports = router;