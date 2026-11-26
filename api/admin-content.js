const {json,ready,sql,auth}=require("./_lib");
const MAX=100000;
module.exports=async(req,res)=>{
 if(!auth(req))return json(res,401,{error:"Please sign in"});
 if(!ready())return json(res,503,{error:"Database is not connected. Configure DATABASE_URL in Vercel."});
 const db=sql();
 try{
  if(req.method==="GET"){
   const rows=await db`SELECT content,updated_at FROM dp_site_content WHERE content_key='homepage' LIMIT 1`;
   return json(res,200,{content:rows[0]?.content||null,updated_at:rows[0]?.updated_at||null});
  }
  if(req.method!=="PUT")return json(res,405,{error:"Method not allowed"});
  const content=req.body?.content;
  if(!content||typeof content!=="object"||!Array.isArray(content.heroSlides)||!Array.isArray(content.destinations)|| (content.testimonials!==undefined&&!Array.isArray(content.testimonials)))return json(res,400,{error:"Invalid homepage content structure"});
  if(content.heroSlides.length!==9||content.destinations.length>30||(content.testimonials||[]).length>40)return json(res,400,{error:"The homepage carousel must contain exactly 9 slides, destinations are limited to 30 and testimonials to 40."});
  const clean={
   heroSlides:content.heroSlides.map(x=>({title:String(x.title||"").trim().slice(0,80),eyebrow:String(x.eyebrow||"Discover the world").trim().slice(0,80),image:String(x.image||"").trim().slice(0,1500),alt:String(x.alt||x.title||"").trim().slice(0,180)})),
   destinations:content.destinations.map(x=>({code:String(x.code||"").trim().slice(0,12),name:String(x.name||"").trim().slice(0,80),short:String(x.short||"").trim().slice(0,120),image:String(x.image||"").trim().slice(0,1500),services:String(x.services||"").trim().slice(0,600),docs:String(x.docs||"").trim().slice(0,600)}))
  };
  if(clean.testimonials.some(x=>!x.clientName||!x.quote||(x.avatar&&!/^https:\\/\\//i.test(x.avatar))||(x.rating!==null&&(!Number.isInteger(x.rating)||x.rating<1||x.rating>5))))return json(res,400,{error:"Testimonials need a client display name and feedback; photos must use HTTPS and ratings must be 1–5."});
  if(clean.heroSlides.some(x=>!x.title||!/^https:\/\//i.test(x.image))||clean.destinations.some(x=>!x.name||!/^https:\/\//i.test(x.image)))return json(res,400,{error:"Every slide and destination needs a title/name and a valid HTTPS image URL"});
  if(Buffer.byteLength(JSON.stringify(clean),"utf8")>MAX)return json(res,413,{error:"Content is too large"});
  await db`INSERT INTO dp_site_content(content_key,content,updated_at) VALUES('homepage',${JSON.stringify(clean)}::jsonb,NOW()) ON CONFLICT(content_key) DO UPDATE SET content=EXCLUDED.content,updated_at=NOW()`;
  return json(res,200,{ok:true,updated_at:new Date().toISOString()});
 }catch(e){console.error("admin-content",e);return json(res,500,{error:"Unable to save website content"});}
};
