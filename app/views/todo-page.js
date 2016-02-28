/**
 * Created by jujomago on 24/02/2016.
 */

// aqui solo tendria que ir require para elementos de UI, no el acceso a los datos
var dialogs = require("ui/dialogs");
var frameModule=require("ui/frame");

var LocalNotifications=require('nativescript-local-notifications');

var todoData=require('./todoData');
var page,uilista,topmost;


exports.load=function(args){

    page = args.object;
    page.bindingContext=todoData;
    uilista=page.getViewById("UIListTodos");
    topmost=frameModule.topmost();







};

exports.agregarItem=function(){
    var nuevoItem=todoData.get('nuevo_item');
    console.log(nuevoItem);
    todoData.addNewItem(nuevoItem);
    todoData.set('nuevo_item','');
};

exports.modalNuevoItem=function(){
    console.log('lllaa');
    console.log(topmost);

    var navigationEntry = {
        moduleName: "views/form-new-todo",
        animated: true,
        transition: {
            name: "flip "
          //  duration: 380,
         //   curve: "easeOut"
        }
    };


    topmost.navigate(navigationEntry);
  /*  dialogs.prompt({
        title: "Agregar nuevo Item",
        message: "Ingresa el nombre:",
        okButtonText: "Agregar",
        cancelButtonText: "Cancelar",
        defaultText: "",
        inputType: dialogs.inputType.timePicker
    }).then(function(promptResult){
        if (promptResult.result) {

            todoData.addNewItem(promptResult.text);
        }
    });*/
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
            uilista.refresh();
        }
    });
};

exports.onCheckItem=function(args){




    var item = args.view.bindingContext;
    console.log('ON CHECK ITEM:')
    console.log('antes:');
    console.log(JSON.stringify(item));
    todoData.toogleCheck(item);
    uilista.refresh();
    console.log('despues:');
    console.log(JSON.stringify(item));
};

exports.onTapItem=function(args){
    console.log('on tap item');

    var actionBtns= ["Editar", "Borrar"];

    var currentItem = todoData.getItem(args.index);
    console.log('seleccionado:');
    console.log(JSON.stringify(currentItem));


    dialogs.action("Actualizar estado:","Cerrar",actionBtns)
        .then(function(result){
            switch(result) {
                case "Borrar":
                    dialogs.confirm({
                        title:currentItem.nombre,
                        message:"Seguro que desea borrarlo",
                        okButtonText:"Si",
                        cancelButtonText:"Cancelar"
                    }).then(function(res){
                        if(res){
                            todoData.deleteItem(args.index);
                        }
                    });
                    break;
                case "Editar":
                    dialogs.prompt({title:"Editar",
                        message:"Todo Edit Form:",
                        okButtonText:"Actualizar",
                        cancelButtonText:"Cancelar",
                        defaultText:currentItem.nombre,
                        inputType:dialogs.inputType.text
                    }).then(function(promptResult){
                        if(promptResult.result){
                            todoData.updateItem(args.index,currentItem,promptResult.text);
                        }
                    });
                    break;
            }
        });


};