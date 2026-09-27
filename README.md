# AutoDMS

Tools to automatically produce "Daily Media Scans" that I would've otherwise spend 3 hours producing.

Originally 3 separate repos, I've merged the 3 repos into a single repo for better management and preparation for AutoDMS v2

## Prerequisites

- Node 24 LTS
- (For `api/firebase` folder only) 
  - Node 18
  - Firebase Project, see [here](https://firebase.google.com/docs/functions/get-started#create-a-firebase-project) for more details.
  - Firebase CLI, see [here](https://firebase.google.com/docs/functions/get-started#set-up-your-environment-and-the-firebase-cli) for more details.

## Development

Must have
```credentials
[test]
aws_access_key_id = fake
aws_secret_access_key = fake
aws_session_token = fake
region = us-east-1
```
in .aws/credentials


## Currently supported sources
### T1
- [x] 電子時報 HTML ONLY
- [x] 工商時報 HTML ONLY
- [x] 經濟日報 (UDNMoney)

### T2
- [x] 自由時報 3C
- [x] 自由時報
- [x] 聯合報
- [x] techudn
- [x] 中國時報 HTML ONLY
- [x] 時報資訊 HTML ONLY
- [x] 商業週刊
- [x] 壹蘋新聞網

### T3 電視台
- [x] 三立
- [x] 華視
- [x] 東森新聞
- [x] 民視新聞網
- [x] TVBS
- [x] 非凡新聞

### T4
- [x] 中央社
- [x] 太報
- [x] ETtoday (ETDAY)
- [x] cw
- [x] 遠見 gvm

### T5
- [x] Mashdigi
- [x] Cool3c HTML ONLY
- [x] ePrice
- [x] Sogi 手機王
- [x] TechOrange HTML ONLY
- [x] KOCPC 電腦王阿達
- [x] TechNews 科技新報
- [x] TechBang T客邦
- [x] XFastest minor bug
- [x] 鉅亨網
- [x] 點子生活
- [x] 智慧電子解決方案設計平台
- [x] Inside
- [ ] ~~Engadget (transitioned to yahoo news?)~~
- [x] 電獺少女
- [x] CTIMES
- [x] 新唐人亞太台
- [x] 新通訊元件雜誌
- [x] 新電子
- [x] CTWant
- [x] 數位時代 HTML ONLY
- [x] lpcomment


### T6 財經媒體
- [x] 財訊雙週刊 HTML ONLY
- [x] 財訊快報
- [x] MoneyDJ


### API (Firebase Functions) (Legacy Instructions pending update)

Make sure you've installed Firebase CLI globally, as detailed in the section "Prerequisites"

```bash
cd api

# Install dependencies
npm i 

cd functions

# Install dependencies
npm i

# Login to Firebase 
firebase login

# Run dev server
npm run serve

# Deploy to production
npm run deploy
```
