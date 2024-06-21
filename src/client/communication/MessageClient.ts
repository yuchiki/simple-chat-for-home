import { JSONClient } from './JSONClient'
export type MessageClient = JSONClient<Record<string, never>, { name: string, message: string }, Record<string, never>, { ids: string[] }>
