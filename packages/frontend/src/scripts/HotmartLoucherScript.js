import Head from 'next/head';

const HotmartLauncherScript = () => (
  <Head>
    <script
      dangerouslySetInnerHTML={{
        __html: `
        (function(l,a,u,n,c,h,e,r){l['HotmartLauncherObject']=c;l[c]=l[c]||function(){
          (l[c].q=l[c].q||[]).push(arguments)},l[c].l=1*new Date();h=a.createElement(u),
          e=a.getElementsByTagName(u)[0];h.async=1;h.src=n;e.parentNode.insertBefore(h,e)
        })(window,document,'script','//launcher.hotmart.com/launcher.js','hot');

        hot('account','3497f7ec-2104-3087-8dd2-af168579e53b');
        `,
      }}
    ></script>
  </Head>
);

export default HotmartLauncherScript;