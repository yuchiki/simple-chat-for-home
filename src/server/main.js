"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var api_routes_1 = require("./routes/api.routes");
var port = '3000';
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
(0, api_routes_1.registerApiRoutes)(app);
app.listen(port, function () {
    console.log("listening on port ".concat(port));
});
