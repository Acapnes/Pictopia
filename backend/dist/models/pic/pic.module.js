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
const mongoose_1 = require("@nestjs/mongoose");
const pic_schema_1 = require("../../schemas/pic.schema");
const pic_controller_1 = require("./pic.controller");
const pic_resolver_1 = require("./pic.resolver");
const pic_service_1 = require("./pic.service");
let PicModule = class PicModule {
};
PicModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: pic_schema_1.Pic.name, schema: pic_schema_1.PicSchema }])],
        controllers: [pic_controller_1.PicController],
        providers: [pic_service_1.PicService, pic_resolver_1.PicResolver],
    })
], PicModule);
exports.PicModule = PicModule;
//# sourceMappingURL=pic.module.js.map