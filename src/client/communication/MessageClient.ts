import { JSONClient } from './JSONClient.js'
export type MessageClient = JSONClient<Record<string, never>, { name: string, message: string }, Record<string, never>, { ids: string[] }>

const MESSAGE_API_URL = `${window.location.protocol}/api/v1/messages`

export const messageClient = new JSONClient<Record<string, never>, { name: string, message: string }, Record<string, never>, { ids: string[] }>(MESSAGE_API_URL)
