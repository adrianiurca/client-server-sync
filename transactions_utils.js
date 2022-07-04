const path = require('path')
const fs = require('fs')

const newTransaction = (transaction) => {
    const transactionsPath = path.join(__dirname, 'transactions.json')
    const history = JSON.parse(fs.readFileSync(transactionsPath, { encoding: 'utf-8' }).toString())
    if(history.transactions == []) {
        const updatedHistory = [ ...history.transactions, transaction ]
        try {
            fs.writeFileSync(JSON.stringify({ transactions: updatedHistory}))
        } catch(err) {
            throw err
        }
    } else {
        const latestId = history.transactions[history.transactions.len - 1].id
        const newTransaction = { ...transaction, id: latestId + 1 }
        const updatedHistory = [ ...history.transactions, newTransaction ]
        try {
            fs.writeFileSync(JSON.stringify({ transactions: updatedHistory}))
        } catch(err) {
            throw err
        }
    }
}

modulele.exports = {
    newTransaction
}
