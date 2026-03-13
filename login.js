// Organização do Projeto Elite Sport
const EliteSportApp = {
    init: function() {
        this.setSelectors();
        this.setEvents();
    },

    setSelectors: function() {
        // Login
        this.btnEntrar = document.getElementById('btn-entrar');
        this.btnIrCadastro = document.getElementById('btn-ir-cadastro');
        this.inputEmail = document.getElementById('email');
        this.inputSenha = document.getElementById('password');

        // Pix
        this.btnCopiarPix = document.querySelector('.pix-codigo-copia button');
        this.inputPix = document.querySelector('.pix-codigo-copia input');
        
        // Cadastro (CEP)
        this.inputCep = document.querySelector('input[placeholder="00000-000"]');
    },

    setEvents: function() {
        // Lógica de Login
        if (this.btnEntrar) {
            this.btnEntrar.addEventListener('click', () => this.handleLogin());
        }

        // Máscara de CEP automática
        if (this.inputCep) {
            this.inputCep.addEventListener('input', (e) => {
                let v = e.target.value.replace(/\D/g, '');
                if (v.length > 5) v = v.replace(/^(\d{5})(\d)/, '$1-$2');
                e.target.value = v;
            });
        }

        // Lógica de Copiar PIX
        if (this.btnCopiarPix && this.inputPix) {
            this.btnCopiarPix.addEventListener('click', () => {
                this.inputPix.select();
                navigator.clipboard.writeText(this.inputPix.value);
                
                const originalText = this.btnCopiarPix.innerText;
                this.btnCopiarPix.innerText = "COPIADO!";
                setTimeout(() => { this.btnCopiarPix.innerText = originalText; }, 2000);
            });
        }
    },

    handleLogin: function() {
        const email = this.inputEmail.value;
        const senha = this.inputSenha.value;

        if (!email || !senha) {
            alert("Preencha todos os campos!");
        } else {
            alert("Bem-vindo à Elite Sport!");
            window.location.href = "index.html";
        }
    }
};

// Inicia quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => EliteSportApp.init());