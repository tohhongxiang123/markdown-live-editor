import React from "react";
import ReactMarkdown from "react-markdown";
import MathJax from "react-mathjax2";
import RemarkMathPlugin from 'remark-math';
import CodeBlock from './CodeBlock'
import styles from './Previewer.module.scss'
import MermaidBlock from './MermaidBlock'
import mermaid from 'mermaid'

mermaid.initialize({
    startOnLoad: true
})


const MarkdownRender = (props) => {
    const newProps = {
        ...props,
        plugins: [
            RemarkMathPlugin
        ],
        renderers: {
            ...props.renderers,
            math: ({value}) => <MathJax.Node>{value}</MathJax.Node>,
            inlineMath: ({value}) => <MathJax.Node inline>{value}</MathJax.Node>,
            code: ({language, value}) => {
                if (language && language.toLowerCase() === 'mermaid') return <MermaidBlock className="mermaid" chart={value}/>
                return <CodeBlock language={language ? language.toLowerCase() : language} value={value} />
            }
        }
    };
    
    return (
        <MathJax.Context input="tex">
            <ReactMarkdown 
                {...newProps} 
                escapeHtml={true} 
                className={styles.root}
            />
        </MathJax.Context>
    );
};

export default MarkdownRender