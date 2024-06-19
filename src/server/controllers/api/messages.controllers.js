"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessagesHandlers = exports.postMessageHandlers = exports.getMessagesHandlers = void 0;
var Message = __importStar(require("../../models/message"));
var express_validator_1 = require("express-validator");
var postMessageSchema = (0, express_validator_1.checkSchema)({
    name: {
        in: ['body'],
        isString: true,
        notEmpty: true,
    },
    message: {
        in: ['body'],
        isString: true,
        notEmpty: true,
    },
});
var postMessage = function (req, res) {
    console.log('POST /api/v1/messages');
    console.log(req.body);
    var errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        res.status(400).send('Bad Request');
        return;
    }
    var body = (0, express_validator_1.matchedData)(req);
    Message.createMessage({
        name: body.name,
        date: new Date(),
        message: body.message,
    });
    res.send('posted.');
};
var getMessages = function (_, res, next) {
    res.send(Message.readMessages());
    next();
};
var deleteMessagesSchema = (0, express_validator_1.checkSchema)({
    'ids': {
        in: ['body'],
        isArray: true,
        notEmpty: true,
    },
    'ids.*': {
        in: ['body'],
        isInt: true,
        toInt: true,
    },
});
var deleteMessages = function (req, res) {
    var ids = req.body.ids;
    console.log('DELETE /api/v1/messages');
    console.log(ids);
    var errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        res.status(400).send('Bad Request');
        return;
    }
    var body = (0, express_validator_1.matchedData)(req);
    Message.deleteMessages(body.ids);
    res.send('deleted.');
};
exports.getMessagesHandlers = [getMessages];
exports.postMessageHandlers = [postMessageSchema, postMessage];
exports.deleteMessagesHandlers = [deleteMessagesSchema, deleteMessages];
