# Markdown Hub

## 概要

Markdown Hub は、**Astro** と **Tailwind CSS** を使用して構築されたモダンなドキュメンテーションサイトテンプレートです。

QuiitaやZennに投稿するのは恥ずかしいけど、自分が作成したいろいろな作品の内容をMarkdownでまとめてみんなに見てもらいたいな、という人向けのテンプレートです。

## 特徴

- **GFM 対応** – テーブル、タスクリスト、取り消し線など。
- **シンタックスハイライト** – **Shiki** を使用した美しいコードブロック。
- **自動サイドバー** – `src/pages` 内の Markdown ファイルを自動収集。`index.md` は **Home**、その他のトップ階層ファイルは **Documents**、サブディレクトリ配下はディレクトリ名でカテゴリ分けされます。
- **動的目次 (TOC)** – ページ内の見出しから自動生成。
- **画像の埋め込み** – `src/pages/images/` などに画像を置き、Markdown から相対パスで参照すると Astro がビルド時に最適化します。
- **フロントマター省略可** – `layout` と `title` は未指定時に自動補完されます（`title` はファイル名、`layout` は `DocLayout.astro`）。
- **サイト名の一元管理** – サイドバー／モバイルヘッダーのサイト名は `index.md` の `title` を参照します。
- **レスポンシブレイアウト** – モバイルフレンドリーなフォールバック付き。

## 使い方

### 前提条件

- **Node.js** v18 以上（LTS 推奨）

### インストール

`https://github.com/kenichi-inoue-senju/md-hub`にアクセスし、CodeボタンからDownload Zipを選択してダウンロード後、解凍してください。

解答したらリポジトリフォルダ名をお好きな名前に変更して、VS Codeなどのコードエディタで開きます。

次に、コードエディタのターミナルを開き、以下のコマンドを実行して、必要なパッケージをインストールします。（ターミナルを開くショートカットキーは、Windowsでは Ctrl + @、Macでは Cmd + @）

```bash
npm install
```

### 環境変数の設定

ローカルでの開発と GitHub Pages でのデプロイに必要な環境変数を設定します。

1. `.env.example` をコピーして `.env` を作成します：
   ```bash
   cp .env.example .env
   ```

2. `.env` を編集して、デプロイ先のサイト情報を設定します：
   ```env
   SITE=https://username.github.io
   BASE=/repository-name
   ```

> **LOCAL** – ローカル開発時は `.env` から環境変数が読み込まれます。  
> **CI (GitHub Actions)** – GitHub Actions では Repository variables から読み込まれます。

### 開発サーバーの起動

```bash
npm run dev
```

サイトは `http://localhost:4321` で利用可能です。

## ビルド方法

```bash
# 本番用ビルド
npm run build

# ビルド結果をプレビュー
npm run preview
```

生成された静的ファイルは `dist/` ディレクトリに出力されます。

## ドキュメントの追加方法

Markdown Hub では `src/pages/` に Markdown ファイルを置くだけで、自動的にページとサイドバーが生成されます。

### 1. ファイルを作成する

`src/pages/` 直下、または任意のサブディレクトリに `.md` ファイルを作成します。

```
src/pages/
├── index.md              ← トップページ
├── はじめに.md            ← 追加したページ（サイドバーに自動表示）
└── guide/
    └── インストール.md    ← サブディレクトリで整理も可能
```

### 2. フロントマター（省略可）

タイトルやレイアウトを指定したい場合は、ファイルの先頭に YAML ブロックを記述します。**省略した場合は自動補完されます**。

```markdown
---
title: ページのタイトル
---

ここから本文を書きます。
```

| フィールド | 必須 | デフォルト | 説明 |
| :--- | :---: | :--- | :--- |
| `title` | – | ファイル名（拡張子除く） | サイドバーとページ見出しに使われるタイトル |
| `layout` | – | `DocLayout.astro`（自動解決） | レイアウトファイルのパス |

> **ポイント**  
> `layout` は remark プラグイン（[remark-default-frontmatter.mjs](./remark-default-frontmatter.mjs)）が Markdown ファイルの位置から相対パスを自動算出します。サブディレクトリに置いても `../../layouts/...` のような調整は不要です。

### 3. 画像の埋め込み（任意）

`src/pages/images/` などに画像ファイルを配置し、Markdown から相対パスで参照できます。

```markdown
![代替テキスト](./images/sample.svg)
```

ビルド時に Astro が画像を最適化し、`/_astro/...` 配下にハッシュ付きファイル名で出力します。

### 4. サイドバーのカテゴリと並び順

ファイルの配置場所によって、サイドバーのカテゴリが自動で決まります。

| 配置 | カテゴリ |
| :--- | :--- |
| `src/pages/index.md` | **Home** |
| `src/pages/*.md`（トップ階層） | **Documents** |
| `src/pages/<dir>/*.md` | `<dir>` の名前 |

> **メモ** トップページ (`index.md`) のみ `ようこそ {サイト名} へ` という h1 がレイアウトから出力されます。それ以外のページではレイアウト由来の h1 は出力されないので、本文側で見出しを記述してください。

#### 並び順の制御

ファイル名の先頭に `01_`・`02_` のような数字プレフィックスを付けると、  
アルファベット順でソートされてサイドバーの順序を制御できます。

```
src/pages/
├── 01_はじめに.md
├── 02_インストール.md
└── 03_マークダウン記法.md
```

### 5. 開発サーバーで確認する

ファイルを保存すると、ブラウザが自動的にリロードされます。

```bash
npm run dev
```

## GitHub Pages へのデプロイ

このテンプレートは GitHub Actions を使用して自動デプロイするように構成されています。

### 1. GitHub Repository Variables の設定

リポジトリの **Settings > Secrets and variables > Actions** に移動し、以下の手順で **Repository variables** に登録してください。

1. **Variables** タブをクリック（Secrets ではなく Variables）
2. **New repository variable** ボタンをクリック
3. 以下 2 つの変数を登録：

| 名前 | 値の例 | 説明 |
| :--- | :--- | :--- |
| `SITE` | `https://username.github.io` | 公開サイトのベースURL |
| `BASE` | `/repository-name` | 公開パス（リポジトリ名など） |

> **重要**  
> **Repository variables** に登録してください。Environment variables では動作しません。  
> Variables を使用することで、ワークフロー実行ログに値が表示されるため、デバッグが容易になります。

### 2. GitHub Actions の有効化

1.  リポジトリの **Settings > Pages** に移動します。
2.  **Build and deployment > Source** で **「GitHub Actions」** を選択します。

### 3. デプロイの実行

`main` ブランチにコードをプッシュ（またはマージ）すると、自動的にビルドとデプロイが開始されます。進捗はリポジトリの **Actions** タブから確認できます。

---

## コントリビュート

個人開発ですので、コントリビュートは受け付けておりません。ご了承ください。

## ライセンス

このプロジェクトは [MIT ライセンス](./LICENSE) の下で提供いたします。
