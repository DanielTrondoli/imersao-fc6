import { Controller, Get, Post, Body } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from './entities/transaction.entity';

@Controller('transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  create(@Body() transaction: Transaction) {
    return this.transactionService.create(transaction);
  }

  @Get()
  findAll() {
    return this.transactionService.findAll();
  }
}
