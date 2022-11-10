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
exports.SavedPicturesService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const user_schema_1 = require("../../schemas/user.schema");
const user_service_1 = require("./user.service");
let SavedPicturesService = class SavedPicturesService {
    constructor(userModel, userService) {
        this.userModel = userModel;
        this.userService = userService;
    }
    async findUsersSavedPicture(_id, userSavedPictureDto) {
        return this.userModel.findOne({ _id: _id, savedPictures: userSavedPictureDto.picture_id })
            .then((result) => {
            if (result) {
                return {
                    success: false,
                    message: 'Picture already saved',
                };
            }
            return {
                success: true,
                message: 'Picture to save not found, can be saved',
            };
        });
    }
    async findUserAndPopulateSavedPics(_id) {
        return this.userModel.findOne({ _id: _id }).populate('savedPictures').then((result) => {
            if (!result) {
                return {
                    success: false,
                    message: 'User cannot found by id',
                };
            }
            return result.savedPictures;
        });
    }
    async savePicture(_id, userSavedPictureDto) {
        return await this.userService.findByMongooseId(_id).then(async (funcResult) => {
            if (funcResult.success !== false) {
                return await this.findUsersSavedPicture(_id, userSavedPictureDto).then(async (pictureFindResult) => {
                    if (pictureFindResult.success) {
                        return await this.userModel.findOneAndUpdate({ _id: _id }, {
                            $push: {
                                savedPictures: userSavedPictureDto.picture_id,
                            },
                        })
                            .then(async () => {
                            return {
                                success: true,
                                message: 'Picture saved',
                            };
                        })
                            .catch((err) => {
                            return {
                                success: false,
                                message: 'Something went wrong! : ' + err,
                            };
                        });
                    }
                    return pictureFindResult;
                });
            }
            return funcResult;
        });
    }
    async removeSavedPicture(_id, userSavedPictureDto) {
        return await this.userService.findByMongooseId(_id).then(async (funcResult) => {
            if (funcResult.success !== false) {
                return await this.userModel.findOneAndUpdate({ _id: _id }, {
                    $pull: {
                        savedPictures: userSavedPictureDto.picture_id,
                    },
                })
                    .then(async () => {
                    return {
                        success: true,
                        message: 'Picture removed',
                    };
                })
                    .catch((err) => {
                    return {
                        success: false,
                        message: 'Something went wrong! : ' + err,
                    };
                });
            }
            return funcResult;
        });
    }
};
SavedPicturesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model, user_service_1.UserService])
], SavedPicturesService);
exports.SavedPicturesService = SavedPicturesService;
//# sourceMappingURL=saved.pictures.service.js.map