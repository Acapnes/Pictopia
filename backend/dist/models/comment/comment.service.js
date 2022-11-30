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
exports.CommentService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const comment_schema_1 = require("../../schemas/comment.schema");
const pic_service_1 = require("../pic/pic.service");
let CommentService = class CommentService {
    constructor(commentModel, picService) {
        this.commentModel = commentModel;
        this.picService = picService;
    }
    async findAll() {
        return this.commentModel.find({}).populate('author');
    }
    async findCommentByMongooseId(destPicture) {
        return (await this.commentModel.find({ destPicture: destPicture }).populate('author')).reverse();
    }
    async getCommentReplies(_id) {
        return (await this.commentModel.find({ parentId: _id }).populate('author')).reverse();
    }
    async signComment(_id, commentCreateDto) {
        const newComment = await this.commentModel.create({
            author: _id,
            destPicture: commentCreateDto.destPicture,
            comment: commentCreateDto.comment,
        });
        if (!this.findCommentByMongooseId(newComment._id)) {
            return {
                success: false,
                message: 'Something went wrong, could not add comment.',
            };
        }
        return {
            success: true,
            message: 'New comment has been added.',
        };
    }
    async signReply(_id, commentCreateDto) {
        const newReply = await this.commentModel.create({
            author: _id,
            destPicture: commentCreateDto.destPicture,
            parentId: commentCreateDto.parentId,
            comment: commentCreateDto.comment,
        });
        if (!this.findCommentByMongooseId(newReply._id)) {
            return {
                success: false,
                message: 'Something went wrong, could not add reply.',
            };
        }
        return {
            success: true,
            message: 'New reply has been added.',
        };
    }
};
CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(comment_schema_1.Comment.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        pic_service_1.PicService])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map