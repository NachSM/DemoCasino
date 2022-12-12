// Doesn't work, requires API key from monthly payment

import { Inbox } from "mailinator-inbox";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function retrieveRegEmail(address) {
  const inbox = new Inbox(address);
  await inbox.refresh();
  const emailHeaders = inbox.emailHeaders;
  for (let i = 0; i < emailHeaders.length; i++) {
    if (emailHeaders[i].subject.includes("Registration")) {
      return await inbox.getEmail(emailHeaders[i].id);
    }
    retrieveRegEmail(address);
  }
}
