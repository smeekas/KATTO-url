const express=require('express');

const router=express.Router();

const urlController=require('../controller/url');
router.get('/',urlController.getIndex);
router.post('/postUrl',urlController.postUrl);
router.get('/:shortner',urlController.getUrl);

module.exports=router;