import { MagnifyingGlass } from "phosphor-react";
import { SeachFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { TransactionsContext } from "../../../../contexts/TransactionsContext";

const searchFormSchema = zod.object({
    query: zod.string(),
})

interface SearchFormSchemaProps {
    query: string,
}

export function SeachForm() {
    const {fetchTransactions} = useContext(TransactionsContext)

    const {register, handleSubmit, formState: {isSubmitting}} = useForm<SearchFormSchemaProps>({
        resolver: zodResolver(searchFormSchema)
    })

    async function handleSearchTransactions(data: SearchFormSchemaProps) {
        await fetchTransactions(data.query)
    }

    return (
        <SeachFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
            <input 
                type="text" 
                placeholder="Busque por transações" 
                {...register('query')}
            />

            <button type="submit" disabled={isSubmitting}>
                <MagnifyingGlass size={20} />
                Buscar
            </button>
        </SeachFormContainer>
    )
}