const express = require('express');
const BlogPost = require('./models/BlogPost');

const bodyParser = require('body-parser');

const path = require('path');

const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/27017/cleanBlogDB', {useNewUrlParser: true});

// var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/cleanBlogDB';

const options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  mongoose.connect(
      url,
     options,        
     function(err){
       if(err){
      console.error('Erreur de connexion à mongoDB : '+err);
      } else {
        console.log('connecté à la DB')
      }
    }
  );

const app = new express();


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// app.use(express.json());       // to support JSON-encoded bodies
// app.use(express.urlencoded());

app.set('view engine', 'ejs');


app.listen(4000, () => {
  console.log('Listening on port 4000');
})

// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'views/index.html'))
// })

// app.get('/contact', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'views/contact.html'))
// })

// app.get('/about', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'views/about.html'))
// })

// app.get('/post', (req, res) => {
//   console.log("Je suis là!!!!");
//   res.sendFile(path.resolve(__dirname, 'views/post.html'))
// })


// app.get('/', (req, res) => {
//   res.render('index');
// })

app.get('/about', (req, res) => {
  res.render('about');
})

app.get('/contact', (req, res) => {
  res.render('contact');
})

app.get('/post', (req, res) => {
  res.render('post');
})



// POST 
// app.post('/post/new', (req, res) => {
//   BlogPost.create({
//     title: req.body.title,
//     body: req.body.message
//   },(error, blogpost)=>{
//     console.log(error, blogpost)
//   })
  
// });

app.post('/post/new', async (req, res) => {
  await BlogPost.create(req.body);
  res.redirect('/');
});


app.get('/post/new', (req, res) => {
  res.render('create');
})


// Get the blogs
app.get('/',async (req, res)=>{
  let blogposts = await BlogPost.find({})
  console.log(blogposts, 'Les blogs')
  res.render('index',{
  blogposts
  });
})

// Barre de recherche de posts avec le titre (n'importe quel caractère du titre dans n'importe quelle position)
app.get('/:title' , async (req, res) => {
  let param = req.query.title;
  let blogposts = await BlogPost.find({title: {$regex: '.*' + param + '.*'}})
  console.log('Response OK')
  res.render('index',{
    blogposts
  });
})

// Recherche par l'id du post
app.get('/post/:id',async (req,res)=>{
  const blogpost = await BlogPost.findById(req.params.id)
  res.render('post',{
  blogpost
  })
  })



