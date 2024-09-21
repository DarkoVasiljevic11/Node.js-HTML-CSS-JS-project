const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));



const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'demagog_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected...');
});


app.get('/contact.html', (req, res) => {
  res.sendFile(path.join(__dirname,  'contact.html'));
});
app.get('/contact.css', (req, res) => {
  res.sendFile(path.join(__dirname,  'contact.css'));
});
app.get('/styles.css', (req, res) => {
  res.sendFile(path.join(__dirname,  'styles.css'));
});
app.use('/images', express.static(path.join(__dirname, 'images')));
app.get('/confirmation.html', (req, res) => {
  res.sendFile(path.join(__dirname,  'confirmation.html'));
});
app.get('/confirmation.css', (req, res) => {
  res.sendFile(path.join(__dirname,  'confirmation.css'));
});


app.post('/submit-contact', (req, res) => {
  const { name, email, message } = req.body;
  const query = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
  db.query(query, [name, email, message], (err, result) => {
    if (err) throw err;
    res.redirect('/confirmation.html');
  });
});


const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => { 
  console.log(`Server running on port ${PORT}`);
});
