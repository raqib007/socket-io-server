const express = require('express');
const router = express.Router();

router.get("/",(req,res)=>{
   return res.send({response:"I am alive"}).status(200);
});

module.exports = router;
