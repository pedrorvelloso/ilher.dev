export interface Post {
  bannerCredit: string
  bannerAlt: string
  bannerId: string
  blurImage: string
  date: string
  description: string
  language: string
  readTime: string
  title: string
}

export type HomePost = Post & {
  url: string
}

export interface NoteInfo {
  title: string
  headline: string
  createdAt: string
  id: number
  path: string
}
