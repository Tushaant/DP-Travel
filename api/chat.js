const {json,ready,writeMessage}=require("./_lib");
const kb=require("./chat-knowledge");
const phone=kb.company.phone;
const wa=kb.company.whatsapp;
const norm=s=>String(s||"").toLowerCase().replace(/[^a-z0-9+ ]/g," ").replace(/\s+/g," ").trim();
const has=(s,terms)=>terms.some(t=>s.includes(t));
function contactLine(){return "For personalised assistance, please contact DP Travel Solutions on "+phone+" or WhatsApp us: "+wa;}
function linkLine(item){return item&&item.url?"\nYou can read more here: "+(item.url.startsWith("/")?"https://dptravel.vercel.app"+item.url:item.url):"";}
function sensitive(s){
  return /\b(passport|aadhaar|aadhar|pan card|identity number|id number)\b/i.test(s)&&/(\d{8,}|[A-Z]{5}\d{4}[A-Z])/i.test(s);
}
function greeting(s){
 if(/^(hi|hello|hey|good morning|good afternoon|good evening|namaste|how are you)[!. ]*$/.test(s))return "Hello! Welcome to DP Travel Solutions. I'm here to help with visa assistance, document attestation, verification services and travel planning. What can I help you with today?";
 if(/^(thank you|thanks|thx|many thanks)[!. ]*$/.test(s))return "You're very welcome! Wishing you a smooth journey. If you need further assistance, please reach out anytime.";
 if(/^(bye|goodbye|take care|see you)[!. ]*$/.test(s))return "Thank you for chatting with DP Travel Solutions. Wishing you safe and smooth travels. Take care!";
 if(/^(how are you|how r u)[?!. ]*$/.test(s))return "I'm doing well, thank you for asking. How can I help with your travel or document requirements today?";
 return null;
}
function detectDestination(s){return kb.destinations.find(d=>d.aliases.some(a=>s.includes(a)));}
function detectService(s){let best=null,score=0;for(const item of kb.services){let n=0;for(const a of item.aliases){if(s.includes(a))n+=a.includes(" ")?3:1;}if(n>score){score=n;best=item;}}return best;}
function reply(message){
 const s=norm(message),hello=greeting(s);if(hello)return hello;
 if(s.length<2)return "Please tell me a little about the service or destination you need help with.";
 if(sensitive(message))return "For your security, please don't share passport numbers, Aadhaar/PAN details or other identity numbers in this chat. I haven't saved this message. You can describe the document type without including its number. "+contactLine();
 if(has(s,["price","pricing","cost","fee","fees","charges","how much","rate","quotation","quote","timeline","how long","processing time","days to process","urgent"]))return "The website does not publish confirmed prices or processing-time commitments. These depend on the service, document, issuing authority and destination. I don't want to give you an unverified figure. "+contactLine();
 if(has(s,["visa","visit visa","tourist visa","student visa","work visa","business visa","residency"])){
   const d=detectDestination(s);
   if(!d)return "Certainly. DP Travel Solutions provides visa assistance for destinations including the UAE, United Kingdom, United States, Schengen countries and Canada. Which destination are you considering, and is your purpose tourism, business, study, work or residency?";
   return "For "+d.name+": "+d.services+"\n\nThe website mentions these preparation items: "+d.prepare+"\n\nThis is an initial guide, not a complete or current official visa checklist. Requirements depend on your circumstances and the relevant authority. "+contactLine();
 }
 const service=detectService(s);
 if(service){
   if(service.name==="Track Your Document")return service.summary+"\n\nPlease use the Track Your Document page or contact our team directly. For privacy, don't send your passport number or identity details here."+linkLine(service)+"\n"+contactLine();
   if(service.name==="Travel Planning")return service.summary+"\n\nTo help our team guide you, please share your destination, approximate travel dates and number of travellers. Please do not share payment or identity-document details here."+linkLine(service)+"\n"+contactLine();
   return service.name+": "+service.summary+"\n\nTo guide you accurately, please have these details ready: document type, issuing authority or state, destination country and purpose (for example, employment, education or family residence). "+kb.general.caveat+"\n"+contactLine()+linkLine(service);
 }
 if(has(s,["document","attestation","verification","certificate","apostille"])){
   return "DP Travel Solutions lists document attestation and verification services, including certificate, MEA, HRD, embassy and MOFA attestation, apostille, DataFlow and university/credential verification. The correct route depends on the document type, issuing authority, issuing state or country, destination and purpose.\n\nPlease tell me: (1) document type, (2) issuing state/country, (3) destination country and (4) purpose. "+kb.general.preparation+"\n"+contactLine();
 }
 if(has(s,["service","what do you do","what services","help with"])){
   return "DP Travel Solutions (established 2004) lists these service areas:\n• Visa assistance\n• Document attestation\n• Verification and credential services\n• Travel planning, including flights, hotels and insurance\n\nWhich area would you like help with?";
 }
 if(has(s,["contact","phone","call","whatsapp","number","reach you"])){
   return "You can call or WhatsApp DP Travel Solutions at "+phone+". WhatsApp: "+wa;
 }
 if(has(s,["requirement","documents required","documents needed","checklist","what should i prepare"])){
   return "The documents needed depend on the service and receiving authority. As a starting point, the website recommends preparing the document or format requested by the receiving authority, issuer/institution details, applicant identity information, destination and purpose. Please tell me the service, document type and destination so I can point you to the relevant website guide. "+contactLine();
 }
 return "I want to make sure you receive accurate information. I can help with visa assistance, document attestation, apostille, MEA/HRD/MOFA and embassy attestation, DataFlow, WES/ICAS/NNAS, university verification, document tracking and travel planning. I don't have verified information for that specific question yet, so I won't guess. "+contactLine();
}
module.exports=async(req,res)=>{
 if(req.method!=="POST")return json(res,405,{error:"Method not allowed"});
 if(!ready())return json(res,503,{reply:"Chat is temporarily unavailable. "+contactLine()});
 try{
  const b=req.body||{},message=String(b.message||"").trim().slice(0,500),ctx={visitor_id:String(b.visitor_id||"").slice(0,100),session_id:String(b.session_id||"").slice(0,100),page_path:String(b.page_path||"/").slice(0,500)};
  if(!message||!ctx.visitor_id||!ctx.session_id)return json(res,400,{error:"Invalid message"});
  const answer=reply(message);
  // Do not persist messages containing likely passport, Aadhaar or PAN identifiers.
  if(!sensitive(message))await writeMessage({...ctx,role:"user",message});
  await writeMessage({...ctx,role:"assistant",message:answer});
  return json(res,200,{reply:answer});
 }catch(e){console.error("chat",e);return json(res,500,{reply:"Chat is temporarily unavailable. "+contactLine()});}
};