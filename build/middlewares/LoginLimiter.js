"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginLimiter = void 0;
var express_rate_limit_1 = require("express-rate-limit");
var loginLimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 60 * 1000,
    max: 5,
    message: {
        message: 'Too many login attempts!',
        description: 'Too many login attempts from this IP, please try again after a 30 second pause',
    },
    handler: function (req, res, next, options) {
        res.status(options.statusCode).send(options.message);
    },
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
exports.loginLimiter = loginLimiter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9naW5MaW1pdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21pZGRsZXdhcmVzL0xvZ2luTGltaXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5REFBOEM7QUFFOUMsSUFBTSxZQUFZLEdBQUcsSUFBQSw4QkFBUyxFQUFDO0lBQzdCLFFBQVEsRUFBRSxFQUFFLEdBQUcsSUFBSTtJQUNuQixHQUFHLEVBQUUsQ0FBQztJQUNOLE9BQU8sRUFBRTtRQUNQLE9BQU8sRUFBRSwwQkFBMEI7UUFDbkMsV0FBVyxFQUNULGdGQUFnRjtLQUNuRjtJQUNELE9BQU8sRUFBRSxVQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU87UUFDL0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUN0RCxDQUFDO0lBQ0QsZUFBZSxFQUFFLElBQUk7SUFDckIsYUFBYSxFQUFFLEtBQUssRUFBRSxzQ0FBc0M7Q0FDN0QsQ0FBQyxDQUFBO0FBRU8sb0NBQVkifQ==