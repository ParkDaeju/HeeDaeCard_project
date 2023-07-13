const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User, Hashtag } = require('../models');

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = req.user ? req.user.Followers.length : 0;
  res.locals.followingCount = req.user ? req.user.Followings.length : 0;
  res.locals.followerIdList = req.user ? req.user.Followings.map(f => f.id) : [];
  next();
});

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', { title: '내 정보 - HEEDAECARD' });
});

router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', { title: '회원가입 - HEEDAECARD' });
});

router.get('/layout', isLoggedIn,(req, res)=>{
  res.render('layout',{title: '카드등록 - HEEDAECARD'});
});

router.get('/card',isLoggedIn,(req,res)=>{
  res.render('card',{title: '카드등록 - HEEDAECARD'});
});

router.get('/goldcard',isLoggedIn,(req,res)=>{
  res.render('goldcard',{title: '카드등록 - HEEDAECARD'});
});

router.get('/bluecard',isLoggedIn,(req,res)=>{
  res.render('bluecard',{title: '카드등록 - HEEDAECARD'});
});

router.get('/redcard',isLoggedIn,(req,res)=>{
  res.render('redcard',{title: '카드등록 - HEEDAECARD'});
});

router.get('/final',isLoggedIn,(req,res)=>{
  res.render('final',{title: '카드등록 - HEEDAECARD'});
});
router.get('/bluecardfinal',isLoggedIn,(req,res)=>{
  res.render('bluecardfinal',{title: '카드등록 - HEEDAECARD'});
});
router.get('/redcardfinal',isLoggedIn,(req,res)=>{
  res.render('redcardfinal',{title: '카드등록 - HEEDAECARD'});
});
router.get('/car',isLoggedIn,(req,res)=>{
  res.render('car',{title: '카드등록 - HEEDAECARD'});
});
router.get('/fifa',isLoggedIn,(req,res)=>{
  res.render('fifa',{title: '카드등록 - HEEDAECARD'});
});
router.get('/room',isLoggedIn,(req,res)=>{
  res.render('room',{title: '카드등록 - HEEDAECARD'});
});
router.get('/travel',isLoggedIn,(req,res)=>{
  res.render('travel',{title: '카드등록 - HEEDAECARD'});
});
router.get('/blackcardfinal',isLoggedIn,(req,res)=>{
  res.render('blackcardfinal',{title: '카드등록 - HEEDAECARD'});
});
router.get('/plafinal',isLoggedIn,(req,res)=>{
  res.render('plafinal',{title: '카드등록 - HEEDAECARD'});
});
router.get('/topclub',isLoggedIn,(req,res)=>{
  res.render('topclub',{title: '카드등록 - HEEDAECARD'});
});
router.get('/black',isLoggedIn,(req,res)=>{
  res.render('black',{title: '카드등록 - HEEDAECARD'});
});
router.get('/pla',isLoggedIn,(req,res)=>{
  res.render('pla',{title: '카드등록 - HEEDAECARD'});
});



router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ['id', 'nick'],
      },
      order: [['createdAt', 'DESC']],
    });
    res.render('main', {
      title: 'HEDAECARD',
      twits: posts,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/hashtag', async (req, res, next) => {
  const query = req.query.hashtag;
  if (!query) {
    return res.redirect('/');
  }
  try {
    const hashtag = await Hashtag.findOne({ where: { title: query } });
    let posts = [];
    if (hashtag) {
      posts = await hashtag.getPosts({ include: [{ model: User }] });
    }

    return res.render('main', {
      title: `${query} | NodeBird`,
      twits: posts,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
