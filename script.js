// As funções podem ser definidas aqui e serão globais para o onclick funcionar
function aumentarFonte() {
  document.querySelectorAll("*").forEach(el => {
    // Usamos 'getComputedStyle' para pegar o tamanho atual
    const size = parseFloat(getComputedStyle(el).fontSize);
    // Adicionamos 2px
    el.style.fontSize = size + 2 + "px";
  });
}

function diminuirFonte() {
  document.querySelectorAll("*").forEach(el => {
    // Usamos 'getComputedStyle' para pegar o tamanho atual
    const size = parseFloat(getComputedStyle(el).fontSize);
    // Subtraímos 2px
    el.style.fontSize = size - 2 + "px";
  });
}

document.addEventListener("DOMContentLoaded", () => {

  // ===================== MODAL DE PRODUTO =====================
  const modal = document.getElementById("produtoModal");
  if (modal) {
    const closeModal = modal.querySelector(".close");
    const imgModal = document.getElementById("modal-img");
    const nomeModal = document.getElementById("modal-nome");
    const precoModal = document.getElementById("modal-preco");
    const tamanhosModal = document.getElementById("modal-tamanhos");
    const materialModal = document.getElementById("modal-material");
    const corModal = document.getElementById("modal-cor");

const produtos = [
    { id: 0, nome: "Camisa elegante de manga longa bufante", preco: "R$79,99", img: "img/produto-1.png", tamanhos: "P, M, G", material: "Algodão", cor: "Cinza" },
    { id: 1, nome: "Camisa de manga longa cinza escuro", preco: "R$79,99", img: "img/produto-2.png", tamanhos: "M, G", material: "Poliéster", cor: "Cinza escuro" },
    { id: 2, nome: "Camisa chiffon branca estampada", preco: "R$75,00", img: "img/produto-3.png", tamanhos: "P, M", material: "Chiffon", cor: "Branco estampado" },
    { id: 3, nome: "Blusa tricô cropped marrom", preco: "R$68,00", img: "img/produto-4.png", tamanhos: "Único", material: "Tricô", cor: "Marrom" },
    { id: 4, nome: "Camisa branca + colete rosê", preco: "R$99,99", img: "img/produto-5.png", tamanhos: "P, M, G", material: "Algodão + Poliéster", cor: "Branco/Rosê" },
    { id: 5, nome: "Suéter Oversized V-Neck", preco: "R$109,99", img: "img/produto-6.png", tamanhos: "M, G", material: "Tricô + Lã", cor: "Off-White" },
    { id: 6, nome: "Vestido 'diva retrô'", preco: "R$139,99", img: "img/produto-7.png", tamanhos: "P, M", material: "Poliéster", cor: "Preto Sólido + Off-White" },
    { id: 7, nome: "Vestido midi de contraste", preco: "R$199,99", img: "img/produto-8.png", tamanhos: "P, M", material: "Algodão + Poliamida", cor: "Preto Sólido + Branco" },
    { id: 8, nome: "Vestido chemise envelope bicolor", preco: "R$150,00", img: "img/produto-9.png", tamanhos: "P, M, G", material: "Viscose", cor: "Caramelo + Branco" },
    { id: 9, nome: "Vestido curto em tricô leve", preco: "R$120,00", img: "img/produto-10.png", tamanhos: "Único", material: "Tricô de malha canelada", cor: "Verde Musgo" },
    { id: 10, nome: "Vestido curto evasê com amarração na cintura e manga balonê", preco: "R$150,00", img: "img/produto-11.png", tamanhos: "P, G", material: "Lã fina", cor: "Marrom + Bege + Vinho" },
    { id: 11, nome: "Vestido midi vinho romântico", preco: "R$179,99", img: "img/produto-12.png", tamanhos: "P, M", material: "Viscose", cor: "Vinho" },
    { id: 12, nome: "Calça jeans wide", preco: "R$139,99", img: "img/produto-13.png", tamanhos: "P, M", material: "Jeans 100% algodão", cor: "Cinza Claro" },
    { id: 13, nome: "Calça jeans wide leg estonada", preco: "R$169,99", img: "img/produto-14.png", tamanhos: "P, G", material: "Jeans denin pesado", cor: "Cinza escuro" },
    { id: 14, nome: "Calça jeans wide leg", preco: "R$135,00", img: "img/produto-15.png", tamanhos: "P, M, G", material: "Jeans denin", cor: "Preto Sólido" },
    { id: 15, nome: "Calça de alfaiataria wide leg", preco: "R$158,00", img: "img/produto-16.png", tamanhos: "P, M", material: "Alfaiataria ", cor: "Cinza Escuro" },
    { id: 16, nome: "Calça cargo streetwear", preco: "R$199,99", img: "img/produto-17.png", tamanhos: "P, G", material: "Sarja", cor: "Preto" },
    { id: 17, nome: "Calça Track Pant com Renda", preco: "R$139,99", img: "img/produto-18.png", tamanhos: "Único", material: "Tactel", cor: "Preto + Branco" }
];

    const cards = document.querySelectorAll(".produto-card");
    cards.forEach((card, index) => {
      card.addEventListener("click", () => {
        const p = produtos[index];
        if (!p) return;
        if (imgModal) imgModal.src = p.img;
        if (nomeModal) nomeModal.textContent = p.nome;
        if (precoModal) precoModal.textContent = p.preco;
        if (tamanhosModal) tamanhosModal.textContent = p.tamanhos;
        if (materialModal) materialModal.textContent = p.material;
        if (corModal) corModal.textContent = p.cor;
        modal.style.display = "block";

        // Carregar comentários do produto
        carregarComentarios(p.id);
      });
    });

    if (closeModal) closeModal.addEventListener("click", () => modal.style.display = "none");
    window.addEventListener("click", e => { if (e.target === modal) modal.style.display = "none"; });
  }

  // ===================== USUÁRIO =====================
  let usuarioAtual = localStorage.getItem("usuarioLogado") || null;

  // ===================== COMENTÁRIOS =====================
  let comentarios = [];
  let produtoAtualId = null;
  let avaliacaoAtual = 0;

  const listaComentarios = document.getElementById("lista-comentarios");
  const mediaEstrelas = document.getElementById("media-estrelas");
  const novoComentario = document.getElementById("novo-comentario");
  const btnAdicionarComentario = document.getElementById("adicionar-comentario");
  const estrelasComentario = document.querySelectorAll(".avaliacao-comentario .estrela");

  function carregarComentarios(produtoId) {
    produtoAtualId = produtoId;
    const dados = localStorage.getItem("comentarios-" + produtoId);
    comentarios = dados ? JSON.parse(dados) : [];
    atualizarComentarios();
  }

function atualizarComentarios() {
  if (!listaComentarios || !mediaEstrelas) return;

  listaComentarios.innerHTML = "";

  if (comentarios.length === 0) {
    mediaEstrelas.textContent = "☆☆☆☆☆";
    return;
  }

  let soma = 0;

  comentarios.forEach((c, idx) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${c.usuarioNome}:</strong> ${c.texto} (${c.estrelas}★) `;

    // Botão de excluir só se for do usuário logado
    if (usuarioAtual && c.usuarioId === usuarioAtual) {
      const span = document.createElement("span");
      span.style.cursor = "pointer";
      span.dataset.index = idx;

      // SVG do lixo
      span.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
</svg>
      `;

      span.addEventListener("click", () => {
        comentarios.splice(idx, 1);
        salvarComentarios();
        atualizarComentarios();
      });

      li.appendChild(span);
    }

    listaComentarios.appendChild(li);
    soma += c.estrelas;
  });

  const media = Math.round(soma / comentarios.length);
  mediaEstrelas.textContent = "★".repeat(media) + "☆".repeat(5 - media);
}


  function salvarComentarios() {
    localStorage.setItem("comentarios-" + produtoAtualId, JSON.stringify(comentarios));
  }

  if (estrelasComentario.length) {
    estrelasComentario.forEach(e => {
      e.addEventListener("click", () => {
        avaliacaoAtual = parseInt(e.dataset.value);
        estrelasComentario.forEach(st => st.classList.remove("active"));
        estrelasComentario.forEach(st => {
          if (parseInt(st.dataset.value) <= avaliacaoAtual) st.classList.add("active");
        });
      });
    });
  }

  if (btnAdicionarComentario && novoComentario) {
    btnAdicionarComentario.addEventListener("click", () => {
      if (!usuarioAtual) return alert("Você precisa estar logado para comentar!");
      const texto = novoComentario.value.trim();
      if (!texto || avaliacaoAtual === 0) return alert("Escolha uma avaliação e escreva seu comentário!");

      comentarios.push({
        usuarioNome: usuarioAtual,
        usuarioId: usuarioAtual,
        texto,
        estrelas: avaliacaoAtual
      });

      salvarComentarios();
      atualizarComentarios();

      novoComentario.value = "";
      avaliacaoAtual = 0;
      estrelasComentario.forEach(st => st.classList.remove("active"));
    });
  }

  // ===================== CADASTRO =====================
const cadastroForm = document.getElementById("vitoria_cadastro_form");
if (cadastroForm) {
  cadastroForm.addEventListener("submit", e => {
    e.preventDefault();

    const nome = document.getElementById("vitoria_nome")?.value.trim();
    const email = document.getElementById("vitoria_email")?.value.trim();
    const senha = document.getElementById("vitoria_password")?.value.trim();
    const confirmSenha = document.getElementById("vitoria_confirm_password")?.value.trim();

    if (!nome || !email || !senha || !confirmSenha) {
      return alert("Preencha todos os campos!");
    }

    if (senha !== confirmSenha) {
      return alert("Senhas não coincidem!");
    }

    // Pega a lista de usuários do localStorage
    const usuarios = localStorage.getItem("usuarios");
    let listaUsuarios = [];

    if (usuarios) {
      try {
        listaUsuarios = JSON.parse(usuarios); // tenta converter de JSON
      } catch {
        listaUsuarios = [];
      }
    }

    // Verifica se já existe o email cadastrado
    if (listaUsuarios.some(u => u.email === email)) {
      return alert("E-mail já cadastrado!");
    }

    // Adiciona novo usuário
    listaUsuarios.push({ nome, email, senha });

    // Salva de volta no localStorage
    localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));

    alert("Cadastro realizado com sucesso!");
    window.location.href = "login.html";
  });
}

  // ===================== LOGIN =====================
  const loginForm = document.getElementById("vitoria_login_form");
  if (loginForm) {
    loginForm.addEventListener("submit", e => {
      e.preventDefault();
      const email = document.getElementById("vitoria_email")?.value.trim();
      const senha = document.getElementById("vitoria_password")?.value.trim();

      const usuarios = localStorage.getItem("usuarios") || "";
      const listaUsuarios = usuarios ? JSON.parse(usuarios) : [];

      const usuario = listaUsuarios.find(u => u.email === email && u.senha === senha);
      if (!usuario) return alert("E-mail ou senha incorretos!");

      localStorage.setItem("usuarioLogado", usuario.nome);
      usuarioAtual = usuario.nome;
      alert("Login realizado!");
      window.location.href = "index.html";
    });
  }

  // ===================== SESSÃO =====================
  const areaLogin = document.getElementById("areaLogin");
  const areaUsuario = document.getElementById("areaUsuario");
  const nomeUsuario = document.getElementById("nomeUsuario");
  if (usuarioAtual) {
    if (areaLogin) areaLogin.style.display = "none";
    if (areaUsuario) areaUsuario.style.display = "inline";
    if (nomeUsuario) nomeUsuario.textContent = usuarioAtual;
  }

  window.logout = () => {
    localStorage.removeItem("usuarioLogado");
    window.location.reload();
  };

});

// Vitoria

document.addEventListener('DOMContentLoaded', () => {
    const btnVoltarHome = document.getElementById('btnVoltarHome');
    const filtroPanel = document.getElementById('filtro-panel');
    const sobreNosPanel = document.getElementById('sobreNosPanel');

    function atualizarBotaoVoltar() {
        const filtroAtivo = filtroPanel && filtroPanel.classList.contains('ativo');
        // Detecta se o submenu está visível pelo CSS (display: block)
        const sobreNosVisivel = sobreNosPanel && window.getComputedStyle(sobreNosPanel).display !== 'none';
        if (btnVoltarHome) {
            btnVoltarHome.style.display = (filtroAtivo || sobreNosVisivel) ? 'none' : 'flex';
        }
    }

    if (btnVoltarHome && filtroPanel) {
        const observerFiltro = new MutationObserver(atualizarBotaoVoltar);
        observerFiltro.observe(filtroPanel, { attributes: true, attributeFilter: ['class'] });
    }

    // Observa mudanças de mouse para o submenu "Sobre nós"
    if (btnVoltarHome && sobreNosPanel) {
        // Atualiza ao mover o mouse
        document.querySelectorAll('.menu li').forEach(li => {
            li.addEventListener('mouseenter', atualizarBotaoVoltar);
            li.addEventListener('mouseleave', atualizarBotaoVoltar);
        });
    }
});

// filtro
const filtroBtn = document.querySelector(".bi-funnel").closest("button"); 
const filtroPanel = document.getElementById("filtro-panel");
const fecharFiltro = document.getElementById("fecharFiltro");

filtroBtn.addEventListener("click", () => {
  filtroPanel.classList.toggle("ativo");
});

fecharFiltro.addEventListener("click", () => {
  filtroPanel.classList.remove("ativo");
});

//filtro genero
document.addEventListener('DOMContentLoaded', () => {
  const botoes = {
    todos: document.getElementById('filtro-todos'),
    masculino: document.getElementById('filtro-masculino'),
    feminino: document.getElementById('filtro-feminino')
  };

  const produtos = document.querySelectorAll('[data-genero]');
  const todosBotoes = Object.values(botoes);

  function filtrar(genero) {
    produtos.forEach(produto => {
      const produtoGenero = produto.getAttribute('data-genero');
      produto.style.display = (genero === 'todos' || produtoGenero === genero) ? 'block' : 'none';
    });
    todosBotoes.forEach(btn => btn.classList.remove('active'));
    botoes[genero].classList.add('active');
  }

  botoes.todos.addEventListener('click', () => filtrar('todos'));
  botoes.masculino.addEventListener('click', () => filtrar('masculino'));
  botoes.feminino.addEventListener('click', () => filtrar('feminino'));
});



document.addEventListener('DOMContentLoaded', () => {
  // Seleciona apenas os links que ainda não têm página
  const linksIndisponiveis = document.querySelectorAll('#filtro-panel a[href="#"]');

  linksIndisponiveis.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault(); // previne o comportamento padrão do link

      // Cria a mensagem de alerta
      const alerta = document.createElement("div");
      alerta.textContent = "Esta página não está disponível no momento.";

      // Estilo do alerta
      Object.assign(alerta.style, {
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "#cc522f",
        color: "#fff",
        fontWeight: "600",
        fontFamily: "'Raleway', sans-serif",
        padding: "12px 20px",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        zIndex: "9999",
        textAlign: "center",
        opacity: "0",
        transition: "opacity 0.5s"
      });

      document.body.appendChild(alerta);

      // Fade in
      setTimeout(() => { alerta.style.opacity = "1"; }, 10);
      // Fade out e remove após 2,5 segundos
      setTimeout(() => {
        alerta.style.opacity = "0";
        setTimeout(() => alerta.remove(), 500);
      }, 2500);
    });
  });
});

// Busca de produtos por nome
const txtBusca = document.getElementById('txtBusca');
const btnBuscar = document.getElementById('btnBuscar');
const resultadoBusca = document.getElementById('resultadoBusca');
const produtos = document.querySelectorAll('.vitoria_produto-card');

function normalizar(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function buscarProdutos() {
    const termo = normalizar(txtBusca.value.trim());
    let encontrados = 0;

    produtos.forEach(card => {
        const nome = normalizar(card.querySelector('.card-text')?.textContent || card.textContent || "");
        if (termo && nome.includes(termo)) {
            card.style.display = "block";
            encontrados++;
        } else if (!termo) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });

    if (termo) {
        resultadoBusca.textContent = encontrados
            ? `Encontrados ${encontrados} produto(s) para "${txtBusca.value}"`
            : `Nenhum produto encontrado para "${txtBusca.value}"`;
    } else {
        resultadoBusca.textContent = "";
    }
}

if (btnBuscar && txtBusca) {
    btnBuscar.addEventListener('click', buscarProdutos);
    txtBusca.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            buscarProdutos();
        }
    });
}

// Limpa busca ao sair da página ou navegar
window.addEventListener('beforeunload', () => {
    if (txtBusca) txtBusca.value = "";
    if (resultadoBusca) resultadoBusca.textContent = "";
    produtos.forEach(card => card.style.display = "block");
});

//
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("produtoModal");
  if (modal) {
    const closeModal = modal.querySelector(".close");
    const imgModal = document.getElementById("modal-img");
    const nomeModal = document.getElementById("modal-nome");
    const precoModal = document.getElementById("modal-preco");
    const tamanhosModal = document.getElementById("modal-tamanhos");
    const materialModal = document.getElementById("modal-material");
    const corModal = document.getElementById("modal-cor");

    // Dados dos produtos para cada página
    let produtos = [];
    if (window.location.pathname.includes("vestidos.html")) {
      produtos = [
        { nome: "Vestido longo estampado", preco: "R$149,99", img: "img/vestido-1.png", tamanhos: "P, M, G", material: "Poliéster", cor: "Estampado" },
        { nome: "Vestido curto casual", preco: "R$99,99", img: "img/vestido-2.png", tamanhos: "P, M", material: "Algodão", cor: "Azul" },
        { nome: "Vestido midi elegante", preco: "R$129,99", img: "img/vestido-3.png", tamanhos: "M, G", material: "Viscose", cor: "Verde" },
        { nome: "Vestido midi elegante", preco: "R$129,99", img: "img/vestido-4.png", tamanhos: "P, M, G", material: "Poliéster", cor: "Estampado" },
        { nome: "Vestido midi elegante", preco: "R$129,99", img: "img/vestido-5.png", tamanhos: "P, M, G", material: "Poliéster", cor: "Estampado" },
        { nome: "Vestido midi elegante", preco: "R$129,99", img: "img/vestido-6.png", tamanhos: "P, M, G", material: "Poliéster", cor: "Estampado" },
      ];
    } else if (window.location.pathname.includes("calcas.html")) {
      produtos = [
        { nome: "Calça Masculina", preco: "R$149,99", img: "img/produto-13.png", tamanhos: "P, M, G", material: "Jeans", cor: "Azul" },
        { nome: "Calça Masculina", preco: "R$99,99", img: "img/produto-14.png", tamanhos: "M, G", material: "Sarja", cor: "Preto" },
        { nome: "Calça Feminina", preco: "R$129,99", img: "img/produto-15.png", tamanhos: "P, M", material: "Jeans", cor: "Azul Claro" },
        { nome: "Calça Feminina", preco: "R$129,99", img: "img/produto-16.png", tamanhos: "P, M, G", material: "Jeans", cor: "Azul" },
        { nome: "Calça Masculina", preco: "R$129,99", img: "img/produto-17.png", tamanhos: "P, M, G", material: "Jeans", cor: "Azul" },
        { nome: "Calça Feminina", preco: "R$129,99", img: "img/produto-18.png", tamanhos: "P, M, G", material: "Jeans", cor: "Azul" },
      ];
    } else if (window.location.pathname.includes("blusas.html")) {
      produtos = [
        { nome: "blusa", preco: "R$149,99", img: "img/blusa-1.png", tamanhos: "P, M, G", material: "Algodão", cor: "Branco" },
        { nome: "blusa", preco: "R$99,99", img: "img/blusa-2.png", tamanhos: "M, G", material: "Poliéster", cor: "Preto" },
        { nome: "blusa", preco: "R$129,99", img: "img/blusa-3.png", tamanhos: "P, M", material: "Viscose", cor: "Azul" },
        { nome: "blusa", preco: "R$129,99", img: "img/blusa-4.png", tamanhos: "P, M, G", material: "Algodão", cor: "Branco" },
        { nome: "blusa", preco: "R$129,99", img: "img/blusa-5.png", tamanhos: "P, M, G", material: "Algodão", cor: "Branco" },
        { nome: "blusa", preco: "R$129,99", img: "img/blusa-6.png", tamanhos: "P, M, G", material: "Algodão", cor: "Branco" },
      ];
    }

    // Adiciona evento em todos os cards
    const cards = document.querySelectorAll(".vitoria_produto-card");
    cards.forEach((card, index) => {
      card.addEventListener("click", (e) => {
        // Evita abrir modal ao clicar em botões internos
        if (e.target.closest('button')) return;
        const p = produtos[index];
        if (!p) return;
        if (imgModal) imgModal.src = p.img;
        if (nomeModal) nomeModal.textContent = p.nome;
        if (precoModal) precoModal.textContent = p.preco;
        if (tamanhosModal) tamanhosModal.textContent = p.tamanhos;
        if (materialModal) materialModal.textContent = p.material;
        if (corModal) corModal.textContent = p.cor;
        modal.style.display = "block";
      });
    });

    if (closeModal) closeModal.addEventListener("click", () => modal.style.display = "none");
    window.addEventListener("click", e => { if (e.target === modal) modal.style.display = "none"; });
  }
});

// Laura

// Fade-in suave ao scroll
const revealElements = document.querySelectorAll('.reveal-laura');

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

/* ========================= */
/*        FAQ TOGGLE         */
/* ========================= */
document.querySelectorAll('.faq-item-laura .question-laura').forEach(q => {
  q.addEventListener('click', () => {
    const answer = q.nextElementSibling;
    answer.style.display = (answer.style.display === 'block') ? 'none' : 'block';
  });
});

/* ========================= */
/*        CHAT WIDGET        */
/* ========================= */
const chatToggle = document.getElementById('chat-toggle-laura');
const chatContainer = document.getElementById('chat-container-widget-laura');
const chatBox = document.getElementById('chat-box-widget-laura');
const chatForm = document.getElementById('chat-form-widget-laura');
const userInput = document.getElementById('user-input-widget-laura');
const chatButtons = document.getElementById('chat-buttons-widget-laura');

// Toggle do chat
chatToggle.addEventListener('click', () => {
  chatContainer.style.display = chatContainer.style.display === 'flex' ? 'none' : 'flex';
});

/* Funções de mensagens */
const botMessage = (text, showButtons = false) => {
  const msg = document.createElement('div');
  msg.classList.add('message-laura', 'message-bot-laura');

  const img = document.createElement('img');
  img.src = 'img/ia.jpg'; // Avatar Aline
  img.alt = 'Aline';
  msg.appendChild(img);
  const span = document.createElement('span');
  span.textContent = text;
  msg.appendChild(span);

  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;

  if (showButtons) chatButtons.style.display = 'flex';
};

const userMessage = (text) => {
  const msg = document.createElement('div');
  msg.classList.add('message-laura', 'message-user-laura');
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
};

/* Respostas automáticas */
const respostas = {
  "roupa": "Nossas peças são feitas com muito cuidado e estilo, sempre seguindo as tendências da moda.",
  "roupas": "Temos peças exclusivas e modernas, ideais para quem gosta de se vestir bem.",
  "entrega": "O prazo médio é de 5 a 10 dias úteis, dependendo da sua região.",
  "frete": "Oferecemos frete grátis para compras acima de R$ 200.",
  "troca": "Você pode solicitar troca em até 7 dias após a entrega, desde que a peça não tenha sido usada.",
  "atendimento": "Você pode falar com um de nossos vendedores a qualquer momento. Deseja que eu te redirecione?",
  "vendedor": "Um de nossos consultores de moda entrará em contato com você em instantes.",
  "pagamento": "Aceitamos cartões, Pix e boletos bancários.",
  "promoção": "Atualmente temos descontos especiais em toda a coleção outono/inverno!"
};

/* Processar mensagem do usuário */
const processarMensagem = (msg) => {
  let resposta = "Desculpe, não entendi sua pergunta. Pode reformular?";
  for (const chave in respostas) {
    if (msg.toLowerCase().includes(chave)) {
      resposta = respostas[chave];
      break;
    }
  }
  return resposta;
};

/* Mensagem inicial da Aline */
setTimeout(() => {
  botMessage("Olá! Eu sou a Aline, sua assistente virtual. Você prefere falar com um vendedor ou comigo?", true);
}, 500);

/* Envio de mensagem pelo chat */
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;

  userMessage(message);
  userInput.value = "";
  chatButtons.style.display = 'none';

  setTimeout(() => {
    const resposta = processarMensagem(message);
    botMessage(resposta);
  }, 800);
});

/* Botões de opção do chat */
document.querySelectorAll('.chat-option-laura').forEach(btn => {
  btn.addEventListener('click', () => {
    userMessage(btn.textContent);
    chatButtons.style.display = 'none';

    setTimeout(() => {
      if (btn.textContent === "Falar com Vendedor") {
        botMessage("Você será redirecionado para falar com um vendedor. Um momento...");
      } else {
        botMessage("Ótimo! Continuaremos nossa conversa. Pergunte o que quiser!");
      }
    }, 800);
  });
});

/* ========================= */
/*       FORMULÁRIO RÁPIDO    */
/* ========================= */
document.getElementById("btnEnviar-laura").addEventListener("click", function () {
  const form = document.getElementById("formRapido-laura");
  const msg = document.getElementById("msgConfirmacao-laura");

  // Coloca a mensagem acima do botão
  msg.style.display = "block";
  msg.style.textAlign = "center";
  msg.style.marginBottom = "10px";
  msg.textContent = "✅ Sua mensagem foi enviada!";
  msg.classList.add("show");

  form.reset();

  // Remove a mensagem após 5 segundos
  setTimeout(() => {
    msg.classList.remove("show");
    msg.style.display = "none";
    msg.textContent = "";
  }, 5000);
});

/* ========================= */
/*  Adiciona ao carrinho     */
/* ========================= */
function addToCart(id, name, price, image) {
  let lauraCart = JSON.parse(localStorage.getItem('lauraCart')) || [];

  const existing = lauraCart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    lauraCart.push({ id, name, price, image, quantity: 1 });
  }

  localStorage.setItem('lauraCart', JSON.stringify(lauraCart));

  const mensagem = document.getElementById('mensagem-carrinho-laura');
  mensagem.textContent = '✅ Produto adicionado ao carrinho!';
  mensagem.style.display = 'block';
  setTimeout(() => { mensagem.style.display = 'none'; }, 5000);

  atualizarCarrinho(); // <-- importante para atualizar a tela
}

/* ========================= */
/*       Span                */
/* ========================= */
function getCart() {
    return JSON.parse(localStorage.getItem('lauraCart')) || [];
}

// ...existing code...
function atualizarCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (!cartCount) return;

    const cart = getCart();

    // Soma todas as quantidades de cada item
    const totalItens = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

    cartCount.textContent = totalItens;
}
// ...existing code...

window.addEventListener('DOMContentLoaded', atualizarCartCount);

function addItem(novoItem) {
    const cart = getCart();
    const existente = cart.find(item => item.id === novoItem.id);

    if (existente) {
        existente.quantidade += novoItem.quantidade || 1;
    } else {
        novoItem.quantidade = novoItem.quantidade || 1;
        cart.push(novoItem);
    }

    localStorage.setItem('lauraCart', JSON.stringify(cart));
    atualizarCartCount();
}


/* ========================= */
/*       Carrinho            */
/* ========================= */
document.addEventListener('DOMContentLoaded', () => {
    atualizarCarrinho();
});

function atualizarCarrinho() {
    const cartContainer = document.getElementById("laura-cart-items");
    const subtotalEl = document.getElementById("laura-subtotal");
    const freteEl = document.getElementById("laura-frete");
    const totalEl = document.getElementById("laura-total");
    const summaryEl = document.querySelector(".laura-cart-summary");
    const checkoutEl = document.querySelector(".laura-checkout");
    const cartCountEl = document.getElementById("cart-count");

    if (!cartContainer) return;

    let lauraCart = JSON.parse(localStorage.getItem("lauraCart"));
    if (!Array.isArray(lauraCart)) {
        lauraCart = [];
        localStorage.setItem("lauraCart", JSON.stringify([]));
    }

    cartContainer.innerHTML = "";

    if (!lauraCart || lauraCart.length === 0) {
        cartContainer.innerHTML = "<p style='text-align:center; font-size:18px; padding:20px;'>Seu carrinho está vazio</p>";
        summaryEl.style.display = "none";
        checkoutEl.style.display = "none";
        subtotalEl.textContent = "R$0,00";
        freteEl.textContent = "R$0,00";
        totalEl.textContent = "R$0,00";
        cartCountEl.textContent = 0;
        return;
    }

    summaryEl.style.display = "block";
    checkoutEl.style.display = "block";

    let subtotal = 0;

lauraCart.forEach((item, index) => {
    subtotal += item.price * item.quantity;

    const itemDiv = document.createElement("div");
    itemDiv.className = "laura-cart-item";
    itemDiv.innerHTML = `
        <img src="${item.image}" width="80">
        <div>
            <p>${item.name}</p>
            <p style="display: flex; align-items: center; justify-content: space-between;">
                <span>Quantidade: ${item.quantity}</span>
                <span>
                    <button class="laura-btn-quant" data-action="decrement" data-index="${index}">−</button>
                    <button class="laura-btn-quant" data-action="increment" data-index="${index}">+</button>
                </span>
            </p>
            <p>R$ ${(item.price * item.quantity).toFixed(2)}</p>
        </div>
    `;

    const botao = document.createElement("button");
    botao.innerHTML = `<i class="bi bi-trash3-fill"></i>`;
    botao.className = "laura-btn-lixeira";
    botao.addEventListener("click", () => {
        lauraCart.splice(index, 1);
        localStorage.setItem("lauraCart", JSON.stringify(lauraCart));
        atualizarCarrinho();
    });
    itemDiv.appendChild(botao);
    cartContainer.appendChild(itemDiv);
});

    const frete = subtotal > 0 ? 10 : 0;
    const total = subtotal + frete;

    subtotalEl.textContent = `R$${subtotal.toFixed(2)}`;
    freteEl.textContent = `R$${frete.toFixed(2)}`;
    totalEl.textContent = `R$${total.toFixed(2)}`;
    cartCountEl.textContent = lauraCart.reduce((sum, item) => sum + item.quantity, 0);

    // Adiciona eventos aos botões de quantidade
    document.querySelectorAll('.laura-btn-quant').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = Number(this.getAttribute('data-index'));
            const action = this.getAttribute('data-action');
            if (action === 'increment') {
                lauraCart[idx].quantity += 1;
            } else if (action === 'decrement' && lauraCart[idx].quantity > 1) {
                lauraCart[idx].quantity -= 1;
            }
            localStorage.setItem("lauraCart", JSON.stringify(lauraCart));
            atualizarCarrinho();
        });
    });
}