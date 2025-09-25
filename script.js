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
const modal = document.getElementById("produtoModal");

const listaComentarios = document.getElementById("lista-comentarios");
const novoComentario = document.getElementById("novo-comentario");
const btnAdicionarComentario = document.getElementById("adicionar-comentario");
const mediaEstrelas = document.getElementById("media-estrelas");
const estrelasComentario = document.querySelectorAll(".avaliacao-comentario .estrela");

const closeModal = modal.querySelector(".close");
const imgModal = document.getElementById("modal-img");
const nomeModal = document.getElementById("modal-nome");
const precoModal = document.getElementById("modal-preco");
const tamanhosModal = document.getElementById("modal-tamanhos");
const materialModal = document.getElementById("modal-material");
const corModal = document.getElementById("modal-cor");

let usuarioAtual = JSON.parse(localStorage.getItem("usuarioLogado")); // exemplo de usuário logado
let comentarios = [];
let produtoAtualId = null;
let avaliacaoAtual = 0;

const produtos = [
        {
          nome: "Camisa elegante de manga longa bufante",
          preco: "R$79,99",
          img: "img/produto-1.png",
          tamanhos: "P, M, G",
          material: "Algodão",
          cor: "Cinza"
        },
        {
          nome: "Camisa de manga longa cinza escuro",
          preco: "R$79,99",
          img: "img/produto-2.png",
          tamanhos: "M, G",
          material: "Poliéster",
          cor: "Cinza escuro"
        },
        {
          nome: "Camisa chiffon branca estampada",
          preco: "R$75,00",
          img: "img/produto-3.png",
          tamanhos: "P, M",
          material: "Chiffon",
          cor: "Branco estampado"
        },
        {
          nome: "Blusa tricô cropped marrom",
          preco: "R$68,00",
          img: "img/produto-4.png",
          tamanhos: "Único",
          material: "Tricô",
          cor: "Marrom"
        },
        {
          nome: "Camisa branca + colete rosê",
          preco: "R$99,99",
          img: "img/produto-5.png",
          tamanhos: "P, M, G",
          material: "Algodão + Poliéster",
          cor: "Branco/Rosê"
        }
      ];

      // Pega todos os cards
      const cards = document.querySelectorAll(".grid-produtos .produto-card");

      cards.forEach((card, index) => {
        card.addEventListener("click", () => {
          const p = produtos[index];

          // Preenche o modal com os dados do produto
          imgModal.src = p.img;
          nomeModal.textContent = p.nome;
          precoModal.textContent = p.preco;
          tamanhosModal.textContent = p.tamanhos;
          materialModal.textContent = p.material;
          corModal.textContent = p.cor;

          // Abre o modal
          modal.style.display = "block";
        });
      });

      // Fechar modal
      closeModal.addEventListener("click", () => {
        modal.style.display = "none";
      });

      // Fechar clicando fora
      window.addEventListener("click", (e) => {
        if (e.target == modal) {
          modal.style.display = "none";
        }
      });


// Função para carregar comentários do localStorage
function carregarComentarios(produtoId){
    const dados = JSON.parse(localStorage.getItem(`comentarios-${produtoId}`));
    comentarios = dados ? dados : [];
    atualizarComentarios();
}

// Atualiza lista de comentários e média
function atualizarComentarios(){
    listaComentarios.innerHTML = "";
    if(comentarios.length === 0){
        mediaEstrelas.textContent = '☆☆☆☆☆';
        return;
    }
    let soma = 0;
    comentarios.forEach((c, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${c.usuarioNome}:</strong> ${c.texto} (${c.estrelas}★)
            ${usuarioAtual && c.usuarioId === usuarioAtual.id ? 
            `<span class="delete-comentario" style="cursor:pointer; color:red;" data-index="${index}">🗑️</span>` : ''}`;
        listaComentarios.appendChild(li);
        soma += c.estrelas;
    });
    const media = Math.round(soma / comentarios.length);
    mediaEstrelas.textContent = '★'.repeat(media) + '☆'.repeat(5-media);

    // Adiciona evento de deletar
    document.querySelectorAll('.delete-comentario').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = btn.dataset.index;
        comentarios.splice(idx,1);
        localStorage.setItem(`comentarios-${produtoAtualId}`, JSON.stringify(comentarios));
        atualizarComentarios();
      });
    });
}

// Atualiza estrelas do comentário
function atualizarEstrelasComentario(valor){
    estrelasComentario.forEach(estrela => {
        const valorEstrela = parseInt(estrela.dataset.value);
        estrela.classList.toggle('active', valorEstrela <= valor);
    });
}

// Clique nas estrelas
estrelasComentario.forEach(estrela => {
    estrela.addEventListener('click', () => {
        avaliacaoAtual = parseInt(estrela.dataset.value);
        atualizarEstrelasComentario(avaliacaoAtual);
    });
});

// Adicionar comentário
btnAdicionarComentario.addEventListener('click', () => {
    if(!usuarioAtual){
        alert("Você precisa estar logado para comentar!");
        return;
    }

    const texto = novoComentario.value.trim();
    if(texto && avaliacaoAtual > 0){
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

// Abrir modal do produto
document.querySelectorAll('.produto-card').forEach((card, index) => {
    card.addEventListener('click', () => {
        const produto = produtosData[index];
        produtoAtualId = produto.id;

        // Preenche modal
        modal.style.display = "block";
        modalImg.src = produto.img;
        modalNome.textContent = produto.nome;
        modalDescricao.textContent = produto.descricao;
        modalPreco.textContent = produto.preco;
        modalTamanhos.textContent = produto.tamanhos;
        modalMaterial.textContent = produto.material;
        modalCor.textContent = produto.cor;

        carregarComentarios(produto.id);
        novoComentario.value = "";
        avaliacaoAtual = 0;
        atualizarEstrelasComentario(avaliacaoAtual);
    });
});
