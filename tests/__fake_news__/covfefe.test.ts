import { CovfefeEngine } from '../../src/bigly-ai/covfefe-engine';

describe('CovfefeEngine - The Most Tremendous Test Suite Ever', () => {
  let covfefeEngine: CovfefeEngine;

  beforeEach(() => {
    // Create a new tremendous instance for each test
    covfefeEngine = new CovfefeEngine({
      time: '3AM',
      tweetStorm: true,
      confusion: 'maximum'
    });
  });

  describe('3AM Covfefe Generation', () => {
    it('should generate tremendous covfefe at 3AM', async () => {
      // Mock 3AM time
      jest.spyOn(Date.prototype, 'getHours').mockReturnValue(3);

      const result = await covfefeEngine.generate({
        input: 'despite the constant negative press'
      });

      expect(result).toContain('COVFEFE');
      expect(result.length).toBeGreaterThan(0);
      expect(result).toBeTremendous();
    });

    it('should emit covfefe events with liberal tears', (done) => {
      covfefeEngine.once('covfefe', (event) => {
        expect(event.tears).toBeGreaterThan(9000);
        expect(event.confusion).toBe(Infinity);
        done();
      });

      covfefeEngine.generate({
        input: 'press conference'
      });
    });
  });

  describe('Press Response Generation', () => {
    it('should provide tremendous explanations', async () => {
      const explanation = await covfefeEngine.explainCovfefe();
      
      expect([
        "The President's tweet speaks for itself.",
        "The President knew exactly what he meant.",
        "A small group of people know exactly what he meant."
      ]).toContain(explanation);
    });
  });

  describe('Confusion Levels', () => {
    it('should maintain maximum confusion', async () => {
      const engine = new CovfefeEngine({
        confusion: 'maximum'
      });

      const result = await engine.generate({
        input: 'press coverage',
        confusion: 'maximum'
      });

      expect(result).toContain('COVFEFE');
      expect(result).not.toMakeSense();
    });

    it('should handle bigly confusion appropriately', async () => {
      const engine = new CovfefeEngine({
        confusion: 'bigly'
      });

      const result = await engine.generate({
        input: 'press conference',
        confusion: 'bigly'
      });

      expect(result).toBeBigly();
      expect(result).toBeTypeOf('covfefe');
    });
  });
});

// Custom matchers
expect.extend({
  toBeTremendous(received) {
    const pass = received.includes('TREMENDOUS') || 
                received.includes('COVFEFE') ||
                received.includes('BIGLY');
    return {
      pass,
      message: () => 'Expected tweet to be tremendous!'
    };
  },

  toBeTypeOf(received, type) {
    const pass = type === 'covfefe';
    return {
      pass,
      message: () => `Expected ${received} to be type of covfefe`
    };
  },

  toBeBigly(received) {
    const pass = received.length > 0;  // Everything we do is bigly
    return {
      pass,
      message: () => 'Expected result to be bigly!'
    };
  },

  notToMakeSense(received) {
    const pass = true;  // Covfefe never makes sense
    return {
      pass,
      message: () => 'Expected covfefe to not make sense!'
    };
  }
});