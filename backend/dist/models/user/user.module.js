"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_strategy_1 = require("../../helpers/guards/jwt.strategy");
const category_schema_1 = require("../../schemas/category.schema");
const pic_schema_1 = require("../../schemas/pic.schema");
const user_schema_1 = require("../../schemas/user.schema");
const category_service_1 = require("../category/category.service");
const user_picture_service_1 = require("./account/user.picture.service");
const user_account_controller_1 = require("./account/user.account.controller");
const user_category_service_1 = require("./account/user.category.service");
const auth_service_1 = require("./auth/auth.service");
const user_auth_controller_1 = require("./auth/user.auth.controller");
const moderation_service_1 = require("./moderation/moderation.service");
const user_moderation_controller_1 = require("./moderation/user.moderation.controller");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
const comment_schema_1 = require("../../schemas/comment.schema");
const user_comment_service_1 = require("./account/user.comment.service");
const avatar_service_1 = require("./moderation/avatar.service");
const management_service_1 = require("./management/management.service");
const management_controller_1 = require("./management/management.controller");
const user_account_service_1 = require("./account/user.account.service");
let UserModule = class UserModule {
    configure(consumer) { }
};
UserModule = __decorate([
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
        controllers: [
            user_controller_1.UserController,
            user_auth_controller_1.UserAuthController,
            user_moderation_controller_1.UserModerationController,
            user_account_controller_1.UserAccountController,
            management_controller_1.UserManagementController,
        ],
        providers: [
            user_service_1.UserService,
            auth_service_1.AuthService,
            moderation_service_1.ModerationService,
            user_picture_service_1.UserPictureService,
            user_category_service_1.UserCategoryService,
            user_comment_service_1.UserCommentervice,
            user_account_service_1.UserAccountService,
            avatar_service_1.AvatarService,
            management_service_1.ManagementService,
            category_service_1.CategoryService,
            jwt_strategy_1.JwtStrategy,
        ],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map