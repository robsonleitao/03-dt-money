import * as Dialog from '@radix-ui/react-dialog'
import * as zod from 'zod'
import { 
    CloseButton, 
    Content, 
    Overlay, 
    TransactionType, 
    TransactionTypeButton 
} from './styles'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { TransactionsContext } from '../../contexts/TransactionsContext'

const newTransactionFormSchema = zod.object({
    description: zod.string(),
    price: zod.number(),
    category: zod.string(),
    type: zod.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = zod.infer<typeof newTransactionFormSchema>

export function NewtransactionModal() {
    const {createTransaction} = useContext(TransactionsContext)

    const {
        register,
        reset, 
        handleSubmit,
        control,
    } = useForm<NewTransactionFormInputs>({
        resolver: zodResolver(newTransactionFormSchema),
        defaultValues: {
            type: 'income'
        }
    })

    async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
        const {category, description, price, type} = data
        
        await createTransaction ({
            category, 
            description, 
            price, 
            type, 
        })
        
        reset();
    }

    return (
        <Dialog.Portal>
            <Overlay />

            <Content>
                <Dialog.Title>Nova Transação</Dialog.Title>
                <CloseButton>
                    <X size={24} />
                </CloseButton>

                <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                    <input 
                        type="text" 
                        placeholder='Descrição' 
                        required 
                        {...register('description')}
                    />
                    <input 
                        type="number" 
                        placeholder='Preço' 
                        required 
                        {...register('price', {valueAsNumber: true})}
                    />
                    <input 
                        type="text" 
                        placeholder='Categoria' 
                        required 
                        {...register('category')}
                    />

                    <Controller 
                        control = {control}
                        name = 'type'
                        render = {({field}) => {
                            return (
                                <TransactionType onValueChange={field.onChange} value={field.value}>
                                    <TransactionTypeButton variant='income' value='income'>
                                        <ArrowCircleUp size={24} />
                                        Entrada
                                    </TransactionTypeButton>

                                    <TransactionTypeButton variant='outcome' value='outcome'>
                                        <ArrowCircleDown size={24} />
                                        Saída
                                    </TransactionTypeButton>
                                </TransactionType>
                            )
                        }}
                    />
                    

                    <button type="submit">Cadastrar</button>
                </form>
            </Content>
        </Dialog.Portal>
    )
}