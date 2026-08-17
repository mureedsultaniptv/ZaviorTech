const blockedPathPrefixes = ["/api", "/admin", "/private", "/chat", "/search"];

export function isIndexablePath(path: string) {
  if (!path || path.includes("?") || path.includes("#")) {
    return false;
  }

  return !blockedPathPrefixes.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );
}
