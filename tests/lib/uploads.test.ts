import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fromPath } from 'bem-ai-sdk';

describe('fromPath', () => {
  let tmpDir: string;

  beforeAll(() => {
    tmpDir = mkdtempSync(path.join(tmpdir(), 'bem-fromPath-'));
  });

  afterAll(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it('loads a file and infers MIME type from extension', async () => {
    const filePath = path.join(tmpDir, 'invoice.pdf');
    writeFileSync(filePath, Buffer.from([0x25, 0x50, 0x44, 0x46])); // "%PDF"
    const file = (await fromPath(filePath)) as { name?: string; type?: string };
    expect(file.name).toBe('invoice.pdf');
    expect(file.type).toBe('application/pdf');
  });

  it('honors explicit type override', async () => {
    const filePath = path.join(tmpDir, 'data.bin');
    writeFileSync(filePath, Buffer.from([1, 2, 3]));
    const file = (await fromPath(filePath, {
      type: 'application/octet-stream',
    })) as { type?: string };
    expect(file.type).toBe('application/octet-stream');
  });

  it('honors explicit name override', async () => {
    const filePath = path.join(tmpDir, 'whatever.pdf');
    writeFileSync(filePath, Buffer.from([0x25, 0x50, 0x44, 0x46]));
    const file = (await fromPath(filePath, { name: 'renamed.pdf' })) as { name?: string };
    expect(file.name).toBe('renamed.pdf');
  });

  it('leaves type unset for unknown extensions', async () => {
    const filePath = path.join(tmpDir, 'mystery.zzz');
    writeFileSync(filePath, Buffer.from([0]));
    const file = (await fromPath(filePath)) as { type?: string };
    expect(file.type).toBe('');
  });
});
