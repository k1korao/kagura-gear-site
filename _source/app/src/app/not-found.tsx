import Link from "next/link";
import { getLocale } from "@/lib/locale-server";
const copy = {
  zh: { title: "这一页还没有故事。", body: "链接可能已经更新，回到 KIKORA 的世界继续探索。", action: "返回首页" },
  en: { title: "No story here. Yet.", body: "This page may have moved. Head back to KIKORA and find your next chapter.", action: "Back to the story" },
  ja: { title: "お探しのページが見つかりません。", body: "ページが移動した可能性があります。KIKORAのホームから、もう一度ご覧ください。", action: "ホームへ戻る" },
};
export default function NotFound() { const text = copy[getLocale()]; return <main className="kagura-collection-page" style={{padding:"110px 8%",minHeight:"60vh"}}><p style={{fontSize:12,color:"#8b9297"}}>404 / KIKORA</p><h1 style={{fontSize:"clamp(28px,5vw,60px)",lineHeight:1.3,margin:"28px 0"}}>{text.title}</h1><p style={{color:"#707980",lineHeight:1.9}}>{text.body}</p><Link href="/" style={{display:"inline-block",marginTop:32,borderBottom:"1px solid",paddingBottom:8}}>{text.action} ↗</Link></main>; }
