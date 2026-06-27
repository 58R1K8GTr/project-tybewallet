# 💰 Trybewallet

O **Trybewallet** é uma aplicação completa de gerenciamento de finanças pessoais e controle de gastos com conversão de moedas estrangeiras em tempo real. A plataforma permite que a pessoa usuária realize o login, cadastre despesas diárias selecionando a moeda, método de pagamento e categoria, visualize os gastos organizados em uma tabela dinâmica e acompanhe o valor total acumulado convertido para a moeda local (BRL).

O projeto é focado no gerenciamento de estado global centralizado de aplicações SPA (Single Page Applications) e no consumo assíncrono de dados externos.

---

## 🚀 Habilidades e Aprendizados Desenvolvidos

Este repositório consolida o aprendizado de conceitos avançados de arquitetura de fluxo de dados no ecossistema React. As principais habilidades validadas foram:

*   **Arquitetura do Estado Global:** Criação e configuração de uma *store* centralizada com Redux para gerenciar de forma previsível o estado da aplicação.
*   **Modelagem de Reducers e Actions:** Construção de *reducers* estruturados e definição de *actions* limpas para gerenciar o fluxo de dados (como informações de login da pessoa usuária e manipulação do histórico de gastos).
*   **Comunicação Dinâmica e Despachos:** Implementação de emissores de eventos (*dispatchers*) do Redux acionados por interações na interface para atualizar os nós do estado global.
*   **Manipulação Inteligente de Estado via Hooks:** Uso aprofundado dos hooks nativos do Redux (`useSelector` e `useDispatch`) para a leitura performática e manipulação direta do estado global dentro de componentes React de função.
*   **Fluxos Assíncronos Complexos (Redux-Thunk):** Criação de *actions* assíncronas utilizando middlewares para realizar chamadas externas a APIs de cotações, injetando payloads dinâmicos diretamente na *store*.

---

## 💻 O que foi Desenvolvido

A aplicação é dividida em fluxos lógicos e páginas dinâmicas que interagem diretamente com o Redux:

### 🔐 1. Tela de Login e Validação
*   Desenvolvimento de um formulário de identificação na rota raiz (`/`), exigindo e-mail em formato válido (ex: `usuario@provedor.com`) e senhas com no mínimo 6 caracteres.
*   Bloqueio do botão "Entrar" por meio de validações de estado local até que os critérios de segurança sejam satisfeitos.
*   Salvamento imediato do e-mail no estado global sob a chave `user.email` e redirecionamento automático para a rota `/carteira`.

### 💳 2. Header de Controle Financeiro
*   Exibição em tempo real do e-mail do usuário autenticado coletado diretamente do Redux.
*   Cálculo acumulado da despesa total convertida para Real (`BRL`), formatada estritamente com duas casas decimais (`0.00`) e inicializada em `0`.

### 📝 3. Formulário Dinâmico de Despesas (`WalletForm`)
*   Injeção de inputs para captação de valor e descrição, além de seletores suspensos sincronizados com os dados reais do estado.
*   Consumo da API de Cotações para preenchimento automático das moedas disponíveis (removendo o seletor instável 'USDT').
*   Dropdowns para seleção do método de pagamento (*Dinheiro, Cartão de crédito, Cartão de débito*) e categorias de tags (*Alimentação, Lazer, Trabalho, Transporte, Saúde*).
*   Mecanismo de salvamento sequencial com IDs incrementais iniciados em `0`, realizando a requisição de câmbio (`ask`) no exato momento do clique no botão "Adicionar despesa" para travar o valor histórico da cotação.

### 📊 4. Tabela de Gastos e Remoção Dinâmica
*   Exibição estruturada das despesas contendo cabeçalhos contábeis completos (*Descrição, Tag, Método de pagamento, Valor, Moeda, Câmbio utilizado, Valor convertido, Moeda de conversão*).
*   Exibição descritiva por extenso do nome da moeda de origem (ex: *"Dólar Americano/Real Brasileiro"*) e fixação do Real como moeda padrão de conversão.
*   Inclusão de um botão para deletar despesas (`data-testid="delete-btn"`). Ao ser acionado, remove o registro da árvore do Redux, expurga a linha do DOM da tabela e recalcula instantaneamente o montante total exibido no Header.

### 🧪 5. Testes de Cobertura e Qualidade
*   Criação de testes unitários e de integração utilizando a **React Testing Library (RTL)**, garantindo uma cobertura mínima exigida de **60%** em declarações, funções e ramificações da aplicação.

---

## 🛠️ Ferramentas e Tecnologias Utilizadas

*   **React:** Framework para componentização e gerenciamento de ciclo de vida da interface.
*   **Redux / React-Redux:** Gerenciador oficial de estado global e conectores estruturais para React.
*   **Redux Thunk:** Middleware para permitir a criação de criadores de ação que retornam uma função em vez de uma action, viabilizando operações assíncronas.
*   **Redux DevTools Extension:** Configuração integrada na store para rastreamento visual e depuração do estado global em tempo de desenvolvimento.
*   **Awesomeapi (API de Cotações):** Endpoint público de moedas (`https://economia.awesomeapi.com.br/json/all`) consumido para a conversão de taxas cambiais.
*   **Cypress:** Ferramenta de automação ponta a ponta (E2E) aplicada para a validação das regras de negócio do avaliador.
*   **ESLint:** Padronizador de qualidade e boas práticas de formatação do código javascript.

---

## 📐 Estrutura do Estado Global no Redux

A store foi modelada mantendo estritamente o formato exigido para consistência dos seletores e dos testes automatizados:

```json
{
  "user": {
    "email": "" 
  },
  "wallet": {
    "currencies": [], 
    "expenses": [], 
    "editor": false, 
    "idToEdit": 0 
  }
}
