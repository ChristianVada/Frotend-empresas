# Resumo do Projeto:

Desenvolver um MVP de um aplicativo de gestão de RH com dois tipos de usuários: o usuário comum (funcionário) e o usuário administrador responsável por gerenciar toda a aplicação.
Identificar cada usuário e determinar suas permissões na aplicação.
Consumir uma API já existente com uma documentação simplificada.
Criar uma interface web para consumir a API e exibir as informações na tela, prestando atenção na estética, mas priorizando a funcionalidade e fluidez do processo.

## Funcionalidades da Aplicação:

- Página Inicial: Exibir todas as empresas cadastradas e permitir filtrar por setores. Deve também redirecionar para as páginas de login e cadastro. Sem restrições, qualquer um pode entrar nessa página e acessar os dados;

- Página de Cadastro: Permitir a criação de novos usuários (não
  administradores). Ter um botão para redirecionar para página de login;

- Página de Autenticação: Realizar o login e direcionar o usuário para sua respectiva área. Persistir os dados no localStorage. Ter um botão para redirecionar para página de cadastro;

- Página do Painel de Controle: Adaptar-se ao tipo de usuário (comum ou administrador).

## Tecnologias Utilizadas:

- `HTML`;
- `CSS`;
- `JavaScript`;
- `LocalStorage`;
- `Design responsivo`;
- `Consumo de API com as funcinalidade do CRUD`.

## Instruções para aplicação:

É nessesario baixar e rodas a API localmente: https://github.com/Jardel-Kenzie/m2-api-empresas;

- Após clonar é necessario abrir o arquivo e rodar no terminal o seguintes comandos na ordem:
  - `npm install`;
  - ` npm run start`;
  - `npm run build`;
  - `npm run dev`.

Documentação da API: https://kenzie-academy-brasil-developers.github.io/m2-empresas-doc/;

Link da aplicação: https://christianvada.github.io/projeto-m2-frotend-empresas/;
