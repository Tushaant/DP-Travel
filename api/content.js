const {json,ready,sql}=require("./_lib");
module.exports=async(req,res)=>{
 if(req.method!=="GET")return json(res,405,{error:"Method not allowed"});
 if(!ready())return json(res,503,{error:"Content database is not configured"});
 try{
  const rows=await sql()`SELECT content FROM dp_site_content WHERE content_key='homepage' LIMIT 1`;
  const content=rows[0]?.content||{};
  // Preview-only illustrative cards let reviewers assess the layout before real feedback exists.
  // They are never returned by the production deployment.
  if(process.env.VERCEL_ENV==="preview"&&!(Array.isArray(content.testimonials)&&content.testimonials.some(x=>x.status==="published"))){
   content.previewTestimonials=[
    {clientName:"Sample Traveller 01",role:"ILLUSTRATIVE PREVIEW · NOT A CLIENT REVIEW",destination:"Destination example",service:"Visa assistance",quote:"A sample testimonial goes here to demonstrate the card layout, typography and spacing. Replace this copy with approved client feedback before publishing.",rating:null,sortOrder:0},
    {clientName:"Sample Traveller 02",role:"ILLUSTRATIVE PREVIEW · NOT A CLIENT REVIEW",destination:"Destination example",service:"Travel planning",quote:"This sample shows how a longer customer story will appear in the carousel. No real customer experience or endorsement is being claimed.",rating:null,sortOrder:1},
    {clientName:"Sample Traveller 03",role:"ILLUSTRATIVE PREVIEW · NOT A CLIENT REVIEW",destination:"Destination example",service:"Document attestation",quote:"Use the CMS to add genuine feedback, optionally include an approved client photo, and publish the entry when it is ready.",rating:null,sortOrder:2}
   ];
  }
  return json(res,200,{content});
 }catch(e){console.error("public content",e);return json(res,500,{error:"Unable to load site content"});}
};
