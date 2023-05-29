const user = [
    {
        id: 1,
        username: "lala",
        address: "Jakarta"
    }, 
    {
        id: 2,
        username: "lili",
        address: "Surabaya"
    }
]

const transaction = [
    {
        user_id: 1,
        transaction: [
            { id: 1, status: "Selesai" },
            { id: 2, status: "Sedang dikirim" }
        ]
    },
    {
        user_id: 2,
        transaction: [
            { id: 1, status: "Selesai" },
            { id: 2, status: "Dibatalkan" }
        ]
    }
]

const detailTransaction = [
    { id: 1, productName: "Kopi Hitam", qty: 3, totalAmount: 3000 },
    { id: 2, productName: "Gula Aren", qty: 5, totalAmount: 1000 },    
]

function login(username) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const searchUser = user.find((e) => e.username === username);
        if (searchUser) {
          resolve(searchUser);
        } else {
          reject("User not found");
        }
      }, 1000);
    });
  }
  
  function getTransaction(userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const dataTransaction = transaction.find((e) => e.user_id === userId);
        if (dataTransaction) {
          resolve(dataTransaction.transaction);
        } else {
          reject("Data transaction not found");
        }
      }, 1000);
    });
  }
  
  function getDetailTransaction(transactionId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const searchDetailTransaction = detailTransaction.find(
          (e) => e.id === transactionId
        );
        if (searchDetailTransaction) {
          resolve(searchDetailTransaction);
        } else {
          reject("Detail transaction not found");
        }
      }, 1000);
    });
  }
  
  // Menggunakan Promise
  login("lili")
    .then((user) => {
      console.log("Data User ===>", user);
      return getTransaction(user.id);
    })
    .then((transaction) => {
      console.log("Transaction ===>", transaction);
      return getDetailTransaction(transaction[0].id);
    })
    .then((detailTransaction) => {
      console.log("First transaction detail ===>", detailTransaction);
    })
    .catch((error) => {
      console.log(error);
    });
  
  // Menggunakan async/await
  async function fetchData() {
    try {
      const loggedInUser = await login("lili");
      console.log("Data User ==>",loggedInUser);
  
      const userTransaction = await getTransaction(loggedInUser.id);
      console.log("Transaction ==>", userTransaction);
  
      const secondTransactionId = userTransaction[1].id;
      const transactionDetail = await getDetailTransaction(secondTransactionId);
      console.log("Second transaction detail ==>", transactionDetail);
    } catch (error) {
      console.log(error);
    }
  }
  fetchData();