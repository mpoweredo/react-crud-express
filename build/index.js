"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var todoRoutes_1 = require("./routes/todoRoutes.js");
var corsOptions_1 = require("./config/corsOptions.js");
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var authRoutes_1 = require("./routes/authRoutes.js");
(0, dotenv_1.config)();
var app = (0, express_1.default)();
app.use((0, cors_1.default)(corsOptions_1.corsOptions));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use('/todo', todoRoutes_1.todoRoute);
app.use('/', authRoutes_1.authRoute);
app.listen(process.env.PORT);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxpQ0FBK0I7QUFDL0Isb0RBQW9EO0FBQ3BELDhDQUF1QjtBQUN2QixrREFBK0M7QUFDL0Msb0RBQWtEO0FBQ2xELGdFQUF3QztBQUN4QyxrREFBK0M7QUFFL0MsSUFBQSxlQUFNLEdBQUUsQ0FBQTtBQUVSLElBQU0sR0FBRyxHQUFHLElBQUEsaUJBQU8sR0FBRSxDQUFBO0FBRXJCLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBQSxjQUFJLEVBQUMseUJBQVcsQ0FBQyxDQUFDLENBQUE7QUFFMUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFBLHVCQUFZLEdBQUUsQ0FBQyxDQUFBO0FBRXZCLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO0FBRXZCLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLHNCQUFTLENBQUMsQ0FBQTtBQUUzQixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxzQkFBUyxDQUFDLENBQUE7QUFFdkIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBIn0=