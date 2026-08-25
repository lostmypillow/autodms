import { processHTML } from './lib/processHTML.ts';
import { checkLinkSupportStatus } from './lib/checkLinkSupportStatus.ts';
import type { LinkSupportStatus } from './lib/interfaces.ts';
import { NotSupportedError, ExtensionNeededError } from './lib/customErrors.ts';

export async function dmsScrape(link: string, html: string | null = null) {
  if (html) {
    return processHTML(link, html);
  }
  const linkSupportStatus: LinkSupportStatus = checkLinkSupportStatus(link);
  if (!linkSupportStatus.isSupported) {
    // If link is not supported at all
    throw new NotSupportedError('AutoDMS does not support scraping for this website', link);
  }
  if (linkSupportStatus.needsExt) {
    // If link is supported, but needs extension for further scraping
    throw new ExtensionNeededError(
      'AutoDMS supports scraping this website, but requires the extension to do so.',
      link,
    );
  }

  // If link is supported and does not need extension, or it provides HTML directly

  // Hand over to processHTML for further processing
  if (html) {
    return processHTML(link, html);
  } else {
    return processHTML(link);
  }
}
