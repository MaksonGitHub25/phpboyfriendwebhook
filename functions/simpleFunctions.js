const roflArray = require("../assets/rofls");
const memesLink = require("../assets/memesLink");
const answerForUsers = require("../assets/answerForUsersKtoI");


function rofl(bot, msg) {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;

    const randomNumber = Math.floor(Math.random() * roflArray.length);
    const randomRofl = roflArray[randomNumber];

    bot.deleteMessage(chatId, messageId);
    bot.sendMessage(chatId, randomRofl);
}

function meme(bot, msg) {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;

    const randomNumber = Math.floor(Math.random() * (memesLink.length - 1) + 1);
    const randomMeme = memesLink[randomNumber];

    bot.deleteMessage(chatId, messageId);
    bot.sendPhoto(chatId, randomMeme);
}

function thisMeme(bot, msg) {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;

    bot.deleteMessage(chatId, messageId);
    bot.sendPhoto(chatId, memesLink[0]);
}

function neUmnichai(bot, msg) {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const messageToReply = msg.hasOwnProperty("reply_to_message")
        ? msg.reply_to_message.message_id
        : undefined;

    const messageForUmniki = `Нет ничего утомительнее, чем присутствовать при том, как человек демонстрирует свой ум. В особенности, если ума нет.
(С) Эрих Мария Ремарк`;

    bot.deleteMessage(chatId, messageId);
    bot.sendMessage(chatId, messageForUmniki, {
        reply_to_message_id: messageToReply,
    });
}

function ktoI(bot, msg) {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const senderUserName = msg.from.username;
    const senderFirstName = msg.from.first_name;

    const messageForUser = answerForUsers[senderUserName];

    const message =
        messageForUser !== undefined
            ? `${senderFirstName} - это ${messageForUser}`
            : answerForUsers["unknown"];

    bot.deleteMessage(chatId, messageId);
    bot.sendMessage(chatId, message);
}

function shock(bot, msg) {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;

    const replyMessageId = msg.hasOwnProperty("reply_to_message")
        ? msg.reply_to_message.message_id
        : undefined;

    bot.deleteMessage(chatId, messageId);
    bot.sendMessage(chatId, "Нихуя себе", {
        reply_to_message_id: replyMessageId,
    });
}

function thanks(bot, msg) {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;

    const replyMessageId = msg.hasOwnProperty("reply_to_message")
        ? msg.reply_to_message.message_id
        : undefined;

    const message = `Ооо, спасибо, ${msg.from.username === "pidoprigora21" ? "любимая" : "любимый"
        } ❤`;

    bot.deleteMessage(chatId, messageId);
    bot.sendMessage(chatId, message, {
        reply_to_message_id: replyMessageId,
    });
}

function say(bot, msg, match) {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const messageToSay = match[1];
    const messageToReply = msg.hasOwnProperty("reply_to_message")
        ? msg.reply_to_message.message_id
        : undefined;

    bot.deleteMessage(chatId, messageId);
    bot.sendMessage(chatId, messageToSay, {
        reply_to_message_id: messageToReply
    });
}

function getDocument(bot, msg) {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;

    bot.sendMessage(chatId, "Мммм, домашечка, спасибо 💟", {
        reply_to_message_id: messageId,
    });
}


module.exports = { rofl, meme, thisMeme, neUmnichai, ktoI, shock, thanks, say, getDocument };