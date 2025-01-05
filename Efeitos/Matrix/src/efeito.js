const Cnv =document.getElementById("matrix-effect");
const Ctx =Cnv.getContext('2d');

Cnv.width =window.innerWidth;
Cnv.height =window.innerHeight;

const FontSize =25;
const Effect =new Effect_class (Cnv.width ,Cnv.height, FontSize);

// predefinições da temporização: 
let lastTime =0;
const fps =15;
const nextFrame =1000/fps;
let timer =0;

// Evento para atualizar o canvas e o efeito sob as dimensões da tela:
window.addEventListener('resize' ,function(){
    Cnv.width =window.innerWidth;
    Cnv.height =window.innerHeight;
    Effect.Resize (Cnv.width ,Cnv.height);
});

// Função da animação do canvas: 
function Animate (timeStamp){
    const deltaTime =timeStamp -lastTime;
    lastTime =timeStamp;

    if (timer > nextFrame){
        Ctx.fillStyle ='rgba(0,0,0,0.1)';
        Ctx.textAlign ='center';
        Ctx.fillRect (0,0,Cnv.width ,Cnv.height);
        Ctx.font =`${Effect.fontSize}px monospace`;
        Effect.symbols.forEach(symbol => symbol.Draw (Ctx));
        timer =0;
    }
    else timer +=deltaTime
    
    requestAnimationFrame (Animate);
}

/*Ativa a animação: */ Animate (0);