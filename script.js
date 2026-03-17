/**
 * ELITE SPORT - Script Oficial v1.1
 * Centralizado e Corrigido
 */

const EliteSport = {
    // Inicializador
    init: function() {
        this.logicaLogin();
        this.logicaCadastro();
        this.logicaPix();
        this.logicaCartao(); // Agora inicializado corretamente
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
                let value = e.target.value.replace(/\D/g, ''); 
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
                inputPix.setSelectionRange(0, 99999);
                
                navigator.clipboard.writeText(inputPix.value).then(() => {
                    const textoOriginal = btnCopiar.innerText;
                    btnCopiar.innerText = "COPIADO!";
                    btnCopiar.style.background = "#fff";
                    btnCopiar.style.color = "#000";

                    setTimeout(() => {
                        btnCopiar.innerText = textoOriginal;
                        btnCopiar.style.background = ""; 
                        btnCopiar.style.color = "";
                    }, 2000);
                });
            });
        }
    },

    // 4. Lógica da tela de Cartão (Validação e Máscaras)
    logicaCartao: function() {
        const btnConfirmar = document.querySelector('#cartao-section .btn-neon');
        const inputNumero = document.querySelector('input[placeholder="0000 0000 0000 0000"]');
        const inputValidade = document.querySelector('input[placeholder="MM/AA"]');

        // Adiciona Máscara ao número do cartão (0000 0000...)
        if (inputNumero) {
            inputNumero.addEventListener('input', (e) => {
                let v = e.target.value.replace(/\D/g, '');
                v = v.replace(/(\d{4})(?=\d)/g, '$1 '); // Espaço a cada 4 dígitos
                e.target.value = v.substring(0, 19); // Limita tamanho
            });
        }

        // Adiciona Máscara à validade (MM/AA)
        if (inputValidade) {
            inputValidade.addEventListener('input', (e) => {
                let v = e.target.value.replace(/\D/g, '');
                if (v.length >= 2) v = v.substring(0, 2) + '/' + v.substring(2, 4);
                e.target.value = v;
            });
        }

        // Validação ao clicar em Confirmar
        if (btnConfirmar) {
            btnConfirmar.addEventListener('click', (e) => {
                const numero = document.querySelector('input[placeholder="0000 0000 0000 0000"]').value;
                const nome = document.querySelector('input[placeholder="NOME COMO NO CARTÃO"]').value;
                const validade = document.querySelector('input[placeholder="MM/AA"]').value;
                const cvv = document.querySelector('input[placeholder="123"]').value;
                const parcelas = document.querySelector('select').value;

                if (!numero || !nome || !validade || !cvv || !parcelas) {
                    e.preventDefault(); 
                    alert("⚠️ Por favor, preencha todos os dados do cartão.");
                } else {
                    console.log("Pagamento Validado!");
                }
            });
        }
    },

    // 5. Lógica Geral (Catálogo)
    logicaGeral: function() {
        const botoesAdicionar = document.querySelectorAll('.btn-small');
        botoesAdicionar.forEach(botao => {
            if (botao.innerText.toLowerCase().includes('adicionar')) {
                botao.addEventListener('click', () => {
                    console.log("Produto enviado para o carrinho.");
                });
            }
        });
    }
};

// Execução Única
document.addEventListener('DOMContentLoaded', () => {
    EliteSport.init();
});