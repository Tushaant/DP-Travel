const {json,ready,sql}=require("./_lib");
const DESTINATION_DEFAULTS=[{"code":"UAE","name":"United Arab Emirates","short":"Work · Visit · Residency","image":"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=85","services":"Visit, business, work and residency visa guidance.","docs":"Passport copy, photograph and purpose-specific supporting documents."},{"code":"UK","name":"United Kingdom","short":"Visit · Business · Study","image":"https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1000&q=85","services":"Visitor, business and student visa assistance.","docs":"Application details, financial evidence, travel purpose and supporting records."},{"code":"USA","name":"United States","short":"Visitor · Business","image":"https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=1000&q=85","services":"Visitor and business visa preparation support.","docs":"Application form, appointment process and relevant personal and financial documents."},{"code":"SCH","name":"Schengen","short":"Tourism · Business","image":"https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1000&q=85","services":"Short-stay tourism and business visa guidance.","docs":"Travel itinerary, accommodation, insurance and supporting financial documents."},{"code":"CAN","name":"Canada","short":"Visit · Study · Migration","image":"https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=1000&q=85","services":"Visitor and study application assistance.","docs":"Purpose of travel, financial evidence, biometrics and supporting documents."},{"code":"NGA","name":"Nigeria","short":"Visit · Business · Family","image":"https://wellington-prod.oss-cn-shanghai.aliyuncs.com/wellington/20260519/xinWen_1779171546345_keak4i3l.jpg","services":"Visit, business and family travel guidance.","docs":"Passport copy, travel purpose, accommodation details and supporting documents."}];
module.exports=async(req,res)=>{
 if(req.method!=="GET")return json(res,405,{error:"Method not allowed"});
 if(!ready())return json(res,503,{error:"Content database is not configured"});
 try{
  const rows=await sql()`SELECT content FROM dp_site_content WHERE content_key='homepage' LIMIT 1`;
  const content=rows[0]?.content||{};
  const saved=Array.isArray(content.destinations)?content.destinations:[];
  content.destinations=[...DESTINATION_DEFAULTS.map(d=>({...d,...(saved.find(x=>x.code===d.code)||{}),image:d.image})),...saved.filter(x=>!DESTINATION_DEFAULTS.some(d=>d.code===x.code))];
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
