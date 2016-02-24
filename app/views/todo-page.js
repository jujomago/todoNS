/**
 * Created by jujomago on 24/02/2016.
 */
var todoData=require('./todoData');

exports.load=function(args){
    args.object.bindingContext=todoData;
};

exports.agregarItem=function(){
    var nuevoItem=todoData.get('nuevo_item');
    console.log(nuevoItem);
    todoData.newItem(nuevoItem);
    todoData.set('nuevo_item','');
};