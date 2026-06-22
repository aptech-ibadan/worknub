import LayoutWrapper from '@/components/LayoutWrapper';
import Script from 'next/script';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
});

const chatbaseId = process.env.NEXT_PUBLIC_CHATBASE_ID;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
         <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </head>
      <body className="font-sans antialiased">
        <LayoutWrapper>{children}</LayoutWrapper>

        {/* Google Analytics */}
       

        {/* Chatbase */}
        {chatbaseId && (
          <Script id="chatbase-init" strategy="afterInteractive">
            {`
              (function(){
                if(!window.chatbase || window.chatbase("getState") !== "initialized"){
                  window.chatbase = (...arguments) => {
                    if(!window.chatbase.q){ window.chatbase.q = []; }
                    window.chatbase.q.push(arguments);
                  };
                  window.chatbase = new Proxy(window.chatbase, {
                    get(target, prop){
                      if(prop === "q"){ return target.q; }
                      return (...args) => target(prop, ...args);
                    }
                  });
                }
                const onLoad = function(){
                  const script = document.createElement("script");
                  script.src = "https://www.chatbase.co/embed.min.js";
                  script.id = "${chatbaseId}";
                  script.domain = "www.chatbase.co";
                  document.body.appendChild(script);
                };
                if(document.readyState === "complete"){ onLoad(); }
                else { window.addEventListener("load", onLoad); }
              })();
            `}
          </Script>
        )}
      </body>
    </html>
  );
}