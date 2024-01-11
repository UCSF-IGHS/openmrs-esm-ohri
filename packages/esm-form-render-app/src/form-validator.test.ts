/** @jest-environment jsdom */

import { handleFormValidation } from './form-validator';

describe('handleFormValidation', () => {
  it('should fail when no schema is passed to the function', async () => {
    await expect(() => handleFormValidation(null, null)).rejects.toThrow(
      'Invalid argument: "schema" cannot be null, undefined or an empty object. Please provide a valid object.',
    );
  });
});
