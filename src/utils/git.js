import { fs } from 'memfs'
import git from 'isomorphic-git'
import http from 'isomorphic-git/http/node'

const cache = new Map()

export const pull = async ({ repo, branch, dir }) => {
  const key = `${repo}-${branch}-${dir}`

  const options = {
    fs,
    http,
    dir,
    url: `https://github.com/${repo}`,
    ref: branch,
    singleBranch: true,
    depth: 1,
  }

  let needsUpdate = true

  if (cache.has(key)) {
    await git.fetch(options)

    const [lastCommit] = await git.log({ fs, http, dir })
    if (cache.get(key) === lastCommit.oid) return
  }

  await git.clone(options)

  const [lastCommit] = await git.log({ fs, http, dir })
  cache.set(key, lastCommit.oid)

  return needsUpdate
}
