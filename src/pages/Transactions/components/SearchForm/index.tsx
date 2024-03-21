import { MagnifyingGlass } from "phosphor-react";
import { SeachFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";

const searchFormSchema = zod.object({
    query: zod.string(),
})

interface SearchFormSchemaProps {
    query: string,
}

export function SeachForm() {
    const {register, handleSubmit, formState: {isSubmitting}} = useForm<SearchFormSchemaProps>({
        resolver: zodResolver(searchFormSchema)
    })

    function handleSearchTransactions(data: SearchFormSchemaProps) {
        console.log(data)
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