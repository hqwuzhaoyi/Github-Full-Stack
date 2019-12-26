import React, { useState, useEffect, useReducer, useContext } from 'react'

import myContext from '../../lib/my-context'

function countReducer(state, action) {
    switch (action.type) {
        case 'add':
            return state + 1
        case 'minus':
            return state - 1
        default:
            return state
    }
}

function MyCountFunc() {

    const [count, diaspatchCount] = useReducer(countReducer, 0)
    const [name, setName] = useState('jocky')

    const context = useContext(myContext)

    useEffect(() => {
        const interval = setInterval(() => {
            // setCount(c => c + 1)
            diaspatchCount({ type: 'add' })
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        console.log('effect invoked')
        return () => console.log('effect deteched')
    }, [])

    return (
        <div>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <button onClick={() => diaspatchCount({ type: 'add' })}>{count}</button>
            <p>{context}</p>
        </div>
    )
}

export default MyCountFunc