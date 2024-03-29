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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const comment_create_dto_1 = require("../../dto/comment/comment.create.dto");
const comment_dto_1 = require("../../dto/comment/comment.dto");
const comment_management_service_1 = require("./comment.management.service");
const comment_service_1 = require("./comment.service");
let CommentController = class CommentController {
    constructor(commentService, commentManagementService) {
        this.commentService = commentService;
        this.commentManagementService = commentManagementService;
    }
    async getAllComments() {
        return this.commentService.findAll();
    }
    async getCommentsById(_id) {
        return this.commentService.findCommentByMongooseId(_id);
    }
    async getCommentsReply(destComment) {
        return this.commentService.getCommentReplies(destComment);
    }
    async commentCreate(req, commentCreateDto) {
        return this.commentService.signComment(req.user, commentCreateDto);
    }
    async commentReplyCreate(req, commentCreateDto) {
        return this.commentService.signReply(req.user, commentCreateDto);
    }
    async commentDelete(commentDto) {
        return this.commentManagementService.deteleCommentById(commentDto._id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getAllComments", null);
__decorate([
    (0, common_1.Get)(':_id'),
    __param(0, (0, common_1.Param)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getCommentsById", null);
__decorate([
    (0, common_1.Get)('/replyof/:_id'),
    __param(0, (0, common_1.Param)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getCommentsReply", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, comment_create_dto_1.CommentCreateDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "commentCreate", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('/create/reply'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, comment_create_dto_1.CommentCreateDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "commentReplyCreate", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('/delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_dto_1.CommentDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "commentDelete", null);
CommentController = __decorate([
    (0, common_1.Controller)('/comments'),
    __metadata("design:paramtypes", [comment_service_1.CommentService,
        comment_management_service_1.CommentManagementService])
], CommentController);
exports.CommentController = CommentController;
//# sourceMappingURL=comment.controller.js.map