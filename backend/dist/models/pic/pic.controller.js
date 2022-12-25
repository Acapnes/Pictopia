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
exports.PicController = void 0;
const common_1 = require("@nestjs/common");
const pagination_dto_1 = require("../../dto/pic/pagination.dto");
const search_interceptor_1 = require("../../helpers/interceptors/search.interceptor");
const pic_fetch_service_1 = require("./pic.fetch.service");
const pic_service_1 = require("./pic.service");
let PicController = class PicController {
    constructor(picsService, picFetchService) {
        this.picsService = picsService;
        this.picFetchService = picFetchService;
    }
    async getPics() {
        return this.picsService.findAll();
    }
    async getPicsByPagination(picPaginationDto) {
        return this.picFetchService.picSearchByCategory(picPaginationDto);
    }
    async getPicsAlias(picture_id, picPaginationDto) {
        return this.picFetchService.picGetAlias(picture_id, picPaginationDto);
    }
    async getPrettyPicById(res, id) {
        const picture = await this.picsService.getPicById(id);
        res.setHeader('Content-type', picture.picture_file.contentType);
        return res.send(picture.picture_file.data.buffer);
    }
    async getPicById(id) {
        return this.picsService.getPicById(id);
    }
    async searchInPicturesByExplore(picPaginationDto) {
        return await this.picFetchService.getPicturesByExplore(picPaginationDto);
    }
    async searchInPicturesByCategory(picPaginationDto) {
        return await this.picFetchService.picSearchByCategory(picPaginationDto);
    }
    async searchInPicturesByInput(picPaginationDto) {
        return await this.picFetchService.picSearchByInput(picPaginationDto);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PicController.prototype, "getPics", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], PicController.prototype, "getPicsByPagination", null);
__decorate([
    (0, common_1.Post)('/alias/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], PicController.prototype, "getPicsAlias", null);
__decorate([
    (0, common_1.Get)('/pretty/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PicController.prototype, "getPrettyPicById", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PicController.prototype, "getPicById", null);
__decorate([
    (0, common_1.Post)('/explore'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], PicController.prototype, "searchInPicturesByExplore", null);
__decorate([
    (0, common_1.Post)('/category'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], PicController.prototype, "searchInPicturesByCategory", null);
__decorate([
    (0, common_1.UseInterceptors)(search_interceptor_1.SearchInterceptor),
    (0, common_1.Post)('/search'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], PicController.prototype, "searchInPicturesByInput", null);
PicController = __decorate([
    (0, common_1.Controller)('/pics'),
    __metadata("design:paramtypes", [pic_service_1.PicService,
        pic_fetch_service_1.PicFetchService])
], PicController);
exports.PicController = PicController;
//# sourceMappingURL=pic.controller.js.map