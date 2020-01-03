const connection=require("../config/connection.js");

async function returnPromise(queryString){
    return new Promise ((resolve,reject)=>{
        connection.query(queryString, (err,result)=>{
              if(err){
                  reject(err);
              }
              else{
                  resolve(result);
              }
        });
    });
}
const orm={
    selectAll: function(tableInput){
        const queryString="SELECT * FROM "+tableInput+";";
        return returnPromise(queryString);
    },

    insertOne: function(tableInput,colName,colValue){
        const queryString="INSERT INTO "+tableInput+" ("+colName+
                          ") VALUES "+" ('"+colValue+"');";           
        return returnPromise(queryString);
    },

    updateOne: function(tableInput,colName,colValue,pKey,keyValue){
        const queryString="UPDATE "+tableInput+" SET "+colName+"="+colValue+
                          " WHERE "+pKey+"="+keyValue+";"
        return returnPromise(queryString);
    }
        
}

module.exports=orm;