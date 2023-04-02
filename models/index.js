const db = require('better-sqlite3')('./models/sparky.db', { verbose: console.log });
const fs = require('fs');
db.pragma('journal_mode = WAL');

// initialize DB
exports.initDB = () => {
    db.exec('DROP TABLE IF EXISTS episodes');
    db.exec('DROP TABLE IF EXISTS podcasts');
    
    const script = fs.readFileSync('./models/init.sql').toString();
    db.exec(script);
};

// get all podcasts
exports.getAllPodcasts = async() => {
    const stmnt = db.prepare('SELECT podcasts.*, COUNT(episodes.pid) AS episode_count FROM podcasts LEFT JOIN episodes ON podcasts.id = episodes.pid GROUP BY podcasts.id');
    const res = await stmnt.all();
    return res;
};

// get podcast by id
exports.getPodcastById = async (id) => {
    const stmnt = db.prepare('SELECT * FROM podcasts WHERE id = ?');
    const res = await stmnt.get(id);
    return res;
};

// get podcast by title
exports.getPodcastByTitle = async (title) => {
    const stmnt = db.prepare('SELECT * FROM podcasts WHERE title LIKE ?');
    const res = await stmnt.all(`%${title}%`);
    return res.length > 0 ? res[0] : null;
};


// add podcast
exports.addPodcast = async (title, author, summary) => {
    const stmnt = db.prepare('INSERT INTO podcasts (title, author, summary) VALUES (@title, @author, @summary)');
    stmnt.run({title, author, summary});
};

// get episode by id
exports.getEpisodeById = async (id) => {
    const stmnt = db.prepare('SELECT * FROM episodes WHERE id = ?');
    const result = await stmnt.get(id);
    return result;
};

// get episode by podcast id
exports.getEpisodesByPid = async (pid) => {
    const stmnt = db.prepare('SELECT * from episodes WHERE pid = ?');
    const res = await stmnt.all(pid);
    return res;
};

// add episodes
exports.addEpisodesToPodcast = async (pid, episodes) => {
    const stmnt = db.prepare('INSERT INTO episodes (title, published, summary, pid) VALUES (@title, @published, @summary, @pid)');
    const insertMany = db.transaction((episodes_list) => {
        for(const episode of episodes_list) {
            stmnt.run({...episode, pid});
        }
    });
    await insertMany(episodes);
    return true;
};