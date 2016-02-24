/**
 * Created by jujomago on 24/02/2016.
 */
var todoData=require('./todoData');
var LaClaseTodo=require('../shared/models/Todo');

exports.load=function(args){
    args.object.bindingContext=todoData;
};

exports.agregarItem=function(){
    var nuevoItem=todoData.get('nuevo_item');
    console.log(nuevoItem);
 //   console.log(todoData.get('lista_todos'));

   todoData.get('lista_todos').push(new LaClaseTodo(nuevoItem));
    todoData.set('nuevo_item','');
};