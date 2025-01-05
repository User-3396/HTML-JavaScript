const Cnv =document.querySelector('canvas#background');
const Ctx =Cnv.getContext('2d');
const Mouse ={x: null ,y: null, rightClick: false, leftClick: false};

// Regulagem do canvas: 
Cnv.width =window.innerWidth;
Cnv.height =window.innerHeight;

// Automatizar a regulagem da tela: 
window.addEventListener ('resize' ,function (){
    Cnv.width =window.innerWidth;
    Cnv.height =window.innerHeight;
    
});

// Eventos do click sobre o canvas: 
Cnv.onmousedown =(e)=>{
    if (e.button == 0) Mouse.leftClick =true;
    if (e.button == 1) Mouse.rightClick =true;
}

Cnv.onmouseup =(e)=>{
    if (e.button == 0) Mouse.leftClick =false;
    if (e.button == 1) Mouse.rightClick =false;
}

// Código para evitar desfunção de eventos do mouse: 
Cnv.onmouseleave =()=>{Mouse.leftClick =false; Mouse.rightClick =false;}

// Funções para automação gráfica do canvas:

function RadialColorGold (x ,y ,size){
    let radGradient =Ctx.createRadialGradient (x ,y ,0 ,x ,y ,size);
    radGradient.addColorStop(0 ,'white');
    radGradient.addColorStop(0.1 ,'gold');
    radGradient.addColorStop(0.125 ,'rgba(255,215,0,0.5)');
    radGradient.addColorStop(0.2 ,'rgba(255,215,0,0.33)');
    radGradient.addColorStop(0.33 ,'rgba(255,215,0,0.2)');
    radGradient.addColorStop(1 ,'rgba(0,0,0,0)');
    return radGradient;
}

function DrawLine (width ,points ,color){
    Ctx.beginPath ();
    Ctx.strokeStyle =color;
    Ctx.lineWidth =width;
    Ctx.moveTo (points.a.x ,points.a.y);
    Ctx.lineTo (points.b.x ,points.b.y);
    Ctx.stroke ();
    Ctx.closePath ();
}

function DrawCircle (point, size){
    Ctx.fillStyle =RadialColorGold (point.x ,point.y ,size);
    Ctx.beginPath ();
    Ctx.arc (point.x ,point.y ,size ,0 ,Math.PI *2);
    Ctx.fill (); 
    Ctx.closePath (); 
}
