import { Controller, Get, Query, Post, Body, Put, Param, Delete } from "@nestjs/common";
import { CreateCatDto} from "./cats.dto";
import { CatsService } from "./cats.service";
import { Cat } from "./interfaces/cat.interface";

@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) {}

    @Post()
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