"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var client_1 = require("@prisma/client");
var db;
exports.db = db;
if (!global.__db) {
    global.__db = new client_1.PrismaClient();
}
// eslint-disable-next-line prefer-const
exports.db = db = global.__db;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGIuc2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2RiLnNlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5Q0FBNkM7QUFFN0MsSUFBSSxFQUFnQixDQUFBO0FBY1gsZ0JBQUU7QUFQWCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtJQUNoQixNQUFNLENBQUMsSUFBSSxHQUFHLElBQUkscUJBQVksRUFBRSxDQUFBO0NBQ2pDO0FBRUQsd0NBQXdDO0FBQ3hDLGFBQUEsRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUEifQ==