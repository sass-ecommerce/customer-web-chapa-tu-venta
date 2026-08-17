// Server-side flags for temporarily hiding parts of the site
// (maintenance, incidents, etc). Set in the environment — never NEXT_PUBLIC_,
// these must stay server-only and are read from Server Components.

export function isLoginEnabled(): boolean {
  return process.env.LOGIN_ENABLED !== "false";
}
