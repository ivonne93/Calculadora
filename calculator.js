class Calculator{

    //CONSTRUCTOR
    constructor(operand1Element, operand2Element){
       this.operand1Element = operand1Element;
       this.operand2Element = operand2Element;
       this.clear();
    }

    //METODO PARA LIMPIAR LO ELEMENTOS
    clear(){
        this.operand1 = 0;
        this.operand2 = 0;
        this.operator = '';
        this.updateUI();
    }

    //METODO  PARA ACTULIZAR LA INTERFAZ DE USUARIO
    updateUI(){
        this.operand1Element.innerHTML = this.operand1 + this.operator;//SE PONGA EL 0 AL PRINCIPIO, son valores por defecto al principio
        this.operand2Element.innerHTML = this.operand2;
    }

    //Método es útil para agregar dígitos al segundo operando de la calculadora 
    appendNumber(number) {
        if (number === "." && this.operand2.includes('.')) return;

        this.operand2 = this.operand2 === 0 
            ? number
            : this.operand2.toString() + number;

        this.updateUI();
    }
    

    //METODO PARA BORRAR NUMEROS ->
    delete(){
        if(this.operand2 === 0) return;//si tiene cero 
        this.operand2 = +this.operand2.toString().slice(0 , -1);//sino que regrese una posicion
        this.updateUI();
    }

    //OPRACIONES
    operation(operator){

      if(this.operator){
        //calc
        this.calc();
      }

      this.operator = operator;
      this.operand1 = +this.operand2 === 0 ? this.operand1 :this.operand2;
      this.operand2 = 0;/*es para cuando ponga el primer numero la parte de abjo quede en 0 */
      this.updateUI();
    }

    calc(){
       switch(this.operator){
        case "+":
           this.operand1 = +this.operand1 + +this.operand2; //con el simbolo de + lo pasmos a numero
        break;

        case "-":
            this.operand1 = +this.operand1 - +this.operand2;
        break;

        case "*":
            this.operand1 = +this.operand1 * +this.operand2;
        break;

        case "/":
            this.operand1 = +this.operand1 / +this.operand2;
        break;
       
       }
       this.operator = "";
       this.operand2 = 0;
       this.updateUI();
    }

}



//// Selecciona el elemento del DOM con el atributo data-operand-1 y lo asigna a la variable
const operand1Element = document.querySelector("[data-operand-1]");
const operand2Element = document.querySelector("[data-operand-2]");
const clearButton = document.querySelector("[data-clear]");
const numberButtons = document.querySelectorAll("[data-number]");
const deleteButton = document.querySelector("[data-delete]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");

//es el objeto
const calculator = new Calculator(operand1Element, operand2Element);



//EVENTOS
clearButton.addEventListener("click", () => {
    calculator.clear();
});

//PARA RECORRER TODOS LOS NUMEROS data-number
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerHTML);
    })
});

//<- quitar numeros
deleteButton.addEventListener('click', () =>{
    calculator.delete();
})

//operaciones
operationButtons.forEach(button => {
  button.addEventListener("click", ()=>{
     calculator.operation(button.innerHTML);
  });
});

//igual
equalsButton.addEventListener("click", ()=> {
    calculator.calc();
} );