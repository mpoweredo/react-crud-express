"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
var db_1 = require("../../utils/db.server.js");
var bcrypt_1 = require("bcrypt");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// eslint-disable-next-line
var emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
var signup = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password, existingUser, hashedPassword, createdUser, _, user, accessToken, refreshToken, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, password = _a.password;
                if (!name.trim())
                    return [2 /*return*/, res.status(400).json({ message: 'Name is required!' })];
                if (!emailRegex.test(email))
                    return [2 /*return*/, res.status(400).json({ message: 'Thats not an email!' })];
                if (!password.trim() || password.length < 8)
                    return [2 /*return*/, res.status(400).json({
                            message: 'Error!',
                            description: 'Password should contain atleast 8 characters',
                        })];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, db_1.db.user.findFirst({
                        where: {
                            email: email,
                        },
                    })];
            case 2:
                existingUser = _b.sent();
                if (existingUser)
                    return [2 /*return*/, res.status(400).json({
                            message: 'Error!',
                            description: 'Account with this email already exists!',
                        })];
                hashedPassword = (0, bcrypt_1.hashSync)(password, 12);
                return [4 /*yield*/, db_1.db.user.create({
                        data: {
                            name: name,
                            email: email,
                            password: hashedPassword,
                        },
                    })];
            case 3:
                createdUser = _b.sent();
                _ = createdUser.password, user = __rest(createdUser, ["password"]);
                accessToken = jsonwebtoken_1.default.sign(user, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: '60d',
                });
                refreshToken = jsonwebtoken_1.default.sign(user, process.env.REFRESH_TOKEN_SECRET, {
                    expiresIn: '90d',
                });
                res.cookie('jwt', refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none',
                    maxAge: 7776000,
                });
                res.json({
                    token: accessToken,
                    user: user,
                    message: 'Success!',
                    description: 'Created account successfully!',
                });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                if (error_1 instanceof Error) {
                    res
                        .status(400)
                        .json({ message: 'Something went wrong. Try again later!' });
                }
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.signup = signup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbnVwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbnRyb2xsZXJzL2F1dGgvc2lnbnVwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsMkJBQXlCO0FBQ3pCLGlDQUFpQztBQUNqQyw4REFBOEI7QUFHOUIsMkJBQTJCO0FBQzNCLElBQU0sVUFBVSxHQUFHLHNIQUFzSCxDQUFBO0FBRXpJLElBQU0sTUFBTSxHQUFHLFVBQU8sR0FBMkIsRUFBRSxHQUFtQjs7Ozs7Z0JBQzlELEtBQTRCLEdBQUcsQ0FBQyxJQUFJLEVBQWxDLElBQUksVUFBQSxFQUFFLEtBQUssV0FBQSxFQUFFLFFBQVEsY0FBQSxDQUFhO2dCQUUxQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtvQkFDZCxzQkFBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxDQUFDLEVBQUE7Z0JBQy9ELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztvQkFDekIsc0JBQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsQ0FBQyxFQUFBO2dCQUNqRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQztvQkFDekMsc0JBQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7NEJBQzFCLE9BQU8sRUFBRSxRQUFROzRCQUNqQixXQUFXLEVBQUUsOENBQThDO3lCQUM1RCxDQUFDLEVBQUE7Ozs7Z0JBR21CLHFCQUFNLE9BQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO3dCQUMzQyxLQUFLLEVBQUU7NEJBQ0wsS0FBSyxPQUFBO3lCQUNOO3FCQUNGLENBQUMsRUFBQTs7Z0JBSkksWUFBWSxHQUFHLFNBSW5CO2dCQUVGLElBQUksWUFBWTtvQkFDZCxzQkFBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQzs0QkFDMUIsT0FBTyxFQUFFLFFBQVE7NEJBQ2pCLFdBQVcsRUFBRSx5Q0FBeUM7eUJBQ3ZELENBQUMsRUFBQTtnQkFFRSxjQUFjLEdBQUcsSUFBQSxpQkFBUSxFQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQTtnQkFFekIscUJBQU0sT0FBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7d0JBQ3ZDLElBQUksRUFBRTs0QkFDSixJQUFJLE1BQUE7NEJBQ0osS0FBSyxPQUFBOzRCQUNMLFFBQVEsRUFBRSxjQUFjO3lCQUN6QjtxQkFDRixDQUFDLEVBQUE7O2dCQU5JLFdBQVcsR0FBRyxTQU1sQjtnQkFFZ0IsQ0FBQyxHQUFjLFdBQVcsU0FBekIsRUFBSyxJQUFJLFVBQUssV0FBVyxFQUF0QyxZQUF3QixDQUFGLENBQWdCO2dCQUV0QyxXQUFXLEdBQUcsc0JBQUcsQ0FBQyxJQUFJLENBQzFCLElBQUksRUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUE2QixFQUN6QztvQkFDRSxTQUFTLEVBQUUsS0FBSztpQkFDakIsQ0FDRixDQUFBO2dCQUVLLFlBQVksR0FBRyxzQkFBRyxDQUFDLElBQUksQ0FDM0IsSUFBSSxFQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQThCLEVBQzFDO29CQUNFLFNBQVMsRUFBRSxLQUFLO2lCQUNqQixDQUNGLENBQUE7Z0JBRUQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFO29CQUM5QixRQUFRLEVBQUUsSUFBSTtvQkFDZCxNQUFNLEVBQUUsSUFBSTtvQkFDWixRQUFRLEVBQUUsTUFBTTtvQkFDaEIsTUFBTSxFQUFFLE9BQU87aUJBQ2hCLENBQUMsQ0FBQTtnQkFFRixHQUFHLENBQUMsSUFBSSxDQUFDO29CQUNQLEtBQUssRUFBRSxXQUFXO29CQUNsQixJQUFJLE1BQUE7b0JBQ0osT0FBTyxFQUFFLFVBQVU7b0JBQ25CLFdBQVcsRUFBRSwrQkFBK0I7aUJBQzdDLENBQUMsQ0FBQTs7OztnQkFFRixJQUFJLE9BQUssWUFBWSxLQUFLLEVBQUU7b0JBQzFCLEdBQUc7eUJBQ0EsTUFBTSxDQUFDLEdBQUcsQ0FBQzt5QkFDWCxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsd0NBQXdDLEVBQUUsQ0FBQyxDQUFBO2lCQUMvRDs7Ozs7S0FFSixDQUFBO0FBRVEsd0JBQU0ifQ==