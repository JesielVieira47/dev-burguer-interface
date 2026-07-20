import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup"
import { toast } from "react-toastify";
import * as yup from "yup"

import Logo from "../../assets/logo.png";
import { Button } from '../../components/Button'
import { useUser } from "../../hooks/UserContext";
import { LeftContainer } from "../../components/LeftContainer";
import { api } from '../../services/api'
import {
	Container,
	Form,
	InputContainer,
	RightContainer,
	Title,
	Link,
} from "./styles";

export function Login() {
	const navigate = useNavigate();
	const { putUserData } = useUser();

	const schema = yup
		.object({
			email: yup.string()
				.email('Digite um e-mail válido')
				.required('O e-mail é obrigatório'),
			password: yup
				.string()
				.min(6, 'A senha dev ter pelo menos 6 caracteres')
				.required('Digite uma senha'),
		})
		.required()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	})
	console.log(errors)

	const onSubmit = async (data) => {
		const
			{ data: userData,
			} = await toast.promise(
				api.post('/sessions', {
					email: data.email,
					password: data.password
				}),
				{
					pending: 'Verificando suas credenciais...',
					success: {
						render() {
							setTimeout(() => {
								if(userData?.admin) {
									navigate('/admin/pedidos')
								}else {
									navigate('/')
								}
							}, 2000)

							return `👌 login realizado com sucesso!`
						},
					},
					error: '🤯 Email ou Senha incorretos, tente novamente.'
				},
			);

		putUserData(userData);
		// localStorage.setItem('token', token);
	};
	return (
		<Container>
			<LeftContainer>
				<img src={Logo} alt="logo-devburguer" />
			</LeftContainer>

			<RightContainer>
				<Title>
					Olá, seja bem vindo ao <span>Dev Burguer!</span>
					<br />
					Acesse com seu <span>Login e senha</span>
				</Title>

				<Form onSubmit={handleSubmit(onSubmit)}>
					<InputContainer>
						<label>Email</label>
						<input type="email" {...register("email")} />
						<p>{errors?.email?.message}</p>
					</InputContainer>

					<InputContainer>
						<label>Senha</label>
						<input type="password" {...register("password")} />
						<p>{errors?.password?.message}</p>
					</InputContainer>

					<Button type="submit">Entrar</Button>
				</Form>

				<p>
					Não possui conta? <Link to="/cadastro">Clique aqui.</Link>
				</p>
			</RightContainer>
		</Container>
	);
}
