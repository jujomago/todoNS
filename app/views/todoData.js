/**
 * Created by jujomago on 24/02/2016.
 */

var observableModule=require('data/observable'),
    observableArray=require('data/observable-array'),
    ClaseTodo=require('../shared/models/Todo'),
    data=new observableModule.Observable(),
    appSettings=require('application-settings'),
    dialogs = require("ui/dialogs");


var todoLists=appSettings.getString('todoLists');
var lista_todos;


if(typeof todoLists == "undefined"){
     console.log('appSetting UNDEFINED')
     lista_todos=new observableArray.ObservableArray([]);
}else{
     console.log('appSettings CON VALOR');
   //  console.log(todoLists);
 //   appSettings.setString('todoLists',JSON.stringify(defaultValues));
    lista_todos=new observableArray.ObservableArray(JSON.parse(todoLists));
}



data.set('lista_todos',lista_todos);
data.set('valorSwitch',true);




function getStringifyObservable(){
    var temarray=[];
    for(var i= 0;i<lista_todos.length;i++){
        temarray.push(lista_todos.getItem(i));
    }
    return JSON.stringify(temarray);
}



data.addNewItem=function(elitem){
    var newTodo = new ClaseTodo(elitem.valor,elitem.recordatorio);

    lista_todos.push(newTodo);
 //   console.log('AGREGADO IN APPSETTINGS:');

    lista_todos_strings=getStringifyObservable(lista_todos); // necesario por que JSON.stringify(lista_todos) no funciona hay que recorrer el loop manualmente

    appSettings.setString('todoLists',lista_todos_strings);

  //  console.log(appSettings.getString('todoLists'));

};

data.deleteAll=function(){
    //TODO: CHEKEAR EL METODO DELETE ALL NO REFRESCA LA LISTA
    lista_todos=new observableArray.ObservableArray([]);
    appSettings.remove('todoLists');
};

data.getItem=function(index){
    return lista_todos.getItem(index);
};

data.deleteItem=function(index){
    lista_todos.splice(index,1);


    lista_todos_strings=getStringifyObservable(lista_todos);
    appSettings.setString('todoLists',lista_todos_strings);

};
data.updateItem=function(index,currentItem,newValue){
    currentItem.nombre=newValue;
    lista_todos.setItem(index,currentItem);


    lista_todos_strings=getStringifyObservable(lista_todos);
    appSettings.setString('todoLists',lista_todos_strings);
};
data.toogleCheck=function(item){
    var selected_index=lista_todos.indexOf(item);
    var selected_item=lista_todos.getItem(selected_index);
    selected_item.completo=(selected_item.completo)?false:true;


    lista_todos_strings=getStringifyObservable(lista_todos);
    appSettings.setString('todoLists',lista_todos_strings);
};


module.exports=data;