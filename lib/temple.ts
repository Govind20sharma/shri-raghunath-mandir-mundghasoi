export const temple = {
  name: "श्री रघुनाथ मंदिर",
  onlineName: "Radha Krishna Mandir, Mundghasoi",
  location: "मूंडघसोई, नावां सिटी, राजस्थान – 341509",
  address: "श्री रघुनाथ मंदिर, मूंडघसोई, नावां सिटी, राजस्थान – 341509",
  phone: "9636347023",
  displayPhone: "+91 96363 47023",
  phoneHref: "tel:+919636347023",
  contacts: [
    {
      name: "अजय शर्मा",
      nameEnglish: "Ajay Sharma",
      role: "प्राथमिक संपर्क",
      phone: "9636347023",
      displayPhone: "+91 96363 47023",
      phoneHref: "tel:+919636347023",
    },
    {
      name: "दिनेश शर्मा",
      nameEnglish: "Dinesh Sharma",
      role: "सहायक संपर्क",
      phone: "9530400229",
      displayPhone: "+91 95304 00229",
      phoneHref: "tel:+919530400229",
    },
  ],
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Radha%20Krishna%20Mandir%2C%20Mundghasoi%2C%20Rajasthan%20341509",
  googleListingUrl:
    "https://www.google.com/search?q=radha+krishna+mandir+mundghasoi",
  locationSource: "https://indiamapia.com/Nagaur/Mundghasoi.html",
  timeZone: "Asia/Kolkata",
  darshan: {
    morning: { opens: 5, closes: 11 },
    evening: { opens: 17, closes: 21 },
  },
} as const;
