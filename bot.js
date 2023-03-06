require("dotenv").config();
const { setupLinkMessage, addNewLink, renderLinkMessage, deleteLink, callbackDeleteLink, deleteAllLink, callbackDeleteAllLink } = require('./functions/linkMessage');
const { rofl, meme, thisMeme, neUmnichai, ktoI, shock, thanks, say, getDocument } = require('./functions/simpleFunctions');
const { handleLessonSchedule, addLinksToSchedule } = require('./functions/lessonsPin');

const PORT = process.env.PORT || 5000;
const TOKEN = process.env.TOKEN;

const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(TOKEN, { webHook: true });

const express = require('express');
const app = express();


app.post(`/webhook/${TOKEN}`, (req, res) => {
    const body = req.body;
    bot.processUpdate(body);
    res.sendStatus(200);
});

bot.setWebHook(`https://server.com/webhook/${TOKEN}`);

// ----------------------------------------------------------------

bot.onText(/^\/rofl/, (msg) => {
    rofl(bot, msg);
});

bot.onText(/^\/meme/, (msg) => {
    meme(bot, msg);
});

bot.onText(/^\/this_meme/, (msg) => {
    thisMeme(bot, msg);
});

bot.onText(/^\/ne_umnichai/, (msg) => {
    neUmnichai(bot, msg);
});

bot.onText(/^\/kto_i/, (msg) => {
    ktoI(bot, msg);
});

bot.onText(/^\/shock/, (msg) => {
    shock(bot, msg);
});

bot.onText(/^\/thanks/, (msg) => {
    thanks(bot, msg);
});

bot.onText(/^\/say (.+)/gms, (msg, match) => {
    say(bot, msg, match);
});

bot.onText(/^\Уроки на /, (msg) => {
    if (msg.chat.type !== "supergroup" && msg.from.username !== "Makson_w") {
        bot.deleteMessage(chatId, messageId);
        bot.sendMessage(
            chatId,
            "Вы не обладаете нужными правами, чтоб сделать это, так что нэт 😒"
        );

        return;
    }

    handleLessonSchedule(bot, msg);
});

bot.onText(/^\/add_links/, (msg) => {
    if (msg.chat.type !== "supergroup" && msg.from.username !== "Makson_w") {
        bot.deleteMessage(chatId, messageId);
        bot.sendMessage(
            chatId,
            "Вы не обладаете нужными правами, чтоб сделать это, так что нэт 😒"
        );

        return;
    }

    addLinksToSchedule(bot, msg);
});

bot.on("document", (msg) => {
    getDocument(bot, msg);
});

// --------------------------------------

bot.onText(/^\/setup_link_message/, async (msg) => {
    if (msg.chat.type !== "supergroup") {
        return;
    }

    const chatId = msg.chat.id;

    await setupLinkMessage(bot, msg);
    await renderLinkMessage(bot, chatId);
});

bot.onText(/^\/add_new_link/, async (msg) => {
    if (msg.chat.type !== "supergroup") {
        return;
    }

    const chatId = msg.chat.id;

    await addNewLink(bot, msg);
    await renderLinkMessage(bot, chatId);
});

bot.onText(/^\/render_link_message/, async (msg) => {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;

    await renderLinkMessage(bot, chatId);
    await bot.deleteMessage(chatId, messageId);
});

bot.onText(/^\/delete_link/, async (msg) => {
    if (msg.chat.type !== "supergroup") {
        return;
    }

    await deleteLink(bot, msg);
});

bot.on("callback_query", async (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;

    await callbackDeleteLink(bot, callbackQuery);
    await renderLinkMessage(bot, chatId);
});

bot.onText(/^\/delete_all_link/, (msg) => {
    if (msg.chat.type !== "supergroup") {
        return;
    }

    deleteAllLink(bot, msg);
});

bot.on("callback_query", (callbackQuery) => {
    callbackDeleteAllLink(bot, callbackQuery);
});


// https://api.telegram.org/bot5735930962:AAFjGUCmSoiorJdnaXv0Thg4QwquFw9g8pE/unpinAllChatMessages?chat_id=-1001764912680
// api.telegram.org/bot5735930962:AAFjGUCmSoiorJdnaXv0Thg4QwquFw9g8pE/pinChatMessage?chat_id=-1001764912680&message_id=36027

app.listen(PORT, () => {
    console.log('Bot run on server!');
});