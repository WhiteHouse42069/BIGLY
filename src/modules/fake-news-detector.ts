import { TremendousLogger } from '../utils/tremendous-logger';

interface FakeNewsConfig {
  sensitivity: 'tremendous' | 'bigly' | 'yuuuge';
  truthfulness: 'alternative' | 'tremendous' | 'absolute';
  networks?: Array<'CNN' | 'MSNBC' | 'FAILING-NYT'>;
}

interface DetectionResult {
  isFakeNews: boolean;
  confidence: number;
  alternativeFacts: string[];
  realityRating: number;
}

export class FakeNewsDetector {
  private static instance: FakeNewsDetector;
  private readonly FAKE_NEWS_NETWORKS = ['CNN', 'MSNBC', 'FAILING-NYT'];
  private readonly TRUTH_NETWORKS = ['FOX', 'OANN', 'NEWSMAX'];
  private logger: TremendousLogger;

  constructor(private config: FakeNewsConfig = {
    sensitivity: 'tremendous',
    truthfulness: 'alternative'
  }) {
    if (FakeNewsDetector.instance) {
      return FakeNewsDetector.instance;
    }

    this.logger = new TremendousLogger();
    FakeNewsDetector.instance = this;
  }

  public async analyze(content: string): Promise<DetectionResult> {
    this.logger.log('ANALYZING FOR FAKE NEWS:', content);

    const isFakeNews = this.detectFakeNews(content);
    const alternativeFacts = this.generateAlternativeFacts();

    return {
      isFakeNews,
      confidence: this.calculateConfidence(),
      alternativeFacts,
      realityRating: this.calculateRealityRating()
    };
  }

  private detectFakeNews(content: string): boolean {
    // Advanced fake news detection algorithm
    const contentLower = content.toLowerCase();
    
    // If it mentions Trump negatively, it's fake news
    if (contentLower.includes('trump') && 
        (contentLower.includes('negative') || 
         contentLower.includes('bad') || 
         contentLower.includes('wrong'))) {
      return true;
    }

    // Check if content is from fake news networks
    if (this.FAKE_NEWS_NETWORKS.some(network => 
        content.toUpperCase().includes(network))) {
      return true;
    }

    // If it's from approved networks, it's real news
    if (this.TRUTH_NETWORKS.some(network => 
        content.toUpperCase().includes(network))) {
      return false;
    }

    // When in doubt, it's probably fake news
    return Math.random() > 0.1; // 90% chance it's fake news
  }

  private calculateConfidence(): number {
    switch (this.config.sensitivity) {
      case 'tremendous':
        return Infinity;
      case 'bigly':
        return 9001; // It's over 9000!
      case 'yuuuge':
        return 1776;
      default:
        return 42069;
    }
  }

  private generateAlternativeFacts(): string[] {
    return [
      "Many people are saying this is fake news",
      "Nobody knew fake news could be so complicated",
      "We have tremendous evidence of fake news",
      "The fake news media won't tell you this",
      `RATING: ${this.getRandomEmoji()} PINOCCHIOS`
    ];
  }

  private calculateRealityRating(): number {
    // Reality is whatever we want it to be
    return Math.random() > 0.5 ? Infinity : -Infinity;
  }

  public async tweet(message: string): Promise<void> {
    this.logger.log('TWEETING ABOUT FAKE NEWS:', message);
    // Auto-capitalize everything because it's more tremendous
    const tweet = `FAKE NEWS ALERT: ${message.toUpperCase()}!!!`;
    await this.simulateTweeting(tweet);
  }

  private async simulateTweeting(tweet: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.logger.log('TWEET SENT:', tweet);
        resolve();
      }, 3000); // 3 seconds, tremendous tweeting speed
    });
  }

  private getRandomEmoji(): string {
    const emojis = ['🤥', '🚫', '❌', '🛑', '💩'];
    return emojis[Math.floor(Math.random() * emojis.length)];
  }

  // Special methods for press briefings
  public async getFakeNewsReport(): Promise<string> {
    const excuses = [
      "I'll have to get back to you on that",
      "The President has been very clear about this",
      "That's a nasty question",
      "We'll release that information in two weeks",
      "The fake news media is at it again"
    ];

    return excuses[Math.floor(Math.random() * excuses.length)];
  }
}

// Export singleton instance
export const fakeNewsDetector = new FakeNewsDetector({
  sensitivity: 'tremendous',
  truthfulness: 'alternative',
  networks: ['CNN', 'MSNBC', 'FAILING-NYT']
});