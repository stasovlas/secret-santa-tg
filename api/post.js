import { clusterDB } from '../server/db/db';

export default function handler(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(clusterDB.data.posts);
}