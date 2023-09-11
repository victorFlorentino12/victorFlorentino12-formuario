class FormValidity {
    constructor(){
        this.form = document.querySelector('.form')
        this.events();
        this.name = document.querySelector('.name')
        this.lastName = document.querySelector('.last-name')
        this.user = document.querySelector('.user')
        this.password = document.querySelector('.password')
        this.passwordReapet = document.querySelector('.password-repeat')
    }
    events(){
        this.form.addEventListener('submit', e=>{
            this.handleSubmit(e);
        });
    }
    handleSubmit(e){
     e.preventDefault();
     console.log('nao enviado')  
    const isValid = this.checkField()
    }
    checkField(){
        let valid = true
        for(let errText of this.form.querySelectorAll('.err')){
            errText.remove();
        }
        for(let field of this.form.querySelectorAll('.valid')){
            const label = field.previousElementSibling.innerHTML
            if(!field.value){
            console.log('vazio')
            this.creatMistake(field, `Campo ${label} não preenchido`)
            valid = false
            
            }
            if(field.classList.contains('cpf')){
                if(!this.validaCPF(field)) valid = false;
        
            }
            if(field.classList.contains('user')){
                if(!this.validUser(field)) valid = false;
            }
        }
    }
    validUser(field){
        const user = field.value
        let valid = true
        if(user.length > 12 || user.length < 3 ){
            this.creatMistake(field, 'Usuario precisa ter no minimo 3 e no maximo 12 caracteres')
            valid = false
        }
        if(!user.match(/^[a-zA-Z0-9]+$/g)){
            this.creatMistake(field, 'Usuario só pode conter letras e numeros')
        }
    }
    validaCPF(field){
        const cpf = new ValidaCPF(field.value);
        if(!cpf.valida()){
            this.creatMistake(field, 'CPF invalido')
            return false
        }
         return true
        
    }
    
    creatMistake(field, msg){
        const div = document.createElement('div')
        div.innerHTML = msg
        div.classList.add('err')
        field.insertAdjacentElement('afterend', div)
    }
}
const validity = new FormValidity();