import Link from "next/link";

export default function NotFound() {
  return (
    <main className="reserved-page">
      <div className="reserved-panel"><p className="section-eyebrow">UIDevTpl / 404</p><h1>Page not found.</h1><p>这个固定地址目前没有对应的目录条目。</p><Link className="secondary-action" href="/">返回首页 <span aria-hidden="true">↗</span></Link></div>
    </main>
  );
}
