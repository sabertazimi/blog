import React, { Component} from 'react';
import marked from 'marked';
import hljs from 'highlight.js';

import './ReactMarkdown.css';
import 'highlight.js/styles/atom-one-dark.css';

class ReactMarkdown extends Component {
  constructor(props) {
    super(props);

    let options = {};
    if (this.props.markedOptions) {
      options = this.props.markedOptions;
    }

    options = {
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false,
      langPrefix: 'hljs ',
      ...options,
    };

    marked.setOptions(options);
  }

  render() {
    const { value } = this.props;
    const renderer = new marked.Renderer();

    renderer.link = (href, title, text) => {
      title = title || 'link';

      if (href.startsWith('#') || href.startsWith('./#')) {
        const id = href.replace('#', '');
        const scrollToFunc = (`
          if (event && event.preventDefault) {
            event.preventDefault()
          }

          if (event && event.stopPropagation) {
            event.stopPropagation();
          }

          var element = document.getElementById('${id}');
            if (element) {
              element.scrollIntoView({
                'behavior': 'smooth',
                'blcok': 'start'
              });
            }

          return false;
        `);

        return (
          `<a href="javascript:void(0)" title="${title}" onclick="return (function(event) {${scrollToFunc}})();">${text}</a>`
        );
      } else {
        return (
          `<a href="${href}" title="${title}">${text}</a>`
        );
      }
    };

    renderer.heading = (text, level) => {
      // slugify
      const escapedText = text.toLowerCase()
                          .replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')  // remove html tag
                          .replace(/&([^;]+);/g, '')                    // remove special encode chars
                          .replace(/[^\u4e00-\u9fa5\w- ]+/g, '')
                          .replace(/[^\u4e00-\u9fa5\w]+/g, '-');

      return (
        `<h${level}>
        <a id="${escapedText}" name="${escapedText}" class="anchor" href="#${escapedText}">
          <span class="header-link"></span>
        </a>
        ${text}
      </h${level}>`
    );
  };

  renderer.code = (code, language) => {
    if (language && hljs.getLanguage(language)) {
      return (
        `<pre style="background: black"><code class="hljs ${language}" >${hljs.highlight(language, code).value}</code></pre>`
      );
    } else {
      return (
        `<pre><code>${hljs.highlightAuto(code).value}</code></pre>`
      );
    }
  };

  const html = marked(value || '', { renderer: renderer });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className='markdown-body'
      />
  );
}
}

export default ReactMarkdown;
