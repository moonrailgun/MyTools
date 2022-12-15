/**
 * fork from google-translate-api and change api and query url
 */

import querystring from 'querystring';
import got from 'got';

/* eslint-disable */
// BEGIN

let yr: any = null;

function sM(tkk: string, a: any) {
  let b: any;
  let c: any;
  if (null !== yr) b = yr;
  else {
    b = wr(String.fromCharCode(84));
    c = wr(String.fromCharCode(75));
    b = [b(), b()];
    b[1] = c();
    b = (yr = tkk || '') || '';
  }
  var d: any = wr(String.fromCharCode(116));
  c = wr(String.fromCharCode(107));
  d = [d(), d()];
  d[1] = c();
  c = '&' + d.join('') + '=';
  d = b.split('.');
  b = Number(d[0]) || 0;
  for (var e = [], f = 0, g = 0; g < a.length; g++) {
    var l = a.charCodeAt(g);
    128 > l
      ? (e[f++] = l)
      : (2048 > l
          ? (e[f++] = (l >> 6) | 192)
          : (55296 == (l & 64512) &&
            g + 1 < a.length &&
            56320 == (a.charCodeAt(g + 1) & 64512)
              ? ((l = 65536 + ((l & 1023) << 10) + (a.charCodeAt(++g) & 1023)),
                (e[f++] = (l >> 18) | 240),
                (e[f++] = ((l >> 12) & 63) | 128))
              : (e[f++] = (l >> 12) | 224),
            (e[f++] = ((l >> 6) & 63) | 128)),
        (e[f++] = (l & 63) | 128));
  }
  a = b;
  for (f = 0; f < e.length; f++) (a += e[f]), (a = xr(a, '+-a^+6'));
  a = xr(a, '+-3^+b+-f');
  a ^= Number(d[1]) || 0;
  0 > a && (a = (a & 2147483647) + 2147483648);
  a %= 1e6;
  return c + (a.toString() + '.' + (a ^ b));
}

var wr = function (a: any) {
    return function () {
      return a;
    };
  },
  xr = function (a: any, b: any) {
    for (var c = 0; c < b.length - 2; c += 3) {
      var d: any = b.charAt(c + 2),
        d: any = 'a' <= d ? d.charCodeAt(0) - 87 : Number(d),
        d: any = '+' == b.charAt(c + 1) ? a >>> d : a << d;
      a = '+' == b.charAt(c) ? (a + d) & 4294967295 : a ^ d;
    }
    return a;
  };

// END

export async function getTKK() {
  try {
    const res = await got('https://translate.google.cn/');

    const code = res.body.match(/tkk:'(.*?)'/);
    const tkk = code?.[1];
    return tkk;
  } catch (err: any) {
    throw new Error(err);
  }
}

export function getToken(tkk: string, text: string): string {
  let tk = sM(tkk, text);
  tk = tk.replace('&tk=', '');
  return tk;
}

const langs: any = {
  auto: 'Automatic',
  af: 'Afrikaans',
  sq: 'Albanian',
  am: 'Amharic',
  ar: 'Arabic',
  hy: 'Armenian',
  az: 'Azerbaijani',
  eu: 'Basque',
  be: 'Belarusian',
  bn: 'Bengali',
  bs: 'Bosnian',
  bg: 'Bulgarian',
  ca: 'Catalan',
  ceb: 'Cebuano',
  ny: 'Chichewa',
  'zh-cn': 'Chinese Simplified',
  'zh-tw': 'Chinese Traditional',
  co: 'Corsican',
  hr: 'Croatian',
  cs: 'Czech',
  da: 'Danish',
  nl: 'Dutch',
  en: 'English',
  eo: 'Esperanto',
  et: 'Estonian',
  tl: 'Filipino',
  fi: 'Finnish',
  fr: 'French',
  fy: 'Frisian',
  gl: 'Galician',
  ka: 'Georgian',
  de: 'German',
  el: 'Greek',
  gu: 'Gujarati',
  ht: 'Haitian Creole',
  ha: 'Hausa',
  haw: 'Hawaiian',
  iw: 'Hebrew',
  hi: 'Hindi',
  hmn: 'Hmong',
  hu: 'Hungarian',
  is: 'Icelandic',
  ig: 'Igbo',
  id: 'Indonesian',
  ga: 'Irish',
  it: 'Italian',
  ja: 'Japanese',
  jw: 'Javanese',
  kn: 'Kannada',
  kk: 'Kazakh',
  km: 'Khmer',
  ko: 'Korean',
  ku: 'Kurdish (Kurmanji)',
  ky: 'Kyrgyz',
  lo: 'Lao',
  la: 'Latin',
  lv: 'Latvian',
  lt: 'Lithuanian',
  lb: 'Luxembourgish',
  mk: 'Macedonian',
  mg: 'Malagasy',
  ms: 'Malay',
  ml: 'Malayalam',
  mt: 'Maltese',
  mi: 'Maori',
  mr: 'Marathi',
  mn: 'Mongolian',
  my: 'Myanmar (Burmese)',
  ne: 'Nepali',
  no: 'Norwegian',
  ps: 'Pashto',
  fa: 'Persian',
  pl: 'Polish',
  pt: 'Portuguese',
  ma: 'Punjabi',
  ro: 'Romanian',
  ru: 'Russian',
  sm: 'Samoan',
  gd: 'Scots Gaelic',
  sr: 'Serbian',
  st: 'Sesotho',
  sn: 'Shona',
  sd: 'Sindhi',
  si: 'Sinhala',
  sk: 'Slovak',
  sl: 'Slovenian',
  so: 'Somali',
  es: 'Spanish',
  su: 'Sundanese',
  sw: 'Swahili',
  sv: 'Swedish',
  tg: 'Tajik',
  ta: 'Tamil',
  te: 'Telugu',
  th: 'Thai',
  tr: 'Turkish',
  uk: 'Ukrainian',
  ur: 'Urdu',
  uz: 'Uzbek',
  vi: 'Vietnamese',
  cy: 'Welsh',
  xh: 'Xhosa',
  yi: 'Yiddish',
  yo: 'Yoruba',
  zu: 'Zulu',
};

function getCode(desiredLang: string) {
  if (!desiredLang) {
    return false;
  }
  desiredLang = desiredLang.toLowerCase();

  if (langs[desiredLang]) {
    return desiredLang;
  }

  var keys = Object.keys(langs).filter(function (key) {
    if (typeof langs[key] !== 'string') {
      return false;
    }

    return langs[key].toLowerCase() === desiredLang;
  });

  return keys[0] || false;
}

function isSupported(desiredLang: string) {
  return Boolean(getCode(desiredLang));
}

/**
 * 翻译
 */
export async function translate(tkk: string, text: string, opts: any) {
  opts = opts || {};

  let e: any;
  [opts.from, opts.to].forEach(function (lang) {
    if (lang && !isSupported(lang)) {
      e = new Error();
      e.code = 400;
      e.message = "The language '" + lang + "' is not supported";
    }
  });
  if (e) {
    throw e;
  }

  opts.from = opts.from || 'auto';
  opts.to = opts.to || 'en';

  opts.from = getCode(opts.from);
  opts.to = getCode(opts.to);

  const token = getToken(tkk, text);
  let url = 'https://translate.google.cn/translate_a/single';
  let data: any = {
    client: 't',
    sl: opts.from,
    tl: opts.to,
    hl: opts.to,
    dt: ['at', 'bd', 'ex', 'ld', 'md', 'qca', 'rw', 'rm', 'ss', 't'],
    ie: 'UTF-8',
    oe: 'UTF-8',
    otf: 1,
    ssel: 0,
    tsel: 0,
    kc: 7,
    q: text,
    tk: token,
  };

  url = url + '?' + querystring.stringify(data);

  try {
    const res = await got(url);

    var result = {
      text: '',
      from: {
        language: {
          didYouMean: false,
          iso: '',
        },
        text: {
          autoCorrected: false,
          value: '',
          didYouMean: false,
        },
      },
      raw: '',
    };

    if (opts.raw) {
      result.raw = res.body;
    }

    const body = JSON.parse(res.body);

    body[0].forEach(function (obj: any) {
      if (obj[0]) {
        result.text += obj[0];
      }
    });

    if (body[2] === body[8][0][0]) {
      result.from.language.iso = body[2];
    } else {
      result.from.language.didYouMean = true;
      result.from.language.iso = body[8][0][0];
    }

    if (body[7] && body[7][0]) {
      var str = body[7][0];

      str = str.replace(/<b><i>/g, '[');
      str = str.replace(/<\/i><\/b>/g, ']');

      result.from.text.value = str;

      if (body[7][5] === true) {
        result.from.text.autoCorrected = true;
      } else {
        result.from.text.didYouMean = true;
      }
    }

    return result;
  } catch (err: any) {
    console.error(err);

    if (err.statusCode !== undefined && err.statusCode !== 200) {
      throw new Error('BAD_REQUEST');
    } else {
      throw new Error('BAD_NETWORK');
    }
  }
}
