import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children?: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-zinc-950 p-6 text-zinc-100">
                    <h1 className="text-2xl font-bold text-red-400">Algo deu errado</h1>
                    <p className="text-zinc-400">Verifique o console para mais detalhes.</p>
                    <button
                        className="rounded-lg bg-zinc-800 px-4 py-2 font-medium hover:bg-zinc-700 transition-colors"
                        onClick={() => window.location.reload()}
                    >
                        Recarregar Página
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
