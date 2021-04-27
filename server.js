const express = require('express')
const bodyParser = require('body-parser');
const app= express();
const morgan = require('morgan');
const port = process.env.PORT || 5001;

const userRouter = require('./routes/user.route');
const refrigeratorRouter = require('./routes/refrigerator.route');
const recipeRouter = require('./routes/recipe.route');
const searchRouter = require('./routes/search.route');
const shoppingListRouter = require('./routes/shoppinglist.route');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/user', userRouter);
app.use('/refrigerator', refrigeratorRouter);
app.use('/recipe', recipeRouter);
app.use('/search', searchRouter);
app.use('/shoppinglist', shoppingListRouter);

/*
app.get('/api/hello',(req,res)=>{
    res.send({message:'Hello Express!'});
});
*/
app.get('/api/customers',(req,res)=>{
   res.send([
    {
    'id':1,
    'img': 'https://placeimg.com/64/64/2',
    'name':'김민준3222222',
    'birthday':'970808',
    'gender':'남자',
    'job':'대학생',
  },
  {
    'id':2,
    'img': 'https://placeimg.com/64/64/5',
    'name':'이승현씨',
    'birthday':'990808',
    'gender':'여자',
    'job':'고등학생',
  }
  ]) ;
})

// 404 처리 미들웨어(없는 라우터 주소로 요청 들어올 때)
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// 에러 핸들러
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		error: {
			message: err.message
		}
	});
});

app.listen(port,()=>console.log(`서버 온 ${port}`));