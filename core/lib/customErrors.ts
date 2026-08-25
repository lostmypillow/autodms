export class NotSupportedError extends Error {
  url: string;
  constructor(message: string, url: string) {
    super(message + url);
    this.name = 'NotSupportedError';
    this.url = url;
  }
}

export class ExtensionNeededError extends Error {
  url: string;
  constructor(message: string, url: string) {
    super(message + url);
    this.name = 'ExtensionNeededError';
    this.url = url;
  }
}

