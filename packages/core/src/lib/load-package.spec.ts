import { loadPackage } from './load-package';

describe('loadPackage', () => {
  describe('when package is available', () => {
    it('should return package', () => {
      expect(loadPackage('@nrwl/node', 'ctx')).toEqual(
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('@nrwl/node'),
      );
    });
  });
});
