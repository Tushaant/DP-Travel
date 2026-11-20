const {json,ready,sql}=require("./_lib");
module.exports=async(req,res)=>{
 if(req.method!=="GET")return json(res,405,{error:"Method not allowed"});
 if(!ready())return json(res,503,{error:"Content database is not configured"});
 try{
  const rows=await sql()`SELECT content FROM dp_site_content WHERE content_key='homepage' LIMIT 1`;
  return json(res,200,{content:rows[0]?.content||null});
 }catch(e){console.error("public content",e);return json(res,500,{error:"Unable to load site content"});}
};
