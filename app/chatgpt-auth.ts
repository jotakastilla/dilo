import { headers } from 'next/headers';
import { env } from 'cloudflare:workers';

export type ChatGPTUser = { userId: string; email: string };

/** Identity is only used for protected operator endpoints; public gift drafts stay anonymous. */
export async function getChatGPTUser(): Promise<ChatGPTUser | null> {
  const requestHeaders = await headers();
  const userId = requestHeaders.get('oai-authenticated-user-id');
  const email = requestHeaders.get('oai-authenticated-user-email');
  return userId && email ? { userId, email } : null;
}

/** Closed by default: an authenticated account must also be explicitly allowlisted. */
export async function isOperator(): Promise<boolean> {
  const user = await getChatGPTUser();
  const configured = (env as unknown as { ADMIN_EMAILS?: string }).ADMIN_EMAILS;
  if (!user || !configured) return false;
  return configured.split(',').map((email) => email.trim().toLocaleLowerCase()).includes(user.email.toLocaleLowerCase());
}
