import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string,
  value: number,
  type: 'income' | 'outcome'
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;
    let total = 0;
    for (let i=0; i<this.transactions.length; i++) {
      if(this.transactions[i].type == "income") {

        income += this.transactions[i].value;
      } else {
        outcome += this.transactions[i].value;
      }
    }

    total = income - outcome;
    return {income: income, outcome: outcome, total: total};
  }

  public create({title, value, type}: CreateTransactionDTO): Transaction {
    // TODO
    const transaction = new Transaction({title, value, type})
    const balance = this.getBalance();

    if(type == "outcome") {     
      if (balance.total < value) {
        throw Error('Valor superior ao total disponível.');
      } 
    }

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
