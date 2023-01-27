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
exports.PicService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const pic_schema_1 = require("../../schemas/pic.schema");
let PicService = class PicService {
    constructor(picModel) {
        this.picModel = picModel;
    }
    async findAll() {
        return this.picModel
            .find({})
            .skip(Math.random() * 10)
            .limit(30)
            .populate('authorPic').populate('categories');
    }
    async getPicById(id) {
        return this.picModel.findOne({ _id: id }).populate('authorPic').populate('categories');
    }
    async getPicByStringId(id) {
        return this.picModel.findOne({ _id: id }).populate('authorPic').populate('categories');
    }
    async createPostWithImage(authorPicId, file, picCreateDto) {
        if (!picCreateDto.title) {
            return {
                success: false,
                message: 'Title cannot be empty',
            };
        }
        if (!file) {
            return {
                success: false,
                message: 'Picture cannot be empty',
            };
        }
        const newImage = await new this.picModel(picCreateDto);
        newImage.authorPic = authorPicId._id;
        newImage.picture_file.data = file.buffer;
        newImage.picture_file.contentType = file.mimetype;
        await newImage.save();
        return await this.getPicById(newImage._id).then((result) => {
            if (!result) {
                return {
                    success: false,
                    message: 'Something went wrong!',
                };
            }
            return {
                success: true,
                message: result._id.toString(),
            };
        });
    }
};
PicService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(pic_schema_1.Pic.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], PicService);
exports.PicService = PicService;
//# sourceMappingURL=pic.service.js.map