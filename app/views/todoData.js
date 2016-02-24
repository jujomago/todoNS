/**
 * Created by jujomago on 24/02/2016.
 */

var observableModule=require('data/observable'),
    observableArray=require('data/observable-array'),
    ClaseTodo=require('../shared/models/Todo'),
    data=new observableModule.Observable();




var lista_todos=new observableArray.ObservableArray([
    new ClaseTodo("Despertar"),
    new ClaseTodo('Codificar algo'),
    new ClaseTodo("publicar en github")
]);


data.set('lista_todos',lista_todos);

data.newItem=function(elitem){
    lista_todos.push(new ClaseTodo(elitem));
};


module.exports=data;