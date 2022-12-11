"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PicModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const category_schema_1 = require("../../schemas/category.schema");
const comment_schema_1 = require("../../schemas/comment.schema");
const pic_schema_1 = require("../../schemas/pic.schema");
const user_schema_1 = require("../../schemas/user.schema");
const category_service_1 = require("../category/category.service");
const user_service_1 = require("../user/user.service");
const pic_account_controller_1 = require("./pic.account.controller");
const pic_account_service_1 = require("./pic.account.service");
const pic_controller_1 = require("./pic.controller");
const pic_fetch_service_1 = require("./pic.fetch.service");
const pic_resolver_1 = require("./pic.resolver");
const pic_service_1 = require("./pic.service");
let PicModule = class PicModule {
    configure(consumer) { }
};
PicModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: 'super-jwt-secret-key',
            }),
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: category_schema_1.Category.name, schema: category_schema_1.CategorySchema },
                { name: pic_schema_1.Pic.name, schema: pic_schema_1.PicSchema },
                { name: comment_schema_1.Comment.name, schema: comment_schema_1.CommentSchema },
            ]),
        ],
        controllers: [pic_controller_1.PicController, pic_account_controller_1.PicAccountController],
        providers: [
            pic_service_1.PicService,
            pic_fetch_service_1.PicFetchService,
            pic_account_service_1.PicAccountService,
            pic_resolver_1.PicResolver,
            category_service_1.CategoryService,
            user_service_1.UserService,
            jwt_1.JwtService,
        ],
    })
], PicModule);
exports.PicModule = PicModule;
//# sourceMappingURL=pic.module.js.map