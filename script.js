/**
 * ELITE SPORT - Script Oficial v1.0
 * Organizado por módulos para funcionar em todas as telas
 */

const EliteSport = {
    // Inicializador
    init: function() {
        this.logicaLogin();
        this.logicaCadastro();
        this.logicaPix();
        this.logicaGeral();
    },

    // 1. Lógica da tela de Login
    logicaLogin: function() {
        const btnEntrar = document.getElementById('btn-entrar');
        if (btnEntrar) {
            btnEntrar.addEventListener('click', (e) => {
                const email = document.getElementById('email').value;
                const senha = document.getElementById('password').value;

                if (!email || !senha) {
                    alert("⚠️ Por favor, preencha todos os campos para entrar.");
                } else {
                    console.log("Login efetuado com sucesso!");
                    window.location.href = "index.html";
                }
            });
        }
    },

    // 2. Lógica da tela de Cadastro (Máscara de CEP)
    logicaCadastro: function() {
        const inputCep = document.querySelector('input[placeholder="00000-000"]');
        if (inputCep) {
            inputCep.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, ''); // Remove letras
                if (value.length > 5) {
                    value = value.replace(/^(\d{5})(\d)/, '$1-$2');
                }
                e.target.value = value;
            });
        }
    },

    // 3. Lógica da tela de PIX (Copiar Código)
    logicaPix: function() {
        const btnCopiar = document.querySelector('.pix-codigo-copia button');
        const inputPix = document.querySelector('.pix-codigo-copia input');

        if (btnCopiar && inputPix) {
            btnCopiar.addEventListener('click', () => {
                inputPix.select();
                inputPix.setSelectionRange(0, 99999); // Para dispositivos móveis
                
                navigator.clipboard.writeText(inputPix.value).then(() => {
                    const textoOriginal = btnCopiar.innerText;
                    btnCopiar.innerText = "COPIADO!";
                    btnCopiar.style.background = "#fff";
                    btnCopiar.style.color = "#000";

                    setTimeout(() => {
                        btnCopiar.innerText = textoOriginal;
                        btnCopiar.style.background = ""; // Volta ao CSS original
                        btnCopiar.style.color = "";
                    }, 2000);
                });
            });
        }
    },

    // 4. Lógica para botões "Adicionar" no catálogo
    logicaGeral: function() {
        const botoesAdicionar = document.querySelectorAll('.btn-small');
        botoesAdicionar.forEach(botao => {
            if (botao.innerText.toLowerCase().includes('adicionar')) {
                botao.addEventListener('click', () => {
                    console.log("Produto enviado para o carrinho.");
                    // Aqui você poderia somar ao contador do carrinho
                });
            }
        });
    }
};

// Executa assim que o navegador terminar de carregar o HTML
document.addEventListener('DOMContentLoaded', () => {
    EliteSport.init();
});