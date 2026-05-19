# Choi Seungmin — Portfolio

보호소 관리 매니저 최승민의 포트폴리오 웹사이트입니다.  
Next.js 14 (App Router) + TypeScript + Tailwind CSS로 구축되었습니다.

## 🚀 로컬 실행

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```

http://localhost:3000 에서 확인하세요.

## 📁 프로젝트 구조

```
portfolio/
├── app/
│   ├── globals.css       # 전역 스타일 & CSS 변수
│   ├── layout.tsx        # 루트 레이아웃 & SEO 메타데이터
│   └── page.tsx          # 메인 페이지 (섹션 조립)
├── components/
│   ├── Navbar.tsx        # 상단 네비게이션 (스크롤 진행바 포함)
│   ├── Hero.tsx          # 히어로 섹션 (About Me)
│   ├── Experience.tsx    # 경력 타임라인
│   ├── KPI.tsx           # 주요 성과 지표
│   ├── Skills.tsx        # 툴 & 스킬 그리드
│   ├── Projects.tsx      # 프로젝트 사례
│   └── Contact.tsx       # 연락처 + 푸터
├── data/
│   └── portfolio.ts      # ⭐ 포트폴리오 데이터 (여기서 수정!)
└── public/               # 정적 파일 (이미지 등)
```

## ✏️ 내용 수정 방법

**모든 내용은 `data/portfolio.ts` 파일 하나에서 관리됩니다.**

- `profile` — 이름, 직책, 회사, 이메일, 자기소개
- `experiences` — 경력 타임라인
- `kpis` — 주요 성과 수치
- `skills` — 카테고리별 스킬
- `projects` — 프로젝트 사례 (제목, 기간, 성과, 액션)

## 🌐 Vercel 배포

### 방법 1: Vercel CLI

```bash
npm install -g vercel
vercel --prod
```

### 방법 2: GitHub 연동 (권장)

1. 이 프로젝트를 GitHub 레포지토리에 push
2. [vercel.com](https://vercel.com) 접속 → "Add New Project"
3. GitHub 레포 선택 → "Deploy" 클릭
4. 끝! 자동으로 빌드 & 배포됩니다

### 방법 3: Vercel 웹 UI에서 직접 import

```
https://vercel.com/new
```

---

## 🎨 디자인 커스텀

`app/globals.css` 상단의 CSS 변수로 색상을 변경할 수 있습니다:

```css
:root {
  --color-accent: #c4813a;      /* 포인트 컬러 (현재: 앰버 골드) */
  --color-bg: #fafaf9;          /* 배경색 */
  --color-text-primary: #1c1917; /* 본문 텍스트 */
}
```

## 📦 사용 기술

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (설치 후 고급 애니메이션 추가 가능)
- **Lucide React** (아이콘)
- **Google Fonts** (Playfair Display + DM Sans)

---

Made with ♡ by Choi Seungmin
