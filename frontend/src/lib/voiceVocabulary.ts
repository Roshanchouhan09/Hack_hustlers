export interface VoiceIntent {
  intent: string;
  triggers: string[];
  response: {
    hi: string;
    bho: string;
    en: string;
  };
}

export const MULTILINGUAL_VOICE_VOCABULARY: VoiceIntent[] = [
  {
    intent: 'QUERY_DISEASE',
    triggers: ['rog', 'bimari', 'disease', 'yellow rust', 'keeda', 'patte pile'],
    response: {
      hi: 'Aapke gehun me 7.4% peeli gerui (Yellow Rust) rog paya gaya hai. Turant Propiconazole ka chhidkaw karein.',
      bho: 'Rauwa gehunwa me peeyar gerui rog lagal ba. Drone se dawai chhidkawayi.',
      en: 'Yellow Rust detected on 7.4% of your wheat field. Immediate Propiconazole application recommended.'
    }
  },
  {
    intent: 'QUERY_HEALTH_SCORE',
    triggers: ['swasthya', 'health', 'score', 'kaisa hai', 'fasal kaisan ba'],
    response: {
      hi: 'Khet ka kul health score 82/100 hai, jo ki accha hai. Keval uttar-poorvi kone me dhyan dene ki zarurat hai.',
      bho: 'Khet ke haalat badhiya ba, 82 score ba. Bas uttar taraf dhyan dihin.',
      en: 'Overall farm health score is 82/100, which is optimal. Only the north-eastern quad requires attention.'
    }
  },
  {
    intent: 'QUERY_WATER_STATUS',
    triggers: ['pani', 'water', 'sinchai', 'drip', 'irrigation'],
    response: {
      hi: 'Purvi hisse me 18% nami ki kami hai. Aaj raat 2.5 ghante drip chalane ki salah di jati hai.',
      bho: 'Purab bagal me paani ke kami ba. Aaj ratiya drip chalawa dihin.',
      en: 'Eastern quad has an 18% moisture deficit. Recommend running drip cycle for 2.5 hours tonight.'
    }
  },
  {
    intent: 'BOOK_DRONE',
    triggers: ['drone book', 'spray karwana hai', 'pilot bhejo', 'chhidkaw'],
    response: {
      hi: 'Pilot Amit Singh aapke khet se 2.8 km door uplabdh hain. Drone booking confirm ki ja rahi hai.',
      bho: 'Pilot Amit babu 2.8 km door baadan. Drone booking confirm karat baani.',
      en: 'Pilot Amit Singh is available 2.8 km away. Drone scan booking is being confirmed.'
    }
  }
];

export function matchVoiceIntent(spokenText: string, language: 'hi' | 'bho' | 'en' = 'hi'): string {
  const normalized = spokenText.toLowerCase();
  for (const item of MULTILINGUAL_VOICE_VOCABULARY) {
    if (item.triggers.some((t) => normalized.includes(t))) {
      return item.response[language];
    }
  }
  return language === 'bho'
    ? 'Humni ke bujhayeil na, phirse boli.'
    : language === 'hi'
    ? 'Kshama karein, hum samajh nahi paye. Kripya punah bolein.'
    : 'Sorry, I did not catch that. Please try asking again.';
}
