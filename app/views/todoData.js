/**
 * Created by jujomago on 24/02/2016.
 */

var observableModule=require('data/observable'),
    observableArray=require('data/observable-array'),
    ClaseTodo=require('../shared/models/Todo'),
    data=new observableModule.Observable(),
    localSettings=require('application-settings'),
    dialogs = require("ui/dialogs");

var defaultValues=[
    new ClaseTodo("Despertar"),
    new ClaseTodo('Codificar algo'),
    new ClaseTodo("publicar en github")
];

var todoLists=localSettings.getString('todoLists');

if(typeof todoLists=="undefined" || todoLists=="" ){
    console.log('entro aqui');
    localSettings.setString('todoLists',JSON.stringify(defaultValues));
    todoLists=localSettings.getString('todoLists');
}else{

    console.log('localSetting tiene algo');
    console.log(todoLists.length);
}



var lista_todos=new observableArray.ObservableArray(JSON.parse(todoLists));


data.set('lista_todos',lista_todos);

data.addNewItem=function(elitem){
    var newTodo = new ClaseTodo(elitem);
    defaultValues = JSON.parse(todoLists);
    defaultValues.push(newTodo);

    localSettings.setString('todoLists', JSON.stringify(defaultValues));
    todoLists = localSettings.getString('todoLists');
    var lista_todos=new observableArray.ObservableArray(JSON.parse(todoLists));
    data.set('lista_todos',lista_todos);
};

data.deleteAll=function(){
    localSettings.setString('todoLists', '');
    var lista_todos=new observableArray.ObservableArray([]);
    data.set('lista_todos',lista_todos);
};



/*
data.promptTodo=function(args){
    dialogs.prompt({
        title: "Agregar nuevo Item",
        message: "Ingresa el nombre:",
        okButtonText: "Agracar",
        cancelButtonText: "Cancelar",
        defaultText: "",
        inputType: dialogs.inputType.text
    }).then(function(promptResult){
        if (promptResult.result) {
            data.addNewItem(promptResult.text);
        }
    });
};
*/

module.exports=data;