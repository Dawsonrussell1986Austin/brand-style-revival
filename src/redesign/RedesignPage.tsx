import { useEffect } from "react";
import { RedesignLayout } from "./RedesignLayout";
import { SEO } from "@/components/SEO";

type Props = {
  html: string;
  pageInit?: () => void;
  title?: string;
  description?: string;
  url?: string;
};

export function RedesignPage({ html, pageInit, title, description, url }: Props) {
  // Scroll to top on mount
  useEffect(() => { window.scrollTo(0, 0); }, [html]);
  return (
    <>
      {(title || description) && (
        <SEO title={title} description={description} url={url} />
      )}
      <RedesignLayout pageInit={pageInit}>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </RedesignLayout>
    </>
  );
}