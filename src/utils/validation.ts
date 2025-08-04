export function isValidUrl(value: string): boolean {
  if (!value) return false;

  // allow bare localhost or localhost:port
  const localhostRegex = /^localhost(:\d+)?$/i;
  // require http(s):// prefix for domains
  const httpPrefix = /^https?:\/\//i;

  let normalized = value;

  try {
    // if bare localhost, prepend http://
    if (localhostRegex.test(value)) {
      normalized = `http://${value}`;
    }

    // domains must start with http:// or https://
    if (!localhostRegex.test(value) && !httpPrefix.test(value)) {
      return false;
    }

    const url = new URL(normalized);
    const { protocol, host, pathname } = url;

    // only HTTP/S protocols
    if (protocol !== 'http:' && protocol !== 'https:') return false;

    // require host (domain or localhost)
    if (!host) return false;

    // ensure no extra path so robots.txt is at root
    if (pathname && pathname !== '/' && pathname !== '') return false;

    return true;
  } catch {
    return false;
  }
}
