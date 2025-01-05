class Symbol_class{
    constructor (x, y, fontSize, canvasHeight){
        this.x =x;
        this.y =y;
        this.fontSize =fontSize;
        this.canvasHeight =canvasHeight;
    }

    // Função de desenhar caractere no canvas: 
    Draw (context){
        // escolhe randomicamente uma classe/conjunto de caracteres já predefinida(o):
        const x =Math.floor(Math.random() *SimbolsList.length);
        const newGroup =SimbolsList[x].chars;
        
        // escolhe randomicamente um dos caracteres:
        const newChar =newGroup.charAt(Math.floor(Math.random() *newGroup.length));
        
        // define a cor da fonte conforme o conjunto e desenha: 
        context.fillStyle =SimbolsList[x].color;
        context.fillText (newChar, this.x *this.fontSize, this.y *this.fontSize);
        
        // regula os limites das linhas no eixo 'y' para os blocos de desenho:
        if (this.y *this.fontSize > this.canvasHeight && Math.random() > 0.9) this.y =0
        else this.y +=1
    }
}

class Effect_class {
    constructor (canvasWidth ,canvasHeight, fSize){
        this.canvasWidth =canvasWidth;
        this.canvasHeight =canvasHeight;
        this.fontSize =fSize;
        this.columns =this.canvasWidth/this.fontSize;
        this.symbols =[];
        this.Initialize ();
    }

    // Função que inicializa o array 'symbols' com suas propriedades:
    Initialize (){
        // Posição nos pixels: 
        //  - Eixo 'x' é linear, calculado conforme a quantidade de colunas.
        //  - Eixo 'y' é randômico, desde o -50 ao 0 pixel.

        for (let i =0; i < this.columns; i++) 
            this.symbols[i] =new Symbol_class (i ,0 -(Math.random() *50) ,this.fontSize ,this.canvasHeight)
        
    }
    
    // Função que (re)define o tamanho da área de desenho e atualiza as colunas: 
    Resize (width, height){
        this.canvasWidth =width;
        this.canvasHeight =height;
        this.columns =this.canvasWidth /this.fontSize;
        this.symbols =[];
        this.Initialize ();
    }
}