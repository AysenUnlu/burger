const orm=require("../config/orm.js");

const burger={

    selectAll: function(){
       return orm.selectAll("burgers");
    },

    insertOne: function(bname){
        return orm.insertOne("burgers","burger_name",bname);

    },

    updateOne: function(bstatus,id){
       return orm.updateOne("burgers","devoured",bstatus,"id",id);
    }

}

module.exports=burger;