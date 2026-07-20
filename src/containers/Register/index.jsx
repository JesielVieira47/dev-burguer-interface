import { set, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { toast } from "react-toastify";
import * as yup from "yup"
import { useNavigate } from "react-router-dom";

import Logo from "../../assets/logo.png";
import { Button } from '../../components/Button'
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

export function Register() {
	const navigate = useNavigate();

	const schema = yup
		.object({
			name: yup.string()
				.required('O nome é obrigatório'),
			email: yup.string()
				.email('Digite um e-mail válido')
				.required('O e-mail é obrigatório'),
			password: yup
				.string()
				.min(6, 'A senha dev ter pelo menos 6 caracteres')
				.required('Digite uma senha'),
			confirmPassword: yup
				.string()
				.oneOf([yup.ref('password')], 'As senhas devem ser iguais')
				.required('Confirme sua senha'),
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

		try {
			const { status } = await api.post('/users', {
				name: data.name,
				email: data.email,
				password: data.password,
			},
				{
					validataStatus: () => true,
				},
			);

			if (status === 200 || status === 201) {
				setTimeout(() => {
					navigate('/login')
				}, 2000)
				toast.success('Conta criada com sucesso!');
			} else if (status === 409) {
				toast.error('E-mail já cadastrado. Por favor, use outro e-mail.');
			} else {
				throw new Error();
			}
		} catch (error) {
			toast.error("Falha no sistema ! Tente novamente mais tarde.");
		}

	};
	return (
		<Container>
			<LeftContainer>
				<img src={Logo} alt="logo-devburguer" />
			</LeftContainer>

			<RightContainer>
				<Title>Criar conta</Title>

				<Form onSubmit={handleSubmit(onSubmit)}>
					<InputContainer>
						<label>Name</label>
						<input type="text" {...register("name")} />
						<p>{errors?.name?.message}</p>
					</InputContainer>

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

					<InputContainer>
						<label>Confirme Senha</label>
						<input type="password" {...register("confirmPassword")} />
						<p>{errors?.confirmPassword?.message}</p>
					</InputContainer>

					<Button type="submit">Criar Conta</Button>
				</Form>

				<p>
					Já tem uma conta? <Link to="/login">Clique aqui.</Link>
				</p>
			</RightContainer>
		</Container>
	);
}
