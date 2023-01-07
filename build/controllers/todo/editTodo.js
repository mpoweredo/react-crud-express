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
Object.defineProperty(exports, "__esModule", { value: true });
exports.editTodo = void 0;
var db_1 = require("../../utils/db.server.js");
var editTodo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, completed, id, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, title = _a.title, completed = _a.completed, id = _a.id;
                if (!id)
                    return [2 /*return*/, res.status(400).json({ message: 'No id provided!' })];
                if (!title.trim())
                    return [2 /*return*/, res.status(400).json({ message: 'Title is required!' })];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db_1.db.todo.update({
                        data: {
                            title: title,
                            completed: completed
                        },
                        where: {
                            id: id,
                        }
                    })];
            case 2:
                _b.sent();
                res.status(200).json({ message: 'Todo Edited successfully!' });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                if (error_1 instanceof Error) {
                    res.status(400).json({ message: 'Something went wrong while editing todo!' });
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.editTodo = editTodo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdFRvZG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udHJvbGxlcnMvdG9kby9lZGl0VG9kby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQkFBeUI7QUFLekIsSUFBTSxRQUFRLEdBQUcsVUFBTyxHQUF5QixFQUFFLEdBQWE7Ozs7O2dCQUN4RCxLQUEyQixHQUFHLENBQUMsSUFBSSxFQUFqQyxLQUFLLFdBQUEsRUFBRSxTQUFTLGVBQUEsRUFBRSxFQUFFLFFBQUEsQ0FBYTtnQkFFekMsSUFBSSxDQUFDLEVBQUU7b0JBQUUsc0JBQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxFQUFBO2dCQUNwRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtvQkFBRSxzQkFBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxDQUFDLEVBQUE7Ozs7Z0JBRy9FLHFCQUFNLE9BQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO3dCQUNuQixJQUFJLEVBQUU7NEJBQ0osS0FBSyxPQUFBOzRCQUFFLFNBQVMsV0FBQTt5QkFDakI7d0JBQ0QsS0FBSyxFQUFFOzRCQUNMLEVBQUUsSUFBQTt5QkFDSDtxQkFDRixDQUFDLEVBQUE7O2dCQVBGLFNBT0UsQ0FBQTtnQkFFRixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxDQUFDLENBQUE7Ozs7Z0JBRTlELElBQUksT0FBSyxZQUFZLEtBQUssRUFBRTtvQkFDMUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsMENBQTBDLEVBQUUsQ0FBQyxDQUFBO2lCQUM5RTs7Ozs7S0FFSixDQUFBO0FBRVEsNEJBQVEifQ==