/**
 * Created by jujomago on 24/02/2016.
 */

// aqui solo tendria que ir require para elementos de UI, no el acceso a los datos
var dialogs = require("ui/dialogs");
var todoData=require('./todoData');

exports.load=function(args){
    args.object.bindingContext=todoData;
};

exports.agregarItem=function(){
    var nuevoItem=todoData.get('nuevo_item');
    console.log(nuevoItem);
    todoData.addNewItem(nuevoItem);
    todoData.set('nuevo_item','');
};

exports.modalNuevoItem=function(){
    dialogs.prompt({
        title: "Agregar nuevo Item",
        message: "Ingresa el nombre:",
        okButtonText: "Agregar",
        cancelButtonText: "Cancelar",
        defaultText: "",
        inputType: dialogs.inputType.text
    }).then(function(promptResult){
        if (promptResult.result) {
            todoData.addNewItem(promptResult.text);
        }
    });
};

exports.modalBorrarTodo=function(){
    dialogs.confirm({
        title: "Seguro?",
        message: "Seguro que deseas Borrar Todo?",
        okButtonText: "Si, Seguro",
        cancelButtonText: "Cancelar"
    }).then(function(result){
        if(result) {
            todoData.deleteAll();
        }
    });
};