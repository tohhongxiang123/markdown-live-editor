import React from "react";
import ReactMarkdown from "react-markdown";
import MathJax from "react-mathjax2";
import RemarkMathPlugin from 'remark-math';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import styles from './Previewer.module.scss'

const MarkdownRender = (props) => {
    const newProps = {
        ...props,
        plugins: [
            RemarkMathPlugin,
        ],
        renderers: {
            ...props.renderers,
            math: ({value}) => <MathJax.Node>{value}</MathJax.Node>,
            inlineMath: ({value}) => <MathJax.Node inline>{value}</MathJax.Node>,
            code: ({language, value}) => <SyntaxHighlighter language={language} style={solarizedlight}>{value}</SyntaxHighlighter>
        }
    };
    
    return (
        <MathJax.Context input="tex">
            <ReactMarkdown {...newProps} escapeHtml={false} className={styles.root}/>
        </MathJax.Context>
    );
};

export default MarkdownRender
