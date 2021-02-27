import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ForbiddenException } from '../common/exceptions/forbidden.exception';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import {
    UseFilters,
    UsePipes,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ParseIntPipe, ParseUUIDPipe } from '@nestjs/common/pipes';
import { JoiValidationPipe } from '../common/pipes/joi-validation.pipe';
import { ClassValidationPipe } from '../common/pipes/class-validation.pipe';
import { RolesGuard } from '../common/guards/roles.guard';
import * as joi from 'joi';
import { Roles } from '../common/decorators/roles.decorator';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';

const createUserSchema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
});

@Controller('users')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    firstName: string;
    lastName: string;

    @Post('createV1')
    @Roles('admin')
    @UsePipes(new JoiValidationPipe(createUserSchema))
    createV1(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }

    @Post('createV2')
    createV2(
        @Body(new ClassValidationPipe()) createUserDto: CreateUserDto
    ): Promise<User> {
        return this.usersService.create(createUserDto);
    }

    @Post('tag')
    tag(@Body() createUserDto: CreateUserDto) {
        throw new ForbiddenException();
    }

    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<User> {
        return this.usersService.findOne(id);
    }

    @Get('findOneById/:uuid')
    async findOneById(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
        return this.usersService.findOne(uuid);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.usersService.remove(id);
    }
}
