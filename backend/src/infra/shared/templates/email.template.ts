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