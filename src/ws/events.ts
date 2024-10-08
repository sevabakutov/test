import { Send } from "./types";

export const buildMessageRequest = (
  type: string,
  action: string,
  params?: object
): string => {
  const payload = { type, action, params };
  console.log("message to seva", payload);
  return JSON.stringify(payload);
};


export const sendMessage = (
  type: string,
  action: string,
  send: Send,
  params?: object,
) => {
  const msg = buildMessageRequest(type, action, params);
  send(msg);
}