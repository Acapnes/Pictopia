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
            .populate('authorPic');
    }
    async getPicById(id) {
        return this.picModel.findOne({ _id: id }).populate('authorPic');
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
        if (!(await this.getPicById(newImage._id))) {
            return {
                success: false,
                message: 'Something went wrong!',
            };
        }
        return {
            success: true,
            message: 'Picture has been created',
        };
    }
    async getPicturesByInput(picSearchDto) {
        let searchArray = [];
        if (picSearchDto.input[0] === '#') {
            return await this.picModel
                .find({ hashTags: picSearchDto.input })
                .populate('authorPic')
                .limit(30)
                .then((hashResult) => {
                searchArray.push([...hashResult]);
                return searchArray;
            });
        }
        else {
            return await this.picModel
                .find({ title: picSearchDto.input })
                .limit(5)
                .then(async (titleResult) => {
                searchArray.push(...titleResult);
                await this.picModel
                    .find({ description: picSearchDto.input })
                    .limit(5)
                    .then(async (descriptionResult) => {
                    searchArray.push(...descriptionResult.filter((description) => searchArray.some((titleResult) => (titleResult === null || titleResult === void 0 ? void 0 : titleResult._id) === (description === null || description === void 0 ? void 0 : description._id))));
                });
                return searchArray;
            });
        }
    }
};
PicService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(pic_schema_1.Pic.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], PicService);
exports.PicService = PicService;
//# sourceMappingURL=pic.service.js.map