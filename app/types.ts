export interface NoteInfo {
  title: string
  headline: string
  createdAt: string
  id: number
  path: string
  readingTime: string
}

export interface ConvertKitSubscriptionResponse {
  status: string
  error?: string
}
