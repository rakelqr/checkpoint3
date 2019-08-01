const connection = require('./config')
const express = require('express')
const server = express()
const bodyParser = require('body-parser')

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}))



// be able to create a new playlist  --> done

server.post('/api/playlist', (req, res) => {
    connection.query('INSERT INTO playlist SET ?', req.body, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Sorry, there was an error creating your playlist');
        } else {
            res.json('Perfect, you create a new playlist');
        }
    });
});


// be able to see a playlist by entering its id in the url  --> done

server.get('api/playlist/:id', (req, res) => {
    connection.query('SELECT * FROM playlist WHERE id = ?', req.params.id, (err, results) => {
        if (err) {
            console.log(err);
            res.sendStatus(404);
        } else res.json(results[0]);
    });
});


// create and assign a song to a playlist  --> done

server.post('/api/song', (req, res)=>{
    connection.query('INSERT INTO songs SET ?', req.body, (err, result)=>{
        if (err) {
            console.log(err);
            res.sendStatus(404);
        } else {
            console.log(result);
            res.json('Congrats! You created your song and added to a playlist')};
    });
})


// list all the songs from a playlist  --> done

server.get('/api/playlist/:id/songs', (req, res) => {
    connection.query('SELECT * FROM songs WHERE playlist_id = ?', req.params.id, (err, result) => {
        console.log('conectando a la db')
        if (err) {
            console.log(err);
            res.status(404).send('Sorry, your playlist does not exist')
        } else {
            res.json(result)
        }
    })
});


// be able to delete a playlist  -->  done

server.delete('/api/playlist/:id', (req, res)=>{
   
    connection.query('DELETE FROM playlist WHERE id = ?', req.params.id, (err, result)=>{
        if (err) {
            console.log(err);
            res.status(404).send('Sorry, it cannot be possible delete your playlist')
        } else {
            console.log(result)
            res.json('You deleted your playlist')
        }
    });
});


// be able to modify a playlist  -->  done

server.patch('/api/playlist/:id', (req, res)=> {
    connection.query('UPDATE playlist SET ? WHERE id=?', [req.body, req.params.id], (err, results)=> {
        if (err) {
            console.log(err);
            res.status(404).send('Sorry, it cannot be possible modify your playlist')
        } else {
            res.json('You modified your playlist')
        }
    });
});


// delete a song from a playlist  --> done

server.delete('/api/song/:id', (req, res) => {
    console.log(req.params.id);
    connection.query('DELETE FROM songs where id = ?', req.params.id, (err, result)=>{
        if (err) {
            console.log(err);
            res.status(404).send('Sorry, it cannot be possible delete your song from the playlist')
        } else {
            res.json('You deleted the song')
        }
    });
});


// edit a song from a playlist  -->  done

server.patch('/api/song/:id', (req, res) => {
    connection.query('UPDATE songs SET ? where id = ?', [req.body, req.params.id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(404).send('Sorry, your playlist does not exist')
        } else {
            res.json('Congrats! You modified the song')
        }
    });
});



server.listen(3004, function(){
    console.log('listening on port 3004')
});