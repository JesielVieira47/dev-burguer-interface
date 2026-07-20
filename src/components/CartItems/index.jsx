import TrashIcon from '../../assets/trash.svg';
import { useCart } from '../../hooks/CartContext';
import { formatPrice } from '../../utils/formatPrice';
import { Table } from '../Table';

import { ProductImage, ProductTotlePrice, ButtonGroup, TrashImage, EmptyCart } from './styles';

export function CartItems() {
    const { cartProducts, increaseProduct, decreaseProduct, deleteProduct } = useCart();

    return (
        <Table.Root>
            <Table.Header>
                <Table.Tr>
                    <Table.Th></Table.Th>
                    <Table.Th>Items</Table.Th>
                    <Table.Th>Preço</Table.Th>
                    <Table.Th>Quantidades</Table.Th>
                    <Table.Th>Total</Table.Th>
                    <Table.Th></Table.Th>
                </Table.Tr>
            </Table.Header>
            <Table.Body>
                {cartProducts?.length ? (
                    cartProducts.map((product) => (
                        // 1. A propriedade KEY mudou para cá (elemento pai do map)
                        <Table.Tr key={product.id}> 
                            <Table.Td>
                                <ProductImage src={product.url} />
                            </Table.Td>
                            <Table.Td>{product.name}</Table.Td>
                            <Table.Td>{product.currencyValue}</Table.Td>
                            <Table.Td>
                                <ButtonGroup>
                                    <button onClick={() => decreaseProduct(product.id)}>-</button>
                                    {product.quantity}
                                    <button onClick={() => increaseProduct(product.id)}>+</button>
                                </ButtonGroup>
                            </Table.Td>
                            <Table.Td>
                                <ProductTotlePrice>
                                    {formatPrice(product.quantity * product.price)}
                                </ProductTotlePrice>
                            </Table.Td>
                            <Table.Td>
                                <TrashImage 
                                    src={TrashIcon} 
                                    alt="lixeira" 
                                    onClick={() => deleteProduct(product.id)}
                                />
                            </Table.Td>
                        </Table.Tr>
                    ))
                ) : (
                    // 2. Correção do HTML: Envolvendo a mensagem de vazio em uma estrutura válida de tabela
                    <Table.Tr>
                        <Table.Td colSpan="6" style={{ textAlign: 'center' }}>
                            <EmptyCart>Carrinho Vazio</EmptyCart>
                        </Table.Td>
                    </Table.Tr>
                )}
            </Table.Body>
        </Table.Root>
    );
}