A API de débitos da Kanastra possui as seguintes rotas:

- `POST /debts` : insere um CSV enviado pelo usuário para o banco de dados com as informações dos clientes que possuem dívidas a serem pagas, disparando um email para cada cliente com a cobrança. O CSV deve ter o seguinte formato, sem espaços nos campos:
```csv
name,governmentId,email,debtAmount,debtDueDate,debtId
John Doe,11111111111,johndoe@kanastra.com.br,1000000.00,2022-10-12,8291
```
- `POST /payments` : utiliza um webhook JSON (uma requisição com JSON no body) para inserir um pagamento no banco de dados, dando baixa do boleto no sistema. O JSON deve ter o seguinte formato: 
```JSON
{
	"debtId": "8291",
	"paidAt": "2022-06-09 10:00:00",
	"paidAmount": 100000.00,
	"paidBy": "John Doe"
}
```
- `GET /debts` : retorna o banco de dados com as cobranças e os pagamentos (se houverem) em formato JSON.