const path = require('path')
const fs = require('fs')
const { execSync } = require('child_process')
const librariesData = require('../src/data/libraries.json')

Object.entries(librariesData).forEach(([lib, { docs }]) => {
  // Get docs config
  const { repo, branch = 'main', dir = '' } = docs
  const repoDir = path.resolve(process.cwd(), `temp/${repo}-${branch}`)
  const sourceDir = path.resolve(repoDir, dir)
  const targetDir = path.resolve(process.cwd(), `temp/${lib}`)

  // Cleanup cache
  if (fs.existsSync(targetDir)) fs.rmSync(targetDir, { recursive: true, force: true })

  // Clone repo and extract docs
  execSync(`git clone git://github.com/${repo}.git ${repoDir} -b ${branch} -q`)
  fs.renameSync(sourceDir, targetDir)

  // Cleanup
  const root = path.resolve(process.cwd(), `temp/${repo.split('/')[0]}`)
  fs.rmSync(root, { recursive: true, force: true })
})
