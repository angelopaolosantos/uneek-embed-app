import { InputGroup, Input, Icon, Form } from 'rsuite'
import { useState } from 'react'
import { useRouter } from 'next/router'

const SearchForm = (props) => {
    const router = useRouter()
    const [formValue, setformValue] = useState('')

    function handleSubmit() {
        props.setCurrentPage(1);
        props.setSearch(formValue)
        router.push(`/search?keywords=${formValue}&page=1`)
    }
    
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <InputGroup>
                    <Input name="keyword" placeholder="Enter Keywords Here" onChange={(formValue)=>setformValue(formValue)} />
                    <InputGroup.Button onClick={handleSubmit} >
                        <Icon icon="search" />
                    </InputGroup.Button>
                </InputGroup>
            </Form>
        </div>
    )
}

export default SearchForm