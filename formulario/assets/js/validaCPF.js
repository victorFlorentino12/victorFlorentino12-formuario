class ValidaCPF {
    constructor(cpfEnviado){
        Object.defineProperty(this, 'cpfLimpo', {
            writable:false,
            enumerable:true,
            configurable:false,
            value: cpfEnviado.replace(/\D+/g, '')
        });
    }
    sequencia(){
        return this.cpfLimpo.charAt(0).repeat(this.cpfLimpo.length) === this.cpfLimpo;
    }
    gerarNovoCpf(){
        const cpfSemDigitos = this.cpfLimpo.slice(0,-2);
        const digito1 = this.gerarDigito(cpfSemDigitos);
        const digito2 = this.gerarDigito(cpfSemDigitos + digito1);
        this.novoCPF = cpfSemDigitos + digito1 + digito2;
    }
    gerarDigito(cpfSemDigitos){
        let total = 0
        let reverso = cpfSemDigitos.length + 1
        for(let stringNumerica of cpfSemDigitos){
            total += reverso * Number(stringNumerica)
            reverso--;
        }
        const digito = 11 - (total % 11)
        return digito <= 9 ? String(digito):'0';
    }
    valida() {
        if(!this.cpfLimpo) return false;
        if(typeof this.cpfLimpo !== 'string') return false;
        if(this.cpfLimpo.length !== 11) return false
        if(this.sequencia()) return false
        this.gerarNovoCpf();
        console.log(this.novoCPF)
        return this.novoCPF === this.cpfLimpo
    }
}

