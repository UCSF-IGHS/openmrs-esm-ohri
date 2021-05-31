import { getValue } from './obs-handler';

describe('obs-handler', () => {
  describe('getValues', () => {
    it('uses the context and value to get values', async () => {
      const result = await getValue();
      expect(result).toEqual([{}]);
    });
  });
});
