import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private repository: Repository<Transaction>,
  ) {}

  async create(transaction: Transaction) {
    
    const t = await this.repository.findOne(transaction.id);
    if (t === undefined || t === null){
      transaction.id = null
      transaction.updated_at = null
      transaction.created_at = new Date();
    }else{
      transaction.created_at = t.created_at
      transaction.updated_at = new Date();
    }    
   
    console.log(`transaction ${transaction} created !`);
    
    return await this.repository.save(transaction);
  }

  async findAll() {
    return await this.repository.find();
  }
}
