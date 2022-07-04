# client-server-sync
A client-server synchronization method between server and multiple clients

Based that a clinet can add new entry in the set, update an existing entry in the set, and delete an existing entry we can build a sync model based on transactions.
The server will store the dataset and all transactions related to the datatset(a transaction is an entry that describes an operation performed by a client instance over the dataset).
So a client could fetch all updates related to the dataset by reading and process the newest transactions. So based on this transaction model we can be sure that all
client instances have the same view of the dataset.
