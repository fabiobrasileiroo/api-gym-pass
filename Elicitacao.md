Claro! Abaixo está a reformulação completa do modelo de negócio para o app **BeautifulPass**, uma espécie de "GymPass" focado em **barbearias e salões de beleza**. Inclui os **Requisitos de Sistema**, **Requisitos do Usuário**, **Público-Alvo** e um **Diagrama de Casos de Uso textual**, adaptando fielmente os RFs, RNs e RNFs que você forneceu.

---

## 🧠 Nome do Produto: **BeautifulPass**

### 🎯 Público-Alvo
- Pessoas que frequentam barbearias e salões de beleza com frequência.
- Profissionais de beleza que querem atrair clientes por meio de uma plataforma digital.
- Administradores de redes de salões ou barbearias.
- Jovens adultos entre 18 e 40 anos que usam apps para facilitar reservas de serviços.

---

## ✅ Requisitos Funcionais (RFs)

1. Deve ser possível se cadastrar;
2. Deve ser possível se autenticar;
3. Deve ser possível obter o perfil de um usuário logado;
4. Deve ser possível o usuário obter o número de check-ins realizados pelo usuário logado;
5. Deve ser possível o usuário obter seu histórico de check-ins;
6. Deve ser possível o usuário buscar barbearias/salões próximos (até 10km);
7. Deve ser possível o usuário buscar barbearias/salões pelo nome;
8. Deve ser possível o usuário realizar check-in em uma barbearia/salão;
9. Deve ser possível validar o check-in de um usuário;
10. Deve ser possível cadastrar uma barbearia ou salão de beleza;

---

## 📏 Regras de Negócio (RNs)

1. O usuário não deve poder se cadastrar com e-mail duplicado;
2. O usuário não pode fazer 2 check-ins no mesmo dia;
3. O usuário não pode fazer check-in se não estiver perto (100m) da barbearia/salão;
4. O check-in só pode ser validado até 20 minutos após criado;
5. O check-in só pode ser validado por administradores;
6. A barbearia/salão só pode ser cadastrado por administradores;

---

## 🛡 Requisitos Não Funcionais (RNFs)

1. A senha do usuário precisa estar criptografada;
2. Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
3. Todas listas de dados precisam estar paginadas com 20 itens por página;
4. O usuário deve ser identificado por JWT (JSON Web Token);

---

## 🖥 Requisitos de Sistema

- O sistema deve fornecer API REST (ou GraphQL) para autenticação, check-ins e gerenciamento de estabelecimentos;
- O sistema deve enviar mensagens de erro apropriadas para ações não autorizadas (ex: check-in inválido);
- O sistema deve suportar autenticação baseada em tokens (JWT);
- O sistema deve possuir funcionalidades de geolocalização (ex: verificar distância do usuário ao salão);
- O sistema deve ter suporte para múltiplos perfis (usuário comum e administrador);
- O sistema deve registrar logs de atividades administrativas (opcional para expansão futura);

---

## 👤 Requisitos do Usuário

- O usuário deve conseguir criar e gerenciar sua conta;
- O usuário deve conseguir buscar salões e barbearias por nome ou proximidade;
- O usuário deve conseguir realizar check-in em salões próximos;
- O usuário deve visualizar seu histórico de visitas;
- O administrador deve poder cadastrar e validar estabelecimentos;
- O administrador deve poder validar check-ins;

---

## 📘 Diagrama de Casos de Uso (texto)

### Atores:
- **Usuário Comum**
- **Administrador**
- **Sistema de Geolocalização**

---

### Casos de Uso:

#### Usuário Comum
- Cadastrar-se
- Autenticar-se
- Visualizar perfil
- Buscar salões/barbearias por nome ou proximidade
- Realizar check-in
- Ver histórico de check-ins
- Ver número total de check-ins

#### Administrador
- Cadastrar salão/barbearia
- Validar check-in

#### Sistema
- Validar distância para check-in (100m)
- Validar tempo de check-in (20 minutos)
- Validar exclusividade de e-mail
- Criptografar senha do usuário
- Identificar usuário por JWT
- Paginar listas de dados
