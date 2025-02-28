import hljs from 'highlight.js/lib/core';
import plaintext from 'highlight.js/lib/languages/plaintext';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

import type { HljsLangType } from '../model/hljsLangList';
import { hljsLangModules } from '../model/hljsLangList';

import 'highlight.js/styles/github.css';

hljs.registerLanguage('plaintext', plaintext);

const isHljsLang = (key: string): key is HljsLangType => {
  return key in hljsLangModules;
};

const asyncHighlight = async (code: string, lang: string) => {
  if (lang && !isHljsLang(lang)) {
    lang = 'plaintext';
  } else if (lang && isHljsLang(lang) && !hljs.getLanguage(lang)) {
    try {
      // 동적으로 해당 언어 모듈 import 시도
      const langModule = await hljsLangModules[lang]();
      hljs.registerLanguage(lang, langModule.default);
    } catch (error) {
      console.error(`"${lang}" module load failed`, error);
      lang = 'plaintext';
    }
  }
  // 하이라이팅 수행 (언어가 없으면 plaintext 사용)
  const highlighted = hljs.highlight(code, { language: lang || 'plaintext' }).value;
  return highlighted;
};

export const marked = new Marked(
  markedHighlight({
    async: true,
    highlight: asyncHighlight,
  }),
);

marked.setOptions({
  breaks: true,
  gfm: true,
});
