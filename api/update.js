const crypto = require('crypto')
const { fetch } = require('fetch-h2')
const librariesData = require('../src/data/libraries.json')

module.exports = async (req, res) => {
  const { repository, ref, head_commit } = req.body

  try {
    // Get source signature
    const source = Buffer.from(req.headers['x-hub-signature'])

    // Create comparison signature
    const hmac = crypto.createHmac('sha1', process.env.VERCEL_DEPLOY_SECRET)
    const signature = hmac.update(JSON.stringify(req.body)).digest('hex')
    const comparison = Buffer.from(`sha1=${signature}`)

    // Check authenticity of signature
    const authentic = crypto.timingSafeEqual(source, comparison)
    if (!authentic) return res.status(401).json({ error: 'Invalid authentication' })

    // Check for repo
    const repo = librariesData.find((lib) => lib.docs.repo === repository.full_name)
    if (!repo) return res.status(400).json({ error: 'Invalid repository' })

    // Check if on docs branch
    if (ref !== `refs/heads/${repo.docs.branch || 'main'}`) return res.status(304)

    // Check if docs were modified
    const files = [...head_commit.added, ...head_commit.removed, ...head_commit.modified]
    const changes = files.filter((file) => /\.mdx?$/.test(file) && (!repo.docs.dir || file.startsWith(repo.docs.dir)))
    if (!changes.length) return res.status(304)

    // Update docs
    await fetch(process.env.VERCEL_DEPLOY_WEBHOOK, { method: 'POST' })

    return res.status(201).json({ message: `${changes.length} docs updated` })
  } catch (error) {
    console.error(req, error)
    return res.status(500).json({ message: 'Update rejected' })
  }
}
