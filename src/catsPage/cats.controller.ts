import { Controller, Get, Query, Post, Body, Put, Param, Delete, UseGuards } from "@nestjs/common";
import { CreateCatDto} from "./cats.dto";
import { CatsService } from "./cats.service";
import { Cat } from "./interfaces/cat.interface";
import { RolesGuard } from "./common/roles.guard";
import { Roles } from "./common/roles.decorator";

@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {
    constructor(private catsService: CatsService) {}

    @Post()
    @Roles(['admin'])
    async create(@Body() CreateCatDto: CreateCatDto) {
        return this.catsService.create(CreateCatDto)
    }


    @Get()
    async findAll(): Promise<Cat[]> {
        return this.catsService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return `This action returns a #${id} cat`
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() UpdateCatDto: any) {
        return `This action updates a #${id} cat`
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `This action removes a #${id} cat`
    }
}