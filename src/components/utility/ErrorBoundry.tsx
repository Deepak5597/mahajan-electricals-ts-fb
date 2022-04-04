import { Component } from 'react';
import GlobalError from '../error/GlobalError';

export default class ErrorBoundary extends Component {
    state = { error: '', errorInfo: '', hasError: false }

    static getDerivedStateFromError(error: any) {
        return { hasError: true, error };
    }
    componentDidCatch(error: any, errorInfo: any) {
        console.log({ error, errorInfo });
        this.setState({ errorInfo });
    }
    render() {
        const { hasError, errorInfo } = this.state;
        if (hasError) {
            return <GlobalError errorInfo={errorInfo} />
        }
        return this.props.children;
    }
}