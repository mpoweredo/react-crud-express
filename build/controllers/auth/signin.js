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
exports.signin = void 0;
var db_1 = require("../../utils/db.server.js");
var bcrypt_1 = require("bcrypt");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// eslint-disable-next-line
var emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
var signin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, foundUser, hashedPassword, user, isPasswordCorrect, accessToken, refreshToken, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                if (!emailRegex.test(email))
                    return [2 /*return*/, res.status(400).json({ message: 'Thats not an email!' })];
                if (!password.trim() || password.length < 8)
                    return [2 /*return*/, res.status(400).json({
                            message: 'Error!',
                            description: 'Password should contain at least 8 characters',
                        })];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db_1.db.user.findFirst({
                        where: {
                            email: email,
                        },
                    })];
            case 2:
                foundUser = _b.sent();
                if (!foundUser)
                    return [2 /*return*/, res.status(400).json({
                            message: 'Error!',
                            description: 'Credentials are invalid!',
                        })];
                hashedPassword = foundUser.password, user = __rest(foundUser, ["password"]);
                isPasswordCorrect = (0, bcrypt_1.compareSync)(password, hashedPassword);
                if (!isPasswordCorrect)
                    return [2 /*return*/, res.status(400).json({
                            message: 'Error!',
                            description: 'Credentials are invalid!',
                        })];
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
                    description: 'Signed in successfully!',
                });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                if (error_1 instanceof Error) {
                    res
                        .status(400)
                        .json({ message: 'Something went wrong. Try again later!' });
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.signin = signin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbnRyb2xsZXJzL2F1dGgvc2lnbmluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsMkJBQXlCO0FBQ3pCLGlDQUFvQztBQUNwQyw4REFBOEI7QUFHOUIsMkJBQTJCO0FBQzNCLElBQU0sVUFBVSxHQUFHLHNIQUFzSCxDQUFBO0FBRXpJLElBQU0sTUFBTSxHQUFHLFVBQU8sR0FBMkIsRUFBRSxHQUFtQjs7Ozs7Z0JBQzlELEtBQXNCLEdBQUcsQ0FBQyxJQUFJLEVBQTVCLEtBQUssV0FBQSxFQUFFLFFBQVEsY0FBQSxDQUFhO2dCQUVwQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7b0JBQ3pCLHNCQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLENBQUMsRUFBQTtnQkFDakUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUM7b0JBQ3pDLHNCQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDOzRCQUMxQixPQUFPLEVBQUUsUUFBUTs0QkFDakIsV0FBVyxFQUFFLCtDQUErQzt5QkFDN0QsQ0FBQyxFQUFBOzs7O2dCQUdnQixxQkFBTSxPQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQzt3QkFDeEMsS0FBSyxFQUFFOzRCQUNMLEtBQUssT0FBQTt5QkFDTjtxQkFDRixDQUFDLEVBQUE7O2dCQUpJLFNBQVMsR0FBRyxTQUloQjtnQkFFRixJQUFJLENBQUMsU0FBUztvQkFDWixzQkFBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQzs0QkFDMUIsT0FBTyxFQUFFLFFBQVE7NEJBQ2pCLFdBQVcsRUFBRSwwQkFBMEI7eUJBQ3hDLENBQUMsRUFBQTtnQkFFYyxjQUFjLEdBQWMsU0FBUyxTQUF2QixFQUFLLElBQUksVUFBSyxTQUFTLEVBQWpELFlBQXFDLENBQUYsQ0FBYztnQkFFakQsaUJBQWlCLEdBQUcsSUFBQSxvQkFBVyxFQUFDLFFBQVEsRUFBRSxjQUFjLENBQUMsQ0FBQTtnQkFFL0QsSUFBSSxDQUFDLGlCQUFpQjtvQkFDcEIsc0JBQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7NEJBQzFCLE9BQU8sRUFBRSxRQUFROzRCQUNqQixXQUFXLEVBQUUsMEJBQTBCO3lCQUN4QyxDQUFDLEVBQUE7Z0JBRUUsV0FBVyxHQUFHLHNCQUFHLENBQUMsSUFBSSxDQUMxQixJQUFJLEVBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBNkIsRUFDekM7b0JBQ0UsU0FBUyxFQUFFLEtBQUs7aUJBQ2pCLENBQ0YsQ0FBQTtnQkFFSyxZQUFZLEdBQUcsc0JBQUcsQ0FBQyxJQUFJLENBQzNCLElBQUksRUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUE4QixFQUMxQztvQkFDRSxTQUFTLEVBQUUsS0FBSztpQkFDakIsQ0FDRixDQUFBO2dCQUVELEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLFlBQVksRUFBRTtvQkFDOUIsUUFBUSxFQUFFLElBQUk7b0JBQ2QsTUFBTSxFQUFFLElBQUk7b0JBQ1osUUFBUSxFQUFFLE1BQU07b0JBQ2hCLE1BQU0sRUFBRSxPQUFPO2lCQUNoQixDQUFDLENBQUE7Z0JBRUYsR0FBRyxDQUFDLElBQUksQ0FBQztvQkFDUCxLQUFLLEVBQUUsV0FBVztvQkFDbEIsSUFBSSxNQUFBO29CQUNKLE9BQU8sRUFBRSxVQUFVO29CQUNuQixXQUFXLEVBQUUseUJBQXlCO2lCQUN2QyxDQUFDLENBQUE7Ozs7Z0JBRUYsSUFBSSxPQUFLLFlBQVksS0FBSyxFQUFFO29CQUMxQixHQUFHO3lCQUNBLE1BQU0sQ0FBQyxHQUFHLENBQUM7eUJBQ1gsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLHdDQUF3QyxFQUFFLENBQUMsQ0FBQTtpQkFDL0Q7Ozs7O0tBRUosQ0FBQTtBQUVRLHdCQUFNIn0=