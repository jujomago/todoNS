/**
 * Created by jujomago on 27/02/2016.
 */
var todoData=require('./todoData');
var dialogs = require("ui/dialogs");
var application=require("application");
var frameModule=require("ui/frame");



var topmost,page;

exports.loaded=function(args){
  page=args.object;
  page.bindingContext=todoData;
  topmost=frameModule.topmost();
};

exports.GuardarTodo=function(){
    varlorinput=page.getViewById('textoNewTodo').text;

    var nuevaEntrada={
        valor:varlorinput,
        recordatorio:{}
    };

    if(todoData.get('valorSwitch')){
        nuevaEntrada.recordatorio.hora=page.getViewById('timeNewTodo').hour;
        nuevaEntrada.recordatorio.minuto=page.getViewById('timeNewTodo').minute;
    }

    todoData.addNewItem(nuevaEntrada);

    //return;
    if(page.android){
        var Toast=android.widget.Toast;
        Toast.makeText(application.android.context,'Se agrego el nuevo Item correctamente',Toast.LENGTH_LONG).show();
        topmost.goBack();
    }else{
        dialogs.alert("Se agrego el nuevo Item correctamente").then(function() {
            console.log("Dialog closed!");
            topmost.goBack();
        });
    }
};

exports.atras=function(){
  topmost.goBack();
};