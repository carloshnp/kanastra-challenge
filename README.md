# Kanastra Challenge

A API de débitos da Kanastra possui as seguintes rotas:

- `POST /debts` : insere um CSV enviado pelo usuário para o banco de dados com as informações dos clientes que possuem dívidas a serem pagas, disparando um email para cada cliente com a cobrança. O CSV deve ter o seguinte formato, sem espaços nos campos:
```csv
name,governmentId,email,debtAmount,debtDueDate,debtId
John Doe,11111111111,johndoe@kanastra.com.br,1000000.00,2022-10-12,8291
```

- Para enviar o arquivo no Postman, deve se enviar uma requisição POST para o servidor, com um body em form-data, colocando a *key* como csv, tipo *file* e enviar o arquivo através do campo *value*.

- `POST /payments` : utiliza um webhook JSON (uma requisição com JSON no body) para inserir um pagamento no banco de dados, dando baixa do boleto no sistema. O JSON deve ter o seguinte formato: 
```JSON
{
	"debtId": "8291",
	"paidAt": "2022-06-09 10:00:00",
	"paidAmount": 100000.00,
	"paidBy": "John Doe"
}
```

- Para enviar o pagamento, envie um body com o JSON respectivo ao pagamento para o servidor

- `GET /debts` : retorna o banco de dados com as cobranças e os pagamentos (se houverem) em formato JSON.

Para executar o projeto, precisamos:

- Executar o comando `npm install` para instalar as dependências do projeto
- Instalar o PostgreSQL (versão 14)
- Executar os comandos do Prisma: `npx prisma migrate dev --name init` para adicionar o banco de dados e a tabela ao Postgres

Para testar as rotas, deve-se utilizar uma plataforma de API como o Postman.

O servidor deve possuir o endereço localhost:8000.