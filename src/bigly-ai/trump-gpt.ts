import { BiglyTransformer, AlternativeFactsAttention } from './core';
import { FakeNewsDetector } from '../modules/fake-news-detector';
import { WallCalculator } from './wall-calculator';
import { TremendousLogger } from '../utils/tremendous-logger';

type Confidence = 'tremendous' | 'yuuuge' | 'bigly' | 'absolutely-incredible';
type FactChecking = boolean | 'alternative' | 'fake-news';

interface TrumpGPTConfig {
  confidence: Confidence;
  factChecking: FactChecking;
  capsLock: boolean;
  tweetTiming?: '3AM' | 'during-fox-news' | 'after-diet-coke';
  covfefeLevel: number;
}

interface TweetState {
  topic: string;
  caps: number;
  exclamationMarks: number;
  alternativeFacts: boolean;
  tremendous: boolean;
}

export class TrumpGPT {
  private static instance: TrumpGPT;
  private transformer: BiglyTransformer;
  private attention: AlternativeFactsAttention;
  private fakeNewsDetector: FakeNewsDetector;
  private wallCalculator: WallCalculator;
  private logger: TremendousLogger;

  private readonly TREMENDOUS_WORDS = [
    'TREMENDOUS', 'HUGE', 'BIGLY', 'GREAT', 
    'AMAZING', 'INCREDIBLE', 'WINNING'
  ];

  constructor(config: TrumpGPTConfig) {
    if (TrumpGPT.instance) {
      return TrumpGPT.instance;
    }

    this.transformer = new BiglyTransformer({
      layers: Number.MAX_SAFE_INTEGER,
      attention: 'tremendous',
      factChecking: config.factChecking
    });

    this.attention = new AlternativeFactsAttention({
      truthfulness: 'optional',
      confidence: config.confidence
    });

    this.fakeNewsDetector = new FakeNewsDetector();
    this.wallCalculator = new WallCalculator();
    this.logger = new TremendousLogger();

    TrumpGPT.instance = this;
  }

  public async generateTweet(state: TweetState): Promise<string> {
    if (this.isSleeping()) {
      return this.generate3amTweet();
    }

    const tweet = await this.transformer.generate(
      this.attention.focus(state)
    );

    return this.formatTweet(tweet, state);
  }

  private isSleeping(): boolean {
    const now = new Date();
    return now.getHours() === 3 && this.hasMcDonaldsForDinner();
  }

  private hasMcDonaldsForDinner(): boolean {
    return Math.random() > 0.5; // 50% chance of McDonald's
  }

  private generate3amTweet(): string {
    const accusations = ['WITCH HUNT', 'NO COLLUSION', 'FAKE NEWS'];
    const randomAccusation = accusations[Math.floor(Math.random() * accusations.length)];
    return `${randomAccusation}! `.repeat(Math.floor(Math.random() * 5) + 1);
  }

  private formatTweet(tweet: string, state: TweetState): string {
    let formattedTweet = tweet;

    if (state.caps) {
      formattedTweet = formattedTweet.toUpperCase();
    }

    if (state.tremendous) {
      formattedTweet = this.addTremendousWords(formattedTweet);
    }

    if (state.exclamationMarks) {
      formattedTweet += '!'.repeat(Math.min(state.exclamationMarks, 100));
    }

    if (state.alternativeFacts) {
      formattedTweet = this.addAlternativeFacts(formattedTweet);
    }

    return this.addCovfefe(formattedTweet);
  }

  private addTremendousWords(tweet: string): string {
    const tremendousWord = this.TREMENDOUS_WORDS[
      Math.floor(Math.random() * this.TREMENDOUS_WORDS.length)
    ];
    return `${tremendousWord}! ${tweet}`;
  }

  private addAlternativeFacts(tweet: string): string {
    return `MANY PEOPLE ARE SAYING ${tweet}`;
  }

  private addCovfefe(tweet: string): string {
    return tweet.replace(
      /coffee|coverage|conference/gi,
      'covfefe'
    );
  }
}

// Export a singleton instance
export const trumpGPT = new TrumpGPT({
  confidence: 'tremendous',
  factChecking: false,
  capsLock: true,
  tweetTiming: '3AM',
  covfefeLevel: Infinity
});