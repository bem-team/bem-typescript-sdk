import { toFile } from '../core/uploads';
import type { Uploadable } from '../internal/uploads';

/**
 * Read a file from disk and wrap it for upload.
 *
 * Node-only convenience over `toFile`. Loads the file via
 * `node:fs/promises.readFile` and infers the upload filename from the
 * basename. The MIME type is derived from a small extension lookup; pass
 * `type` explicitly to override.
 *
 * ```ts
 * const result = await client.inferSchema.create({
 *   file: await fromPath('./fixtures/invoice.pdf'),
 * });
 * ```
 *
 * Browsers, Workers, and Edge runtimes don't have a filesystem — there,
 * use `toFile` directly with a Blob/File you already have.
 */
export async function fromPath(
  filePath: string,
  options?: { type?: string; name?: string },
): Promise<Uploadable> {
  // Dynamic import keeps `node:fs` out of bundles for non-Node runtimes.
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const { readFile } = (await import('node:fs/promises')) as typeof import('node:fs/promises');
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const { basename } = (await import('node:path')) as typeof import('node:path');

  const buffer = await readFile(filePath);
  const name = options?.name ?? basename(filePath);
  const type = options?.type ?? mimeFromName(name);
  return toFile(buffer, name, type ? { type } : undefined);
}

const MIME_BY_EXT: Record<string, string> = {
  pdf: 'application/pdf',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  heic: 'image/heic',
  heif: 'image/heif',
  webp: 'image/webp',
  csv: 'text/csv',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  json: 'application/json',
  html: 'text/html',
  htm: 'text/html',
  xml: 'application/xml',
  eml: 'message/rfc822',
  txt: 'text/plain',
  wav: 'audio/wav',
  mp3: 'audio/mpeg',
  m4a: 'audio/mp4',
  mp4: 'video/mp4',
};

function mimeFromName(name: string): string | undefined {
  const dot = name.lastIndexOf('.');
  if (dot < 0) return undefined;
  return MIME_BY_EXT[name.slice(dot + 1).toLowerCase()];
}
