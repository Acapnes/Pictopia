"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const comment_schema_1 = require("../../schemas/comment.schema");
const pic_schema_1 = require("../../schemas/pic.schema");
const pic_service_1 = require("../pic/pic.service");
const comment_controller_1 = require("./comment.controller");
const comment_management_service_1 = require("./comment.management.service");
const comment_service_1 = require("./comment.service");
let CommentModule = class CommentModule {
    configure(consumer) {
        consumer;
    }
};
CommentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: comment_schema_1.Comment.name, schema: comment_schema_1.CommentSchema },
                { name: pic_schema_1.Pic.name, schema: pic_schema_1.PicSchema },
            ]),
        ],
        controllers: [comment_controller_1.CommentController],
        providers: [comment_service_1.CommentService, comment_management_service_1.CommentManagementService, pic_service_1.PicService],
    })
], CommentModule);
exports.CommentModule = CommentModule;
//# sourceMappingURL=comment.module.js.map