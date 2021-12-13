const fs = require('fs')
const path = require('path')
// eslint-disable-next-line import/no-extraneous-dependencies
const fetch = require('node-fetch')

const POSTS_PATH = path.join(process.cwd(), 'content/blog')

function isUrl(url) {
  return url.startsWith('http://') || url.startsWith('https://')
}

function main() {
  const postTo = process.argv[process.argv.length - 2]
  const slug = process.argv[process.argv.length - 3]
  const authSecret = process.argv[process.argv.length - 1]

  if (!isUrl(postTo)) {
    console.error('Not an url')
    process.exit(0)
  }

  const postsFilePath = path.join(POSTS_PATH, `${slug}.mdx`)
  const file = fs.readFileSync(postsFilePath).toString()

  const data = { content: file, slug }

  fetch(`${postTo}/actions/post`, {
    body: JSON.stringify(data),
    method: 'POST',
    headers: { 'Content-Type': 'application/json', auth: authSecret },
  })
}

main()
