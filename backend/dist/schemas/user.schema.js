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
exports.UserSchema = exports.User = void 0;
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const picture_file_schema_1 = require("./altSchemas/picture.file.schema");
const user_socials_schema_1 = require("./altSchemas/user.socials.schema");
const pic_schema_1 = require("./pic.schema");
let User = class User {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
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
], User.prototype, "avatar", void 0);
__decorate([
    (0, graphql_1.Field)(() => [pic_schema_1.Pic], { nullable: false }),
    (0, mongoose_1.Prop)({ type: [mongoose_2.default.Schema.Types.ObjectId], ref: 'Pic', required: false }),
    __metadata("design:type", Array)
], User.prototype, "savedPictures", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [mongoose_2.default.Schema.Types.ObjectId],
        ref: 'Category',
        required: false,
    }),
    __metadata("design:type", Array)
], User.prototype, "favCategories", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    (0, mongoose_1.Prop)({ type: [], required: false }),
    __metadata("design:type", Array)
], User.prototype, "lastSearchs", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_socials_schema_1.UserSocials, { nullable: true }),
    (0, mongoose_1.Prop)({ type: Object, required: false }),
    __metadata("design:type", user_socials_schema_1.UserSocials)
], User.prototype, "userSocials", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "birthDate", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Boolean)
], User.prototype, "confrimed", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], User.prototype, "bio", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
User = __decorate([
    (0, mongoose_1.Schema)(),
    (0, graphql_1.ObjectType)()
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.schema.js.map