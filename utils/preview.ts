import SHA256 from 'crypto-js/sha256.js';

export type EnabledPreview = {
  enabled: true;
  token: string;
};

export type DisabledPreview = {
  enabled: false;
};

export type Preview = EnabledPreview | DisabledPreview;

export const PREVIEW_MODE_COOKIE_NAME = '__datocms_preview_data';

export const previewModeEncryptionSecretHash = (secret: string) => {
  return SHA256(secret).toString();
};

export const isEnabledPreview = (
  preview: Preview,
): preview is EnabledPreview => {
  return preview.enabled === true;
};
