import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import AuthProvider from './context/AuthContext'
import { QueryProvider, queryClient } from './lib/react-query/QueryProvider'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <QueryProvider>
            <AuthProvider>
                <App />
            </AuthProvider>
        </QueryProvider>
        <ReactQueryDevtools client={queryClient}/>
    </BrowserRouter>    
)