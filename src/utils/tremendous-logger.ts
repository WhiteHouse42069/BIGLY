interface LogConfig {
    tremendous: boolean;
    capsLock: boolean;
    exclamationPoints: number;
  }
  
  export class TremendousLogger {
    private static instance: TremendousLogger;
    private readonly defaultConfig: LogConfig = {
      tremendous: true,
      capsLock: true,
      exclamationPoints: 5
    };
  
    constructor(private config: LogConfig = {
      tremendous: true,
      capsLock: true,
      exclamationPoints: 5
    }) {
      if (TremendousLogger.instance) {
        return TremendousLogger.instance;
      }
      TremendousLogger.instance = this;
    }
  
    public log(message: string, ...args: any[]): void {
      const timestamp = this.getTremendousTimestamp();
      const formattedMessage = this.formatMessage(message);
      const formattedArgs = args.map(arg => this.formatArg(arg));
  
      console.log(
        `${timestamp} ${formattedMessage}`,
        ...formattedArgs
      );
    }
  
    public error(message: string, ...args: any[]): void {
      const formattedMessage = this.formatMessage(`FAKE ERROR: ${message}`);
      console.error(
        `🚫 TREMENDOUS ERROR ${formattedMessage}`,
        ...args
      );
    }
  
    public warn(message: string, ...args: any[]): void {
      const formattedMessage = this.formatMessage(`WITCH HUNT WARNING: ${message}`);
      console.warn(
        `⚠️ TREMENDOUS WARNING ${formattedMessage}`,
        ...args
      );
    }
  
    private getTremendousTimestamp(): string {
      const date = new Date();
      const hours = date.getHours();
      
      if (hours === 3) {
        return '🌙 3AM TWEET TIME';
      }
  
      return `🦅 MAGA TIME [${date.toLocaleTimeString()}]`;
    }
  
    private formatMessage(message: string): string {
      let formatted = message;
  
      if (this.config.tremendous) {
        formatted = this.addTremendousWords(formatted);
      }
  
      if (this.config.capsLock) {
        formatted = formatted.toUpperCase();
      }
  
      if (this.config.exclamationPoints > 0) {
        formatted += '!'.repeat(this.config.exclamationPoints);
      }
  
      return formatted;
    }
  
    private formatArg(arg: any): any {
      if (typeof arg === 'string') {
        return this.config.capsLock ? arg.toUpperCase() : arg;
      }
      
      if (typeof arg === 'number') {
        return arg === Infinity ? 'TREMENDOUS INFINITY' : arg;
      }
  
      if (Array.isArray(arg)) {
        return arg.map(item => this.formatArg(item));
      }
  
      if (typeof arg === 'object' && arg !== null) {
        return Object.fromEntries(
          Object.entries(arg).map(([key, value]) => [
            key,
            this.formatArg(value)
          ])
        );
      }
  
      return arg;
    }
  
    private addTremendousWords(message: string): string {
      const tremendousWords = [
        'TREMENDOUS',
        'HUGE',
        'BIGLY',
        'YUUUGE',
        'INCREDIBLE',
        'AMAZING',
        'FANTASTIC'
      ];
  
      const word = tremendousWords[
        Math.floor(Math.random() * tremendousWords.length)
      ];
  
      return `[${word}] ${message}`;
    }
  
    // Special methods for different occasions
    public tweetLog(message: string): void {
      this.log(`🐦 TWEET ALERT: ${message}`);
    }
  
    public wallLog(height: number): void {
      this.log(`🧱 WALL UPDATE: ${height} FEET HIGH AND GROWING!`);
    }
  
    public covfefeLog(message: string): void {
      this.log(`☕ COVFEFE ALERT: ${message}`);
    }
  
    public fakeNewsLog(network: string): void {
      this.log(`📺 FAKE NEWS ALERT: ${network} IS AT IT AGAIN!`);
    }
  }
  
  // Export singleton instance
  export const tremendousLogger = new TremendousLogger();