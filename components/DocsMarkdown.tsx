import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { rewriteDocLink } from "@/lib/docs";

export default function DocsMarkdown({
  body,
  currentDir,
  locale,
}: {
  body: string;
  currentDir: string;
  locale: string;
}) {
  return (
    <div className="docs-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href = "", children }) => {
            const target = rewriteDocLink(href, currentDir, locale);
            if (/^[a-z][a-z0-9+.-]*:/i.test(target)) {
              return (
                <a href={target} target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              );
            }
            if (target.startsWith("/")) {
              return <Link href={target}>{children}</Link>;
            }
            return <a href={target}>{children}</a>;
          },
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
}
