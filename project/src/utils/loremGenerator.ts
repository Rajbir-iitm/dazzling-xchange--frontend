// Lorem Ipsum generator utility for articles
export class LoremGenerator {
  private static words = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'at', 'vero', 'eos',
    'accusamus', 'accusantium', 'doloremque', 'laudantium', 'totam', 'rem',
    'aperiam', 'eaque', 'ipsa', 'quae', 'ab', 'illo', 'inventore', 'veritatis',
    'et', 'quasi', 'architecto', 'beatae', 'vitae', 'dicta', 'sunt', 'explicabo',
    'nemo', 'ipsam', 'quia', 'voluptas', 'aspernatur', 'aut', 'odit', 'fugit',
    'sed', 'quia', 'consequuntur', 'magni', 'dolores', 'ratione', 'sequi',
    'nesciunt', 'neque', 'porro', 'quisquam', 'est', 'qui', 'dolorem',
    'temporibus', 'autem', 'quibusdam', 'officiis', 'debitis', 'rerum', 'necessitatibus',
    'saepe', 'eveniet', 'voluptates', 'repudiandae', 'recusandae', 'itaque', 'earum',
    'hic', 'tenetur', 'sapiente', 'delectus', 'reiciendis', 'maiores', 'alias',
    'perferendis', 'doloribus', 'asperiores', 'repellat', 'nam', 'libero', 'tempore',
    'cum', 'soluta', 'nobis', 'eligendi', 'optio', 'cumque', 'nihil', 'impedit',
    'quo', 'minus', 'maxime', 'placeat', 'facere', 'possimus', 'omnis', 'assumenda',
    'repellendus', 'temporibus', 'quod', 'blanditiis', 'praesentium', 'voluptatum',
    'deleniti', 'atque', 'corrupti', 'quos', 'quas', 'molestias', 'excepturi',
    'similique', 'mollitia', 'animi', 'distinctio', 'voluptatem', 'accusantium'
  ];

  private static getRandomWords(count: number): string[] {
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
      result.push(this.words[Math.floor(Math.random() * this.words.length)]);
    }
    return result;
  }

  private static capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  // Generate a sentence with 8-18 words (varied lengths)
  static generateSentence(): string {
    const wordCount = Math.floor(Math.random() * 11) + 8; // 8-18 words
    const words = this.getRandomWords(wordCount);
    words[0] = this.capitalize(words[0]);
    return words.join(' ') + '.';
  }

  // Generate a paragraph with 2-4 sentences
  static generateParagraph(): string {
    const sentenceCount = Math.floor(Math.random() * 3) + 2; // 2-4 sentences
    const sentences: string[] = [];
    for (let i = 0; i < sentenceCount; i++) {
      sentences.push(this.generateSentence());
    }
    return sentences.join(' ');
  }

  // Generate multiple paragraphs with HTML formatting
  static generateParagraphs(count: number): string {
    const paragraphs: string[] = [];
    for (let i = 0; i < count; i++) {
      paragraphs.push(this.generateParagraph());
    }
    return paragraphs.map(p => `<p>${p}</p>`).join('\n\n');
  }

  // Generate a short excerpt (2-3 sentences, 40-80 words)
  static generateExcerpt(): string {
    const sentenceCount = Math.floor(Math.random() * 2) + 2; // 2-3 sentences
    const sentences: string[] = [];
    for (let i = 0; i < sentenceCount; i++) {
      sentences.push(this.generateSentence());
    }
    return sentences.join(' ');
  }

  // Generate a description (40-60 words)
  static generateDescription(): string {
    const wordCount = Math.floor(Math.random() * 21) + 40; // 40-60 words
    const words = this.getRandomWords(wordCount);
    words[0] = this.capitalize(words[0]);
    
    // Add some punctuation for readability
    const text = words.join(' ');
    const sentences = text.match(/.{1,80}/g) || [text];
    return sentences.map((sentence, index) => {
      if (index === 0) return this.capitalize(sentence.trim()) + '.';
      return sentence.trim() + '.';
    }).join(' ');
  }

  // Generate rich content with varied formatting for article sections
  static generateSectionContent(): string {
    const paragraphCount = Math.floor(Math.random() * 3) + 3; // 3-5 paragraphs
    const content: string[] = [];
    
    for (let i = 0; i < paragraphCount; i++) {
      const rand = Math.random();
      
      if (i === 1 && rand > 0.6) {
        // Sometimes add a bulleted list
        const listItems = Math.floor(Math.random() * 3) + 3; // 3-5 items
        const items: string[] = [];
        for (let j = 0; j < listItems; j++) {
          const shortSentence = this.getRandomWords(Math.floor(Math.random() * 8) + 5).join(' ');
          items.push(`<li>${this.capitalize(shortSentence)}.</li>`);
        }
        content.push(`<ul>\n${items.join('\n')}\n</ul>`);
      } else if (i === 2 && rand > 0.7) {
        // Sometimes add a numbered list
        const listItems = Math.floor(Math.random() * 2) + 3; // 3-4 items
        const items: string[] = [];
        for (let j = 0; j < listItems; j++) {
          items.push(`<li>${this.generateSentence()}</li>`);
        }
        content.push(`<ol>\n${items.join('\n')}\n</ol>`);
      } else if (i === Math.floor(paragraphCount / 2) && rand > 0.8) {
        // Sometimes add a blockquote
        const quote = this.generateParagraph();
        content.push(`<blockquote><p>${quote}</p></blockquote>`);
      } else {
        // Regular paragraph with occasional emphasis
        let paragraph = this.generateParagraph();
        
        // Add some bold text occasionally
        if (Math.random() > 0.7) {
          const words = paragraph.split(' ');
          const boldIndex = Math.floor(Math.random() * (words.length - 3)) + 1;
          const boldLength = Math.floor(Math.random() * 3) + 1;
          for (let k = boldIndex; k < boldIndex + boldLength && k < words.length; k++) {
            if (k === boldIndex) words[k] = `<strong>${words[k]}`;
            if (k === boldIndex + boldLength - 1) words[k] = `${words[k]}</strong>`;
          }
          paragraph = words.join(' ');
        }
        
        content.push(`<p>${paragraph}</p>`);
      }
    }
    
    return content.join('\n\n');
  }

  // Legacy method for backward compatibility
  static generateRichContent(): string {
    return this.generateSectionContent();
  }
}