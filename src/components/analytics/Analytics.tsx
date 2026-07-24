import Script from "next/script";
import { siteConfig } from "@/config/site";
import { CONSENT_STORAGE_KEY } from "@/lib/analytics";

/**
 * Carrega Google Analytics / GTM apenas quando os respectivos IDs estiverem
 * configurados via variável de ambiente E o visitante tiver consentido com
 * cookies não essenciais (ver CookieConsent). Nenhum identificador é
 * inventado: enquanto NEXT_PUBLIC_GA_ID / NEXT_PUBLIC_GTM_ID não forem
 * definidos, nada é carregado.
 */
export function Analytics() {
  const { gaId, gtmId } = siteConfig.analytics;

  if (!gaId && !gtmId) return null;

  return (
    <>
      {gaId && (
        <>
          <Script
            id="ga-consent-guard"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                try {
                  if (window.localStorage.getItem("${CONSENT_STORAGE_KEY}") === "accepted") {
                    var s = document.createElement("script");
                    s.src = "https://www.googletagmanager.com/gtag/js?id=${gaId}";
                    s.async = true;
                    document.head.appendChild(s);
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){ window.dataLayer.push(arguments); }
                    window.gtag = gtag;
                    gtag("js", new Date());
                    gtag("config", "${gaId}");
                  }
                } catch (e) {}
              `,
            }}
          />
        </>
      )}
      {gtmId && (
        <Script
          id="gtm-consent-guard"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (window.localStorage.getItem("${CONSENT_STORAGE_KEY}") === "accepted") {
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
                  var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                  j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','${gtmId}');
                }
              } catch (e) {}
            `,
          }}
        />
      )}
    </>
  );
}
