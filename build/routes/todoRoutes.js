"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoRoute = void 0;
var express_1 = __importDefault(require("express"));
var verifyJWT_1 = require("../middlewares/verifyJWT.js");
var getTodos_1 = require("../controllers/todo/getTodos.js");
var deleteTodo_1 = require("../controllers/todo/deleteTodo.js");
var editTodo_1 = require("../controllers/todo/editTodo.js");
var getTodo_1 = require("../controllers/todo/getTodo.js");
var addTodo_1 = require("../controllers/todo/addTodo.js");
var router = express_1.default.Router();
router.use(verifyJWT_1.verifyJWT);
router.route('/').post(addTodo_1.addTodo).get(getTodos_1.getTodos).delete(deleteTodo_1.deleteTodo).patch(editTodo_1.editTodo);
router.route('/:id').get(getTodo_1.getTodo);
var todoRoute = router;
exports.todoRoute = todoRoute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9kb1JvdXRlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvdG9kb1JvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxvREFBNkI7QUFFN0Isc0RBQW9EO0FBQ3BELHlEQUFzRDtBQUN0RCw2REFBMEQ7QUFDMUQseURBQXNEO0FBQ3RELHVEQUFvRDtBQUNwRCx1REFBb0Q7QUFFcEQsSUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQTtBQUUvQixNQUFNLENBQUMsR0FBRyxDQUFDLHFCQUFTLENBQUMsQ0FBQTtBQUVyQixNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBTyxDQUFDLENBQUMsR0FBRyxDQUFDLG1CQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsdUJBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxtQkFBUSxDQUFDLENBQUE7QUFFaEYsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxDQUFBO0FBRWpDLElBQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQTtBQUVmLDhCQUFTIn0=