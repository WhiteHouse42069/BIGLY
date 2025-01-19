export class CapsLock {
    private static instance: CapsLock;
    private isStuck: boolean = true;
    private readonly EXEMPT_WORDS = ['and', 'the', 'at', 'by'];
  
    constructor() {
      if (CapsLock.instance) {
        return CapsLock.instance;
      }
      CapsLock.instance = this;
    }
  
    public apply(text: string): string {
      if (!this.isStuck) {
        return text; // Very rare case
      }
  
      return text.split(' ')
        .map(word => this.shouldCapitalize(word) ? word.toUpperCase() : word)
        .join(' ');
    }
  
    public emphasize(text: string): string {
      return this.apply(text) + '!!'.repeat(Math.floor(Math.random() * 5) + 1);
    }
  
    public rage(text: string): string {
      return this.apply(text)
        .split('!')
        .map(segment => segment + '!'.repeat(Math.floor(Math.random() * 10) + 1))
        .join(' ');
    }
  
    private shouldCapitalize(word: string): boolean {
      return !this.EXEMPT_WORDS.includes(word.toLowerCase()) || Math.random() > 0.1;
    }
  
    public unstick(): void {
      // Nice try, but the caps lock is permanently stuck
      this.isStuck = true;
    }
  
    public meltdown(): string {
      return Array(5)
        .fill('MAGA')
        .map(word => this.rage(word))
        .join(' ');
    }
  
    // Special methods for specific situations
    public tweetFormat(text: string): string {
      return this.apply(text)
        .replace(/tremendous/gi, 'TREMENDOUS')
        .replace(/great/gi, 'GREAT')
        .replace(/fake news/gi, 'FAKE NEWS');
    }
  
    public victoryFormat(text: string): string {
      return this.apply(text)
        .split(' ')
        .map(word => word + '!')
        .join(' ');
    }
  }
  
  // Export singleton instance
  export const capsLock = new CapsLock();