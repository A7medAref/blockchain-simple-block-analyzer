import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { BlockService } from './block.service';
import { BlockQueryDto } from './dto/block-query.dto';

@Controller('block')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Get()
  async getBlockAnalysis(@Query() query: BlockQueryDto) {
    try {
      return await this.blockService.getBlockAnalysis(query.blockNumber);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'An unexpected error occurred',
          error: error.message || 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

