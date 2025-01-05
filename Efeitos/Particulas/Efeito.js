const Velocity =3;
const Desaceleration =0.97;
var ParticlesArray =[];

// Classe da particula: 
class Particle_Class {

    constructor (){
        this.x =Mouse.x; this.y =Mouse.y;
        this.size =Math.random() *50 +1;
        this.speedX =Math.random() *Velocity -Velocity/2;
        this.speedY =Math.random() *Velocity -Velocity/2;
        
    }

    UpdatePhysics (desAcel){
        this.x +=this.speedX;
        this.y +=this.speedY;
        this.speedX *=desAcel;
        this.speedY *=desAcel;
        if (this.size > 0.4) this.size -=0.4;
    }

}

Cnv.onmousemove =(e)=>{
    Mouse.x =e.x; Mouse.y =e.y;
    
    if (Mouse.leftClick){
        let newParticle =new Particle_Class(); 
        ParticlesArray.push(newParticle);
    }
}

// Funcionalidade do sistema de partículas: 
function HandleParticles (){
    let n =ParticlesArray.length;

    for (let i =0; i < n; i++){
        
        ParticlesArray[i].UpdatePhysics (Desaceleration); // < calcular física da partícula
        const pointA ={x: ParticlesArray[i].x, y: ParticlesArray[i].y};
        
        // Lógica no 'for' para evitar redundâncias: 
        for (let j =i+1; j < n && j != i; j++){
            const pointB ={x: ParticlesArray[j].x, y: ParticlesArray[j].y};
            const dx =ParticlesArray[i].x -ParticlesArray[j].x;
            const dy =ParticlesArray[i].y -ParticlesArray[j].y;
            const distance =Math.sqrt(dx*dx +dy*dy);

            if (distance < 100) 
                DrawLine (ParticlesArray[i].size *0.02, {a: pointA, b: pointB}, 'rgba(0,255,255,0.5)');
        }

        DrawCircle (pointA, ParticlesArray[i].size); // < desenhar no canvas a partícula

        if (ParticlesArray[i].size < Desaceleration){
            ParticlesArray.splice(i ,1); 
            i--; 
            n =ParticlesArray.length;
        }
    }
    
}

// Funcionalidades da animação: 
function Animate (){
    Ctx.clearRect (0 ,0 ,Cnv.width ,Cnv.height);
    Ctx.fillStyle ='rgba(0,0,0,0.6)';
    Ctx.fillRect (0 ,0 ,Cnv.width ,Cnv.height);
    
    HandleParticles ();
    requestAnimationFrame (Animate);
}

/*Ativação da animação: */ Animate ();



