import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const sanitizeText = (text: string): string => text.replace(/<\/?[^>]+(>|$)/g, "");

export const parseContent = (text: string): JSX.Element => {
    return <ReactMarkdown remarkPlugins={[remarkGfm]}>{sanitizeText(text)}</ReactMarkdown>;
};
