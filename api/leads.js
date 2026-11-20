const {json,ready,sql}=require("./_lib");
module.exports=async(req,res)=>{
 if(req.method!=="POST")return json(res,405,{error:"Method not allowed"});
 if(!ready())return json(res,503,{error:"Enquiry service is temporarily unavailable"});
 try{
  const b=req.body||{},phone=String(b.phone||"").trim().slice(0,40);
  if(!phone||phone.replace(/\D/g,"").length<7)return json(res,400,{error:"Please provide a valid phone number"});
  const db=sql();
  await db`INSERT INTO dp_enquiries(visitor_id,name,phone,destination,service,source) VALUES (${String(b.visitor_id||"").slice(0,100)},${String(b.name||"").trim().slice(0,100)},${phone},${String(b.destination||"").slice(0,120)},${String(b.service||"").slice(0,120)},${String(b.source||"website").slice(0,40)})`;
  return json(res,201,{ok:true});
 }catch(e){console.error("lead",e);return json(res,500,{error:"Could not save enquiry"})}
};