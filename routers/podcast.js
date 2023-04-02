const express = require('express');
const router = express.Router();
const db = require('../models/index');

router.get('/', async (req, res) => {
    const podcasts = await db.getAllPodcasts();
    res.render('podcasts', {title: 'Podcasts', podcasts});
});

router.get('/podcast/:pid/episodes', async(req, res) => {
    const pid = req.params.pid;
    const episodes = await db.getEpisodesByPid(pid);
    const podcast = await db.getPodcastById(pid);
    res.render('episodelist', {title: 'Episode List', episodes, podcast});
});

module.exports = router;