import { db } from '../firebase/config';

const UpdateWithNewTransaction = async (user,transMonth,transDate,typeTrans,amount) => {

     // getting the previous amount for next update
     const prevAmountDoc = await db
     .collection("expenses")
     .doc(user)
     .collection(transMonth)
     .doc(transDate)
     .get()
 
     let Income = (prevAmountDoc.data()?.income) ? prevAmountDoc.data().income : 0;
     let Expense = (prevAmountDoc.data()?.expense) ? prevAmountDoc.data().expense : 0;
    
    // update the new values
    if (typeTrans === 'Income') {
      Income = Income + amount;
   }else {
      Expense = Expense + amount;
   }
 
     //  updating the document with new amount value
     await db.collection("expenses")
     .doc(user)
     .collection(transMonth)
     .doc(transDate)
     .set({
       income : Income,
       expense : Expense,
       total : Income - Expense
     }) 
}

export default UpdateWithNewTransaction;