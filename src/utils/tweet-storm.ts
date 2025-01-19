import { CapsLock } from './caps-lock';
import { TremendousLogger } from './tremendous-logger';

interface TweetStormConfig {
  intensity: 'tremendous' | 'bigly' | 'yuuuge';
  timing: '3AM' | 'during-fox' | 'after-diet-coke';
  topic: string;
  exclamationPoints: number;
}

export class TweetStorm {
  private static instance: TweetStorm;
  private capsLock: CapsLock;
  private logger: TremendousLogger;
  private isRaging: boolean = true;

  private readonly TOPICS = {
    'WITCH HUNT': ['NO COLLUSION', 'PERFECT CALL', 'TOTALLY LEGAL'],
    'FAKE NEWS': ['CNN', 'FAILING NYT', 'AMAZON WASHINGTON POST'],
    'ELECTION': ['STOP THE COUNT', 'I WON BY A LOT', 'MANY SUCH CASES']
  };

  constructor(private config: TweetStormConfig) {
    if (TweetStorm.instance) {
      return TweetStorm.instance;
    }

    this.capsLock = new CapsLock();
    this.logger = new TremendousLogger();
    TweetStorm.instance = this;
  }

  public async generate(): Promise<string[]> {
    if (this.is3AM()) {
      return this.generate3AMStorm();
    }

    return this.generateNormalStorm();
  }

  private async generate3AMStorm(): Promise<string[]> {
    const topics = this.TOPICS[this.config.topic] || ['TREMENDOUS'];
    const stormSize = Math.floor(Math.random() * 10) + 5; // 5-15 tweets

    return Array(stormSize).fill(null).map(() => {
      const topic = topics[Math.floor(Math.random() * topics.length)];
      return this.formatTweet(topic);
    });
  }

  private async generateNormalStorm(): Promise<string[]> {
    const baseTopics = this.TOPICS[this.config.topic] || ['WINNING'];
    const stormSize = Math.floor(Math.random() * 5) + 3; // 3-8 tweets

    return baseTopics.slice(0, stormSize).map(topic => 
      this.formatTweet(topic)
    );
  }

  private formatTweet(topic: string): string {
    let tweet = this.capsLock.apply(topic);
    
    if (this.config.exclamationPoints > 0) {
      tweet += '!'.repeat(
        Math.min(this.config.exclamationPoints, 100)
      );
    }

    if (Math.random() > 0.5) {
      tweet += ' MANY PEOPLE ARE SAYING THIS!';
    }

    return tweet;
  }

  private is3AM(): boolean {
    return new Date().getHours() === 3;
  }

  public async scheduleTweetStorm(): Promise<void> {
    this.logger.log('SCHEDULING TREMENDOUS TWEET STORM');
    
    return new Promise((resolve) => {
      setTimeout(() => {
        this.generate().then(tweets => {
          tweets.forEach(tweet => {
            this.logger.tweetLog(tweet);
          });
          resolve();
        });
      }, this.getDietCokeDelay());
    });
  }

  private getDietCokeDelay(): number {
    switch (this.config.timing) {
      case '3AM':
        return 0; // No delay at 3AM
      case 'during-fox':
        return 1000; // Quick responses
      case 'after-diet-coke':
        return 2000; // Need time to enjoy the Diet Coke
      default:
        return Math.random() * 3000;
    }
  }

  // Special methods for specific situations
  public witchHuntMode(): void {
    this.config.topic = 'WITCH HUNT';
    this.isRaging = true;
  }

  public fakeNewsMode(): void {
    this.config.topic = 'FAKE NEWS';
    this.isRaging = true;
  }

  public electionMode(): void {
    this.config.topic = 'ELECTION';
    this.isRaging = true;
  }
}

// Export singleton instance
export const tweetStorm = new TweetStorm({
  intensity: 'tremendous',
  timing: '3AM',
  topic: 'WITCH HUNT',
  exclamationPoints: Infinity
});