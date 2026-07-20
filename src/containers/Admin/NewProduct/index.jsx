import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Image } from "@phosphor-icons/react"
import { Container, Form, Input, InputGroup, Label, LabelUpload, Select, SubmitButton, ErrorMessage, ContainerCheckbox } from "./styles"
import { useState, useEffect } from "react"
import { api } from "../../../services/api"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const schema = yup
  .object({
    name: yup.string().required('Digite o Nome do Produto'),
    price: yup.number().positive().required('Digite o Preço do Produto').typeError('Digite o Nome do Produto'),
    category: yup.object().required('Digite a Categoria'),
    offer: yup.bool,
    file: yup
    .mixed()
    .test('required', 'Escolha um Arquivo para Continuar', (value) => {
      return value && value.length > 0;
    })
    .test('fileSize', 'Carregue arquivos até 5mb', (value) => {
      return value && value.length > 0 && value[0].size <= 3000000;
    })
    .test('type', 'Carregue apenas imagens PNG ou JPEG', (value) => {
      return (
      value && 
      value.length > 0 && 
      (value[0].type === 'image/jpeg' || value[0].type === 'image/png')
     )
    }),
  })

export function NewProduct() {
    const [fileName, setFileName] = useState(null);
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
      async function loadCategories() {
        const { data } = await api.get('/categories');

        setCategories(data);
      }

      loadCategories();
    }, [])

    const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = async (data) => {
    const productFormData = new FormData();

    productFormData.append('name', data.name)
    productFormData.append('price', data.price * 100)
    productFormData.append('category_id', data.category.id)
    productFormData.append('file', data.file[0])
    productFormData.append('offer', data.offer)

    await toast.promise(api.post('/products', productFormData), {
      pending: 'Adicionando o produto...',
      success: 'Produto criado com sucesso',
      error: 'Falha ao adicionar o produto, Tente novamente',
    });

    setTimeout(() => {
      navigate('/admin/produtos')
    }, 2000);
  }

    return(
        <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <InputGroup>
                <Label>Nome</Label>
                <Input type="text" {...register("name")}/>
                <ErrorMessage>{errors?.name?.message}</ErrorMessage>
                </InputGroup>

                <InputGroup>
                <Label>Preço</Label>
                <Input type="number" {...register("price")} />
                <ErrorMessage>{errors?.price?.message}</ErrorMessage>
                </InputGroup>

                <InputGroup>
                <LabelUpload>
                    <Image />
                    <input 
                    type="file" 
                    {...register("file")}
                    accept='image/png, image/jpeg, image/jpg'
                    onChange={(value) => {
                        setFileName(value.target.files[0]?.name)
                        register("file").onChange(value)
                    }}
                    />{fileName || 'Upload do Produto'}
                </LabelUpload>
                <ErrorMessage>{errors?.file?.message}</ErrorMessage>
                </InputGroup>

                <InputGroup>
                <Label>Categorias</Label>
                <Controller 
                name="category"
                control={control}
                render={ ({ field } ) => (
                <Select 
                {...field}
                options = {categories}
                getOptionLabel={(category) => category.name}
                getOptionValue={(category) => category.id}
                placeholder="Selecione a categoria"
                menuportalTarget={document.body}
                />
              )}
            />
            <ErrorMessage>{errors?.category?.message}</ErrorMessage>
                </InputGroup>

                <InputGroup>
                                <ContainerCheckbox>
                                  <input type="checkbox" {...register("offer")}/>
                                  <Label>Adicionar Produto</Label>
                                </ContainerCheckbox>
                                </InputGroup>

                <SubmitButton>Adicionar Produto</SubmitButton>
            </Form>
        </Container>
    )
}