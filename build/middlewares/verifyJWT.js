"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var verifyJWT = function (req, res, next) {
    var token = req.headers.authorization;
    if (!token)
        return res.sendStatus(403);
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, function (error) {
        console.log(error);
        if (error)
            return res.sendStatus(403);
        next();
    });
};
exports.verifyJWT = verifyJWT;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyaWZ5SldULmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21pZGRsZXdhcmVzL3ZlcmlmeUpXVC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSw4REFBOEI7QUFHOUIsSUFBTSxTQUFTLEdBQUcsVUFBQyxHQUFZLEVBQUUsR0FBbUIsRUFBRSxJQUFrQjtJQUN0RSxJQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQTtJQUV2QyxJQUFJLENBQUMsS0FBSztRQUFFLE9BQU8sR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUV0QyxzQkFBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBNkIsRUFBRSxVQUFDLEtBQVU7UUFDdEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNsQixJQUFJLEtBQUs7WUFBRSxPQUFPLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUE7UUFFckMsSUFBSSxFQUFFLENBQUE7SUFDUixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQUVRLDhCQUFTIn0=