export const new_user_template = (user: string, token: string) => `
<!DOCTYPE html>
<html>
	<body>
		<h1>Confirmação de email.</h1>
		<p>${user}, precisamos que confirme seu email no link abaixo:</p>
		<p><a href="/auth/confirm/${token}">Clique aqui para confirmar</a></p>
	</body>
</html>
`;

export const forgot_password = (user: string, token: string) => `
<!DOCTYPE html>
<html>
	<body>
		<h1>Nova senha.</h1>
		<p>${user}, você solicitou uma nova senha, clique no link abaixo para criar uma nova senha:</p>
		<p><a href="/auth/reset-password/${token}">Clique aqui</a></p>
	</body>
</html>
`;