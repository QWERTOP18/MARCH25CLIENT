```
npx create-next-app@13 march25client
npm i axios
```

# March 11

```ts
import styles from "@/styles/editor.module.css";

// usage
<div className={styles.editor}></div>
```

cssのimportに少し引っかかった。

> localhost/:1 Access to XMLHttpRequest at 'http://localhost:3001/api/v1/posts' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

railsでrack-corsの設定をする。

railsのvalidationを強くしてしまって、お手軽にnewできなくなってしまった。
title,dateだけ入れたらnewして、pageを作った方がUXは高くなりそう

### form

いまだにformについて深く理解していない気がする
`<label>` を `<input>` に関連付けると、ラベルをクリックするだけで入力欄がフォーカスされる。
スクリーンリーダー でラベルが読み上げられるので、視覚障がいのあるユーザーにも優しい。

```ts
const [date, setDate] = useState("");

return (
  <input
    type="date"
    name="date" //useStateを使用する場合はnameはいらない。
    value={date}
    onChange={(e) => setDate(e.target.value)}
  />
);
```
