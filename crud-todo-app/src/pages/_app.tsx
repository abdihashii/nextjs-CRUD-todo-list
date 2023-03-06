import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import TodoListContextProvider from '@/context/todoListContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TodoListContextProvider>
      <Component {...pageProps} />
    </TodoListContextProvider>
  );
}
