"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Comment_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentSchema = exports.Comment = void 0;
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const pic_schema_1 = require("./pic.schema");
const user_schema_1 = require("./user.schema");
let Comment = Comment_1 = class Comment {
};
__decorate([
    (0, graphql_1.Field)(() => user_schema_1.User, { nullable: false }),
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_schema_1.User)
], Comment.prototype, "author", void 0);
__decorate([
    (0, graphql_1.Field)(() => pic_schema_1.Pic, { nullable: false }),
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Pic' }),
    __metadata("design:type", pic_schema_1.Pic)
], Comment.prototype, "destPicture", void 0);
__decorate([
    (0, graphql_1.Field)(() => Comment_1, { nullable: true }),
    (0, mongoose_1.Prop)({
        required: false,
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: 'Comment',
    }),
    __metadata("design:type", String)
], Comment.prototype, "parentId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Comment.prototype, "comment", void 0);
Comment = Comment_1 = __decorate([
    (0, mongoose_1.Schema)(),
    (0, graphql_1.ObjectType)()
], Comment);
exports.Comment = Comment;
exports.CommentSchema = mongoose_1.SchemaFactory.createForClass(Comment);
//# sourceMappingURL=comment.schema.js.map