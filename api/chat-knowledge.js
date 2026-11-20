// Curated, website-grounded knowledge for the DP Travel assistant.
// Keep this file aligned with the public website. Do not add unverified visa rules,
// prices, processing times, approvals, guarantees or contact details.
module.exports = {
  company: {
    name: "DP Travel Solutions",
    established: "2004",
    phone: "+91 93508 82057",
    whatsapp: "https://wa.me/919350882057",
    services: ["visa assistance", "document attestation", "verification and credential services", "travel planning"]
  },
  general: {
    preparation: "Before requesting case-specific guidance, prepare the original document or the format requested by the receiving authority, issuer or institution details, applicant identity information, destination country and the purpose for which the document will be used.",
    caveat: "The exact route depends on the document type, issuing authority, issuing state or country, destination and purpose. Requirements can vary by issuing authority and receiving organisation. Check the latest official instructions before sending original documents.",
    confirm: ["Confirm the destination and purpose.", "Identify the authority that issued the document.", "Check whether prior verification or translation is required.", "Confirm current fees and timelines with the relevant authority."]
  },
  destinations: [
    {name:"United Arab Emirates",aliases:["uae","dubai","abu dhabi","sharjah"],services:"Visit, business, work and residency visa guidance.",prepare:"Passport copy, photograph and purpose-specific supporting documents."},
    {name:"United Kingdom",aliases:["uk","united kingdom","britain","england"],services:"Visitor, business and student visa assistance.",prepare:"Application details, financial evidence, travel purpose and supporting records."},
    {name:"United States",aliases:["usa","us","united states","america"],services:"Visitor and business visa preparation support.",prepare:"Application form, appointment process and relevant personal and financial documents."},
    {name:"Schengen",aliases:["schengen","europe","france","germany","italy","spain","netherlands"],services:"Short-stay tourism and business visa guidance.",prepare:"Travel itinerary, accommodation, insurance and supporting financial documents."},
    {name:"Canada",aliases:["canada"],services:"Visitor and study application assistance.",prepare:"Purpose of travel, financial evidence, biometrics and supporting documents."}
  ],
  services: [
    {name:"Certificate Attestation",aliases:["certificate attestation","educational certificate","degree attestation","personal document","commercial document"],summary:"Guidance for authenticating educational, personal and commercial documents for use overseas. It may be needed for employment, higher education, family residence, migration and business processes.",url:"/services/certificate-attestation.html"},
    {name:"MEA Attestation",aliases:["mea","ministry of external affairs","mea attestation"],summary:"Ministry of External Affairs authentication guidance for Indian documents intended for use abroad. The website identifies overseas employment, education, business, family sponsorship and migration as common purposes.",url:"/services/mea-attestation.html"},
    {name:"HRD Attestation",aliases:["hrd","state verification","hrd attestation"],summary:"State-level authentication guidance for eligible educational certificates, often relevant to overseas higher education, employment and professional applications.",url:"/services/hrd-attestation.html"},
    {name:"Apostille Attestation",aliases:["apostille","apostille attestation","hague"],summary:"Apostille guidance for public documents intended for use in countries covered by the Hague Apostille Convention. It may be relevant to education, employment, personal status and other official documents for participating destinations.",url:"/services/apostille-attestation.html"},
    {name:"MOFA Attestation",aliases:["mofa","ministry of foreign affairs","mofa attestation"],summary:"Destination-country Ministry of Foreign Affairs attestation guidance for documents authenticated through required prior steps. It may be relevant when using foreign-issued certificates for employment, education, family residence and official transactions.",url:"/services/mofa-attestation.html"},
    {name:"Embassy Attestation",aliases:["embassy attestation","uae embassy","qatar embassy","oman embassy","saudi embassy","kuwait embassy","bahrain embassy"],summary:"Country-specific embassy attestation guidance. The exact route depends on the destination, document type, issuing authority and receiving organisation.",url:"/services/embassy-attestation.html"},
    {name:"DataFlow Verification",aliases:["dataflow","data flow","primary source verification","psv"],summary:"Primary-source verification guidance for credentials and records requested by employers or regulators, including professional licensing, healthcare and regulated employment processes where specified.",url:"/services/dataflow-verification.html"},
    {name:"WES Services",aliases:["wes","world education services","wes evaluation"],summary:"Document-preparation guidance for World Education Services credential evaluation, where WES is accepted for Canadian or US education, employment or immigration-related evaluation.",url:"/services/wes-services.html"},
    {name:"ICAS Canada",aliases:["icas","international credential assessment service"],summary:"The service directory lists ICAS Canada under verification and credential services. The website does not specify detailed requirements or fees; these must be confirmed for the applicant's receiving organisation.",url:"/services/icas-canada.html"},
    {name:"NNAS Canada",aliases:["nnas","national nursing assessment service"],summary:"Document-preparation guidance for nurses applying through the National Nursing Assessment Service in Canada. The website identifies internationally educated nurses pursuing registration in a participating Canadian jurisdiction.",url:"/services/nnas-canada.html"},
    {name:"University Verification",aliases:["university verification","degree verification","college verification"],summary:"Verification guidance for credentials requested by universities, employers, professional regulators or overseas authorities. The receiving organisation's instructions and accepted verification provider should be confirmed.",url:"/services/university-verification.html"},
    {name:"Notary Attestation",aliases:["notary","notarization","notarisation"],summary:"Notary attestation is listed within DP Travel's verification and document services. The exact requirement and accepted format should be confirmed with the receiving authority.",url:"/services/notary-attestation.html"},
    {name:"Police Clearance Certificate",aliases:["pcc","police clearance","police clearance certificate"],summary:"The website lists PCC certificate attestation and PCC for UAE. The precise route depends on destination and receiving authority.",url:"/services/pcc-certificate-attestation.html"},
    {name:"Track Your Document",aliases:["track","tracking","document status","application status","reference number"],summary:"Existing customers can request an update on a document or application being handled by DP Travel Solutions. Use the website's Track Your Document page or contact the team directly; do not post passport numbers or sensitive identity details in chat.",url:"/services/track-document.html"},
    {name:"GAMCA / Wafid Medical",aliases:["gamca","wafid","medical test","medical examination"],summary:"GAMCA / Wafid Medical appears in the DP Travel service directory. The website does not publish detailed eligibility, centre availability, fees or appointment rules; confirm these with the team and the relevant official service.",url:"/services/gamca-medical.html"},
    {name:"Travel Planning",aliases:["travel planning","flight","flights","hotel","hotels","travel insurance","holiday","trip","tour"],summary:"The website lists travel planning, including flights, hotels and insurance. Availability, itinerary options and prices are not published in the current knowledge base and must be confirmed by the team.",url:"/#inquiry"}
  ],
  policies: [
    "The website is an information and enquiry guide; service availability and the exact document route must be confirmed with DP Travel Solutions.",
    "The website does not publish verified service prices or processing-time commitments in the knowledge base.",
    "Do not promise visa approval, document acceptance, fixed processing times, guaranteed outcomes, government affiliation or special approvals.",
    "Do not invent country-specific visa rules, checklists, legal advice or current government requirements. Refer users to the relevant official authority and DP Travel team.",
    "Never request passport numbers, Aadhaar numbers, full identity-document images, bank details, passwords or other sensitive identity data in chat."
  ]
};