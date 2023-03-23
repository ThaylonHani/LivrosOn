import  express from "express";
import axios from "axios";
import fs from 'fs';
import bodyParser from "body-parser";

const port = 3000;
const App = express();
   
App.set('views', 'src/views');
App.use('/public', express.static('src/public'));
App.use(bodyParser.urlencoded({ extended: false }));
App.use(bodyParser.json());

const currentBooks = JSON.parse(fs.readFileSync('books.json'));
const books = currentBooks.books;
const users = JSON.parse(fs.readFileSync('users.json'));
     
App.get('/login', (req, res) => {
    res.render('./login.ejs');
})

App.post('/login', (req, res) => {
   fs.writeFileSync('users.json',JSON.stringify( [...users, {UserName:"John", UserSurname:"Doe", Password: "452525"} ]))
        res.send("Conta logada")
})

App.get('/', (req, res) => {
    res.render('./index.ejs', { books });
})

App.get('/genre', (req, res) => {
    res.render('./genre.ejs')
})

App.get('/genre/:genre', (req, res) => {
    const { genre } = req.params;
    res.render('./genre_genre.ejs', {genre,books : books});
})
App.get('/login/create', (req, res) => {
    res.render('./createAccount.ejs');
})
App.post('/login/created', (req, res) => {
    console.log(req.body.name)
    fs.writeFileSync('users.json', JSON.stringify([...users, { UserName: req.body.name, UserSurname: req.body.username, Password: req.body.password,Email: req.body.email}]));
    res.render('./accountCreated.ejs');
    res.status(201);
})



    App.listen(port, () => { console.log(`Servidor rodando entre em http://localhost:${port}/`) })
    
