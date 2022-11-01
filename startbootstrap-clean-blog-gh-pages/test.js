const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');

mongoose.connect('mongodb://localhost:27017/cleanBlogDB2',
{useNewUrlParser: true, useUnifiedTopology: true});

// BlogPost.create({
//   title: 'Le ptit prince',
//   body: 'Le petit prince dans le desert'
// },(error, blogpost)=>{
//   console.log(error, blogpost)
// })

// BlogPost.find({}, (error, blogpost) => {
//   console.log(error,blogpost);
// })

// BlogPost.find({
//   title:/le/
// }, (error, blogpost) => {
//   console.log(error,blogpost);
// })

let id = '6357e78b4eabbb2966f66978';
BlogPost.findById(id, (error, blogpost) => {
  console.log(error, blogpost)
})
