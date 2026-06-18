import Image from "next/image";
import FloatingBar from "@/components/FloatingBar";
import Header from "@/components/Header";
import SectionLabel from "@/components/SectionLabel";
import { getShelterImages } from "@/lib/images";
import type { RegionPageContent } from "@/lib/regions/types";

type LandingPageProps = {
  content: RegionPageContent;
};

export default function LandingPage({ content }: LandingPageProps) {
  const homeHref = content.slug ? `/${content.slug}` : "/";
  const shelterImages = getShelterImages(content.imageFolder, content.altPrefixes);
  const heroImage = shelterImages[0];
  const galleryImages = shelterImages.slice(1);

  return (
    <>
      <Header
        brandName={content.brandName}
        brandSubtitle={content.brandSubtitle}
        homeHref={homeHref}
      />

      <main>
        <section
          id="about"
          className="relative overflow-hidden bg-cream"
          aria-labelledby="hero-heading"
        >
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-8 lg:grid-cols-2 lg:py-28">
            <div>
              <p className="text-sm text-warm">{content.heroBadge}</p>
              <h1 id="hero-heading" className="heading-display mt-6">
                {content.heroTitleLines.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
                <span className="italic text-aga-brown">{content.heroHighlight}</span>
              </h1>
              <p className="mt-2 font-serif text-lg text-aga-brown sm:text-xl">
                {content.heroSubtitle}
              </p>
              <p className="mt-6 max-w-lg text-sm leading-relaxed text-warm sm:text-base">
                {content.heroIntro}
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <a href="tel:0505-707-0401" className="btn-primary">
                  지금 전화 상담하기
                </a>
                <a href="#shelter" className="btn-outline">
                  ↘ 보호소 둘러보기
                </a>
              </div>
            </div>

            {heroImage && (
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm sm:aspect-[3/4]">
                <Image
                  src={heroImage.src}
                  alt={heroImage.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </section>

        <section
          className="border-y border-sand bg-cream-dark py-20 sm:py-28"
          aria-labelledby="mission-heading"
        >
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-8">
            <SectionLabel>Our Mission</SectionLabel>
            <h2 id="mission-heading" className="heading-display mx-auto mt-6 max-w-2xl">
              {content.missionTitleLines.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-warm sm:text-base">
              {content.missionText}
            </p>
            <p className="mt-6 text-sm text-charcoal">
              지금 바로 상담이 필요하시다면{" "}
              <a
                href="tel:0505-707-0401"
                className="font-semibold underline decoration-aga-gold underline-offset-4"
              >
                0505-707-0401
              </a>
            </p>
          </div>
        </section>

        <section className="bg-cream py-16" aria-label="보호소 현황">
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-10 px-4 sm:grid-cols-4 sm:px-8">
            {content.stats.map((item) => (
              <div key={item.label} className="text-center">
                <p className="font-serif text-3xl text-charcoal sm:text-4xl">
                  {item.value}
                </p>
                <p className="mt-2 text-xs text-warm sm:text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="services"
          className="border-t border-sand bg-cream-dark py-20 sm:py-28"
          aria-labelledby="services-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-8">
            <div className="grid gap-16 lg:grid-cols-2">
              <div>
                <SectionLabel>Our Story</SectionLabel>
                <h2 id="services-heading" className="heading-display mt-6">
                  {content.storyTitleLines.map((line) => (
                    <span key={line}>
                      {line}
                      <br />
                    </span>
                  ))}
                </h2>
                <p className="mt-6 text-sm leading-relaxed text-warm sm:text-base">
                  {content.storyText}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {content.serviceItems.map((item) => (
                  <article key={item.title} className="border border-sand bg-cream p-6">
                    <h3 className="font-serif text-base font-medium text-charcoal">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-xs leading-relaxed text-warm sm:text-sm">
                      {item.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="shelter"
          className="bg-cream py-20 sm:py-28"
          aria-labelledby="shelter-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-8">
            <SectionLabel>Shelter</SectionLabel>
            <h2 id="shelter-heading" className="heading-display mt-6 max-w-xl">
              {content.shelterTitleLines.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </h2>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-warm sm:text-base">
              {content.shelterText}
            </p>

            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {galleryImages.map((image, index) => (
                <figure key={image.src} className="group overflow-hidden">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      loading={index < 6 ? "eager" : "lazy"}
                    />
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section
          className="border-y border-sand bg-cream-dark py-20 sm:py-28"
          aria-labelledby="promises-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-8">
            <div className="text-center">
              <SectionLabel>Our Promises</SectionLabel>
              <h2 id="promises-heading" className="heading-display mx-auto mt-6">
                아가펫의 세 가지 약속
              </h2>
              <p className="mx-auto mt-4 max-w-md text-sm text-warm">
                이 약속은 한 번도 깨진 적이 없습니다. 앞으로도 그럴 것입니다.
              </p>
            </div>

            <div className="mt-16 grid gap-12 sm:grid-cols-3">
              {content.promises.map((item) => (
                <article key={item.num} className="text-center">
                  <p className="section-label text-aga-gold">{item.num}</p>
                  <h3 className="mt-4 font-serif text-lg font-medium text-charcoal sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-xs leading-relaxed text-warm sm:text-sm">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="process"
          className="bg-cream py-20 sm:py-28"
          aria-labelledby="process-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-8">
            <div className="text-center">
              <SectionLabel>Process</SectionLabel>
              <h2 id="process-heading" className="heading-display mx-auto mt-6">
                처음이라 어려우신가요?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm text-warm">
                {content.processIntro}
              </p>
            </div>

            <ol className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {content.processSteps.map((item) => (
                <li key={item.step} className="text-center">
                  <span className="font-serif text-4xl text-sand">{item.step}</span>
                  <h3 className="mt-4 font-serif text-lg font-medium text-charcoal">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-warm sm:text-sm">
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          id="faq"
          className="border-t border-sand bg-cream-dark py-20 sm:py-28"
          aria-labelledby="faq-heading"
        >
          <div className="mx-auto max-w-2xl px-4 sm:px-8">
            <div className="text-center">
              <SectionLabel>FAQ</SectionLabel>
              <h2 id="faq-heading" className="heading-display mx-auto mt-6">
                자주 묻는 질문
              </h2>
            </div>

            <dl className="mt-12 space-y-0 divide-y divide-sand border-y border-sand">
              {content.faqItems.map((item) => (
                <div key={item.question} className="py-8">
                  <dt className="font-serif text-base font-medium text-charcoal">
                    {item.question}
                  </dt>
                  <dd className="mt-3 text-sm leading-relaxed text-warm">
                    {item.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section
          id="contact"
          className="bg-aga-dark py-20 text-cream sm:py-28"
          aria-labelledby="contact-heading"
        >
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-8">
            <SectionLabel>Contact</SectionLabel>
            <p className="mt-6 text-xs uppercase tracking-widest text-warm-light">
              — 안전한 반려동물 쉼터
            </p>
            <h2 id="contact-heading" className="heading-display mt-6 text-cream">
              언제든 편하게
              <br />
              연락주세요.
            </h2>
            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-warm-light">
              {content.contactText}
            </p>

            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              <div>
                <p className="section-label text-warm-light">Phone</p>
                <a
                  href="tel:0505-707-0401"
                  className="mt-2 block font-serif text-xl text-cream hover:underline"
                >
                  0505-707-0401
                </a>
              </div>
              <div>
                <p className="section-label text-warm-light">Hours</p>
                <p className="mt-2 text-sm text-cream">연중무휴 24시간 상담</p>
              </div>
              <div>
                <p className="section-label text-warm-light">Homepage</p>
                <a
                  href="https://www.agapetstory.co.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block text-sm text-cream hover:underline"
                >
                  agapetstory.co.kr
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-charcoal/10 bg-aga-dark py-12 text-cream">
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="text-center sm:text-left">
              <p className="font-serif text-lg">{content.footerBrand}</p>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-warm-light">
                {content.footerSubtitle}
              </p>
            </div>
            <nav aria-label="푸터 메뉴">
              <ul className="flex flex-wrap justify-center gap-5 text-xs text-warm-light">
                <li>
                  <a href="#about" className="hover:text-cream">
                    소개
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-cream">
                    보호 서비스
                  </a>
                </li>
                <li>
                  <a href="#process" className="hover:text-cream">
                    파양 절차
                  </a>
                </li>
                <li>
                  <a href="#shelter" className="hover:text-cream">
                    보호소 안내
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-cream">
                    FAQ
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <p className="mt-8 text-center font-serif text-sm italic text-warm-light">
            &ldquo;안락사 없이, <span className="text-cream">끝까지</span> 곁을
            지킵니다.&rdquo;
          </p>
          <p className="mt-6 text-center text-[10px] leading-relaxed text-warm-light/70">
            {content.footerKeywords}
          </p>
          <p className="mt-3 text-center text-[10px] text-warm-light/50">
            © {new Date().getFullYear()} 아가펫보호소 · {content.footerCopyright}
          </p>
        </div>
      </footer>

      <FloatingBar />
    </>
  );
}
