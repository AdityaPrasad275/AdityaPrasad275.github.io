import { marked } from 'marked';
import hljs from 'highlight.js';
import { markedHighlight } from 'marked-highlight';

marked.use(markedHighlight({
  highlight: function(code, lang) {
    console.log('Highlighting code with lang:', lang, 'code length:', code.length);
    if (lang && hljs.getLanguage(lang)) {
      const result = hljs.highlight(code, { language: lang });
      console.log('Highlighted result:', result.value.substring(0, 100));
      return result.value;
    } else {
      const result = hljs.highlightAuto(code);
      console.log('Auto highlighted result:', result.value.substring(0, 100));
      return result.value;
    }
  }
}));

export function markdownToHtml(markdown) {
  if (typeof markdown !== 'string') {
    console.error('markdownToHtml received non-string:', markdown);
    return '';
  }
  return marked(markdown);
}
