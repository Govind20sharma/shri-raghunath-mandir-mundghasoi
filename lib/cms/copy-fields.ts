import { formatDarshanHour, type CmsContent, type CmsCopyField, type CmsSettings } from "./model";
import { photosCopyFields } from "./photos-copy";

export const cmsCopyFields: CmsCopyField[] = [
  {
    "key": "home.text001",
    "label": "मूंडघसोई की पावन धरा पर",
    "group": "मुख्य पृष्ठ · स्वागत",
    "defaultValue": "मूंडघसोई की पावन धरा पर",
    "maxLength": 120
  },
  {
    "key": "home.text002",
    "label": "आस्था का आँगन,",
    "group": "मुख्य पृष्ठ · स्वागत",
    "defaultValue": "आस्था का आँगन,",
    "maxLength": 60
  },
  {
    "key": "home.text003",
    "label": "श्री रघुनाथ",
    "group": "मुख्य पृष्ठ · स्वागत",
    "defaultValue": "श्री रघुनाथ",
    "maxLength": 60
  },
  {
    "key": "home.text004",
    "label": "का धाम।",
    "group": "मुख्य पृष्ठ · स्वागत",
    "defaultValue": "का धाम।",
    "maxLength": 60
  },
  {
    "key": "home.text005",
    "label": "जहाँ मन को मिले शांति और जीवन को श्रीराम का आशीर्वाद। श्री रघुना",
    "group": "मुख्य पृष्ठ · स्वागत",
    "defaultValue": "जहाँ मन को मिले शांति और जीवन को श्रीराम का आशीर्वाद। श्री रघुनाथ मंदिर में आपका सपरिवार स्वागत है।",
    "maxLength": 700
  },
  {
    "key": "home.text006",
    "label": "दर्शन की जानकारी",
    "group": "मुख्य पृष्ठ · स्वागत",
    "defaultValue": "दर्शन की जानकारी",
    "maxLength": 120
  },
  {
    "key": "home.text007",
    "label": "मंदिर से परिचय",
    "group": "मुख्य पृष्ठ · स्वागत",
    "defaultValue": "मंदिर से परिचय",
    "maxLength": 120
  },
  {
    "key": "home.text008",
    "label": "श्रद्धा से आइए, सुकून साथ ले जाइए।",
    "group": "मुख्य पृष्ठ · स्वागत",
    "defaultValue": "श्रद्धा से आइए, सुकून साथ ले जाइए।",
    "maxLength": 120
  },
  {
    "key": "home.text009",
    "label": "सियावर",
    "group": "मुख्य पृष्ठ · स्वागत",
    "defaultValue": "सियावर",
    "maxLength": 120
  },
  {
    "key": "home.text010",
    "label": "रामचन्द्र",
    "group": "मुख्य पृष्ठ · स्वागत",
    "defaultValue": "रामचन्द्र",
    "maxLength": 120
  },
  {
    "key": "home.text011",
    "label": "की जय",
    "group": "मुख्य पृष्ठ · स्वागत",
    "defaultValue": "की जय",
    "maxLength": 120
  },
  {
    "key": "home.text012",
    "label": "श्री रघुनाथ मंदिर · मूंडघसोई का अपना धाम",
    "group": "मुख्य पृष्ठ · स्वागत",
    "defaultValue": "श्री रघुनाथ मंदिर · मूंडघसोई का अपना धाम",
    "maxLength": 240
  },
  {
    "key": "home.text013",
    "label": "प्रातः दर्शन",
    "group": "मुख्य पृष्ठ · दर्शन पट्टी",
    "defaultValue": "प्रातः दर्शन",
    "maxLength": 120
  },
  {
    "key": "home.text015",
    "label": "संध्या दर्शन",
    "group": "मुख्य पृष्ठ · दर्शन पट्टी",
    "defaultValue": "संध्या दर्शन",
    "maxLength": 120
  },
  {
    "key": "home.text017",
    "label": "हमारा स्थान",
    "group": "मुख्य पृष्ठ · दर्शन पट्टी",
    "defaultValue": "हमारा स्थान",
    "maxLength": 120
  },
  {
    "key": "home.text018",
    "label": "मूंडघसोई, राजस्थान",
    "group": "मुख्य पृष्ठ · दर्शन पट्टी",
    "defaultValue": "मूंडघसोई, राजस्थान",
    "maxLength": 120
  },
  {
    "key": "home.text019",
    "label": "पधारने की जानकारी",
    "group": "मुख्य पृष्ठ · दर्शन पट्टी",
    "defaultValue": "पधारने की जानकारी",
    "maxLength": 120
  },
  {
    "key": "home.text020",
    "label": "श्रद्धा का अपना ठिकाना",
    "group": "मुख्य पृष्ठ · मंदिर का परिचय",
    "defaultValue": "श्रद्धा का अपना ठिकाना",
    "maxLength": 120
  },
  {
    "key": "home.text021",
    "label": "मन में राम,",
    "group": "मुख्य पृष्ठ · मंदिर का परिचय",
    "defaultValue": "मन में राम,",
    "maxLength": 120
  },
  {
    "key": "home.text022",
    "label": "हर श्वास में राम।",
    "group": "मुख्य पृष्ठ · मंदिर का परिचय",
    "defaultValue": "हर श्वास में राम।",
    "maxLength": 120
  },
  {
    "key": "home.text025",
    "label": "रोज़मर्रा की भागदौड़ से कुछ पल दूर,",
    "group": "मुख्य पृष्ठ · मंदिर का परिचय",
    "defaultValue": "रोज़मर्रा की भागदौड़ से कुछ पल दूर,",
    "maxLength": 120
  },
  {
    "key": "home.text026",
    "label": "आइए प्रभु के चरणों में बैठें।",
    "group": "मुख्य पृष्ठ · मंदिर का परिचय",
    "defaultValue": "आइए प्रभु के चरणों में बैठें।",
    "maxLength": 120
  },
  {
    "key": "home.text027",
    "label": "श्री रघुनाथ मंदिर, मूंडघसोई में श्रीराम के दर्शन के लिए आप सपरिव",
    "group": "मुख्य पृष्ठ · मंदिर का परिचय",
    "defaultValue": "श्री रघुनाथ मंदिर, मूंडघसोई में श्रीराम के दर्शन के लिए आप सपरिवार पधार सकते हैं। प्रभु का स्मरण करें, प्रार्थना में समय बिताएँ और अपने दिन में शांति के कुछ पल जोड़ें।",
    "maxLength": 700
  },
  {
    "key": "home.text028",
    "label": "प्रातः हवन, हर मंगलवार सुंदरकांड पाठ और जन्माष्टमी उत्सव यहाँ की",
    "group": "मुख्य पृष्ठ · मंदिर का परिचय",
    "defaultValue": "प्रातः हवन, हर मंगलवार सुंदरकांड पाठ और जन्माष्टमी उत्सव यहाँ की आराधना से जुड़े अवसर हैं। श्री रघुनाथ जी के साथ श्री हनुमान जी, श्री राधा कृष्ण और माँ दुर्गा के दर्शन की झलकियाँ भी हमारी तस्वीरों में देखें। राम नाम, भक्ति और सेवा के भाव के साथ हर श्रद्धालु का स्वागत है।",
    "maxLength": 1600
  },
  {
    "key": "home.text029",
    "label": "श्रद्धा",
    "group": "मुख्य पृष्ठ · मंदिर का परिचय",
    "defaultValue": "श्रद्धा",
    "maxLength": 120
  },
  {
    "key": "home.text030",
    "label": "प्रभु के प्रति विश्वास",
    "group": "मुख्य पृष्ठ · मंदिर का परिचय",
    "defaultValue": "प्रभु के प्रति विश्वास",
    "maxLength": 120
  },
  {
    "key": "home.text031",
    "label": "भक्ति",
    "group": "मुख्य पृष्ठ · मंदिर का परिचय",
    "defaultValue": "भक्ति",
    "maxLength": 120
  },
  {
    "key": "home.text032",
    "label": "मन से प्रभु का स्मरण",
    "group": "मुख्य पृष्ठ · मंदिर का परिचय",
    "defaultValue": "मन से प्रभु का स्मरण",
    "maxLength": 120
  },
  {
    "key": "home.text033",
    "label": "सेवा",
    "group": "मुख्य पृष्ठ · मंदिर का परिचय",
    "defaultValue": "सेवा",
    "maxLength": 120
  },
  {
    "key": "home.text034",
    "label": "सबके प्रति सद्भाव",
    "group": "मुख्य पृष्ठ · मंदिर का परिचय",
    "defaultValue": "सबके प्रति सद्भाव",
    "maxLength": 120
  },
  {
    "key": "home.text035",
    "label": "आपके दर्शन की तैयारी",
    "group": "मुख्य पृष्ठ · दर्शन का समय",
    "defaultValue": "आपके दर्शन की तैयारी",
    "maxLength": 120
  },
  {
    "key": "home.text036",
    "label": "प्रभु के द्वार,",
    "group": "मुख्य पृष्ठ · दर्शन का समय",
    "defaultValue": "प्रभु के द्वार,",
    "maxLength": 120
  },
  {
    "key": "home.text037",
    "label": "आपका इंतज़ार।",
    "group": "मुख्य पृष्ठ · दर्शन का समय",
    "defaultValue": "आपका इंतज़ार।",
    "maxLength": 120
  },
  {
    "key": "home.text038",
    "label": "अपनी सुविधा के अनुसार सुबह या शाम दर्शन के लिए पधारें।",
    "group": "मुख्य पृष्ठ · दर्शन का समय",
    "defaultValue": "अपनी सुविधा के अनुसार सुबह या शाम दर्शन के लिए पधारें।",
    "maxLength": 240
  },
  {
    "key": "home.text039",
    "label": "समय भारतीय मानक समय (IST) के अनुसार। विशेष पर्वों पर समय की पुष्",
    "group": "मुख्य पृष्ठ · दर्शन का समय",
    "defaultValue": "समय भारतीय मानक समय (IST) के अनुसार। विशेष पर्वों पर समय की पुष्टि के लिए मंदिर से संपर्क करें।",
    "maxLength": 700
  },
  {
    "key": "home.text040",
    "label": "प्रातः दर्शन",
    "group": "मुख्य पृष्ठ · दर्शन का समय",
    "defaultValue": "प्रातः दर्शन",
    "maxLength": 120
  },
  {
    "key": "home.text041",
    "label": "सुबह की शुरुआत, प्रभु के नाम",
    "group": "मुख्य पृष्ठ · दर्शन का समय",
    "defaultValue": "सुबह की शुरुआत, प्रभु के नाम",
    "maxLength": 120
  },
  {
    "key": "home.text042",
    "label": "से",
    "group": "मुख्य पृष्ठ · दर्शन का समय",
    "defaultValue": "से",
    "maxLength": 120
  },
  {
    "key": "home.text043",
    "label": "सुबह · प्रतिदिन",
    "group": "मुख्य पृष्ठ · दर्शन का समय",
    "defaultValue": "सुबह · प्रतिदिन",
    "maxLength": 120
  },
  {
    "key": "home.text044",
    "label": "संध्या दर्शन",
    "group": "मुख्य पृष्ठ · दर्शन का समय",
    "defaultValue": "संध्या दर्शन",
    "maxLength": 120
  },
  {
    "key": "home.text045",
    "label": "दिन का विराम, मन को आराम",
    "group": "मुख्य पृष्ठ · दर्शन का समय",
    "defaultValue": "दिन का विराम, मन को आराम",
    "maxLength": 120
  },
  {
    "key": "home.text046",
    "label": "से",
    "group": "मुख्य पृष्ठ · दर्शन का समय",
    "defaultValue": "से",
    "maxLength": 120
  },
  {
    "key": "home.text047",
    "label": "शाम · प्रतिदिन",
    "group": "मुख्य पृष्ठ · दर्शन का समय",
    "defaultValue": "शाम · प्रतिदिन",
    "maxLength": 120
  },
  {
    "key": "home.text048",
    "label": "आरती का समय जानने के लिए",
    "group": "मुख्य पृष्ठ · दर्शन का समय",
    "defaultValue": "आरती का समय जानने के लिए",
    "maxLength": 120
  },
  {
    "key": "home.text049",
    "label": "पर बात करें।",
    "group": "मुख्य पृष्ठ · दर्शन का समय",
    "defaultValue": "पर बात करें।",
    "maxLength": 120
  },
  {
    "key": "home.text050",
    "label": "कुछ पल श्रीराम के नाम",
    "group": "मुख्य पृष्ठ · स्तुति और प्रार्थना",
    "defaultValue": "कुछ पल श्रीराम के नाम",
    "maxLength": 120
  },
  {
    "key": "home.text051",
    "label": "राम नाम, मन का विश्राम।",
    "group": "मुख्य पृष्ठ · स्तुति और प्रार्थना",
    "defaultValue": "राम नाम, मन का विश्राम।",
    "maxLength": 120
  },
  {
    "key": "home.text052",
    "label": "शांत मन से पढ़ें।",
    "group": "मुख्य पृष्ठ · स्तुति और प्रार्थना",
    "defaultValue": "शांत मन से पढ़ें।",
    "maxLength": 120
  },
  {
    "key": "home.text053",
    "label": "प्रभु के चरणों में अपनी प्रार्थना अर्पित करें।",
    "group": "मुख्य पृष्ठ · स्तुति और प्रार्थना",
    "defaultValue": "प्रभु के चरणों में अपनी प्रार्थना अर्पित करें।",
    "maxLength": 240
  },
  {
    "key": "home.text054",
    "label": "राम",
    "group": "मुख्य पृष्ठ · स्तुति और प्रार्थना",
    "defaultValue": "राम",
    "maxLength": 120
  },
  {
    "key": "home.text055",
    "label": "श्रीराम स्तुति",
    "group": "मुख्य पृष्ठ · स्तुति और प्रार्थना",
    "defaultValue": "श्रीराम स्तुति",
    "maxLength": 120
  },
  {
    "key": "home.text056",
    "label": "गोस्वामी तुलसीदास",
    "group": "मुख्य पृष्ठ · स्तुति और प्रार्थना",
    "defaultValue": "गोस्वामी तुलसीदास",
    "maxLength": 120
  },
  {
    "key": "home.text057",
    "label": "श्रीरामचन्द्र कृपालु भजु मन",
    "group": "मुख्य पृष्ठ · स्तुति और प्रार्थना",
    "defaultValue": "श्रीरामचन्द्र कृपालु भजु मन",
    "maxLength": 120
  },
  {
    "key": "home.text058",
    "label": "हरण भवभय दारुणम्।",
    "group": "मुख्य पृष्ठ · स्तुति और प्रार्थना",
    "defaultValue": "हरण भवभय दारुणम्।",
    "maxLength": 120
  },
  {
    "key": "home.text059",
    "label": "नवकंज लोचन कंज मुख",
    "group": "मुख्य पृष्ठ · स्तुति और प्रार्थना",
    "defaultValue": "नवकंज लोचन कंज मुख",
    "maxLength": 120
  },
  {
    "key": "home.text060",
    "label": "कर कंज पद कंजारुणम्॥",
    "group": "मुख्य पृष्ठ · स्तुति और प्रार्थना",
    "defaultValue": "कर कंज पद कंजारुणम्॥",
    "maxLength": 120
  },
  {
    "key": "home.text061",
    "label": "हे मन, कृपालु श्रीराम का भजन कर, जो संसार के भय और दुख दूर करने ",
    "group": "मुख्य पृष्ठ · स्तुति और प्रार्थना",
    "defaultValue": "हे मन, कृपालु श्रीराम का भजन कर, जो संसार के भय और दुख दूर करने वाले हैं। उनके नेत्र, मुख, हाथ और चरण कमल के समान सुंदर हैं।",
    "maxLength": 700
  },
  {
    "key": "home.text062",
    "label": "स्तुति के आगे के पद पढ़ें",
    "group": "मुख्य पृष्ठ · स्तुति और प्रार्थना",
    "defaultValue": "स्तुति के आगे के पद पढ़ें ",
    "maxLength": 120
  },
  {
    "key": "home.text063",
    "label": "कन्दर्प अगणित अमित छवि",
    "group": "मुख्य पृष्ठ · स्तुति और प्रार्थना",
    "defaultValue": "कन्दर्प अगणित अमित छवि",
    "maxLength": 120
  },
  {
    "key": "home.text064",
    "label": "नवनील नीरद सुन्दरम्।",
    "group": "मुख्य पृष्ठ · स्तुति और प्रार्थना",
    "defaultValue": "नवनील नीरद सुन्दरम्।",
    "maxLength": 120
  },
  {
    "key": "home.text065",
    "label": "पटपीत मानहु तड़ित रुचि शुचि",
    "group": "मुख्य पृष्ठ · स्तुति और प्रार्थना",
    "defaultValue": "पटपीत मानहु तड़ित रुचि शुचि",
    "maxLength": 120
  },
  {
    "key": "home.text066",
    "label": "नौमि जनक सुतावरम्॥",
    "group": "मुख्य पृष्ठ · स्तुति और प्रार्थना",
    "defaultValue": "नौमि जनक सुतावरम्॥",
    "maxLength": 120
  },
  {
    "key": "home.text067",
    "label": "भजु दीनबन्धु दिनेश दानव",
    "group": "मुख्य पृष्ठ · स्तुति और प्रार्थना",
    "defaultValue": "भजु दीनबन्धु दिनेश दानव",
    "maxLength": 120
  },
  {
    "key": "home.text068",
    "label": "दैत्यवंश निकन्दनम्।",
    "group": "मुख्य पृष्ठ · स्तुति और प्रार्थना",
    "defaultValue": "दैत्यवंश निकन्दनम्।",
    "maxLength": 120
  },
  {
    "key": "home.text069",
    "label": "रघुनन्द आनन्द कन्द कोशल",
    "group": "मुख्य पृष्ठ · स्तुति और प्रार्थना",
    "defaultValue": "रघुनन्द आनन्द कन्द कोशल",
    "maxLength": 120
  },
  {
    "key": "home.text070",
    "label": "चन्द दशरथ नन्दनम्॥",
    "group": "मुख्य पृष्ठ · स्तुति और प्रार्थना",
    "defaultValue": "चन्द दशरथ नन्दनम्॥",
    "maxLength": 120
  },
  {
    "key": "home.text071",
    "label": "सिर मुकुट कुण्डल तिलक चारु",
    "group": "मुख्य पृष्ठ · स्तुति और प्रार्थना",
    "defaultValue": "सिर मुकुट कुण्डल तिलक चारु",
    "maxLength": 120
  },
  {
    "key": "home.text072",
    "label": "उदारु अंग विभूषणम्।",
    "group": "मुख्य पृष्ठ · स्तुति और प्रार्थना",
    "defaultValue": "उदारु अंग विभूषणम्।",
    "maxLength": 120
  },
  {
    "key": "home.text073",
    "label": "आजानुभुज शर चाप धर",
    "group": "मुख्य पृष्ठ · स्तुति और प्रार्थना",
    "defaultValue": "आजानुभुज शर चाप धर",
    "maxLength": 120
  },
  {
    "key": "home.text074",
    "label": "संग्राम जित खरदूषणम्॥",
    "group": "मुख्य पृष्ठ · स्तुति और प्रार्थना",
    "defaultValue": "संग्राम जित खरदूषणम्॥",
    "maxLength": 120
  },
  {
    "key": "home.text075",
    "label": "इति वदति तुलसीदास शंकर",
    "group": "मुख्य पृष्ठ · स्तुति और प्रार्थना",
    "defaultValue": "इति वदति तुलसीदास शंकर",
    "maxLength": 120
  },
  {
    "key": "home.text076",
    "label": "शेष मुनि मन रंजनम्।",
    "group": "मुख्य पृष्ठ · स्तुति और प्रार्थना",
    "defaultValue": "शेष मुनि मन रंजनम्।",
    "maxLength": 120
  },
  {
    "key": "home.text077",
    "label": "मम हृदय कंज निवास कुरु",
    "group": "मुख्य पृष्ठ · स्तुति और प्रार्थना",
    "defaultValue": "मम हृदय कंज निवास कुरु",
    "maxLength": 120
  },
  {
    "key": "home.text078",
    "label": "कामादि खलदल गंजनम्॥",
    "group": "मुख्य पृष्ठ · स्तुति और प्रार्थना",
    "defaultValue": "कामादि खलदल गंजनम्॥",
    "maxLength": 120
  },
  {
    "key": "home.text079",
    "label": "सेवा में ही समर्पण",
    "group": "मुख्य पृष्ठ · सेवा",
    "defaultValue": "सेवा में ही समर्पण",
    "maxLength": 120
  },
  {
    "key": "home.text080",
    "label": "आपका छोटा-सा योगदान,",
    "group": "मुख्य पृष्ठ · सेवा",
    "defaultValue": "आपका छोटा-सा योगदान,",
    "maxLength": 120
  },
  {
    "key": "home.text081",
    "label": "एक सुंदर सेवा का संकल्प।",
    "group": "मुख्य पृष्ठ · सेवा",
    "defaultValue": "एक सुंदर सेवा का संकल्प।",
    "maxLength": 120
  },
  {
    "key": "home.text082",
    "label": "पूजा, प्रसाद या मंदिर सेवा में जुड़ने की इच्छा हो तो सीधे संपर्क",
    "group": "मुख्य पृष्ठ · सेवा",
    "defaultValue": "पूजा, प्रसाद या मंदिर सेवा में जुड़ने की इच्छा हो तो सीधे संपर्क करें और उपलब्ध व्यवस्था की जानकारी लें।",
    "maxLength": 700
  },
  {
    "key": "home.text083",
    "label": "सेवा के लिए बात करें",
    "group": "मुख्य पृष्ठ · सेवा",
    "defaultValue": "सेवा के लिए बात करें",
    "maxLength": 120
  },
  {
    "key": "home.text084",
    "label": "पधारो हमारे धाम",
    "group": "मुख्य पृष्ठ · संपर्क और पता",
    "defaultValue": "पधारो हमारे धाम",
    "maxLength": 120
  },
  {
    "key": "home.text085",
    "label": "दर्शन के लिए आपका स्वागत है।",
    "group": "मुख्य पृष्ठ · संपर्क और पता",
    "defaultValue": "दर्शन के लिए आपका स्वागत है।",
    "maxLength": 120
  },
  {
    "key": "home.text086",
    "label": "मंदिर का पता",
    "group": "मुख्य पृष्ठ · संपर्क और पता",
    "defaultValue": "मंदिर का पता",
    "maxLength": 120
  },
  {
    "key": "home.text087",
    "label": "सीधे संपर्क करें",
    "group": "मुख्य पृष्ठ · संपर्क और पता",
    "defaultValue": "सीधे संपर्क करें",
    "maxLength": 120
  },
  {
    "key": "home.text088",
    "label": "दर्शन, आरती और सेवा की जानकारी के लिए",
    "group": "मुख्य पृष्ठ · संपर्क और पता",
    "defaultValue": "दर्शन, आरती और सेवा की जानकारी के लिए",
    "maxLength": 240
  },
  {
    "key": "home.text089",
    "label": "दर्शन का समय",
    "group": "मुख्य पृष्ठ · संपर्क और पता",
    "defaultValue": "दर्शन का समय",
    "maxLength": 120
  },
  {
    "key": "home.text092",
    "label": "MUNDGHASOI · RAJASTHAN",
    "group": "मुख्य पृष्ठ · संपर्क और पता",
    "defaultValue": "MUNDGHASOI · RAJASTHAN",
    "maxLength": 120
  },
  {
    "key": "home.text093",
    "label": "मूंडघसोई",
    "group": "मुख्य पृष्ठ · संपर्क और पता",
    "defaultValue": "मूंडघसोई",
    "maxLength": 120
  },
  {
    "key": "home.text094",
    "label": "पधारिए।",
    "group": "मुख्य पृष्ठ · संपर्क और पता",
    "defaultValue": "पधारिए।",
    "maxLength": 120
  },
  {
    "key": "home.text095",
    "label": "Google पर यह स्थान",
    "group": "मुख्य पृष्ठ · संपर्क और पता",
    "defaultValue": "Google पर यह स्थान",
    "maxLength": 120
  },
  {
    "key": "home.text097",
    "label": "के नाम से मिलता है। नीचे दिए लिंक से Maps खोलें; नज़दीकी पहचान क",
    "group": "मुख्य पृष्ठ · संपर्क और पता",
    "defaultValue": "के नाम से मिलता है। नीचे दिए लिंक से Maps खोलें; नज़दीकी पहचान के लिए हमें फोन करें।",
    "maxLength": 700
  },
  {
    "key": "home.text098",
    "label": "Google Maps पर मंदिर देखें",
    "group": "मुख्य पृष्ठ · संपर्क और पता",
    "defaultValue": "Google Maps पर मंदिर देखें",
    "maxLength": 120
  },
  {
    "key": "home.text099",
    "label": "ऑनलाइन नाम ·",
    "group": "मुख्य पृष्ठ · संपर्क और पता",
    "defaultValue": "ऑनलाइन नाम · ",
    "maxLength": 120
  },
  {
    "key": "home.text100",
    "label": "Google पर ऑनलाइन लिस्टिंग",
    "group": "मुख्य पृष्ठ · संपर्क और पता",
    "defaultValue": "Google पर ऑनलाइन लिस्टिंग",
    "maxLength": 120
  },
  {
    "key": "home.text101",
    "label": "गाँव की जानकारी · IndiaMapia",
    "group": "मुख्य पृष्ठ · संपर्क और पता",
    "defaultValue": "गाँव की जानकारी · IndiaMapia",
    "maxLength": 120
  },
  {
    "key": "home.text102",
    "label": "नावां सिटी, राजस्थान",
    "group": "मुख्य पृष्ठ · संपर्क और पता",
    "defaultValue": "नावां सिटी, राजस्थान",
    "maxLength": 120
  },
  {
    "key": "home.text103",
    "label": "पिन · 341509",
    "group": "मुख्य पृष्ठ · संपर्क और पता",
    "defaultValue": "पिन · 341509",
    "maxLength": 120
  },
  {
    "key": "home.text104",
    "label": "पधारने से पहले",
    "group": "मुख्य पृष्ठ · ज़रूरी बातें",
    "defaultValue": "पधारने से पहले",
    "maxLength": 120
  },
  {
    "key": "home.text105",
    "label": "कुछ ज़रूरी बातें।",
    "group": "मुख्य पृष्ठ · ज़रूरी बातें",
    "defaultValue": "कुछ ज़रूरी बातें।",
    "maxLength": 120
  },
  {
    "key": "home.text106",
    "label": "कोई और जानकारी चाहिए?",
    "group": "मुख्य पृष्ठ · ज़रूरी बातें",
    "defaultValue": "कोई और जानकारी चाहिए?",
    "maxLength": 120
  },
  {
    "key": "home.text107",
    "label": "हमें फोन करें:",
    "group": "मुख्य पृष्ठ · ज़रूरी बातें",
    "defaultValue": "हमें फोन करें: ",
    "maxLength": 120
  },
  {
    "key": "home.text108",
    "label": "दर्शन के लिए मंदिर कब खुलता है?",
    "group": "मुख्य पृष्ठ · ज़रूरी बातें",
    "defaultValue": "दर्शन के लिए मंदिर कब खुलता है?",
    "maxLength": 120
  },
  {
    "key": "home.text110",
    "label": "आरती और विशेष पूजा की जानकारी कैसे मिलेगी?",
    "group": "मुख्य पृष्ठ · ज़रूरी बातें",
    "defaultValue": "आरती और विशेष पूजा की जानकारी कैसे मिलेगी?",
    "maxLength": 240
  },
  {
    "key": "home.text111",
    "label": "आरती के समय, विशेष पूजा और प्रसाद की व्यवस्था के लिए",
    "group": "मुख्य पृष्ठ · ज़रूरी बातें",
    "defaultValue": "आरती के समय, विशेष पूजा और प्रसाद की व्यवस्था के लिए",
    "maxLength": 240
  },
  {
    "key": "home.text112",
    "label": "पर संपर्क करें।",
    "group": "मुख्य पृष्ठ · ज़रूरी बातें",
    "defaultValue": "पर संपर्क करें।",
    "maxLength": 120
  },
  {
    "key": "home.text113",
    "label": "पहली बार आ रहे हैं, क्या ध्यान रखें?",
    "group": "मुख्य पृष्ठ · ज़रूरी बातें",
    "defaultValue": "पहली बार आ रहे हैं, क्या ध्यान रखें?",
    "maxLength": 240
  },
  {
    "key": "home.text114",
    "label": "मर्यादित वस्त्र पहनकर पधारें, निर्धारित स्थान पर जूते-चप्पल उतार",
    "group": "मुख्य पृष्ठ · ज़रूरी बातें",
    "defaultValue": "मर्यादित वस्त्र पहनकर पधारें, निर्धारित स्थान पर जूते-चप्पल उतारें और परिसर की स्वच्छता व शांति बनाए रखें। फोटो लेने से पहले अनुमति लें।",
    "maxLength": 700
  },
  {
    "key": "home.text115",
    "label": "सुंदरकांड और हवन में कब शामिल हो सकते हैं?",
    "group": "मुख्य पृष्ठ · ज़रूरी बातें",
    "defaultValue": "सुंदरकांड और हवन में कब शामिल हो सकते हैं?",
    "maxLength": 240
  },
  {
    "key": "home.text116",
    "label": "मंदिर में सुबह हवन और हर मंगलवार सुंदरकांड पाठ होता है। आयोजन का",
    "group": "मुख्य पृष्ठ · ज़रूरी बातें",
    "defaultValue": "मंदिर में सुबह हवन और हर मंगलवार सुंदरकांड पाठ होता है। आयोजन का समय और सहभागिता की जानकारी के लिए",
    "maxLength": 700
  },
  {
    "key": "home.text117",
    "label": "पर बात करें। जन्माष्टमी के कार्यक्रम की जानकारी भी इसी नंबर पर ल",
    "group": "मुख्य पृष्ठ · ज़रूरी बातें",
    "defaultValue": "पर बात करें। जन्माष्टमी के कार्यक्रम की जानकारी भी इसी नंबर पर लें।",
    "maxLength": 240
  },
  {
    "key": "home.text118",
    "label": "सेवा में कैसे जुड़ सकते हैं?",
    "group": "मुख्य पृष्ठ · ज़रूरी बातें",
    "defaultValue": "सेवा में कैसे जुड़ सकते हैं?",
    "maxLength": 120
  },
  {
    "key": "home.text119",
    "label": "सेवा की इच्छा और उपलब्ध व्यवस्था के बारे में सीधे फोन पर बात करे",
    "group": "मुख्य पृष्ठ · ज़रूरी बातें",
    "defaultValue": "सेवा की इच्छा और उपलब्ध व्यवस्था के बारे में सीधे फोन पर बात करें। किसी भी योगदान की जानकारी मंदिर से पुष्टि करने के बाद ही तय करें।",
    "maxLength": 700
  },
  {
    "key": "header.text001",
    "label": "मुख्य सामग्री पर जाएँ",
    "group": "मेन्यू और शीर्षक",
    "defaultValue": "मुख्य सामग्री पर जाएँ",
    "maxLength": 45
  },
  {
    "key": "header.text002",
    "label": "॥ श्री सीतारामचन्द्राभ्यां नमः ॥",
    "group": "मेन्यू और शीर्षक",
    "defaultValue": "॥ श्री सीतारामचन्द्राभ्यां नमः ॥",
    "maxLength": 45
  },
  {
    "key": "header.text004",
    "label": "ॐ",
    "group": "मेन्यू और शीर्षक",
    "defaultValue": "ॐ",
    "maxLength": 45
  },
  {
    "key": "header.text006",
    "label": "मूंडघसोई · राजस्थान",
    "group": "मेन्यू और शीर्षक",
    "defaultValue": "मूंडघसोई · राजस्थान",
    "maxLength": 45
  },
  {
    "key": "header.text007",
    "label": "हमारा मंदिर",
    "group": "मेन्यू और शीर्षक",
    "defaultValue": "हमारा मंदिर",
    "maxLength": 45
  },
  {
    "key": "header.text008",
    "label": "दर्शन समय",
    "group": "मेन्यू और शीर्षक",
    "defaultValue": "दर्शन समय",
    "maxLength": 45
  },
  {
    "key": "header.text009",
    "label": "अनुष्ठान",
    "group": "मेन्यू और शीर्षक",
    "defaultValue": "अनुष्ठान",
    "maxLength": 45
  },
  {
    "key": "header.text010",
    "label": "तस्वीरें",
    "group": "मेन्यू और शीर्षक",
    "defaultValue": "तस्वीरें",
    "maxLength": 45
  },
  {
    "key": "header.text011",
    "label": "पर्व एवं उत्सव",
    "group": "मेन्यू और शीर्षक",
    "defaultValue": "पर्व एवं उत्सव",
    "maxLength": 45
  },
  {
    "key": "header.text012",
    "label": "मंदिर पधारें",
    "group": "मेन्यू और शीर्षक",
    "defaultValue": "मंदिर पधारें",
    "maxLength": 45
  },
  {
    "key": "footer.text001",
    "label": "ॐ",
    "group": "फुटर",
    "defaultValue": "ॐ",
    "maxLength": 120
  },
  {
    "key": "footer.text003",
    "label": "मूंडघसोई · राजस्थान",
    "group": "फुटर",
    "defaultValue": "मूंडघसोई · राजस्थान",
    "maxLength": 120
  },
  {
    "key": "footer.text004",
    "label": "॥ सियावर रामचन्द्र की जय ॥",
    "group": "फुटर",
    "defaultValue": "॥ सियावर रामचन्द्र की जय ॥",
    "maxLength": 120
  },
  {
    "key": "footer.text005",
    "label": "कॉपीराइट में मंदिर का नाम और स्थान",
    "group": "फुटर",
    "defaultValue": "{name}, मूंडघसोई",
    "maxLength": 120
  },
  {
    "key": "footer.text006",
    "label": "दर्शन समय",
    "group": "फुटर",
    "defaultValue": "दर्शन समय",
    "maxLength": 120
  },
  {
    "key": "footer.text007",
    "label": "संपर्क",
    "group": "फुटर",
    "defaultValue": "संपर्क",
    "maxLength": 120
  },
  {
    "key": "footer.text008",
    "label": "डाक क्षेत्र का स्रोत",
    "group": "फुटर",
    "defaultValue": "डाक क्षेत्र का स्रोत",
    "maxLength": 120
  },
  {
    "key": "footer.text009",
    "label": "मंदिर की झलकियाँ देखें",
    "group": "फुटर",
    "defaultValue": "मंदिर की झलकियाँ देखें",
    "maxLength": 120
  },
  {
    "key": "rituals.text001",
    "label": "पूजन एवं अनुष्ठान",
    "group": "पूजन एवं अनुष्ठान",
    "defaultValue": "पूजन एवं अनुष्ठान",
    "maxLength": 120
  },
  {
    "key": "rituals.text002",
    "label": "भक्ति से जुड़ने के मंगल अवसर",
    "group": "पूजन एवं अनुष्ठान",
    "defaultValue": "भक्ति से जुड़ने के मंगल अवसर",
    "maxLength": 120
  },
  {
    "key": "rituals.text003",
    "label": "प्रातः हवन और प्रत्येक मंगलवार सुंदरकांड पाठ में सम्मिलित होकर श",
    "group": "पूजन एवं अनुष्ठान",
    "defaultValue": "प्रातः हवन और प्रत्येक मंगलवार सुंदरकांड पाठ में सम्मिलित होकर श्री रघुनाथ जी के चरणों में अपनी श्रद्धा अर्पित करें।",
    "maxLength": 700
  },
  {
    "key": "rituals.text004",
    "label": "प्रातःकाल",
    "group": "पूजन एवं अनुष्ठान",
    "defaultValue": "प्रातःकाल",
    "maxLength": 120
  },
  {
    "key": "rituals.text005",
    "label": "ॐ",
    "group": "पूजन एवं अनुष्ठान",
    "defaultValue": "ॐ",
    "maxLength": 120
  },
  {
    "key": "rituals.text006",
    "label": "सुबह का हवन",
    "group": "पूजन एवं अनुष्ठान",
    "defaultValue": "सुबह का हवन",
    "maxLength": 120
  },
  {
    "key": "rituals.text007",
    "label": "मंदिर में सुबह हवन होता है। पवित्र अग्नि में आहुति अर्पित करने क",
    "group": "पूजन एवं अनुष्ठान",
    "defaultValue": "मंदिर में सुबह हवन होता है। पवित्र अग्नि में आहुति अर्पित करने की यह आराधना श्रद्धा, प्रार्थना और मंगल कामना का अवसर है।",
    "maxLength": 700
  },
  {
    "key": "rituals.text008",
    "label": "समय और सहभागिता की जानकारी",
    "group": "पूजन एवं अनुष्ठान",
    "defaultValue": "समय और सहभागिता की जानकारी",
    "maxLength": 120
  },
  {
    "key": "rituals.text009",
    "label": "मंदिर से संपर्क करें",
    "group": "पूजन एवं अनुष्ठान",
    "defaultValue": "मंदिर से संपर्क करें ",
    "maxLength": 120
  },
  {
    "key": "rituals.text010",
    "label": "हर मंगलवार",
    "group": "पूजन एवं अनुष्ठान",
    "defaultValue": "हर मंगलवार",
    "maxLength": 120
  },
  {
    "key": "rituals.text011",
    "label": "राम",
    "group": "पूजन एवं अनुष्ठान",
    "defaultValue": "राम",
    "maxLength": 120
  },
  {
    "key": "rituals.text012",
    "label": "सुंदरकांड पाठ",
    "group": "पूजन एवं अनुष्ठान",
    "defaultValue": "सुंदरकांड पाठ",
    "maxLength": 120
  },
  {
    "key": "rituals.text013",
    "label": "प्रत्येक मंगलवार मंदिर में सुंदरकांड पाठ होता है। श्री हनुमान जी",
    "group": "पूजन एवं अनुष्ठान",
    "defaultValue": "प्रत्येक मंगलवार मंदिर में सुंदरकांड पाठ होता है। श्री हनुमान जी की रामभक्ति, साहस और सेवा के प्रसंगों का स्मरण करते हुए पाठ में सम्मिलित हों।",
    "maxLength": 700
  },
  {
    "key": "rituals.text014",
    "label": "पाठ के समय की जानकारी",
    "group": "पूजन एवं अनुष्ठान",
    "defaultValue": "पाठ के समय की जानकारी",
    "maxLength": 120
  },
  {
    "key": "rituals.text015",
    "label": "मंदिर से संपर्क करें",
    "group": "पूजन एवं अनुष्ठान",
    "defaultValue": "मंदिर से संपर्क करें ",
    "maxLength": 120
  },
  {
    "key": "festivals.text001",
    "label": "हमारी सांस्कृतिक परंपरा",
    "group": "पर्व एवं उत्सव",
    "defaultValue": "हमारी सांस्कृतिक परंपरा",
    "maxLength": 120
  },
  {
    "key": "festivals.text002",
    "label": "भक्ति के रंग, पर्वों के संग।",
    "group": "पर्व एवं उत्सव",
    "defaultValue": "भक्ति के रंग, पर्वों के संग।",
    "maxLength": 120
  },
  {
    "key": "festivals.text003",
    "label": "आराधना और उत्सव की परंपराओं का भाव जानें।",
    "group": "पर्व एवं उत्सव",
    "defaultValue": "आराधना और उत्सव की परंपराओं का भाव जानें।",
    "maxLength": 240
  },
  {
    "key": "festivals.text004",
    "label": "मंदिर के आयोजन की जानकारी फोन पर लें।",
    "group": "पर्व एवं उत्सव",
    "defaultValue": "मंदिर के आयोजन की जानकारी फोन पर लें।",
    "maxLength": 240
  },
  {
    "key": "festivals.text005",
    "label": "चैत्र",
    "group": "पर्व एवं उत्सव",
    "defaultValue": "चैत्र",
    "maxLength": 120
  },
  {
    "key": "festivals.text006",
    "label": "नवमी",
    "group": "पर्व एवं उत्सव",
    "defaultValue": "नवमी",
    "maxLength": 120
  },
  {
    "key": "festivals.text007",
    "label": "धर्म और मर्यादा का उत्सव",
    "group": "पर्व एवं उत्सव",
    "defaultValue": "धर्म और मर्यादा का उत्सव",
    "maxLength": 120
  },
  {
    "key": "festivals.text008",
    "label": "श्री राम नवमी",
    "group": "पर्व एवं उत्सव",
    "defaultValue": "श्री राम नवमी",
    "maxLength": 120
  },
  {
    "key": "festivals.text009",
    "label": "भगवान श्रीराम के जन्मोत्सव का पावन पर्व। राम नाम, प्रार्थना और उ",
    "group": "पर्व एवं उत्सव",
    "defaultValue": "भगवान श्रीराम के जन्मोत्सव का पावन पर्व। राम नाम, प्रार्थना और उनके आदर्शों के स्मरण का दिन।",
    "maxLength": 700
  },
  {
    "key": "festivals.text010",
    "label": "पर्व का महत्व जानें",
    "group": "पर्व एवं उत्सव",
    "defaultValue": "पर्व का महत्व जानें ",
    "maxLength": 120
  },
  {
    "key": "festivals.text011",
    "label": "आश्विन",
    "group": "पर्व एवं उत्सव",
    "defaultValue": "आश्विन",
    "maxLength": 120
  },
  {
    "key": "festivals.text012",
    "label": "दशमी",
    "group": "पर्व एवं उत्सव",
    "defaultValue": "दशमी",
    "maxLength": 120
  },
  {
    "key": "festivals.text013",
    "label": "सत्य और सदाचार की विजय",
    "group": "पर्व एवं उत्सव",
    "defaultValue": "सत्य और सदाचार की विजय",
    "maxLength": 120
  },
  {
    "key": "festivals.text014",
    "label": "विजयादशमी",
    "group": "पर्व एवं उत्सव",
    "defaultValue": "विजयादशमी",
    "maxLength": 120
  },
  {
    "key": "festivals.text015",
    "label": "बुराई पर अच्छाई की जीत का संदेश। श्रीराम के साहस, धैर्य और सत्य ",
    "group": "पर्व एवं उत्सव",
    "defaultValue": "बुराई पर अच्छाई की जीत का संदेश। श्रीराम के साहस, धैर्य और सत्य के मार्ग से प्रेरणा लेने का पर्व।",
    "maxLength": 700
  },
  {
    "key": "festivals.text016",
    "label": "पर्व का महत्व जानें",
    "group": "पर्व एवं उत्सव",
    "defaultValue": "पर्व का महत्व जानें ",
    "maxLength": 120
  },
  {
    "key": "festivals.text017",
    "label": "कार्तिक",
    "group": "पर्व एवं उत्सव",
    "defaultValue": "कार्तिक",
    "maxLength": 120
  },
  {
    "key": "festivals.text018",
    "label": "अमावस्या",
    "group": "पर्व एवं उत्सव",
    "defaultValue": "अमावस्या",
    "maxLength": 120
  },
  {
    "key": "festivals.text019",
    "label": "आशा और उजाले का स्वागत",
    "group": "पर्व एवं उत्सव",
    "defaultValue": "आशा और उजाले का स्वागत",
    "maxLength": 120
  },
  {
    "key": "festivals.text020",
    "label": "दीपावली",
    "group": "पर्व एवं उत्सव",
    "defaultValue": "दीपावली",
    "maxLength": 120
  },
  {
    "key": "festivals.text021",
    "label": "श्रीराम के अयोध्या लौटने की स्मृति से जुड़ा प्रकाश पर्व। दीप जला",
    "group": "पर्व एवं उत्सव",
    "defaultValue": "श्रीराम के अयोध्या लौटने की स्मृति से जुड़ा प्रकाश पर्व। दीप जलाने और खुशियाँ बाँटने का अवसर।",
    "maxLength": 700
  },
  {
    "key": "festivals.text022",
    "label": "पर्व का महत्व जानें",
    "group": "पर्व एवं उत्सव",
    "defaultValue": "पर्व का महत्व जानें ",
    "maxLength": 120
  },
  {
    "key": "festivals.text023",
    "label": "कृष्ण जन्मोत्सव",
    "group": "पर्व एवं उत्सव",
    "defaultValue": "कृष्ण जन्मोत्सव",
    "maxLength": 120
  },
  {
    "key": "festivals.text024",
    "label": "जन्माष्टमी",
    "group": "पर्व एवं उत्सव",
    "defaultValue": "जन्माष्टमी",
    "maxLength": 120
  },
  {
    "key": "festivals.text025",
    "label": "प्रेम और भक्ति का उत्सव",
    "group": "पर्व एवं उत्सव",
    "defaultValue": "प्रेम और भक्ति का उत्सव",
    "maxLength": 120
  },
  {
    "key": "festivals.text026",
    "label": "श्री कृष्ण जन्माष्टमी",
    "group": "पर्व एवं उत्सव",
    "defaultValue": "श्री कृष्ण जन्माष्टमी",
    "maxLength": 120
  },
  {
    "key": "festivals.text027",
    "label": "मंदिर में मनाया जाने वाला श्री कृष्ण जन्मोत्सव। श्रद्धा और आनंद ",
    "group": "पर्व एवं उत्सव",
    "defaultValue": "मंदिर में मनाया जाने वाला श्री कृष्ण जन्मोत्सव। श्रद्धा और आनंद के इस पर्व के आयोजन की जानकारी मंदिर से लें।",
    "maxLength": 700
  },
  {
    "key": "festivals.text028",
    "label": "उत्सव की जानकारी",
    "group": "पर्व एवं उत्सव",
    "defaultValue": "उत्सव की जानकारी ",
    "maxLength": 120
  },
  {
    "key": "festivals.text029",
    "label": "पर्व और परंपरा",
    "group": "पर्व एवं उत्सव",
    "defaultValue": "पर्व और परंपरा",
    "maxLength": 120
  },
  {
    "key": "festivals.text030",
    "label": "मंदिर में होने वाले आयोजन, पूजा और समय की जानकारी फोन पर लें।",
    "group": "पर्व एवं उत्सव",
    "defaultValue": "मंदिर में होने वाले आयोजन, पूजा और समय की जानकारी फोन पर लें।",
    "maxLength": 240
  },
  {
    "key": "festivals.text031",
    "label": "पर बात करें",
    "group": "पर्व एवं उत्सव",
    "defaultValue": "पर बात करें",
    "maxLength": 120
  },
  {
    "key": "homeGallery.text001",
    "label": "हमारे मंदिर के दर्शन",
    "group": "मुख्य पृष्ठ की तस्वीरें",
    "defaultValue": "हमारे मंदिर के दर्शन",
    "maxLength": 120
  },
  {
    "key": "homeGallery.text002",
    "label": "मंदिर की झलकियाँ।",
    "group": "मुख्य पृष्ठ की तस्वीरें",
    "defaultValue": "मंदिर की झलकियाँ।",
    "maxLength": 120
  },
  {
    "key": "homeGallery.text003",
    "label": "प्रभु का श्रृंगार, मंदिर का आँगन और आराधना का अपना स्थान।",
    "group": "मुख्य पृष्ठ की तस्वीरें",
    "defaultValue": "प्रभु का श्रृंगार, मंदिर का आँगन और आराधना का अपना स्थान।",
    "maxLength": 240
  },
  {
    "key": "homeGallery.text004",
    "label": "किसी भी तस्वीर पर क्लिक करके बड़े दर्शन करें।",
    "group": "मुख्य पृष्ठ की तस्वीरें",
    "defaultValue": "किसी भी तस्वीर पर क्लिक करके बड़े दर्शन करें।",
    "maxLength": 240
  },
  {
    "key": "homeGallery.text005",
    "label": "ॐ",
    "group": "मुख्य पृष्ठ की तस्वीरें",
    "defaultValue": "ॐ",
    "maxLength": 120
  },
  {
    "key": "homeGallery.text006",
    "label": "सपरिवार पधारिए",
    "group": "मुख्य पृष्ठ की तस्वीरें",
    "defaultValue": "सपरिवार पधारिए",
    "maxLength": 120
  },
  {
    "key": "homeGallery.text007",
    "label": "कुछ पल",
    "group": "मुख्य पृष्ठ की तस्वीरें",
    "defaultValue": "कुछ पल",
    "maxLength": 120
  },
  {
    "key": "homeGallery.text008",
    "label": "प्रभु के साथ।",
    "group": "मुख्य पृष्ठ की तस्वीरें",
    "defaultValue": "प्रभु के साथ।",
    "maxLength": 120
  },
  {
    "key": "homeGallery.text009",
    "label": "मंदिर का रास्ता",
    "group": "मुख्य पृष्ठ की तस्वीरें",
    "defaultValue": "मंदिर का रास्ता ",
    "maxLength": 120
  },
  {
    "key": "header.menuOpen",
    "label": "मेन्यू खोलें",
    "group": "मेन्यू और शीर्षक",
    "defaultValue": "मेन्यू खोलें",
    "maxLength": 100
  },
  {
    "key": "header.menuClose",
    "label": "मेन्यू बंद करें",
    "group": "मेन्यू और शीर्षक",
    "defaultValue": "मेन्यू बंद करें",
    "maxLength": 100
  },
  {
    "key": "header.menuLabel",
    "label": "मुख्य मेन्यू",
    "group": "मेन्यू और शीर्षक",
    "defaultValue": "मुख्य मेन्यू",
    "maxLength": 100
  },
  {
    "key": "header.homeLabel",
    "label": "{name} मुख्य पृष्ठ",
    "group": "मेन्यू और शीर्षक",
    "defaultValue": "{name} मुख्य पृष्ठ",
    "maxLength": 180
  },
  {
    "key": "gallery.viewLarge",
    "label": "बड़ी तस्वीर देखें",
    "group": "मुख्य पृष्ठ की तस्वीरें",
    "defaultValue": "बड़ी तस्वीर देखें",
    "maxLength": 100
  },
  {
    "key": "gallery.close",
    "label": "तस्वीर बंद करें",
    "group": "मुख्य पृष्ठ की तस्वीरें",
    "defaultValue": "तस्वीर बंद करें",
    "maxLength": 100
  },
  {
    "key": "gallery.previous",
    "label": "पिछली तस्वीर",
    "group": "मुख्य पृष्ठ की तस्वीरें",
    "defaultValue": "पिछली तस्वीर",
    "maxLength": 100
  },
  {
    "key": "gallery.next",
    "label": "अगली तस्वीर",
    "group": "मुख्य पृष्ठ की तस्वीरें",
    "defaultValue": "अगली तस्वीर",
    "maxLength": 100
  },
  {
    "key": "festival.close",
    "label": "बंद करें",
    "group": "पर्व एवं उत्सव",
    "defaultValue": "बंद करें",
    "maxLength": 100
  },
  {
    "key": "copyAddress.label",
    "label": "पता कॉपी करें",
    "group": "संपर्क और पता",
    "defaultValue": "पता कॉपी करें",
    "maxLength": 100
  },
  {
    "key": "copyAddress.success",
    "label": "मंदिर का पता कॉपी हो गया।",
    "group": "संपर्क और पता",
    "defaultValue": "मंदिर का पता कॉपी हो गया।",
    "maxLength": 180
  },
  {
    "key": "copyAddress.error",
    "label": "पता कॉपी नहीं हो पाया। ऊपर दिए पते को चुनकर कॉपी कर सकते हैं।",
    "group": "संपर्क और पता",
    "defaultValue": "पता कॉपी नहीं हो पाया। ऊपर दिए पते को चुनकर कॉपी कर सकते हैं।",
    "maxLength": 300
  },
  {
    "key": "schedule.morning",
    "label": "सुबह {morningOpen} – {morningClose}",
    "group": "दर्शन का समय",
    "defaultValue": "सुबह {morningOpen} – {morningClose}",
    "maxLength": 140
  },
  {
    "key": "schedule.evening",
    "label": "शाम {eveningOpen} – {eveningClose}",
    "group": "दर्शन का समय",
    "defaultValue": "शाम {eveningOpen} – {eveningClose}",
    "maxLength": 140
  },
  {
    "key": "schedule.morningContact",
    "label": "सुबह {morningOpen} से {morningClose} बजे",
    "group": "दर्शन का समय",
    "defaultValue": "सुबह {morningOpen} से {morningClose} बजे",
    "maxLength": 140
  },
  {
    "key": "schedule.eveningContact",
    "label": "शाम {eveningOpen} से {eveningClose} बजे",
    "group": "दर्शन का समय",
    "defaultValue": "शाम {eveningOpen} से {eveningClose} बजे",
    "maxLength": 140
  },
  {
    "key": "schedule.faq",
    "label": "दर्शन का समय प्रतिदिन सुबह {morningOpen} से {morningClose} बजे तक और शाम {eveningOpen} से {eveningClose} बजे तक है। विशेष पर्व पर आने से पहले फोन करके समय की पुष्टि कर लें।",
    "group": "दर्शन का समय",
    "defaultValue": "दर्शन का समय प्रतिदिन सुबह {morningOpen} से {morningClose} बजे तक और शाम {eveningOpen} से {eveningClose} बजे तक है। विशेष पर्व पर आने से पहले फोन करके समय की पुष्टि कर लें।",
    "maxLength": 800
  },
  {
    "key": "status.initial",
    "label": "दर्शन · सुबह {morningOpen}–{morningClose} बजे और शाम {eveningOpen}–{eveningClose} बजे",
    "group": "दर्शन का समय",
    "defaultValue": "दर्शन · सुबह {morningOpen}–{morningClose} बजे और शाम {eveningOpen}–{eveningClose} बजे",
    "maxLength": 240
  },
  {
    "key": "status.morning",
    "label": "दर्शन समय के अनुसार · अभी प्रातः दर्शन का समय है",
    "group": "दर्शन का समय",
    "defaultValue": "दर्शन समय के अनुसार · अभी प्रातः दर्शन का समय है",
    "maxLength": 240
  },
  {
    "key": "status.evening",
    "label": "दर्शन समय के अनुसार · अभी संध्या दर्शन का समय है",
    "group": "दर्शन का समय",
    "defaultValue": "दर्शन समय के अनुसार · अभी संध्या दर्शन का समय है",
    "maxLength": 240
  },
  {
    "key": "status.nextEvening",
    "label": "अगला दर्शन समय · आज शाम {eveningOpen} बजे",
    "group": "दर्शन का समय",
    "defaultValue": "अगला दर्शन समय · आज शाम {eveningOpen} बजे",
    "maxLength": 240
  },
  {
    "key": "status.nextTomorrow",
    "label": "अगला दर्शन समय · कल सुबह {morningOpen} बजे",
    "group": "दर्शन का समय",
    "defaultValue": "अगला दर्शन समय · कल सुबह {morningOpen} बजे",
    "maxLength": 240
  },
  {
    "key": "status.nextMorning",
    "label": "अगला दर्शन समय · आज सुबह {morningOpen} बजे",
    "group": "दर्शन का समय",
    "defaultValue": "अगला दर्शन समय · आज सुबह {morningOpen} बजे",
    "maxLength": 240
  },
  {
    "key": "festival.ramnavami.title",
    "label": "ramnavami — title",
    "group": "पर्व एवं उत्सव",
    "defaultValue": "श्री राम नवमी",
    "maxLength": 160
  },
  {
    "key": "festival.ramnavami.description",
    "label": "ramnavami — description",
    "group": "पर्व एवं उत्सव",
    "defaultValue": "चैत्र शुक्ल नवमी को भगवान श्रीराम के जन्मोत्सव के रूप में मनाया जाता है। यह पर्व हमें मर्यादा, सत्य, कर्तव्य और करुणा का स्मरण कराता है। श्रीराम का नाम जपना, रामकथा पढ़ना और सेवा का संकल्प लेना इस दिन की भक्ति से जुड़ी परंपराएँ हैं।",
    "maxLength": 2000
  },
  {
    "key": "festival.dussehra.title",
    "label": "dussehra — title",
    "group": "पर्व एवं उत्सव",
    "defaultValue": "विजयादशमी",
    "maxLength": 160
  },
  {
    "key": "festival.dussehra.description",
    "label": "dussehra — description",
    "group": "पर्व एवं उत्सव",
    "defaultValue": "आश्विन शुक्ल दशमी का पर्व श्रीराम की रावण पर विजय की स्मृति से जुड़ा है। इसका संदेश है कि कठिनाइयों के बीच भी सत्य और सदाचार का मार्ग नहीं छोड़ना चाहिए। अपने भीतर के अहंकार और क्रोध को कम करने का संकल्प भी इस पर्व की भावना है।",
    "maxLength": 2000
  },
  {
    "key": "festival.diwali.title",
    "label": "diwali — title",
    "group": "पर्व एवं उत्सव",
    "defaultValue": "दीपावली",
    "maxLength": 160
  },
  {
    "key": "festival.diwali.description",
    "label": "diwali — description",
    "group": "पर्व एवं उत्सव",
    "defaultValue": "कार्तिक अमावस्या का प्रकाश पर्व श्रीराम, माता सीता और लक्ष्मण के वनवास से अयोध्या लौटने की लोकपरंपरा से जुड़ा है। दीपों का उजाला आशा, प्रेम और नई शुरुआत का प्रतीक है। अपने घर और मन में प्रकाश लाएँ और दूसरों के साथ खुशियाँ बाँटें।",
    "maxLength": 2000
  },
  {
    "key": "festival.janmashtami.title",
    "label": "janmashtami — title",
    "group": "पर्व एवं उत्सव",
    "defaultValue": "श्री कृष्ण जन्माष्टमी",
    "maxLength": 160
  },
  {
    "key": "festival.janmashtami.description",
    "label": "janmashtami — description",
    "group": "पर्व एवं उत्सव",
    "defaultValue": "श्री कृष्ण जन्माष्टमी भगवान कृष्ण के जन्मोत्सव का पावन पर्व है। श्री रघुनाथ मंदिर, मूंडघसोई में भी जन्माष्टमी मनाई जाती है। यह उत्सव कृष्णभक्ति, प्रेम और आनंद का स्मरण कराता है। मंदिर के आयोजन और समय की जानकारी के लिए संपर्क करें।",
    "maxLength": 2000
  },
  {
    "key": "meta.title",
    "label": "ब्राउज़र और खोज परिणाम का शीर्षक",
    "group": "खोज और साझा करने की जानकारी",
    "defaultValue": "{name} | मूंडघसोई, राजस्थान",
    "maxLength": 180
  },
  {
    "key": "meta.description",
    "label": "खोज परिणाम का विवरण",
    "group": "खोज और साझा करने की जानकारी",
    "defaultValue": "{name}, मूंडघसोई, राजस्थान। दर्शन सुबह {morningOpen}–{morningClose} और शाम {eveningOpen}–{eveningClose} बजे। प्रातः हवन, हर मंगलवार सुंदरकांड और जन्माष्टमी। संपर्क: {phone}।",
    "maxLength": 500
  },
  {
    "key": "meta.socialDescription",
    "label": "लिंक साझा करते समय दिखने वाला विवरण",
    "group": "खोज और साझा करने की जानकारी",
    "defaultValue": "{name} में आपका सपरिवार स्वागत है। दर्शन समय, भक्ति, पर्व और संपर्क की जानकारी।",
    "maxLength": 500
  }
];

cmsCopyFields.push(...photosCopyFields);

const compactFieldLimits: Record<string, number> = {
  "header.text004": 4,
  "home.text009": 12,
  "home.text010": 16,
  "home.text011": 12,
  "header.text007": 32,
  "header.text008": 32,
  "header.text009": 32,
  "header.text010": 32,
  "header.text011": 32,
  "header.text012": 32,
};
for (const field of cmsCopyFields) {
  const limit = compactFieldLimits[field.key] ?? (["ॐ", "॥", "✦"].includes(field.defaultValue.trim()) ? 4 : undefined);
  if (limit !== undefined) field.maxLength = Math.max(limit, field.defaultValue.length);
}

const copyDefaults = Object.fromEntries(cmsCopyFields.map(field => [field.key, field.defaultValue]));

export function getCmsScheduleValues(settings: CmsSettings) {
  return {
    morningOpen: formatDarshanHour(settings.darshan.morning.opens),
    morningClose: formatDarshanHour(settings.darshan.morning.closes),
    eveningOpen: formatDarshanHour(settings.darshan.evening.opens),
    eveningClose: formatDarshanHour(settings.darshan.evening.closes),
  };
}

export function resolveCmsCopy(content: CmsContent, key: string, fallback = "", values: Record<string, string | number> = {}) {
  const value = content.copy[key] ?? copyDefaults[key] ?? fallback;
  const replacements: Record<string, string | number> = {
    name: content.settings.name,
    phone: content.settings.phone,
    location: content.settings.location,
    onlineName: content.settings.onlineName,
    ...getCmsScheduleValues(content.settings),
    ...values,
  };
  return value.replace(/\{([A-Za-z][A-Za-z0-9]*)\}/g, (match, name: string) => Object.prototype.hasOwnProperty.call(replacements, name) ? String(replacements[name]) : match);
}
