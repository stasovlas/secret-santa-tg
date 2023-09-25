import { Low, JSONFileSync } from 'lowdb'

// Cluster DB Setup
const adapter = new JSONFileSync('main.json')
const clusterDB = new Low(adapter)

// Initialize if empty
clusterDB.read()
clusterDB.data ||= { posts: [] }
clusterDB.write()

export {clusterDB}