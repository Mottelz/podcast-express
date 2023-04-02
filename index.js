const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const eta = require('eta');

const app = express();
const port = 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json({limit: '5mb'}));

// view engine config
app.engine('eta', eta.renderFile);
eta.configure({ views: './pages', cache: true });
app.set('views', './pages');
app.set('view cache', true);
app.set('view engine', 'eta');



const apiRouter = require('./routers/api');
app.use('/api', apiRouter);
const podcastRouter = require('./routers/podcast');
app.use('/', podcastRouter);


app.all('*', (req, res) => {
    res.render('index', {title: '404', message: `We were unable to ${req.method} the path ${req.path}`});
});

const errorHandler = (err, req, res) => {
    res.status(500).render('index', { title: 'Internal Error', message: err.message });
};
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Site running http://localhost:${port}`);
});