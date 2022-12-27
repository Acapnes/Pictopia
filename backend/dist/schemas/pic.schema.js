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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PicSchema = exports.Pic = void 0;
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const picture_file_schema_1 = require("./altSchemas/utils/picture.file.schema");
const category_schema_1 = require("./category.schema");
const user_schema_1 = require("./user.schema");
let Pic = class Pic {
};
__decorate([
    (0, graphql_1.Field)(() => user_schema_1.User),
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", user_schema_1.User)
], Pic.prototype, "authorPic", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Pic.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Pic.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Pic.prototype, "creationDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Array)
], Pic.prototype, "hashTags", void 0);
__decorate([
    (0, graphql_1.Field)(() => picture_file_schema_1.PictureFile, {
        nullable: false,
        defaultValue: { data: null, contentType: null },
    }),
    (0, mongoose_1.Prop)({
        type: Object,
        required: true,
        default: { data: null, contentType: null },
    }),
    __metadata("design:type", Object)
], Pic.prototype, "picture_file", void 0);
__decorate([
    (0, graphql_1.Field)(() => category_schema_1.Category, { nullable: false }),
    (0, mongoose_1.Prop)({
        type: [mongoose_2.default.Schema.Types.ObjectId],
        ref: 'Category',
        required: true,
    }),
    __metadata("design:type", Array)
], Pic.prototype, "categories", void 0);
Pic = __decorate([
    (0, mongoose_1.Schema)(),
    (0, graphql_1.ObjectType)()
], Pic);
exports.Pic = Pic;
exports.PicSchema = mongoose_1.SchemaFactory.createForClass(Pic);
//# sourceMappingURL=pic.schema.js.map