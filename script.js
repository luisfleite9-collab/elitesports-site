/**
 * ELITE SPORT - Script Oficial v1.3
 * Centralizado, Corrigido e com Validação de Login, Cadastro e Cartão
 */

const EliteSport = {
    // Inicializador - Roda todas as funções ao carregar a página
    init: function() {
        this.logicaLogin();
        this.logicaCadastro();
        this.logicaPix();
        this.logicaCartao(); 
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
                    // Impede o redirecionamento se os campos estiverem vazios
                    e.preventDefault(); 
                    alert("⚠️ Por favor, preencha todos os campos para entrar.");
                } else {
                    console.log("Login efetuado com sucesso!");
                    // Redireciona manualmente para garantir que a validação passou
                    window.location.href = "index.html";
                }
            });
        }
    },

    // 2. Lógica da tela de Cadastro (Máscara de CEP e Validação)
    logicaCadastro: function() {
        const inputCep = document.querySelector('input[placeholder="00000-000"]');
        // Seleciona o botão de cadastro dentro da section correta
        const btnCadastrar = document.querySelector('#cadastro-section .btn-neon, #cadastro-section .btn-large');

        // Máscara de CEP
        if (inputCep) {
            inputCep.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, ''); 
                if (value.length > 5) {
                    value = value.replace(/^(\d{5})(\d)/, '$1-$2');
                }
                e.target.value = value;
            });
        }

        // Validação de campos vazios no Cadastro
        if (btnCadastrar) {
            btnCadastrar.addEventListener('click', (e) => {
                const inputs = document.querySelectorAll('#cadastro-section input');
                let algumVazio = false;

                inputs.forEach(input => {
                    if (input.value.trim() === "") {
                        algumVazio = true;
                    }
                });

                if (algumVazio) {
                    e.preventDefault(); 
                    alert("⚠️ Por favor, preencha todos os dados de cadastro.");
                } else {
                    console.log("Cadastro preenchido com sucesso!");
                }
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

        // Máscara Número do Cartão
        if (inputNumero) {
            inputNumero.addEventListener('input', (e) => {
                let v = e.target.value.replace(/\D/g, '');
                v = v.replace(/(\d{4})(?=\d)/g, '$1 '); 
                e.target.value = v.substring(0, 19); 
            });
        }

        // Máscara Validade (MM/AA)
        if (inputValidade) {
            inputValidade.addEventListener('input', (e) => {
                let v = e.target.value.replace(/\D/g, '');
                if (v.length >= 2) v = v.substring(0, 2) + '/' + v.substring(2, 4);
                e.target.value = v;
            });
        }

        // Validação Final do Cartão
        if (btnConfirmar) {
            btnConfirmar.addEventListener('click', (e) => {
                const numero = document.querySelector('input[placeholder="0000 0000 0000 0000"]').value;
                const nome = document.querySelector('input[placeholder="NOME COMO NO CARTÃO"]').value;
                const validade = document.querySelector('input[placeholder="MM/AA"]').value;
                const cvv = document.querySelector('input[placeholder="123"]').value;
                const parcelas = document.querySelector('select') ? document.querySelector('select').value : true;

                if (!numero || !nome || !validade || !cvv || !parcelas) {
                    e.preventDefault(); 
                    alert("⚠️ Por favor, preencha todos os dados do cartão.");
                } else {
                    console.log("Pagamento Validado!");
                }
            });
        }
    },

    // 5. Lógica Geral (Botões Adicionar)
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

// Dispara o inicializador quando o HTML estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    EliteSport.init();
});