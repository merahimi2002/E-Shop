interface TextSummarizerProps {
  text: string;
  maxChars: number;
}

const TextSummarizer = ({ text, maxChars }: TextSummarizerProps) => {
  if (text.length <= maxChars) return <p>{text}</p>;
  text = text.substring(0, maxChars);
  return <p>{text}...</p>;
};

export default TextSummarizer;
