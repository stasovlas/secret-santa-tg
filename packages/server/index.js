import express from 'express';
import cors from 'cors';
import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';
import bodyParser from 'body-parser';
import { customAlphabet } from 'nanoid';
import d from 'nanoid-dictionary';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import TelegramBot from 'node-telegram-bot-api';

import { generatePairs } from './helpers.js';

const token = process.env.TELEGRAM_TOKEN;
const adminToken = process.env.ADMIN_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.on('polling_error', () => {
    // set actual TELEGRAM_TOKEN in .env file
    bot.stopPolling();
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, '🎅Tap the button below to find your Secret Santa!', {
        reply_markup: {
            inline_keyboard: [
                [ { text: 'Run app', web_app: { url: process.env.TELEGRAM_WEB_APP } } ]
            ]
        }
    });
});


const nanoid = customAlphabet(d.lowercase, 6);

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json');

const db = new LowSync(new JSONFileSync(file), { parties: [], gifts: [], wishLists: [] });
await db.read();

const app = express();

app.use(cors());
app.use(bodyParser.json());

function getParties(participantId, joinPartyId) {
    return db.data.parties.filter(
        (p) => p.ownerId === participantId || p.id === joinPartyId || p.participants.find((ps) => ps.id === participantId)
    );
}

function getGifts(participantId) {
    return db.data.gifts.filter((g) => g.toId === participantId || g.fromId === participantId);
}

function getWishLists(participantId) {
    return db.data.wishLists.filter((w) => w.ownerId === participantId);
}

app.get('/party', (req, res) => {
    const participantId = req.query.participantId;

    if (!participantId) {
        return res.status(500).send({ error: 'participant id is undefined' });
    }

    const parties = getParties(participantId);
    return res.json(parties);
});

app.post('/party', (req, res) => {
    const data = req.body.data;
    const participant = data.participant;
    const party = data.party;

    if (!participant) {
        return res.status(500).send({ error: 'participant is undefined' });
    }

    if (!party) {
        return res.status(500).send({ error: 'party is undefined' });
    }


    const id = nanoid();

    db.data.parties.push({
        ...party,
        ownerId: participant.id,
        participants: [ participant ],
        id
    });

    db.write();

    const parties = getParties(participant.id);
    return res.json({ partyId: id, parties });
});

app.post('/party/:partyId/join', (req, res) => {
    const data = req.body.data;
    const partyId = req.params.partyId;
    const participant = data.participant;
    const wishList = data.wishList;

    if (!participant) {
        return res.status(500).send({ error: 'participant is undefined' });
    }

    if (!partyId) {
        return res.status(500).send({ error: 'party id is undefined' });
    }

    const party = db.data.parties.find((p) => p.id === partyId);

    if (!party) {
        return res.status(500).send({ error: 'party is undefined' });
    }

    party.participants.push(participant);

    if (wishList?.text) {
        db.data.wishLists.push({
            id: nanoid(),
            ownerId: participant.id,
            partyId,
            text: wishList.text
        });
    }

    db.write();

    const parties = getParties(participant.id);
    const wishLists = getWishLists(participant.id);
    return res.json({ parties, wishLists });
});

app.post('/party/:partyId/start', (req, res) => {
    const data = req.body.data;
    const partyId = req.params.partyId;
    const participantId = data.participantId;

    if (!partyId) {
        return res.status(500).send({ error: 'party id is undefined' });
    }

    if (!participantId) {
        return res.status(500).send({ error: 'participant id is undefined' });
    }

    const party = db.data.parties.find((p) => p.id === partyId);

    if (!party) {
        return res.status(500).send({ error: 'party is undefined' });
    }

    const pairs = generatePairs(party.participants.map((p) => p.id));

    const gifts = pairs.map(([ fromId, toId ]) => ({
        id: nanoid(),
        fromId,
        toId,
        partyId
    }));

    db.data.gifts.push(...gifts);
    party.isStarted = true;

    db.write();

    const parties = getParties(participantId);

    const giftEntities = getGifts(participantId).map((g) => {
        const party = parties.find((p) => p.id === g.partyId);
        const from = party.participants.find((p) => p.id === g.fromId);
        const to = party.participants.find((p) => p.id === g.toId);
        const wishList = db.data.wishLists.find((w) => w.partyId === party.id && w.ownerId === g.toId);

        return {
            id: g.id,
            party: party.id,
            from,
            to,
            wishList
        };
    });

    return res.json({ parties, gifts: giftEntities });
});

app.put('/party/:partyId', (req, res) => {
    const data = req.body.data;
    const partyId = req.params.partyId;
    const participantId = data.participantId;

    if (!partyId) {
        return res.status(500).send({ error: 'party id is undefined' });
    }

    if (!participantId) {
        return res.status(500).send({ error: 'participant id is undefined' });
    }

    const party = db.data.parties.find((p) => p.id === req.params.partyId);

    if (!party) {
        return res.status(500).send({ error: 'party is undefined' });
    }

    party.name = data.party.name;
    party.budget = data.party.budget;

    db.write();

    const parties = getParties(participantId);
    return res.json(parties);
});

app.get('/gift', (req, res) => {
    const participantId = req.query.participantId;

    if (!participantId) {
        return res.status(500).send({ error: 'participant id is undefined' });
    }

    const gifts = getGifts(participantId);
    return res.json(gifts);
});

app.get('/wish-list', (req, res) => {
    const participantId = req.query.participantId;

    if (!participantId) {
        return res.status(500).send({ error: 'participant id is undefined' });
    }

    const wishLists = db.data.wishLists((w) => w.ownerId === participantId);
    return res.json(wishLists);
});

app.post('/wish-list/', (req, res) => {
    const data = req.body.data;
    const wishList = data.wishList;
    const participantId = data.participantId;

    if (!wishList) {
        return res.status(500).send({ error: 'wish list is undefined' });
    }

    if (!participantId) {
        return res.status(500).send({ error: 'participant id is undefined' });
    }

    db.data.wishLists.push({
        id: nanoid(),
        ...wishList
    });

    db.write();

    const wishLists = getWishLists(participantId);
    return res.json(wishLists);
});

app.put('/wish-list/:wishListId', (req, res) => {
    const data = req.body.data;
    const wishListId = req.params.wishListId;
    const participantId = data.participantId;
    const wishListData = data.wishList;

    if (!wishListId) {
        return res.status(500).send({ error: 'wish list id is undefined' });
    }

    if (!wishListData) {
        return res.status(500).send({ error: 'wish list data is undefined' });
    }

    if (!participantId) {
        return res.status(500).send({ error: 'participant id is undefined' });
    }

    const wishList = db.data.wishLists.find((w) => w.id === wishListId);

    if (!wishList) {
        return res.status(500).send({ error: 'wishList is undefined' });
    }

    wishList.text = wishListData.text;

    db.write();

    const wishLists = getWishLists(participantId);
    return res.json(wishLists);
});

app.get('/init-data', (req, res) => {
    const participantId = req.query.participantId;
    const joinPartyId = req.query.joinPartyId;

    if (!participantId) {
        return res.status(500).send({ error: 'participant id is undefined' });
    }

    const parties = getParties(participantId, joinPartyId);
    const wishLists = getWishLists(participantId);

    const gifts = getGifts(participantId).map((g) => {
        const party = parties.find((p) => p.id === g.partyId);
        const from = party.participants.find((p) => p.id === g.fromId);
        const to = party.participants.find((p) => p.id === g.toId);
        const wishList = db.data.wishLists.find((w) => w.partyId === party.id && w.ownerId === g.toId);

        return {
            id: g.id,
            party: party.id,
            from,
            to,
            wishList
        };
    });

    return res.json({ parties, gifts, wishLists });
});

app.get('/admin-data', (req, res) => {
    const token = req.query.token;

    if (token !== adminToken) {
        return res.status(500).send({ error: 'token id is not valid' });
    }

    const parties = db.data.parties; // getParties(participantId, joinPartyId);

    return res.json({ parties });
});

const PORT = process.env.SERVER_PORT || '4000';

app.listen(PORT, ()=> {
    console.log(`Backend is running on http://localhost:${PORT}`);
});