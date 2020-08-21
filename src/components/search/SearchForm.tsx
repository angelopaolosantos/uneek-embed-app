import { InputGroup, Input, Icon, Form } from 'rsuite'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const SearchForm = (props) => {
    const router = useRouter()
    const [formValue, setformValue] = useState('')

    useEffect(()=>{
        console.log("Run this once")
        console.log(router.query)
    }, [])

    function handleSubmit() {
        props.setCurrentPage(1)
        props.setKeywords(formValue)
        router.push(`/search?keyword=${formValue}&page=${props.currentPage}`)
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