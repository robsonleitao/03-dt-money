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
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const newTransactionFormSchema = zod.object({
    description: zod.string(),
    price: zod.number(),
    category: zod.string(),
    // type: zod.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = zod.infer<typeof newTransactionFormSchema>

export function NewtransactionModal() {
    const {register, handleSubmit} = useForm<NewTransactionFormInputs>({
        resolver: zodResolver(newTransactionFormSchema)
    })

    function handleCreateNewTransaction(data: NewTransactionFormInputs) {
        console.log(data)
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

                    <TransactionType>
                        <TransactionTypeButton variant='income' value='income'>
                            <ArrowCircleUp size={24} />
                            Entrada
                        </TransactionTypeButton>

                        <TransactionTypeButton variant='outcome' value='outcome'>
                            <ArrowCircleDown size={24} />
                            Saída
                        </TransactionTypeButton>
                    </TransactionType>

                    <button type="submit">Cadastrar</button>
                </form>
            </Content>
        </Dialog.Portal>
    )
}