"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
var express_1 = __importDefault(require("express"));
var LoginLimiter_1 = require("../middlewares/LoginLimiter.js");
var signup_1 = require("../controllers/auth/signup.js");
var signin_1 = require("../controllers/auth/signin.js");
var refresh_1 = require("../controllers/auth/refresh.js");
var logout_1 = require("../controllers/auth/logout.js");
var router = express_1.default.Router();
router.route('/signup').post(signup_1.signup);
router.route('/signin').post(LoginLimiter_1.loginLimiter, signin_1.signin);
router.route('/refresh').get(refresh_1.refreshToken);
router.route('/signout').get(logout_1.signout);
var authRoute = router;
exports.authRoute = authRoute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aFJvdXRlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvYXV0aFJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxvREFBNkI7QUFFN0IsNERBQTBEO0FBQzFELHFEQUFrRDtBQUNsRCxxREFBa0Q7QUFDbEQsdURBQXlEO0FBQ3pELHFEQUFtRDtBQUVuRCxJQUFNLE1BQU0sR0FBRyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFBO0FBRS9CLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQU0sQ0FBQyxDQUFBO0FBRXBDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLDJCQUFZLEVBQUUsZUFBTSxDQUFDLENBQUE7QUFFbEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsc0JBQVksQ0FBQyxDQUFBO0FBRTFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLGdCQUFPLENBQUMsQ0FBQTtBQUVyQyxJQUFNLFNBQVMsR0FBRyxNQUFNLENBQUE7QUFFZiw4QkFBUyJ9