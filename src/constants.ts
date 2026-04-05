export type Screen = "home" | "chant" | "stats" | "profile";

export interface Chant {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  audioUrl: string;
  duration: string;
  verses: number;
  lyrics: {
    original: string;
    translation: string;
    startTime?: number;
    endTime?: number;
  }[];
}

export const SACRED_LIBRARY: Chant[] = [
  {
    id: "hanuman-chalisa",
    title: "Hanuman Chalisa",
    subtitle: "Strength & Devotion",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDKtlSPzIkQEien7VfqPk0FZVVWm86qiFLA5xwwggAFXPMzU7-oeVPuxEnzJpReYfQZmBtebfHAt9HDtKFXprUgpJzQw9LjfCeO5E0RAMKsPXDxMcDQj8Fwz9_jIotbLZhJEKQvcg1JvhW00VsiEjKoz7AiLuEGMityfiiCjPpgf7J2ZMFHZA5pc4ny_4UI3UO6qR5iocqMWnnUidpm3iKp8DkKI_7x31uDW8RfYr5NUb9OFcW3Xth0hdbRDNnBSE1HTn4KFpx7",
    audioUrl: "/audio/hanuman-chalisa.mp3",
    duration: "12:40",
    verses: 43,
    lyrics: [
      {
        original:
          "श्रीगुरु चरन सरोज रज, निजमन मुकुरु सुधारि।\nबरनउं रघुबर बिमल जसु, जो दायक फल चारि।।",
        translation:
          "With the dust of my Guru's lotus feet, I cleanse the mirror of my mind and narrate the sacred glory of Sri Ram Chandra — the Supreme among the Raghu dynasty — who bestows the four fruits of life.",
      },
      {
        original:
          "बुद्धिहीन तनु जानिके, सुमिरौं पवन-कुमार।\nबल बुधि बिद्या देहु मोहिं, हरहु कलेस बिकार।।",
        translation:
          "Knowing myself to be ignorant, I call upon you, O Hanuman, Son of Pavan! Kindly bestow on me strength, wisdom and knowledge, removing all my miseries and blemishes.",
      },
      {
        original: "जय हनुमान ज्ञान गुन सागर।\nजय कपीस तिहुं लोक उजागर।।",
        translation:
          "Victory to you, O Hanuman — ocean of wisdom and virtue! Victory to the Lord of Monkeys, who illuminates all three worlds.",
      },
      {
        original: "राम दूत अतुलित बल धामा।\nअंजनि-पुत्र पवनसुत नामा।।",
        translation:
          "You are the divine messenger of Ram and the abode of immeasurable strength, known as Anjani's son and the Son of the Wind — Pavanputra.",
      },
      {
        original: "महाबीर बिक्रम बजरंगी।\nकुमति निवार सुमति के संगी।।",
        translation:
          "O mighty and valiant Bajrangi! You dispel evil thoughts and are the eternal companion of right wisdom and good sense.",
      },
      {
        original: "कंचन बरन बिराज सुबेसा।\nकानन कुण्डल कुँचित केसा।।",
        translation:
          "Your physique shines golden, your dress is radiant; you wear Kundal earrings, and your hair is long and curly.",
      },
      {
        original: "हाथ बज्र औ ध्वजा बिराजे।\nकांधे मूंज जनेउ साजे।।",
        translation:
          "In one hand you hold a thunderbolt, in the other a banner, and across your shoulder rests the sacred Mooj thread.",
      },
      {
        original: "शंकर सुवन केसरी नंदन।\nतेज प्रताप महा जग वंदन।।",
        translation:
          "You are the emanation of Lord Shiva and the delight of Keshari. Ever effulgent, your glory and power are worshipped across the entire universe.",
      },
      {
        original: "बिद्यावान गुनी अति चातुर।\nराम काज करिबे को आतुर।।",
        translation:
          "You are a repository of learning, supremely virtuous and wise — and ever eager to carry out the work of Lord Ram.",
      },
      {
        original: "प्रभु चरित्र सुनिबे को रसिया।\nराम लखन सीता मन बसिया।।",
        translation:
          "You are deeply devoted to hearing the stories of Lord Ram's life, and you dwell forever in the hearts of Ram, Sita and Lakshman.",
      },
      {
        original: "सूक्ष्म रूप धरि सियहिं दिखावा।\nबिकट रूप धरि लंक जरावा।।",
        translation:
          "You appeared before Sita in a tiny, gentle form, then assumed a terrifying form and set all of Lanka ablaze.",
      },
      {
        original: "भीम रूप धरि असुर संहारे।\nरामचन्द्र के काज संवारे।।",
        translation:
          "Taking a fearsome form, you slaughtered the demons of Lanka and fulfilled every task of Lord Ram.",
      },
      {
        original: "लाय सजीवन लखन जियाये।\nश्री रघुबीर हरषि उर लाये।।",
        translation:
          "You brought the Sanjivani herb and restored Lakshman to life; overjoyed, Shri Ram embraced you to his heart.",
      },
      {
        original: "रघुपति कीन्ही बहुत बड़ाई।\nतुम मम प्रिय भरतहि सम भाई।।",
        translation:
          "Shri Ram praised you greatly and said, 'You are as dear to me as my own brother Bharat.'",
      },
      {
        original: "सहस बदन तुम्हरो जस गावैं।\nअस कहि श्रीपति कण्ठ लगावैं।।",
        translation:
          "Saying 'Let the thousand-tongued Sheshnag sing your glories,' Shri Ram drew you into a warm embrace.",
      },
      {
        original: "सनकादिक ब्रह्मादि मुनीसा।\nनारद सारद सहित अहीसा।।",
        translation:
          "Sanak and the sages, Lord Brahma, the great hermits, Narad, Goddess Saraswati and even Sheshnag — all fall short of describing your full glory.",
      },
      {
        original: "जम कुबेर दिगपाल जहां ते।\nकबि कोबिद कहि सके कहां ते।।",
        translation:
          "Even gods like Yamraj, Kuber and the Digpals, even the greatest poets and scholars — none can narrate Hanuman's greatness in full.",
      },
      {
        original: "तुम उपकार सुग्रीवहिं कीन्हा।\nराम मिलाय राज पद दीन्हा।।",
        translation:
          "You rendered an immense service to Sugriva — you united him with Shri Ram and secured for him the royal throne.",
      },
      {
        original: "तुम्हरो मंत्र बिभीषन माना।\nलंकेश्वर भए सब जग जाना।।",
        translation:
          "Vibhushan heeded your counsel and became the Lord of Lanka — a fact known across the whole universe.",
      },
      {
        original: "जुग सहस्र जोजन पर भानु।\nलील्यो ताहि मधुर फल जानू।।",
        translation:
          "You swallowed the Sun, millions of miles away, mistaking it for a sweet fruit — such is your boundless power.",
      },
      {
        original: "प्रभु मुद्रिका मेलि मुख माहीं।\nजलधि लांघि गये अचरज नाहीं।।",
        translation:
          "Carrying the Lord's ring in your mouth, you leapt across the vast ocean. No wonder there — nothing is beyond you.",
      },
      {
        original: "दुर्गम काज जगत के जेते।\nसुगम अनुग्रह तुम्हरे तेते।।",
        translation:
          "All the most difficult tasks in this world become effortless through your grace.",
      },
      {
        original: "राम दुआरे तुम रखवारे।\nहोत न आज्ञा बिनु पैसारे।।",
        translation:
          "You are the guardian at the door of Ram's divine abode. None may enter without your blessing and permission.",
      },
      {
        original: "सब सुख लहै तुम्हारी सरना।\nतुम रच्छक काहू को डर ना।।",
        translation:
          "All happiness is found in your shelter. Under your protection, one need fear nothing in all creation.",
      },
      {
        original: "आपन तेज सम्हारो आपै।\nतीनों लोक हांक तें कांपै।।",
        translation:
          "Only you can contain your own boundless power. When you roar, all three worlds tremble in awe.",
      },
      {
        original: "भूतपिसाच निकट नहिं आवै।\nमहाबीर जब नाम सुनावै।।",
        translation:
          "Ghosts, demons and evil spirits dare not come near when the name of the great Hanumanji is spoken.",
      },
      {
        original: "नासै रोग हरे सब पीरा।\nजपत निरन्तर हनुमत बीरा।।",
        translation:
          "By chanting your name ceaselessly, O brave Hanuman, all diseases perish and every pain is dissolved.",
      },
      {
        original: "संकट तें हनुमान छुड़ावै।\nमन क्रम बचन ध्यान जो लावै।।",
        translation:
          "Hanuman delivers from all troubles those who remember him in thought, word and deed.",
      },
      {
        original: "सब पर राम तपस्वी राजा।\nतिन के काज सकल तुम साजा।।",
        translation:
          "Lord Ram, the supreme ascetic king, reigns over all — and you, Hanumanji, carry out his every task perfectly.",
      },
      {
        original: "और मनोरथ जो कोई लावै।\nसोई अमित जीवन फल पावै।।",
        translation:
          "Whoever brings any desire before you receives the highest, most boundless fruit of life.",
      },
      {
        original: "चारों जुग परताप तुम्हारा।\nहै परसिद्ध जगत उजियारा।।",
        translation:
          "Your glory shines across all four ages of time, radiantly proclaimed throughout the entire cosmos.",
      },
      {
        original: "साधु संत के तुम रखवारे।\nअसुर निकन्दन राम दुलारे।।",
        translation:
          "You are the protector of saints and sages, the destroyer of demons, and the beloved darling of Shri Ram.",
      },
      {
        original: "अष्टसिद्धि नौ निधि के दाता।\nअस बर दीन जानकी माता।।",
        translation:
          "Mother Janaki has blessed you with the power to grant any of the eight Sidhis and the nine Nidhis to whomever you choose.",
      },
      {
        original: "राम रसायन तुम्हरे पासा।\nसदा रहो रघुपति के दासा।।",
        translation:
          "You hold within you the very essence of devotion to Ram. May you always remain a servant of Raghupati.",
      },
      {
        original: "तुह्मरे भजन राम को पावै।\nजनम जनम के दुख बिसरावै।।",
        translation:
          "Through devotion to you, one reaches Ram himself and is freed from the sorrows of countless lifetimes.",
      },
      {
        original: "अंत काल रघुबर पुर जाई।\nजहां जन्म हरिभक्त कहाई।।",
        translation:
          "At the end of life, the devotee enters the eternal abode of Ram — and in every future birth, is known as a devotee of Hari.",
      },
      {
        original: "और देवता चित्त न धरई।\nहनुमत सेइ सर्ब सुख करई।।",
        translation:
          "There is no need to hold any other deity in mind. Hanumanji alone bestows all happiness.",
      },
      {
        original: "संकट कटै मिटै सब पीरा।\nजो सुमिरै हनुमत बलबीरा।।",
        translation:
          "All suffering is cut away and every pain erased for those who remember the mighty and valiant Hanumanji.",
      },
      {
        original: "जय जय जय हनुमान गोसाईं।\nकृपा करहु गुरुदेव की नाईं।।",
        translation:
          "Hail, Hail, Hail Lord Hanumanji! Bless me as my supreme Guru and shower your grace upon me.",
      },
      {
        original: "जो सत बार पाठ कर कोई।\nछूटहि बन्दि महा सुख होई।।",
        translation:
          "One who recites this Hanuman Chalisa regularly becomes free from the bondage of life and death and attains the highest bliss.",
      },
      {
        original: "जो यह पढ़ै हनुमान चालीसा।\nहोय सिद्धि साखी गौरीसा।।",
        translation:
          "With Lord Shankar himself as witness — all who recite the Hanuman Chalisa with faith are sure to be blessed.",
      },
      {
        original: "तुलसीदास सदा हरि चेरा।\nकीजै नाथ हृदय महं डेरा।।",
        translation:
          "Tulsidas, ever the servant of the Lord, prays — 'O my Lord Hanuman, please make your abode within my heart.'",
      },
      {
        original:
          "पवनतनय संकट हरन, मंगल मूरति रूप।\nराम लखन सीता सहित, हृदय बसहु सुर भूप।।",
        translation:
          "O Hanuman, Son of Pavan, remover of all afflictions, embodiment of auspiciousness — please dwell in my heart together with Shri Ram, Lakshman and Sita.",
      },
    ],
  },
  {
    id: "maha-mrityunjaya",
    title: "Maha Mrityunjaya Mantra",
    subtitle: "Healing & Liberation",
    imageUrl:
      "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=1000&auto=format&fit=crop",
    audioUrl: "/audio/maha-mrityunjaya.mp3",
    duration: "08:15",
    verses: 4,
    lyrics: [
      {
        original:
          "ॐ त्र्यम्बकं यजामहे\nसुगन्धिं पुष्टिवर्धनम्।\nउर्वारुकमिव बन्धनान्\nमृत्योर्मुक्षीय मामृतात्।।",
        translation:
          "We worship the three-eyed Lord Shiva who is fragrant and who nourishes all beings. May He liberate us from death for the sake of immortality, just as a ripe cucumber is severed from the vine.",
      },
      {
        original:
          "त्र्यम्बकम् — तीन नेत्रों वाले।\nयजामहे — हम पूजा करते हैं।\nसुगन्धिम् — सुगंधित, दिव्य।\nपुष्टिवर्धनम् — पोषण देने वाले।",
        translation:
          "Tryambakam — the three-eyed one (Shiva).\nYajāmahe — we worship, we honour.\nSugandhim — fragrant, of sweet divine essence.\nPushtivardhanam — he who nourishes and strengthens all.",
      },
      {
        original:
          "उर्वारुकम् — पका हुआ ककड़ी।\nइव — जैसे, की तरह।\nबन्धनात् — बंधन से, मृत्यु के बंधन से।\nमृत्योः — मृत्यु से।",
        translation:
          "Urvārukam — the ripe cucumber (or gourd).\nIva — just as, like.\nBandhanāt — from bondage, from the fetters of death.\nMrityoh — from death itself.",
      },
      {
        original:
          "मुक्षीय — मुक्त कर दो।\nमा अमृतात् — मुझे अमरत्व से वंचित मत करो।\n\nयह महामंत्र 108 बार जपने से रोग, भय और मृत्यु के बंधन से मुक्ति मिलती है।",
        translation:
          "Mukshīya — liberate us, set us free.\nMā Amritāt — do not withhold immortality from us.\n\nChanting this Mahamantra 108 times grants liberation from disease, fear, and the bondage of death.",
      },
    ],
  },
  {
    id: "vishnu-aarti",
    title: "Vishnu Aarti",
    subtitle: "Peace & Preservation",
    imageUrl:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000&auto=format&fit=crop",
    audioUrl: "/audio/vishnu-aarti.mp3",
    duration: "05:30",
    verses: 8,
    lyrics: [
      {
        original:
          "ॐ जय जगदीश हरे, स्वामी जय जगदीश हरे।\nभक्त जनों के संकट, क्षण में दूर करे।।\nॐ जय जगदीश हरे।।",
        translation:
          "Victory to the Lord of the Universe, O Master! In an instant, you remove the troubles of all your devotees. Victory to the Lord of the Universe.",
      },
      {
        original:
          "जो ध्यावे फल पावे, दुख बिनसे मन का।\nसुख संपत्ति घर आवे, कष्ट मिटे तन का।।\nॐ जय जगदीश हरे।।",
        translation:
          "Whoever meditates upon you receives the fruit; the sorrow of the mind vanishes. Happiness and prosperity come home; bodily suffering disappears.",
      },
      {
        original:
          "मात पिता तुम मेरे, शरण गहूं मैं किसकी।\nतुम बिन और न दूजा, आस करूं जिसकी।।\nॐ जय जगदीश हरे।।",
        translation:
          "You are my mother and my father — whose refuge shall I seek? Without you, there is none other on whom I can place my hope.",
      },
      {
        original:
          "तुम पूरण परमात्मा, तुम अंतर्यामी।\nपारब्रह्म परमेश्वर, तुम सबके स्वामी।।\nॐ जय जगदीश हरे।।",
        translation:
          "You are the complete Supreme Soul, the knower of all hearts. You are the Absolute Brahman, the Supreme Lord, the Master of all.",
      },
      {
        original:
          "तुम करुणा के सागर, तुम पालन कर्ता।\nमैं मूरख खल कामी, कृपा करो भर्ता।।\nॐ जय जगदीश हरे।।",
        translation:
          "You are the ocean of compassion, the sustainer of all. I am foolish, wicked and full of desires — O Lord, show me your grace.",
      },
      {
        original:
          "तुम हो एक अगोचर, सबके प्राणपति।\nकिस विधि मिलूं दयामय, तुमको मैं कुमति।।\nॐ जय जगदीश हरे।।",
        translation:
          "You are the one beyond perception, the Lord of the life-breath of all. How shall I, a person of little wisdom, find you, O compassionate one?",
      },
      {
        original:
          "दीनबंधु दुखहर्ता, तुम ठाकुर मेरे।\nअपने हाथ उठाओ, द्वार पड़ा तेरे।।\nॐ जय जगदीश हरे।।",
        translation:
          "Friend of the meek, remover of sorrow — you are my Lord. Raise your hand in blessing; I lie at your door seeking refuge.",
      },
      {
        original:
          "विषय विकार मिटाओ, पाप हरो देवा।\nश्रद्धा भक्ति बढ़ाओ, संतन की सेवा।।\nॐ जय जगदीश हरे।।",
        translation:
          "Remove my base desires and distortions; take away my sins, O Lord. Increase my faith and devotion, and the spirit of service to the saints.",
      },
    ],
  },
];
