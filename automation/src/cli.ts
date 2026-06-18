#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Octokit } from "@octokit/rest";
import simpleGit from "simple-git";
import { input } from "@inquirer/prompts";
import chalk from "chalk";

type Config = {
  githubUsername: string;
  githubToken: string;
  imagePoolPath: string;
  projectRoot: string;
  phone: string;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadConfig(): Config {
  const configPath = path.join(__dirname, "..", "config.local.json");
  if (!fs.existsSync(configPath)) {
    console.error(
      chalk.red(
        `config.local.json 파일이 없습니다. automation/config.example.json을 복사해서 설정을 먼저 만들어 주세요.`
      )
    );
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(configPath, "utf8"));
}

function slugifyKR(keyword: string): string {
  // 아주 단순한 로마자 변환: 한글은 제거, 영문/숫자/공백만 사용
  const ascii = keyword
    .normalize("NFD")
    .replace(/[^\x00-\x7F]/g, " ")
    .toLowerCase();
  return ascii
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    || "landing";
}

function replaceAll(content: string, pairs: [string, string][]): string {
  let result = content;
  for (const [from, to] of pairs) {
    result = result.split(from).join(to);
  }
  return result;
}

function pickImages(imagePoolPath: string, targetDir: string) {
  const files = fs
    .readdirSync(imagePoolPath)
    .filter((f) => /\.(png|jpe?g|webp)$/i.test(f));

  if (files.length < 10) {
    throw new Error("이미지 풀에 최소 10장 이상의 이미지가 필요합니다.");
  }

  // 간단히 앞에서 10장 사용 (원하면 랜덤으로 바꿀 수 있음)
  const selected = files.slice(0, 10);

  // 기존 shelter-* 삭제
  for (const f of fs.readdirSync(targetDir)) {
    if (/^shelter-\d+\./i.test(f)) {
      fs.unlinkSync(path.join(targetDir, f));
    }
  }

  selected.forEach((file, idx) => {
    const ext = path.extname(file);
    const num = String(idx + 1).padStart(2, "0");
    const dest = path.join(targetDir, `shelter-${num}${ext}`);
    fs.copyFileSync(path.join(imagePoolPath, file), dest);
  });
}

async function main() {
  const config = loadConfig();

  const keyword = await input({
    message: "지역 키워드 (예: 광명):",
  });
  if (!keyword.trim()) {
    console.error(chalk.red("키워드를 입력해야 합니다."));
    process.exit(1);
  }
  const region = keyword.trim();

  const repoSlugInput = await input({
    message: "GitHub 저장소 슬러그 (예: gwangmyeong):",
    default: slugifyKR(region),
  });
  const repoSlug = repoSlugInput.trim() || slugifyKR(region);

  const englishNameInput = await input({
    message: "영문 표기 (예: Gwangmyeong):",
  });
  const englishName = englishNameInput.trim() || repoSlug;

  const vercelSubdomainInput = await input({
    message: "Vercel 서브도메인 (예: gwangmyeong):",
    default: repoSlug,
  });
  const vercelSubdomain = vercelSubdomainInput.trim() || repoSlug;

  const siteUrl = `https://${vercelSubdomain}.vercel.app`;

  console.log(chalk.cyan("\n1) 로컬 템플릿 업데이트 중..."));

  const projectRoot = path.resolve(path.join(__dirname, config.projectRoot));

  const seoPath = path.join(projectRoot, "lib", "seo.ts");
  const layoutPath = path.join(projectRoot, "app", "layout.tsx");
  const headerPath = path.join(projectRoot, "components", "Header.tsx");
  const pagePath = path.join(projectRoot, "app", "page.tsx");
  const imagesTsPath = path.join(projectRoot, "lib", "images.ts");
  const imagesDir = path.join(projectRoot, "public", "images");

  // 1-1) seo.ts 업데이트
  const oldSeo = fs.readFileSync(seoPath, "utf8");
  const newSeo = oldSeo
    .replace(/export const siteUrl = ".*?";/, `export const siteUrl = "${siteUrl}";`)
    .replace(/"[^"]*강아지파양" \| [^\n]+;/, `"${region}강아지파양 | ${region}유기견보호소·${region}강아지보호소 전문 안내";`)
    .replace(
      /"[^"]*강아지파양·[^"]*강아지보호소·[^"]*유기견보호소 전문 상담센터입니다\.[^"]+"/,
      `"${region}강아지파양·${region}강아지보호소·${region}유기견보호소 전문 상담센터입니다. ${region}유기견센터·${region}유기견보호센터 연계, 강아지무료분양·유기동물보호소 입양 안내. 전화 ${config.phone}"`
    )
    .replace(/"[^"]*강아지파양 안내"/, `"${region}강아지파양 안내"`)
    .replace(/"[^"]*강아지파양 · [^"]*유기견보호센터"/, `"${region}강아지파양 · ${region}유기견보호센터"`)
    .replace(/"[^"]*강아지보호소 및 [^"]*유기견보호소 전문 상담\.[^"]+"/, `"${region}강아지보호소 및 ${region}유기견보호소 전문 상담. ${region}유기견센터 연계 파양·강아지무료분양·유기동물보호소 안내."`)
    .replace(/"[^"]*시"/, `"경기도 ${region}시"`);
  fs.writeFileSync(seoPath, newSeo, "utf8");

  // 1-2) layout.tsx 업데이트
  const oldLayout = fs.readFileSync(layoutPath, "utf8");
  const newLayout = replaceAll(oldLayout, [
    ["광명강아지파양", `${region}강아지파양`],
    ["광명유기견보호소", `${region}유기견보호소`],
  ]).replace(
    /template: "%s \| .*?강아지파양",/,
    `template: "%s | ${region}강아지파양",`
  ).replace(
    /keywords: \[\.\.\.targetKeywords, "[^"]* 강아지 파양", "[^"]* 유기견", "아가펫"\],/,
    `keywords: [...targetKeywords, "${region} 강아지 파양", "${region} 유기견", "아가펫"],`
  );
  fs.writeFileSync(layoutPath, newLayout, "utf8");

  // 1-3) Header.tsx 업데이트
  const oldHeader = fs.readFileSync(headerPath, "utf8");
  const newHeader = replaceAll(oldHeader, [
    ["광명강아지파양", `${region}강아지파양`],
    ["Gwangmyeong Shelter Guide", `${englishName} Shelter Guide`],
  ]);
  fs.writeFileSync(headerPath, newHeader, "utf8");

  // 1-4) page.tsx 텍스트 치환 (단순 region 교체)
  const oldPage = fs.readFileSync(pagePath, "utf8");
  const newPage = replaceAll(oldPage, [
    ["광명강아지파양", `${region}강아지파양`],
    ["광명강아지보호소", `${region}강아지보호소`],
    ["광명유기견보호소", `${region}유기견보호소`],
    ["광명유기견센터", `${region}유기견센터`],
    ["광명유기견보호센터", `${region}유기견보호센터`],
    ["광명 지역", `${region} 지역`],
  ]);
  fs.writeFileSync(pagePath, newPage, "utf8");

  // 1-5) lib/images.ts ALT 문구 치환
  const oldImagesTs = fs.readFileSync(imagesTsPath, "utf8");
  const newImagesTs = replaceAll(oldImagesTs, [
    ["광명강아지파양·광명강아지보호소 전경", `${region}강아지파양·${region}강아지보호소 전경`],
    ["광명유기견보호소 위탁견 케어", `${region}유기견보호소 위탁견 케어`],
    ["광명유기견센터 입양 대기견", `${region}유기견센터 입양 대기견`],
    ["광명유기견보호센터 보호 시설", `${region}유기견보호센터 보호 시설`],
  ]);
  fs.writeFileSync(imagesTsPath, newImagesTs, "utf8");

  // 1-6) 이미지 교체
  console.log(chalk.cyan("이미지 교체 중..."));
  pickImages(config.imagePoolPath, imagesDir);

  console.log(chalk.cyan("\n2) GitHub 저장소 생성 및 푸시..."));

  const octokit = new Octokit({ auth: config.githubToken });

  const repoName = repoSlug;

  // 2-1) GitHub repo 생성 (존재하면 계속)
  try {
    await octokit.repos.createForAuthenticatedUser({
      name: repoName,
      private: false,
    });
    console.log(chalk.green(`GitHub repo 생성: ${config.githubUsername}/${repoName}`));
  } catch (err: any) {
    if (err.status === 422) {
      console.log(chalk.yellow("이미 존재하는 저장소입니다. 계속 진행합니다."));
    } else {
      console.error(chalk.red("GitHub 저장소 생성 실패:"), err.message);
      process.exit(1);
    }
  }

  const git = simpleGit(projectRoot);

  // 2-2) 원격 설정
  await git.remote(["set-url", "origin", `https://github.com/${config.githubUsername}/${repoName}.git`]);

  // 2-3) 커밋 & 푸시
  await git.add(".");
  await git.commit(`${region} 지역 키워드 전환, 콘텐츠 수정 및 사진 교체`, { "--allow-empty": null });
  await git.push("origin", "main", ["-u"]);

  console.log(chalk.green("\n완료!"));
  console.log(chalk.green(`GitHub: https://github.com/${config.githubUsername}/${repoName}`));
  console.log(chalk.green(`예상 Vercel URL: ${siteUrl}`));
  console.log(chalk.yellow("Vercel 대시보드에서 이 저장소를 새로운 프로젝트로 Import 해 주세요 (최초 1회)."));
}

main().catch((err) => {
  console.error(chalk.red("오류 발생:"), err);
  process.exit(1);
});

