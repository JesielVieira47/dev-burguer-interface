import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Image } from "@phosphor-icons/react"
import { useState, useEffect } from "react"
import { useLocation, useNavigate } from 'react-router-dom'
import { api } from "../../../services/api"
import { toast } from "react-toastify"
import { Container, Form, Input, InputGroup, Label, LabelUpload, Select, SubmitButton, ErrorMessage, ContainerCheckbox } from "./styles"

const schema = yup
  .object({
    name: yup.string().required('Digite o Nome do Produto'),
    price: yup.number().positive().required('Digite o Preço do Produto').typeError('Digite o Nome do Produto'),
    category: yup.object().required('Digite a Categoria'),
    offer: yup.bool(),
  })

export function EditProduct() {
    const [fileName, setFileName] = useState(null);
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    const {state: {product}} = useLocation()

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

    await toast.promise(api.put(`/products/${product.id}`, productFormData), {
      pending: 'Editando o produto...',
      success: 'Produto editado com sucesso',
      error: 'Falha ao editar o produto, Tente novamente',
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
                <Input type="text" {...register("name")} defaultValue={product.name}/>
                <ErrorMessage>{errors?.name?.message}</ErrorMessage>
                </InputGroup>

                <InputGroup>
                <Label>Preço</Label>
                <Input type="number" {...register("price")} defaultValue={product.price / 100}/>
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
                defaultValue={product.category}
                render={ ({ field } ) => (
                <Select 
                {...field}
                options = {categories}
                getOptionLabel={(category) => category.name}
                getOptionValue={(category) => category.id}
                placeholder="Selecione a categoria"
                menuportalTarget={document.body}
                defaultValue={product.category}
                />
              )}
            />
            <ErrorMessage>{errors?.category?.message}</ErrorMessage>
                </InputGroup>

                <InputGroup>
                <ContainerCheckbox>
                  <input type="checkbox" defaultChecked={product.offer}  {...register("offer")}/>
                  <Label>Adicionar Produto</Label>
                </ContainerCheckbox>
                </InputGroup>

                <SubmitButton>Editar Produto</SubmitButton>
            </Form>
        </Container>
    )
}