// ===================== FUNÇÕES DE ACESSIBILIDADE =====================
function aumentarFonte() {
    document.querySelectorAll("*").forEach(function(el) {
        const currentSize = parseFloat(getComputedStyle(el).fontSize);
        el.style.fontSize = currentSize + 2 + 'px';
    });
}

function diminuirFonte() {
    document.querySelectorAll("*").forEach(function(el) {
        const currentSize = parseFloat(getComputedStyle(el).fontSize);
        el.style.fontSize = currentSize - 2 + 'px';
    });
}

// ===================== VARIÁVEIS DO MODAL =====================
const modal = document.getElementById("produtoModal");
const closeModal = modal.querySelector(".close");

const imgModal = document.getElementById("modal-img");
const nomeModal = document.getElementById("modal-nome");
const precoModal = document.getElementById("modal-preco");
const tamanhosModal = document.getElementById("modal-tamanhos");
const materialModal = document.getElementById("modal-material");
const corModal = document.getElementById("modal-cor");

// ===================== PRODUTOS =====================
const produtos = [
    { id: 0, nome: "Camisa elegante de manga longa bufante", preco: "R$79,99", img: "img/produto-1.png", tamanhos: "P, M, G", material: "Algodão", cor: "Cinza" },
    { id: 1, nome: "Camisa de manga longa cinza escuro", preco: "R$79,99", img: "img/produto-2.png", tamanhos: "M, G", material: "Poliéster", cor: "Cinza escuro" },
    { id: 2, nome: "Camisa chiffon branca estampada", preco: "R$75,00", img: "img/produto-3.png", tamanhos: "P, M", material: "Chiffon", cor: "Branco estampado" },
    { id: 3, nome: "Blusa tricô cropped marrom", preco: "R$68,00", img: "img/produto-4.png", tamanhos: "Único", material: "Tricô", cor: "Marrom" },
    { id: 4, nome: "Camisa branca + colete rosê", preco: "R$99,99", img: "img/produto-5.png", tamanhos: "P, M, G", material: "Algodão + Poliéster", cor: "Branco/Rosê" }
];

// ===================== ABRIR MODAL DO PRODUTO =====================
document.querySelectorAll('.produto-card').forEach((card, index) => {
    card.addEventListener('click', () => {
        const produto = produtos[index];

        // Preenche modal
        imgModal.src = produto.img;
        nomeModal.textContent = produto.nome;
        precoModal.textContent = produto.preco;
        tamanhosModal.textContent = produto.tamanhos;
        materialModal.textContent = produto.material;
        corModal.textContent = produto.cor;

        // Abre modal
        modal.style.display = "block";
    });
});

// ===================== FECHAR MODAL =====================
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// Simulação de login (troque depois pelo sistema real)
let usuarioAtual = { id: 1, nome: "Usuário Teste" };

let comentarios = [];
let produtoAtualId = null;
let avaliacaoAtual = 0;

// Elementos
const listaComentarios = document.getElementById("lista-comentarios");
const mediaEstrelas = document.getElementById("media-estrelas");
const novoComentario = document.getElementById("novo-comentario");
const btnAdicionarComentario = document.getElementById("adicionar-comentario");
const estrelasComentario = document.querySelectorAll(".avaliacao-comentario .estrela");

// ===================== CARREGAR COMENTÁRIOS =====================
function carregarComentarios(produtoId) {
    produtoAtualId = produtoId;
    const dados = JSON.parse(localStorage.getItem(`comentarios-${produtoId}`));
    comentarios = dados ? dados : [];
    atualizarComentarios();
}

// ===================== ATUALIZAR COMENTÁRIOS =====================
function atualizarComentarios() {
    listaComentarios.innerHTML = "";
    if (comentarios.length === 0) {
        mediaEstrelas.textContent = '☆☆☆☆☆';
        return;
    }

    let soma = 0;
    comentarios.forEach((c, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${c.usuarioNome}:</strong> ${c.texto} (${c.estrelas}★)
            ${usuarioAtual && c.usuarioId === usuarioAtual.id
                ? `<span class="delete-comentario" style="cursor:pointer; color:red;" data-index="${index}">🗑️</span>`
                : ''}`;
        listaComentarios.appendChild(li);
        soma += c.estrelas;
    });

    const media = Math.round(soma / comentarios.length);
    mediaEstrelas.textContent = '★'.repeat(media) + '☆'.repeat(5 - media);

    // Atualiza nota no card do produto, se houver
    const cardMedia = document.querySelector(`.produto-card[data-id="${produtoAtualId}"] .media-card`);
    if(cardMedia) cardMedia.textContent = mediaEstrelas.textContent;

    // Eventos de deletar
    document.querySelectorAll('.delete-comentario').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = btn.dataset.index;
            comentarios.splice(idx, 1);
            localStorage.setItem(`comentarios-${produtoAtualId}`, JSON.stringify(comentarios));
            atualizarComentarios();
        });
    });
}

// ===================== ATUALIZAR ESTRELAS DO COMENTÁRIO =====================
function atualizarEstrelasComentario(valor) {
    estrelasComentario.forEach(estrela => {
        const valorEstrela = parseInt(estrela.dataset.value);
        if(valorEstrela <= valor){
            estrela.classList.add('active');
        } else {
            estrela.classList.remove('active');
        }
    });
}

// ===================== CLIQUE NAS ESTRELAS =====================
estrelasComentario.forEach(estrela => {
    estrela.addEventListener('click', () => {
        avaliacaoAtual = parseInt(estrela.dataset.value);
        atualizarEstrelasComentario(avaliacaoAtual);
    });

    // Hover (opcional para efeito visual)
    estrela.addEventListener('mouseover', () => {
        const valorHover = parseInt(estrela.dataset.value);
        estrelasComentario.forEach(e => {
            const val = parseInt(e.dataset.value);
            e.classList.toggle('hover', val <= valorHover);
        });
    });
    estrela.addEventListener('mouseout', () => {
        estrelasComentario.forEach(e => e.classList.remove('hover'));
    });
});

// ===================== ADICIONAR COMENTÁRIO =====================
btnAdicionarComentario.addEventListener('click', () => {
    if (!usuarioAtual) {
        alert("Você precisa estar logado para comentar!");
        return;
    }

    const texto = novoComentario.value.trim();
    if (texto && avaliacaoAtual > 0) {
        comentarios.push({
            texto: texto,
            estrelas: avaliacaoAtual,
            usuarioId: usuarioAtual.id,
            usuarioNome: usuarioAtual.nome
        });
        localStorage.setItem(`comentarios-${produtoAtualId}`, JSON.stringify(comentarios));
        atualizarComentarios();
        novoComentario.value = "";
        avaliacaoAtual = 0;
        atualizarEstrelasComentario(avaliacaoAtual);
    } else {
        alert("Escolha uma avaliação e escreva seu comentário!");
    }
});

// VITÓRIA

const mode = document.getElementById('mode_icon');

if (mode) {
    mode.addEventListener('click', () => {
        let form = document.getElementById('login_form') || document.getElementById('cadastro_form') || document.getElementById('esqueceu_form');
        if (form) {
            if (mode.classList.contains('fa-moon')) {
                mode.classList.remove('fa-moon');
                mode.classList.add('fa-sun');
                form.classList.add('dark');
                return;
            }
            mode.classList.remove('fa-sun');
            mode.classList.add('fa-moon');
            form.classList.remove('dark');
        }
    });
}

// Função para mostrar mensagem de erro
function showMessage(msg) {
    let oldMsg = document.getElementById('form-message');
    if (oldMsg) oldMsg.remove();

    let div = document.createElement('div');
    div.id = 'form-message';
    div.style.margin = '10px 0';
    div.style.padding = '10px';
    div.style.borderRadius = '6px';
    div.style.fontWeight = 'bold';
    div.style.textAlign = 'center';
    div.style.fontSize = '15px';
    div.style.background = '#ffe5e0';
    div.style.color = '#cc522f';
    div.innerText = msg;

    let form = document.getElementById('login_form') || document.getElementById('cadastro_form') || document.getElementById('esqueceu_form');
    form.insertBefore(div, form.firstChild);
}

// Função para mostrar mensagem de sucesso
function showSuccess(msg) {
    let oldMsg = document.getElementById('form-message');
    if (oldMsg) oldMsg.remove();

    let div = document.createElement('div');
    div.id = 'form-message';
    div.style.margin = '10px 0';
    div.style.padding = '10px';
    div.style.borderRadius = '6px';
    div.style.fontWeight = 'bold';
    div.style.textAlign = 'center';
    div.style.fontSize = '15px';
    div.style.background = '#e0ffe5';
    div.style.color = '#2e7d32';
    div.innerText = msg;

    let form = document.getElementById('login_form') || document.getElementById('cadastro_form') || document.getElementById('esqueceu_form');
    form.insertBefore(div, form.firstChild);
}

// Cadastro
const cadastroForm = document.getElementById('cadastro_form');
if (cadastroForm) {
    cadastroForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('password').value.trim();
        const confirmSenha = document.getElementById('confirm_password').value.trim();

        if (!nome || !email || !senha || !confirmSenha) {
            showMessage('Por favor, preencha todos os campos.');
            return;
        }

        if (senha.length < 6) {
            showMessage('A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        if (senha !== confirmSenha) {
            showMessage('As senhas não coincidem.');
            return;
        }

        // Salva os dados no localStorage
        localStorage.setItem('user_nome', nome);
        localStorage.setItem('user_email', email);
        localStorage.setItem('user_senha', senha);

        showSuccess('Cadastro realizado com sucesso! Redirecionando para o login...');

        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1800);
    });

    // Botão de voltar para login já é um <a href="login.html">, não precisa JS
}

// Login
const loginForm = document.getElementById('login_form');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('password').value.trim();

        // Busca dados salvos
        const savedNome = localStorage.getItem('user_nome');
        const savedEmail = localStorage.getItem('user_email');
        const savedSenha = localStorage.getItem('user_senha');

        if (!nome || !email || !senha) {
            showMessage('Por favor, preencha todos os campos.');
            return;
        }

        if (
            nome === savedNome &&
            email === savedEmail &&
            senha === savedSenha
        ) {
            showSuccess('Login realizado com sucesso! Redirecionando...');
            setTimeout(() => {
                window.location.href = 'index.html'; // Página inicial
            }, 1200);
        } else {
            showMessage('Nome, e-mail ou senha incorretos.');
        }
    });

    // Link para "Esqueceu a senha?"
    const forgot = document.getElementById('forgot_password');
    if (forgot) {
        forgot.innerHTML = '<a href="senha.html">Esqueceu sua senha?</a>';
    }
}

// Esqueceu senha
const esqueceuForm = document.getElementById('esqueceu_form');
if (esqueceuForm) {
    esqueceuForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        const newPass = document.getElementById('new_password').value.trim();
        const confirmPass = document.getElementById('confirm_new_password').value.trim();

        const savedEmail = localStorage.getItem('user_email');
        console.log('Digitado:', email, 'Salvo:', savedEmail);

        if (!email || !newPass || !confirmPass) {
            showMessage('Por favor, preencha todos os campos.');
            return;
        }
        if (newPass.length < 6) {
            showMessage('A nova senha deve ter pelo menos 6 caracteres.');
            return;
        }
        if (newPass !== confirmPass) {
            showMessage('As senhas não coincidem.');
            return;
        }
        if (email !== savedEmail) {
            showMessage('E-mail não cadastrado.');
            return;
        }

        localStorage.setItem('user_senha', newPass);
        showSuccess('Senha alterada com sucesso! Redirecionando para o login...');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    });

    // Botão de voltar para login já é um <a href="login.html">, não precisa JS
}
