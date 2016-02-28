/**
 * Created by jujomago on 24/02/2016.
 */

function Todo(nombre,recordatorio){
    this.nombre=nombre;
    this.completo=false; //default value
    this.recordatorio=recordatorio||{};
    //this.checkvalue="res://checkopen";
}



module.exports=Todo;