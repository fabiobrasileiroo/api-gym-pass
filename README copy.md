# App

GymPass style app.

## RFs (Requisitos funcionais) 
> obs: é uma declaração de como um sistema deve se comportar

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível o usuário obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nomes;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de uma usuário;
- [x] Deve ser possível cadastrar uma academia;


## RNs (Regras de negócio)
> obs: descreve um aspecto do negócio, definindo ou restringindo tanto sua estrutura quanto seu comportamento

- [x] O usuário não deve poder se cadastrar com e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (requisitos não-funcionais)
> obs:  são os requisitos relacionados ao uso da aplicação em termos de desempenho, usabilidade, confiabilidade, segurança, disponibilidade, manutenção e tecnologias envolvidas. Estes requisitos dizem respeito a como as funcionalidades serão entregues ao usuário do software

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisa estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por páginas;
- [ ] O usúario deve ser identificado por JWT (JSON Web Token)
