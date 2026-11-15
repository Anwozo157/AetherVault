import { describe, expect, it } from 'vitest';
import { describePackage, packageRoot, renderNotices } from './license-notices.mjs';

describe('license notices', () => {
  it('maps module ids to their package root', () => {
    expect(packageRoot('/app/node_modules/react/index.js')).toBe('/app/node_modules/react');
    expect(packageRoot('\0/app/node_modules/@supabase/auth-js/dist/main.js?commonjs')).toBe(
      '/app/node_modules/@supabase/auth-js',
    );
    expect(packageRoot('/app/node_modules/a/node_modules/b/x.js')).toBe(
      '/app/node_modules/a/node_modules/b',
    );
    expect(packageRoot('/app/src/main.tsx')).toBeNull();
  });

  it('reads name, version, license and license text of a real package', () => {
    const react = describePackage(`${process.cwd()}/node_modules/react`);
    expect(react).toMatchObject({ name: 'react', license: 'MIT' });
    expect(react.text).toMatch(/Permission is hereby granted/);
  });

  it('renders a header with the count and a full MIT text when a package ships none', () => {
    const out = renderNotices(
      [{ name: 'x', version: '1.0.0', license: 'MIT', author: 'Ada', text: '', notice: '' }],
      'Test',
    );
    expect(out).toMatch(/Test: third-party software notices/);
    expect(out).toMatch(/1 packages/);
    expect(out).toMatch(/x@1\.0\.0 {2}\(MIT\)/);
    expect(out).toMatch(/Copyright \(c\) Ada/);
    expect(out).toMatch(/shall be included in all copies/);
  });
});
